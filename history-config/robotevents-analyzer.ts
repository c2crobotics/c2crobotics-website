import { ROBOTEVENTS_CONFIG, validateConfig } from "@/history-config/config"
import type { Team, Award, Event, ApiResponse, TeamStats, SeasonStats, AwardDetail, CompetitionDetail } from "@/history-config/types"

export class RobotEventsAnalyzer {
  private apiToken: string
  private baseUrl: string
  private cache: Map<string, any> = new Map()

  constructor() {
    const validation = validateConfig()
    if (!validation.isValid) {
      throw new Error(validation.error)
    }

    this.apiToken = ROBOTEVENTS_CONFIG.API_TOKEN
    this.baseUrl = ROBOTEVENTS_CONFIG.BASE_URL
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, string> = {}): Promise<ApiResponse<T>> {
    // Create cache key
    const cacheKey = `${endpoint}?${new URLSearchParams(params).toString()}`

    // Check cache first
    if (this.cache.has(cacheKey)) {
      console.log(`Cache hit for: ${endpoint}`)
      return this.cache.get(cacheKey)
    }

    const url = new URL(`${this.baseUrl}${endpoint}`)

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value)
      }
    })

    console.log(`API request: ${endpoint}`)
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()

    // Cache the response
    this.cache.set(cacheKey, data)

    return data
  }

  private async getAllPagesOptimized<T>(endpoint: string, params: Record<string, string> = {}): Promise<T[]> {
    // First request to get total pages
    const firstResponse = await this.makeRequest<T>(endpoint, {
      ...params,
      page: "1",
      per_page: "250", // Maximum per page
    })

    let allData: T[] = [...firstResponse.data]
    const totalPages = firstResponse.meta.last_page

    if (totalPages <= 1) {
      return allData
    }

    console.log(`Fetching ${totalPages} pages for ${endpoint}...`)

    // Create promises for remaining pages
    const pagePromises: Promise<ApiResponse<T>>[] = []
    const maxConcurrent = 5 // Limit concurrent requests to avoid rate limiting

    for (let page = 2; page <= totalPages; page++) {
      pagePromises.push(
        this.makeRequest<T>(endpoint, {
          ...params,
          page: page.toString(),
          per_page: "250",
        }),
      )

      // Process in batches to avoid overwhelming the API
      if (pagePromises.length >= maxConcurrent || page === totalPages) {
        const batchResults = await Promise.all(pagePromises)
        batchResults.forEach((response) => {
          allData = allData.concat(response.data)
        })
        pagePromises.length = 0 // Clear the array

        // Small delay between batches to be respectful to the API
        if (page < totalPages) {
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
      }
    }

    console.log(`Fetched ${allData.length} items from ${totalPages} pages`)
    return allData
  }

  async findTeamByNumber(teamNumber: string): Promise<Team | null> {
    const cacheKey = `team-${teamNumber}`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const teams = await this.getAllPagesOptimized<Team>("/teams", {
      number: teamNumber,
    })

    if (teams.length === 0) {
      this.cache.set(cacheKey, null)
      return null
    }

    // Filter for teams with the configured organization
    const orgTeams = teams.filter(
      (team) =>
        team.organization && team.organization.toLowerCase().includes(ROBOTEVENTS_CONFIG.ORGANIZATION.toLowerCase()),
    )

    const result = orgTeams.length > 0 ? orgTeams[0] : null
    this.cache.set(cacheKey, result)
    return result
  }

  private formatLocation(location: any): string {
    if (!location) return "Unknown Location"

    const parts = []
    if (location.city) parts.push(location.city)
    if (location.region) parts.push(location.region)
    if (location.country) parts.push(location.country)

    return parts.length > 0 ? parts.join(", ") : "Unknown Location"
  }

  private formatDate(dateString: string): string {
    if (!dateString) return "Unknown Date"

    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return "Unknown Date"
    }
  }

  async analyzeTeam(teamNumber: string): Promise<TeamStats | null> {
    const team = await this.findTeamByNumber(teamNumber)
    if (!team || !team.id) {
      return null
    }

    console.log(`Analyzing team: ${team.team_name} (${team.number})`)

    // Fetch events and awards in parallel for better performance
    const [events, allAwards] = await Promise.all([
      this.getAllPagesOptimized<Event>(`/teams/${team.id}/events`),
      this.getAllPagesOptimized<Award>(`/teams/${team.id}/awards`),
    ])

    console.log(`Found ${events.length} events and ${allAwards.length} awards`)

    // Extract unique seasons
    const seasonsSet = new Set<number>()
    const seasonNames = new Map<number, string>()

    events.forEach((event) => {
      if (event.season) {
        seasonsSet.add(event.season.id)
        seasonNames.set(event.season.id, event.season.name)
      }
    })

    const seasonIds = Array.from(seasonsSet)
    console.log(`Found ${seasonIds.length} seasons`)

    // Create event map for cross-referencing
    const eventMap = new Map<number, Event>()
    events.forEach((event) => {
      eventMap.set(event.id, event)
    })

    // Group data by season
    const seasonMap = new Map<
      number,
      {
        seasonId: number
        seasonName: string
        awards: Award[]
        events: Event[]
      }
    >()

    // Initialize with events
    events.forEach((event) => {
      if (event.season) {
        const seasonId = event.season.id
        if (!seasonMap.has(seasonId)) {
          seasonMap.set(seasonId, {
            seasonId,
            seasonName: event.season.name,
            awards: [],
            events: [],
          })
        }
        seasonMap.get(seasonId)!.events.push(event)
      }
    })

    // Add awards to seasons
    allAwards.forEach((award) => {
      const event = eventMap.get(award.event?.id || 0)
      if (event && event.season) {
        const seasonId = event.season.id
        if (seasonMap.has(seasonId)) {
          seasonMap.get(seasonId)!.awards.push(award)
        }
      }
    })

    // Convert to season stats
    const seasonStats: SeasonStats[] = Array.from(seasonMap.values())
      .sort((a, b) => b.seasonId - a.seasonId)
      .map((season) => {
        const awardDetails: AwardDetail[] = season.awards.map((award) => {
          const event = eventMap.get(award.event?.id || 0)

          return {
            name: award.title || "Unknown Award",
            date: event?.start ? this.formatDate(event.start) : "Unknown Date",
            location: event?.location ? this.formatLocation(event.location) : "Unknown Location",
            eventName: award.event?.name || "Unknown Event",
          }
        })

        const competitionDetails: CompetitionDetail[] = season.events.map((event) => ({
          name: event.name || "Unknown Event",
          date: event.start ? this.formatDate(event.start) : "Unknown Date",
          location: event.location ? this.formatLocation(event.location) : "Unknown Location",
          level: event.level || "Unknown Level",
        }))

        return {
          seasonId: season.seasonId,
          seasonName: season.seasonName,
          totalAwards: season.awards.length,
          totalCompetitions: season.events.length,
          awards: awardDetails,
          competitions: competitionDetails,
        }
      })

    return {
      teamNumber: team.number,
      teamName: team.team_name,
      organization: team.organization || "Unknown Organization",
      totalAwards: allAwards.length,
      totalCompetitions: events.length,
      seasonStats,
    }
  }
}

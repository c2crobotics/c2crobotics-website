import { ROBOTEVENTS_CONFIG, validateConfig } from "@/history-config/config"
import type { Team, Award, Event, ApiResponse, TeamStats, SeasonStats, AwardDetail, CompetitionDetail } from "@/history-config/types"

export class RobotEventsAnalyzer {
  private apiToken: string
  private baseUrl: string

  constructor() {
    const validation = validateConfig()
    if (!validation.isValid) {
      throw new Error(validation.error)
    }

    this.apiToken = ROBOTEVENTS_CONFIG.API_TOKEN
    this.baseUrl = ROBOTEVENTS_CONFIG.BASE_URL
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, string> = {}): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${endpoint}`)

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value)
      }
    })

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

    return await response.json()
  }

  private async getAllPages<T>(endpoint: string, params: Record<string, string> = {}): Promise<T[]> {
    let allData: T[] = []
    let currentPage = 1
    let hasMorePages = true

    while (hasMorePages) {
      const response = await this.makeRequest<T>(endpoint, {
        ...params,
        page: currentPage.toString(),
        per_page: "250",
      })

      allData = allData.concat(response.data)
      hasMorePages = currentPage < response.meta.last_page
      currentPage++

      if (hasMorePages) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }

    return allData
  }

  async findTeamByNumber(teamNumber: string): Promise<Team | null> {
    const teams = await this.getAllPages<Team>("/teams", {
      number: teamNumber,
    })

    if (teams.length === 0) {
      return null
    }

    // Filter for teams based on organization name
    const orgTeams = teams.filter(
      (team) =>
        team.organization && team.organization.toLowerCase().includes(ROBOTEVENTS_CONFIG.ORGANIZATION.toLowerCase()),
    )

    return orgTeams.length > 0 ? orgTeams[0] : null
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

    // Get all events
    const events = await this.getAllPages<Event>(`/teams/${team.id}/events`)

    // Extract seasons
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

    // Fetch awards for the team
    const allAwards: Award[] = await this.getAllPages<Award>(`/teams/${team.id}/awards`)

    // Create event map
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
      organization: team.organization,
      totalAwards: allAwards.length,
      totalCompetitions: events.length,
      seasonStats,
    }
  }
}

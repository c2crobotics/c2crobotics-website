type Color = "foreground" | "background" | "primary" | "secondary" | "accent"

export type GalleryAlbum = {
  name: string
  subcategories?: {
    [key: string]: {
      name: string
      images: string[]
    }
  }
}

export type TeamAchievement = {
  name: string
  place: string
  date: string
  location: string
}

export type TeamCompetition = {
  name: string
  date: string
  location: string
}

export type TeamPhoto = {
  url: string
  caption: string
}

export type Team = {
  id: number
  name: string
  achievements: TeamAchievement[]
  competitions: TeamCompetition[]
  photos: TeamPhoto[]
}

export type TeamsData = {
  [year: string]: Team[]
}

export type SiteConfig = {
  name: string
  description: string
  navItems: {
    label: string
    href: string
    color: Color
  }[]
  links: {
    [key: string]: string
  }
  siteURLs: {
    label: string
    href: string
    color: Color
  }[]
  history: {
    label: string
    href: string
    color: Color
  }[]
  gallery: {
    carouselImages: string[]
    albums: {
      [key: string]: GalleryAlbum
    }
  }
  sponsors: {
    title: string
    link: string
    url: string
  }[]
  teams: TeamsData
}

// Abstracted data objects
export const teamsData: TeamsData = {
  2024: [
    {
      id: 1,
      name: "team1",
      achievements: [
        { name: "Regional Championship", place: "1st", date: "March 2024", location: "" },
        { name: "State Tournament", place: "2nd", date: "April 2024", location: "" },
        { name: "National Qualifiers", place: "3rd", date: "May 2024", location: "" },
      ],
      competitions: [
        { name: "Regional Championship", date: "March 10-15, 2024", location: "" },
        { name: "State Tournament", date: "April 18-22, 2024", location: "" },
        { name: "National Qualifiers", date: "May 5-8, 2024", location: "" },
      ],
      photos: [
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "Team Photo 2024" },
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "Regional Championship Victory" },
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "State Tournament Action" },
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "" },
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "" },
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "" },
      ],
    },
    {
      id: 2,
      name: "team2",
      achievements: [
        { name: "City Championship", place: "1st", date: "February 2024", location: "" },
        { name: "Inter-School Tournament", place: "1st", date: "March 2024", location: "" },
        { name: "Summer Cup", place: "2nd", date: "July 2024", location: "" },
      ],
      competitions: [
        { name: "City Championship", date: "February 25-28, 2024", location: "City Hall Arena" },
        { name: "Inter-School Tournament", date: "March 25-30, 2024", location: "University Stadium" },
        { name: "Summer Cup", date: "July 15-18, 2024", location: "Beachside Recreation Center" },
      ],
      photos: [
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "Lightning Bolts Team 2024" },
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "City Championship Win" },
      ],
    },
  ],
  2023: [
    {
      id: 4,
      name: "team1",
      achievements: [{ name: "National Championship", place: "1st", date: "November 2023", location: "Washington DC" }],
      competitions: [
        { name: "National Championship", date: "November 8-12, 2023", location: "Washington DC Arena" },
        { name: "Regional Finals", date: "October 5-8, 2023", location: "Central Valley Sports Hub" },
      ],
      photos: [
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "Fire Dragons 2023" },
        { url: "/gallery/placeholder.webp?height=200&width=300", caption: "National Champions" },
      ],
    },
  ],
}

export const navItemsData = [
  {
    label: "History",
    href: "/history",
    color: "foreground" as Color,
  },
  {
    label: "Gallery",
    href: "/gallery",
    color: "foreground" as Color,
  },
  {
    label: "Classes & Camps",
    href: "/courses",
    color: "foreground" as Color,
  },
  {
    label: "Register",
    href: "/register",
    color: "foreground" as Color,
  },
  {
    label: "Contact",
    href: "/contact",
    color: "foreground" as Color,
  },
]

export const linksData = {
  github: "https://github.com/c2crobotics",
  instagram: "https://www.instagram.com/c2crobotics/",
  facebook: "https://www.facebook.com/profile.php?id=100063715805638",
  twitter: "https://x.com/c2c_robotics",
  youtube: "https://www.youtube.com/channel/UCgZzPysyfr9m7b-pOD_6Yng",
}

export const siteURLsData = [
  {
    label: "Teams",
    href: "/teams",
    color: "foreground" as Color,
  },
  {
    label: "Classes & Camps",
    href: "/courses",
    color: "foreground" as Color,
  },
  {
    label: "Register",
    href: "/register",
    color: "foreground" as Color,
  },
  {
    label: "Gallery",
    href: "/gallery",
    color: "foreground" as Color,
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
    color: "foreground" as Color,
  },
  {
    label: "Terms of Service",
    href: "/terms-of-service",
    color: "foreground" as Color,
  },
  {
    label: "Contact",
    href: "/contact",
    color: "foreground" as Color,
  },
]

export const historyData = [
  {
    label: "2025",
    href: "/history/2025",
    color: "foreground" as Color,
  },
  {
    label: "2023-24",
    href: "/history/2023-24",
    color: "foreground" as Color,
  },
  {
    label: "2022-23",
    href: "/history/2022-23",
    color: "foreground" as Color,
  },
  {
    label: "2021-22",
    href: "/history/2021-22",
    color: "foreground" as Color,
  },
  {
    label: "2020-21",
    href: "/history/2020-21",
    color: "foreground" as Color,
  },
  {
    label: "2019-20",
    href: "/history/2019-20",
    color: "foreground" as Color,
  },
  {
    label: "2018-19",
    href: "/history/2018-19",
    color: "foreground" as Color,
  },
]

export const galleryData = {
  carouselImages: ["/gallery/placeholder.webp", "/gallery/placeholder.webp", "/gallery/placeholder.webp"],
  albums: {
    "2024-2025": {
      name: "2024-2025",
      subcategories: {
        team_photos: {
          name: "Team Photos",
          images: ["/gallery/placeholder.webp", "/gallery/placeholder.webp", "/gallery/placeholder.webp"],
        },
        events: {
          name: "Events",
          images: [
            "/gallery/placeholder.webp",
            "/gallery/placeholder.webp",
            "/gallery/placeholder.webp",
            "/gallery/placeholder.webp",
            "/gallery/placeholder.webp",
          ],
        },
      },
    },
    "2023-2024": {
      name: "2023-2024",
      subcategories: {
        competitions: {
          name: "Competitions",
          images: [
            "/gallery/placeholder.webp",
            "/gallery/placeholder.webp",
            "/gallery/placeholder.webp",
            "/gallery/placeholder.webp",
            "/gallery/placeholder.webp",
            "/gallery/placeholder.webp",
          ],
        },
        team_photos: {
          name: "Team Photos",
          images: [
            "/gallery/placeholder.webp",
            "/gallery/placeholder.webp",
            "/gallery/placeholder.webp",
            "/gallery/placeholder.webp",
          ],
        },
        workshops: {
          name: "Workshops",
          images: ["/gallery/placeholder.webp", "/gallery/placeholder.webp", "/gallery/placeholder.webp"],
        },
      },
    },
  },
}

export const sponsorsData = [
  {
    title: "Vex Robotics Competition",
    link: "/sponsors/Vex.webp",
    url: "https://www.vexrobotics.com/competition",
  },
  {
    title: "Vex IQ Robotics Competition",
    link: "/sponsors/VexIQ.webp",
    url: "https://www.vexrobotics.com/iq",
  },
  {
    title: "Whimsy Tech",
    link: "/sponsors/WhimsyTech.webp",
    url: "https://www.whimsytech.net/",
  },
]

// Simple, clean main config
export const siteConfig: SiteConfig = {
  name: "Coast 2 Coast",
  description: "The official website for the C2C Robotics.",
  navItems: navItemsData,
  links: linksData,
  siteURLs: siteURLsData,
  history: historyData,
  gallery: galleryData,
  sponsors: sponsorsData,
  teams: teamsData,
}

type Color = "foreground" | "background" | "primary" | "secondary" | "accent"

import { Trophy, Calendar, Users, Award } from "lucide-react"

export type GallerySubcategory = {
  name: string
  images: string[]
}

export type GalleryAlbum = {
  name: string
  subcategories: {
    [key: string]: GallerySubcategory
  }
}

export type GalleryData = {
  carouselImages: string[]
  albums: {
    [key: string]: GalleryAlbum
  }
}

export type NavItem = {
  label: string
  href: string
  dropdown?: {
    label: string
    href: string
    description?: string
  }[]
}

export type Sponsor = {
  title: string
  link: string
  url: string
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

export type StatItem = {
  icon: any
  label: string
  value: number
  suffix: string
  color: string
  bgColor: string
}

export type SiteConfig = {
  name: string
  description: string
  navItems: NavItem[]
  links: {
    [key: string]: string
  }
  siteURLs: {
    [key: string]: string
  }
  gallery: GalleryData
  sponsors: Sponsor[]
  teams: TeamsData
  stats: StatItem[]
}

export const teamsData = {
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
    label: "Teams",
    href: "/teams",
    color: "foreground" as Color,
    dropdown: [
      {
        label: "Team History",
        href: "/teams/history",
        description: "Learn about our journey and achievements",
      },
    ],
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
    dropdown: [
      {
        label: "Winter Courses",
        href: "/courses/winter",
        description: "January - March programs",
      },
      {
        label: "Spring Courses",
        href: "/courses/spring",
        description: "April - June programs",
      },
      {
        label: "Summer Courses",
        href: "/courses/summer",
        description: "July - August programs",
      },
      {
        label: "Fall Courses",
        href: "/courses/fall",
        description: "September - December programs",
      },
    ],
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

const galleryData: GalleryData = {
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

const sponsorsData: Sponsor[] = [
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

const statsData: StatItem[] = [
  {
    icon: Trophy,
    label: "Awards Won",
    value: 0,
    suffix: "+",
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
  {
    icon: Calendar,
    label: "Robotics Competitions",
    value: 0,
    suffix: "+",
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    icon: Users,
    label: "VRC/VIQRC Teams",
    value: 6,
    suffix: "",
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    icon: Award,
    label: "Years of Innovation",
    value: 6,
    suffix: "+",
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
]

const siteURLsData = {
  home: "/",
  teams: "/teams",
  history: "/teams/history",
  gallery: "/gallery",
  courses: "/courses",
  winter: "/courses/winter",
  spring: "/courses/spring",
  summer: "/courses/summer",
  fall: "/courses/fall",
  register: "/register",
  contact: "/contact",
  tos: "/terms-of-service",
  pp: "/privacy-policy",
}

export const siteConfig: SiteConfig = {
  name: "Coast 2 Coast Robotics",
  description: "The official website for the C2C Robotics.",
  navItems: navItemsData,
  links: linksData,
  gallery: galleryData,
  sponsors: sponsorsData,
  teams: teamsData,
  stats: statsData,
  siteURLs: siteURLsData,
}

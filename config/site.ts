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
    tabId: string
    description?: string
  }[]
}

export type Sponsor = {
  title: string
  link: string
  url: string
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
  stats: StatItem[]
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
        tabId: "",
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
        href: "/courses",
        tabId: "jan-april",
        description: "January - March programs",
      },
      {
        label: "Holiday Courses",
        href: "/courses",
        tabId: "holiday",
        description: "April - June programs",
      },
      {
        label: "Summer Courses",
        href: "/courses",
        tabId: "summer",
        description: "July - August programs",
      },
      {
        label: "Fall Courses",
        href: "/courses",
        tabId: "fall",
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
    link: "/sponsors/VEX.webp",
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
    value: 80,
    suffix: "+",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    icon: Calendar,
    label: "Robotics Competitions",
    value: 190,
    suffix: "+",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Users,
    label: "VRC/VIQRC Teams",
    value: 6,
    suffix: "",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Award,
    label: "Years of Innovation",
    value: 10,
    suffix: "+",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  
]

const siteURLsData = {
  home: "/",
  teams: "/teams",
  history: "/teams/history",
  gallery: "/gallery",
  courses: "/courses",
  register: "/register",
  contact: "/contact",
  tos: "/terms-of-service",
  pp: "/privacy-policy",
}

export const siteConfig: SiteConfig = {
  name: "Coast 2 Coast",
  description: "The official website for the C2C Robotics.",
  navItems: navItemsData,
  links: linksData,
  gallery: galleryData,
  sponsors: sponsorsData,
  stats: statsData,
  siteURLs: siteURLsData,
}

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
}

export const siteConfig: SiteConfig = {
    name: "Coast 2 Coast",
    description: "The official website for the C2C Robotics.",
    navItems: [
        {
            label: "History",
            href: "/history",
            color: "foreground",
        },
        {
            label: "Gallery",
            href: "/gallery",
            color: "foreground",
        },
        {
            label: "Classes & Camps",
            href: "/courses",
            color: "foreground",
        },
        {
            label: "Register",
            href: "/register",
            color: "foreground",
        },
        {
            label: "Contact",
            href: "/contact",
            color: "foreground",
        },
    ],
    links: {
        github: "https://github.com/c2crobotics",
        instagram: "https://www.instagram.com/c2crobotics/",
        facebook: "https://www.facebook.com/profile.php?id=100063715805638",
        twitter: "https://x.com/c2c_robotics",
        youtube: "https://www.youtube.com/channel/UCgZzPysyfr9m7b-pOD_6Yng",
    },
    siteURLs: [
        {
            label: "Teams",
            href: "/teams",
            color: "foreground",
        },
        {
            label: "Classes & Camps",
            href: "/courses",
            color: "foreground",
        },
        {
            label: "Register",
            href: "/register",
            color: "foreground",
        },
        {
            label: "Gallery",
            href: "/gallery",
            color: "foreground",
        },
        {
            label: "Privacy Policy",
            href: "/privacy-policy",
            color: "foreground",
        },
        {
            label: "Terms of Service",
            href: "/terms-of-service",
            color: "foreground",
        },
        {
            label: "Contact",
            href: "/contact",
            color: "foreground",
        },
    ],
    history: [
        {
            label: "2025",
            href: "/history/2025",
            color: "foreground",
        },
        {
            label: "2023-24",
            href: "/history/2023-24",
            color: "foreground",
        },
        {
            label: "2022-23",
            href: "/history/2022-23",
            color: "foreground",
        },
        {
            label: "2021-22",
            href: "/history/2021-22",
            color: "foreground",
        },
        {
            label: "2021-22",
            href: "/history/2021-22",
            color: "foreground",
        },
        {
            label: "2020-21",
            href: "/history/2020-21",
            color: "foreground",
        },
        {
            label: "2019-20",
            href: "/history/2019-20",
            color: "foreground",
        },
        {
            label: "2018-19",
            href: "/history/2018-19",
            color: "foreground",
        },
    ],
    gallery: {
        carouselImages: [
            "/gallery/placeholder.webp",
            "/gallery/placeholder.webp",
            "/gallery/placeholder.webp",
        ],
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
    },
    sponsors: [
        {
            title: "Vex Robotics Competition",
            link: "/sponsors/Vex.webp",
            url: "https://www.vexrobotics.com/competition"
        },
        {
            title: "Vex IQ Robotics Competition",
            link: "/sponsors/VexIQ.webp",
            url: "https://www.vexrobotics.com/iq"
        },
        {
            title: "Whimsy Tech",
            link: "/sponsors/WhimsyTech.webp",
            url: "https://www.whimsytech.net/"
        },
    ]
}

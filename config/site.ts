type Color = "foreground" | "background" | "primary" | "secondary" | "accent";

export type GalleryAlbum = {
    name: string
    images: string[]
    subcategories: {
        [key: string]: {
            name: string
            images: string[]
        }
    }
}

export type SiteConfig = {
    name: string;
    description: string;
    navItems: {
        label: string;
        href: string;
        color: Color;
    }[];
    links: {
        [key: string]: string;
    };
    siteURLs: {
        label: string;
        href: string;
        color: Color;
    }[];
    history: {
        label: string;
        href: string;
        color: Color;
    }[];
    gallery: {
        carouselImages: string[]
        albums: {
            [key: string]: GalleryAlbum
        }
    }
};

export const siteConfig: SiteConfig = {
    name: "Coast 2 Coast",
    description: "The official website for the C2C Robotics.",
    navItems: [
        {
            label: "Teams",
            href: "/teams",
            color: "foreground"
        },
        {
            label: "Classes & Camps",
            href: "/courses",
            color: "foreground"
        },
        {
            label: "Register",
            href: "/register",
            color: "foreground"
        },
        {
            label: "Gallery",
            href: "/gallery",
            color: "foreground"
        },
        {
            label: "test",
            href: "/privacy-policy",
            color: "foreground"
        },
        {
            label: "test",
            href: "/terms-of-service",
            color: "foreground"
        },
        {
            label: "Contact",
            href: "/contact",
            color: "foreground"
        }
    ],
    links: {
        github: "",
        instagram: "https://www.instagram.com/c2crobotics/",
        facebook: "https://www.facebook.com/profile.php?id=100063715805638",
        twitter: "https://x.com/c2c_robotics",
        youtube: "https://www.youtube.com/channel/UCgZzPysyfr9m7b-pOD_6Yng",
    },
    siteURLs: [
        {
            label: "Teams",
            href: "/teams",
            color: "foreground"
        },
        {
            label: "Classes & Camps",
            href: "/courses",
            color: "foreground"
        },
        {
            label: "Register",
            href: "/register",
            color: "foreground"
        },
        {
            label: "Gallery",
            href: "/gallery",
            color: "foreground"
        },
        {
            label: "test",
            href: "/b",
            color: "foreground"
        },
        {
            label: "test",
            href: "/a",
            color: "foreground"
        },
        {
            label: "Contact",
            href: "/contact",
            color: "foreground"
        },
        {
            label: "Terms of Service",
            href: "/terms-of-service",
            color: "foreground"
        },
        {
            label: "Privacy Policy",
            href: "/privacy-policy",
            color: "foreground"
        },
    ],
    history: [
        {
            label: "2025",
            href: "/teams/2025",
            color: "foreground"
        },
        {
            label: "2024",
            href: "/teams/2024",
            color: "foreground"
        },
        {
            label: "2023",
            href: "/teams/2023",
            color: "foreground"
        },
        {
            label: "2022",
            href: "/teams/2022",
            color: "foreground"
        },
        {
            label: "2021",
            href: "/teams/2021",
            color: "foreground"
        },
        {
            label: "2020",
            href: "/teams/2020",
            color: "foreground"
        },
        {
            label: "2019",
            href: "/teams/2019",
            color: "foreground"
        },
        {
            label: "2018",
            href: "/teams/2018",
            color: "foreground"
        },
    ],
    gallery: {
        carouselImages: [
            "/gallery/placeholder.webp",
            "/gallery/placeholder.webp",
            "/gallery/placeholder.webp",
            "/gallery/placeholder.webp",
        ],
        albums: {
            "2024-2025": {
                name: "2024-2025",
                images: [
                    "/gallery/placeholder.webp",
                    "/gallery/placeholder.webp",
                    "/gallery/placeholder.webp",
                    "/gallery/placeholder.webp",
                    "/gallery/placeholder.webp",
                    "/gallery/placeholder.webp",
                ],
                subcategories: {
                    competitions: {
                        name: "Competitions",
                        images: [
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
                            "/gallery/placeholder.webp"
                        ],
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
                images: [
                    "/gallery/placeholder.webp",
                    "/gallery/placeholder.webp",
                    "/gallery/placeholder.webp",
                ],
                subcategories: {
                    competitions: {
                        name: "Competitions",
                        images: [
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
                            "/gallery/placeholder.webp",
                            "/gallery/placeholder.webp",
                            "/gallery/placeholder.webp",
                            "/gallery/placeholder.webp",
                            "/gallery/placeholder.webp",
                            "/gallery/placeholder.webp",
                        ],
                    },
                    events: {
                        name: "Events",
                        images: [
                            "/gallery/placeholder.webp",
                            "/gallery/placeholder.webp",
                            "/gallery/placeholder.webp",
                            "/gallery/placeholder.webp",
                            "/gallery/placeholder.webp",
                            "/gallery/placeholder.webp",
                            "/gallery/placeholder.webp",
                            "/gallery/placeholder.webp",
                            "/gallery/placeholder.webp",
                            "/gallery/placeholder.webp",
                            "/gallery/placeholder.webp",
                            "/gallery/placeholder.webp",
                        ],
                    },
                }
            }
        },
    },
};


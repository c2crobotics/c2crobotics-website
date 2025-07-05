type Color = "foreground" | "background" | "primary" | "secondary" | "accent";

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
            label: "Gallery",
            href: "/b",
            color: "foreground"
        },
        {
            label: "Gallery",
            href: "/a",
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
};
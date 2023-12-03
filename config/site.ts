export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Admin Panel- Campus Navigation System",
    description: "Make beautiful websites regardless of your design experience.",
    navItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Locations",
            href: "/locations",
        },
        {
            label: "events",
            href: "/events",
        },
        {
            label: "About",
            href: "/about",
        }
    ]
};

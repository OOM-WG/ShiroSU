import { defineConfig, type DefaultTheme } from "vitepress";


export default defineConfig({

    lang: "en-US",
    description: "SakitinSU - Kernel-based Android Root Solution",

    themeConfig: {
        nav: nav(),

        sidebar: {
            "/en/": { base: "/en/", items: sidebar() },
        },

        search: { options: searchOptions() },
        editLink: {
            pattern:
                "https://github.com/OOM-WG/SSU_Docs/edit/main/src/:path",
            text: "Edit this page on GitHub",
        },


        docFooter: {
            prev: "Previous",
            next: "Next",
        },

        outline: {
            label: "On this page",
        },

        lastUpdated: {
            text: "Last updated",
        },

        notFound: {
            title: "Page Not Found",
            quote: "Sorry, we couldn't find what you're looking for.",
            linkLabel: "Go to home",
            linkText: "Take me home",
        },

        langMenuLabel: "Languages",
        returnToTopLabel: "Return to top",
        sidebarMenuLabel: "Menu",
        darkModeSwitchLabel: "Theme",
        lightModeSwitchTitle: "Switch to light theme",
        darkModeSwitchTitle: "Switch to dark theme",
        skipToContentLabel: "Skip to content",
    },
});

    function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: "About SSU",
            items: [
                {
                    text: "Features",
                    link: "/en/base/feats",
                },
                {
                    text: "Meet the Team",
                    link: "/en/ssu/team",
                },
                {
                    text: "Acknowledgments",
                    link: "/en/ssu/3q",
                },
            ],
        },
        {
            text: "Version Updates",
            items: [
                {
                    text: "Version History",
                    link: "/en/update/history",
                },
                {
                    text: "Changelog",
                    link: "/en/update/changelog",
                },
            ],
        },
        {
            text: "Documentation Translation",
            link: "/en/more/translation",
        },
    ];
}

function sidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: "User Guide",
            collapsed: false,
            items: [
                {
                    text: "What is SSU",
                    link: "/base/overview",
                },
                {
                    text: "Installation Guide",
                    link: "/base/install",
                },
                {
                    text: "FAQ",
                    link: "/base/faq",
                },
            ],
        },
        {
            text: "For Developers",
            collapsed: false,
            items: [
                {
                    text: "Module Development",
                    link: "/dev/module",
                },
                {
                    text: "Module WebUI",
                    link: "/dev/webui",
                },
                {
                    text: "Scheme Invocation",
                    link: "/dev/scheme",
                },
            ],
        },
        {
            text: "About SSU",
            collapsed: false,
            items: [
                {
                    text: "The Origin",
                    link: "/ssu/origin",
                },
                {
                    text: "Kernel Principles",
                    link: "/ssu/principle",
                },
                {
                    text: "Addressing Doubts",
                    link: "/ssu/defense",
                },
            ],
        },
    ];
}

function searchOptions(): Partial<DefaultTheme.LocalSearchOptions> {
    return {
        translations: {
            button: {
                buttonText: "Search docs",
                buttonAriaLabel: "Search docs",
            },
            modal: {
                noResultsText: "No results found",
                resetButtonTitle: "Clear query",
                footer: {
                    selectText: "Select",
                    navigateText: "Navigate",
                    closeText: "Close",
                },
            },
        },
    };
}
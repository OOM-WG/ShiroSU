import { defineConfig, type DefaultTheme } from "vitepress";


export default defineConfig({
    lang: "zh-Hans",
    description: "ShiroSU - 基于内核的 Android Root 解决方案",

    themeConfig: {
        nav: nav(),

        sidebar: {
            "/": { base: "/", items: sidebar() },
        },

        search: { options: searchOptions() },
        editLink: {
            pattern:
                "https://github.com/OOM-WG/SSU_Docs/edit/main/src/:path",
            text: "在 GitHub 上编辑此页面",
        },

        docFooter: {
            prev: "上一页",
            next: "下一页",
        },

        outline: {
            label: "页面导航",
        },

        lastUpdated: {
            text: "最后更新于",
        },

        notFound: {
            title: "页面未找到",
            quote: "抱歉，我们无法找到您要查找的页面。",
            linkLabel: "前往首页",
            linkText: "带我回首页",
        },

        langMenuLabel: "多语言",
        returnToTopLabel: "回到顶部",
        sidebarMenuLabel: "菜单",
        darkModeSwitchLabel: "主题",
        lightModeSwitchTitle: "切换到浅色模式",
        darkModeSwitchTitle: "切换到深色模式",
        skipToContentLabel: "跳转到内容",
    },
});

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: "关于 SSU",
            items: [
                {
                    text: "特色功能",
                    link: "/base/feats",
                },
                {
                    text: "了解团队",
                    link: "/ssu/team",
                },
                {
                    text: "开发致谢",
                    link: "/ssu/3q",
                },
            ],
        },
        {
            text: "版本更新",
            items: [
                {
                    text: "历史版本",
                    link: "/update/history",
                },
                {
                    text: "更新日志",
                    link: "/update/changelog",
                },
            ],
        },
        {
            text: "文档翻译",
            link: "/more/translation",
        },
    ];
}

function sidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: "使用指南",
            collapsed: false,
            items: [
                {
                    text: "什么是 SSU",
                    link: "/base/overview",
                },
                {
                    text: "安装指南",
                    link: "/base/install",
                },
                {
                    text: "常见问题",
                    link: "/base/faq",
                },
            ],
        },
        {
            text: "面向开发者",
            collapsed: false,
            items: [
                {
                    text: "模块开发",
                    link: "/dev/module",
                },
                {
                    text: "模块 WebUI",
                    link: "/dev/webui",
                },
                {
                    text: "Scheme 调用",
                    link: "/dev/scheme",
                },
            ],
        },
        {
            text: "关于 SSU",
            collapsed: false,
            items: [
                {
                    text: "一切的起源",
                    link: "/ssu/origin",
                },
                {
                    text: "内核工作原理",
                    link: "/ssu/principle",
                },
                {
                    text: "面对质疑",
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
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
            },
            modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                    selectText: "选择",
                    navigateText: "切换",
                    closeText: "关闭",
                },
            },
        },
    };
}

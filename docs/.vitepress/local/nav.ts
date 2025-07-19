import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
    {
        text: "关于 SSU",
        items: [
            {
                text: "特色功能",
                link: "/base/feats"
            },
            {
                text: "一切的起源",
                link: "/ssu/origin",
            },
            {
                text: "开发致谢",
                link: "/ssu/3q",
            },
            {
                text: "了解团队",
                link: "/ssu/team",
            },
        ],
    },
    {
        text: "更新",
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
        text: "更多",
        items: [
            {
                text: "许可证",
                link: "/more/license",
            },
            {
                text: "隐私政策",
                link: "/more/privacy",
            },
            {
                text: "翻译",
                link: "/more/translation",
            },
        ],
    }
];

import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
    {
        text: "快速开始",
        link: "/base/overview",
    },
    {
        text: "关于 SSU",
        items: [
            {
                text: "特色功能",
                link: "/base/feats"
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

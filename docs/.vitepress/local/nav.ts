import type {DefaultTheme} from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
    {
        text: "主页",
        link: "/",
    },
    {
        text: "快速了解",
        link: "/guide/what-is-sakitinsu",
    },
    {
        text: "关于咲苏",
        items: [
            {
                text: "作者介绍",
                link: "/about/author",
            },
            {
                text: "项目介绍",
                link: "/about/origin",
            },
        ],
    },
    {
        text: "更新日志",
        items: [
            {
                text: "历史版本",
                link: "/changeLog/history",
            },
            {
                text: "更新日志",
                link: "/changeLog/changelog",
            },
        ],
    },
];

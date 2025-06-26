import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
    {
        text: "关于SSU",
        items: [
            {
                text: "作者介绍",
                link: "/about/author",
            },
            {
                text: "项目介绍",
                link: "/about/origin",
            },
            {
                text: "文档鸣谢",
                link: "/about/document",
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
    }
];

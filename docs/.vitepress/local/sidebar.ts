// sidebar.ts
import type {DefaultTheme} from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = [
    {
        text: "快速了解",
        items: [
            {text: "快速了解", link: "/guide/know"},
            {text: "什么是SakitinSU", link: "/guide/what-is-sakitinsu"},
            {text: "更新日志", link: "/changeLog/changelog"},
        ],
    },
    {
        text: "使用指南",
        items: [
            {text: "安装指南", link: "/guide/installation"},
            {text: "常见问题", link: "/guide/faq"},
            {text: "常见问题", link: "/guide/faq"},
        ],
    }
];

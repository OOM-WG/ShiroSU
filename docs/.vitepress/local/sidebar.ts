// sidebar.ts
import type {DefaultTheme} from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = {
    "/": [
        {
            text: "快速了解",
            items: [
                {text: "什么是SakitinSU", link: "/guide/what-is-sakitinsu"},
                {text: "更新日志", link: "/changeLog/changelog"},
            ],
        },
        {
            text: "使用指南",
            items: [
                {text: "安装指南", link: "/guide/installation"},
                {text: "常见问题", link: "/guide/faq"},
            ],
        },
        {
            text: "面向开发者",
            items: [
                {text: "模块开发", link: "/development/module-development"},
                {text: "模块WebUI", link: "/development/webui-module"},
            ],
        },
        {
            text: "关于SakitinSU",
            items: [
                {text: "SakitinSU的起源", link: "/about/origin"},
                {text: "关于团队", link: "/about/about"},
            ],
        },
    ],
};

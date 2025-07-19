// sidebar.ts
import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = {
    "/": [
        {
            text: "快速了解",
            items: [
                {
                    text: "什么是 SSU",
                    link: "/base/overview",
                },
                {
                    text: "更新日志",
                    link: "/update/changelog",
                }
            ],
        },
        {
            text: "使用指南",
            items: [
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
                }
            ],
        },
        {
            text: "关于 SSU",
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
                {
                    text: "文档致谢",
                    link: "/ssu/3q",
                },
                {
                    text: "关于团队",
                    link: "/ssu/team",
                },
            ],
        }
    ],
};

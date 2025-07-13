// sidebar.ts
import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = {
    "/": [
        {
            text: "快速了解",
            items: [
                {
                    text: '<iconify-icon icon="f7:question-circle-fill" style="margin-right:0.25em;color:#58B2DC;"></iconify-icon>什么是 SSU',
                    link: "/base/overview",
                },
                {
                    text: '<iconify-icon icon="f7:arrow-2-circlepath-circle-fill" style="margin-right:0.25em;color:#FF6B6B;"></iconify-icon>更新日志',
                    link: "/update/changelog",
                },
                {
                    text: '<iconify-icon icon="fa6-solid:clock-rotate-left" style="margin-right:0.25em;color:#808080;"></iconify-icon>历史版本',
                    link: "/update/history",
                },
            ],
        },
        {
            text: "使用指南",
            items: [
                {
                    text: '<iconify-icon icon="f7:location-circle-fill" style="margin-right:0.25em;color:#4CD2DD;"></iconify-icon>安装指南',
                    link: "/base/install",
                },
                {
                    text: '<iconify-icon icon="fa6-solid:wrench" style="margin-right:0.25em;color:#A084DC;"></iconify-icon>常见问题',
                    link: "/base/faq",
                },
            ],
        },
        {
            text: "面向开发者",
            items: [
                {
                    text: '<iconify-icon icon="streamline-flex:module-puzzle-2-solid" style="margin-right:0.25em;color:#6CB4EE;"></iconify-icon>模块开发',
                    link: "/dev/module",
                },
                {
                    text: '<iconify-icon icon="fa6-solid:globe" style="margin-right:0.25em;color:#45B8AC;"></iconify-icon>模块 WebUI',
                    link: "/dev/webui",
                },
            ],
        },
        {
            text: "关于 SSU",
            items: [
                {
                    text: '<iconify-icon icon="fa6-solid:seedling" style="margin-right:0.25em;color:#66CC99;"></iconify-icon>SSU 的起源',
                    link: "/ssu/origin",
                },
                {
                    text: '<iconify-icon icon="fa6-solid:book" style="margin-right:0.25em;color:#FF9966;"></iconify-icon>SSU 的原理',
                    link: "/ssu/principle",
                },
                {
                    text: '<iconify-icon icon="fa6-solid:comments" style="margin-right:0.25em;color:#66CCCC;"></iconify-icon>面对质疑',
                    link: "/ssu/defense",
                },
                {
                    text: '<iconify-icon icon="fa6-solid:handshake-angle" style="margin-right:0.25em;color:#FF6666;"></iconify-icon>文档致谢',
                    link: "/ssu/3q",
                },
                {
                    text: '<iconify-icon icon="fa6-solid:users" style="margin-right:0.25em;color:#99CCFF;"></iconify-icon>关于团队',
                    link: "/ssu/team",
                },
            ],
        },
        {
            text: "更多",
            items: [
                {
                    text: '<iconify-icon icon="fa6-solid:id-card" style="margin-right:0.25em;color:#58B2DC;"></iconify-icon>许可证',
                    link: "/more/license",
                },
                {
                    text: '<iconify-icon icon="fa6-solid:shield-halved" style="margin-right:0.25em;color:#45B8AC;"></iconify-icon>隐私政策',
                    link: "/more/privacy",
                },
                {
                    text: '<iconify-icon icon="fa6-solid:language" style="margin-right:0.25em;color:#A084DC;"></iconify-icon>翻译',
                    link: "/more/translation",
                },
            ],
        },
    ],
};

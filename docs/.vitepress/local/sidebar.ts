// sidebar.ts
import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = {
    "/": [
        {
            text: "快速了解", //<iconify-icon icon="fa6-solid:bolt" style="margin-right:0.25em;color:#FFD700;"></iconify-icon>
            items: [
                { text: "<iconify-icon icon=\"f7:question-circle-fill\" style=\"margin-right:0.25em;color:#58B2DC;\"></iconify-icon>什么是SakitinSU", link: "/guide/what-is-sakitinsu" },
                { text: "<iconify-icon icon=\"f7:arrow-2-circlepath-circle-fill\" style=\"margin-right:0.25em;color:#FF6B6B;\"></iconify-icon>更新日志", link: "/changeLog/changelog" },
            ],
        },
        {
            text: "使用指南",
            items: [
                { text: "<iconify-icon icon=\"f7:location-circle-fill\" style=\"margin-right:0.25em;color:#4CD2DD;\"></iconify-icon>安装指南", link: "/guide/installation" },
                { text: "<iconify-icon icon=\"fa6-solid:wrench\" style=\"margin-right:0.25em;color:#A084DC;\"></iconify-icon>常见问题", link: "/guide/faq" },
            ],
        },
        {
            text: "面向开发者",
            items: [
                { text: "<iconify-icon icon=\"streamline-flex:module-puzzle-2-solid\" style=\"margin-right:0.25em;color:#6CB4EE;\"></iconify-icon>模块开发", link: "/development/module-development" },
                { text: "<iconify-icon icon=\"fa6-solid:globe\" style=\"margin-right:0.25em;color:#45B8AC;\"></iconify-icon>模块WebUI", link: "/development/webui-module" },
            ],
        },
        {
            text: "关于SakitinSU",
            items: [
                { text: "<iconify-icon icon=\"fa6-solid:paintbrush\" style=\"margin-right:0.30em;color:#FF85A2;\"></iconify-icon>SakitinSU的起源", link: "/about/origin" },
                { text: "<iconify-icon icon=\"fa6-solid:users-gear\" style=\"margin-right:0.30em;color:#7EB2DD;\"></iconify-icon>关于团队", link: "/about/author" },
            ],
        },
    ],
};

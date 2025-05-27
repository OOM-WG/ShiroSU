// sidebar.ts
import type {DefaultTheme} from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = [
    {
        text: "快速了解",
        items: [
            {text: "快速了解", link: "/Know"},
            {text: "关于咲苏", link: "/About"},
            {text: "更新日志", link: "/ChangeLog/clangelog"},
        ],
    },
    {
        text: "使用指南",
        items: [
            {text: "安装指南", link: "/Guide/installation"},
            {text: "常见问题", link: "/Guide/faq"},
        ],
    }
];

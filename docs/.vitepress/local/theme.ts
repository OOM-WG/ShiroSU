import type { DefaultTheme } from "vitepress";
import footer from "./footer";

export const themeConfig: DefaultTheme.Config = {
    // nav,
    // sidebar,

    logo: "https://ssu.noidx.sawahara.host/logo.webp",
    siteTitle: "SSU",
    socialLinks: [
        {
            icon: "github",
            link: "https://github.com/OOM-WG/SSU_Docs",
        },
    ],
    // 自定义页脚配置
    customFooter: footer,
}



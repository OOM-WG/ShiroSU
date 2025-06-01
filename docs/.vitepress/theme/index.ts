// .vitepress/theme/index.ts

// ===== 框架核心导入 =====
import type {Theme} from "vitepress";
import DefaultTheme from "vitepress/theme";
import {useData, useRoute} from "vitepress";
import {nextTick, onMounted, watch, h} from "vue";

// ===== 第三方库 =====
import mediumZoom from "medium-zoom";

// ===== Nolebase 插件 =====
import {
    NolebaseGitChangelogPlugin,
    NolebaseGitContributors,
} from "@nolebase/vitepress-plugin-git-changelog/client";
import {NolebaseUnlazyImg} from "@nolebase/vitepress-plugin-thumbnail-hash/client";
import {
    NolebaseEnhancedReadabilitiesMenu,
    NolebaseEnhancedReadabilitiesScreenMenu,
} from "@nolebase/vitepress-plugin-enhanced-readabilities/client";

// ===== 本地组件 =====
import Card from "../theme/components/Card";
import RainbowAnimationSwitcher from "./components/RainbowAnimationSwitcher.vue";
import HomeUnderline from "./components/HomeUnderline.vue";
import Linkcard from "./components/Linkcard.vue";

// ===== 样式文件 =====
// 本地样式
import "./styles/main.css";
import "./styles/linkcard.css";
import "./styles/rainbow.css";
import "./styles/vars.css";

// 第三方库样式
import "vitepress-markdown-timeline/dist/theme/index.css";
import "nprogress-v2/dist/index.css";

// Nolebase 插件样式
import "@nolebase/vitepress-plugin-enhanced-mark/client/style.css";
import "@nolebase/vitepress-plugin-thumbnail-hash/client/style.css";
import "@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css";
import "@nolebase/vitepress-plugin-git-changelog/client/style.css";

let homePageStyle: HTMLStyleElement | undefined;

export default {
    extends: DefaultTheme,

    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // 为较宽的屏幕的导航栏添加阅读增强菜单
            "nav-bar-content-after": () => h(NolebaseEnhancedReadabilitiesMenu),
            // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
            "nav-screen-content-after": () =>
                h(NolebaseEnhancedReadabilitiesScreenMenu),
            // 将面包屑导航组件添加到文档上方
            // 'doc-before': () => h(NolebaseBreadcrumbs),
        });
    }, enhanceApp({app, router}) {
        app.component("RainbowAnimationSwitcher", RainbowAnimationSwitcher);
        app.component("HomeUnderline", HomeUnderline);
        app.component("Linkcard", Linkcard);
        app.component("VPCard", Card);
        app.component("NolebaseGitContributors", NolebaseGitContributors);
        app.component("NolebaseUnlazyImg", NolebaseUnlazyImg);
        app.use(NolebaseGitChangelogPlugin);

        if (typeof window !== "undefined") {
            watch(
                () => router.route.data.relativePath,
                () => updateHomePageStyle(location.pathname === "/"),
                {immediate: true}
            );
        }
    },

    setup() {
        const route = useRoute();
        const initZoom = () => {
            // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
            mediumZoom(".main img", {background: "var(--vp-c-bg)"}); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
        };
        onMounted(() => {
            initZoom();
        });
        watch(
            () => route.path,
            () => nextTick(() => initZoom())
        );
        // Get frontmatter and route
        const {frontmatter} = useData();
    },
} satisfies Theme;

function updateHomePageStyle(value: boolean) {
    if (value) {
        if (homePageStyle) return;

        homePageStyle = document.createElement("style");
        homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`;
        document.body.appendChild(homePageStyle);
    } else {
        if (!homePageStyle) return;

        homePageStyle.remove();
        homePageStyle = undefined;
    }
}

// .vitepress/theme/index.ts
import type {Theme} from "vitepress";
import {useData, useRoute} from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./styles/main.css";
import "./styles/linkcard.css";
import mediumZoom from "medium-zoom";
import {nextTick, onMounted, watch,} from "vue";
import Card from "../theme/components/Card";
import 'nprogress-v2/dist/index.css' // 进度条样式
import RainbowAnimationSwitcher from "./components/RainbowAnimationSwitcher.vue";
import "vitepress-markdown-timeline/dist/theme/index.css";
import "./styles/rainbow.css";
import "./styles/vars.css";
import HomeUnderline from "./components/HomeUnderline.vue";
import Linkcard from "./components/Linkcard.vue";


let homePageStyle: HTMLStyleElement | undefined;


export default {
    extends: DefaultTheme,
    enhanceApp({app, router}) {
        app.component("RainbowAnimationSwitcher", RainbowAnimationSwitcher);
        app.component("HomeUnderline", HomeUnderline);
        app.component("Linkcard", Linkcard);
        app.component("VPCard", Card);

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

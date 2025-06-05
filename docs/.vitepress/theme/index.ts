// .vitepress/theme/index.ts

// ===== 框架核心导入 =====
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { useData, useRoute } from "vitepress";
import { nextTick, onMounted, watch, h } from "vue";
// ===== 第三方库 =====
import mediumZoom from "medium-zoom";

// ===== Nolebase 插件 =====
import { NolebaseGitChangelogPlugin, NolebaseGitContributors } from "@nolebase/vitepress-plugin-git-changelog/client";
import { NolebaseUnlazyImg } from "@nolebase/vitepress-plugin-thumbnail-hash/client";
import {
	NolebaseEnhancedReadabilitiesMenu,
	NolebaseEnhancedReadabilitiesScreenMenu,
} from "@nolebase/vitepress-plugin-enhanced-readabilities/client";
import { NolebaseHighlightTargetedHeading } from "@nolebase/vitepress-plugin-highlight-targeted-heading/client";
import { NolebaseInlineLinkPreviewPlugin } from "@nolebase/vitepress-plugin-inline-link-preview/client";
import { NolebaseEnhancedReadabilitiesPlugin } from "@nolebase/vitepress-plugin-enhanced-readabilities/client";

// ===== 本地组件 =====
import Card from "../theme/components/Card";
import RainbowAnimationSwitcher from "./components/RainbowAnimationSwitcher.vue";
import Confetti from "./components/Confetti.vue";
import Linkcard from "./components/Linkcard.vue";
import SakuraLinkCard from "./components/SakuraLinkCard.vue";
import LinkGrid from "./components/LinkGrid.vue";
import UnderConstructionBanner from "./components/UnderConstructionBanner.vue";
import PageStats from "./components/PageStats.vue";

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
import "@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css";
import "@nolebase/vitepress-plugin-inline-link-preview/client/style.css";

let homePageStyle: HTMLStyleElement | undefined;

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			// 为较宽的屏幕的导航栏添加阅读增强菜单
			"nav-bar-content-after": () => h(NolebaseEnhancedReadabilitiesMenu),
			// 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
			"nav-screen-content-after": () => h(NolebaseEnhancedReadabilitiesScreenMenu),
			// 将横幅和高亮功能都放在layout-top，确保横幅在最顶部
			"layout-top": () => [h(UnderConstructionBanner), h(NolebaseHighlightTargetedHeading)],
			// 在文档内容后添加页面统计信息
			"doc-after": () => h(PageStats),
		});
	},
	enhanceApp({ app, router }) {
		app.component("RainbowAnimationSwitcher", RainbowAnimationSwitcher);
		app.component("Linkcard", Linkcard);
		app.component("VPCard", Card);
		app.component("Confetti", Confetti);
		app.component("SakuraLinkCard", SakuraLinkCard);
		app.component("LinkGrid", LinkGrid);
		app.component("PageStats", PageStats);
		app.component("NolebaseGitContributors", NolebaseGitContributors);
		app.component("NolebaseUnlazyImg", NolebaseUnlazyImg);
		app.use(NolebaseGitChangelogPlugin);
		app.use(NolebaseInlineLinkPreviewPlugin);
		app.use(NolebaseEnhancedReadabilitiesPlugin, {
			spotlight: {
				defaultToggle: true,
				disableHelp: true,
				hoverBlockColor: "rgb(240 197 52 / 10%)",
			},
		});

		if (typeof window !== "undefined") {
			watch(
				() => router.route.data.relativePath,
				() => updateHomePageStyle(location.pathname === "/"),
				{ immediate: true }
			);
		}
	},

	setup() {
		const route = useRoute();
		const initZoom = () => {
			// mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
			mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
		};
		onMounted(() => {
			initZoom();
		});
		watch(
			() => route.path,
			() => nextTick(() => initZoom())
		);
		// Get frontmatter and route
		const { frontmatter } = useData();
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

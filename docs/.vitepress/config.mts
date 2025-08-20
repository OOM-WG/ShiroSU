import type { Plugin } from "vite";
import { defineConfig, SiteConfig } from "vitepress";
// import { defineTeekConfig } from "vitepress-theme-teek/config";
import path from "path";
import { head } from "./local/head";
import { markdown } from "./local/markdown";
import { themeConfig } from "./local/theme";
import zhConfig from "../src/config";
import enConfig from "../src/en/config";
import jaConfig from "../src/ja/config";
import { readdir, writeFile } from "fs/promises";
import { resolve } from "path";
import { fileURLToPath, URL } from "node:url";
import {
    GitChangelog,
    GitChangelogMarkdownSection,
} from "@nolebase/vitepress-plugin-git-changelog/vite";
import { ThumbnailHashImages } from "@nolebase/vitepress-plugin-thumbnail-hash/vite";
import { generateBreadcrumbsData } from "@nolebase/vitepress-plugin-breadcrumbs/vitepress";
import { visualizer } from "rollup-plugin-visualizer";
import {
    PageProperties,
    PagePropertiesMarkdownSection,
} from "@nolebase/vitepress-plugin-page-properties/vite";
import { RSSOptions, RssPlugin } from "vitepress-plugin-rss";
import { withMermaid } from "vitepress-plugin-mermaid";
import {
    groupIconMdPlugin,
    groupIconVitePlugin,
} from "vitepress-plugin-group-icons";

// const baseUrl = "https://ssu.oom-wg.dev";
// const RSS: RSSOptions = {
//     title: "ShiroSU",
//     baseUrl,
//     copyright: "Copyright © 2023-present SSU Developers (OOM. WG.)",
// };

// Teek 主题配置
// const teekConfig = defineTeekConfig({});

// VitePress 配置
export default withMermaid({
    // export default defineConfig({
    // extends: teekConfig,
    title: "ShiroSU",
    // description: "",

    // base: "/",
    lastUpdated: true,
    ignoreDeadLinks: true,

    srcDir: "src",
    outDir: "./dist",
    srcExclude: [],
    scrollOffset: "header",
    cleanUrls: true,

    rewrites: {
        "zh/:rest*": ":rest*",
    },
    metaChunk: true,

    // 多语言配置
    locales: {
        // 多语言
        root: {
            label: "简体中文",
            lang: "zh-CN",
            ...zhConfig,
        },
        en: {
            label: "English",
            lang: "en",
            link: "/en/",
            ...enConfig,
        },
        ja: {
            label: "日本語",
            lang: "ja",
            link: "/ja/",
            ...jaConfig,
        },
    },

    sitemap: {
        hostname: "https://ssu.oom-wg.dev",
    },
    head: head,
    markdown: markdown,
    themeConfig,

    mermaid: {
        // 配置参考： https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults
    },
    // 可选地使用MermaidPluginConfig为插件本身设置额外的配置
    mermaidPlugin: {
        class: "mermaid my-class", // 为父容器设置额外的CSS类
    },

    transformPageData(pageData, context) {
        generateBreadcrumbsData(pageData, context);
    },
    // transformHtml(code, id, { pageData }) {
    //     if (process.env.NODE_ENV !== "production") return;
    //
    //     const newCode = code.replace(
    //         /(?<!<a\b[^>]*)(src|href)=["']\/([^"']+)["']/gi,
    //         (_, attr, path) =>
    //             `${attr}="https://ssu.noidx.sawahara.host/${path}"`,
    //     );
    //
    //     return newCode;
    // },
    vite: {
        // experimental: {
        //     renderBuiltUrl(filename, { hostType, type, hostId }) {
        //         return "https://ssu.noidx.sawahara.host/" + filename;
        //     },
        // },
        define: {
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
        },
        resolve: {
            alias: [
                {
                    find: /^.*\/VPFooter\.vue$/,
                    replacement: fileURLToPath(
                        new URL(
                            "./theme/components/Footer.vue",
                            import.meta.url,
                        ),
                    ),
                },
                {
                    find: /^.*\/VPHome\.vue$/,
                    replacement: fileURLToPath(
                        new URL("./theme/home/WalletApp.vue", import.meta.url),
                    ),
                },
            ],
        },
        build: {
            chunkSizeWarningLimit: 2000,
        },
        plugins: [
            groupIconVitePlugin(),
            // RssPlugin(RSS),
            ThumbnailHashImages(),
            GitChangelog({
                repoURL: () => "https://github.com/OOM-WG/SSU_Docs",
                mapAuthors: [
                    {
                        name: "YumeYuka",
                        username: "YumeYuka",
                        mapByEmailAliases: ["yumeyuka@oom-wg.dev"],
                    },
                    {
                        name: "枫莹",
                        username: "FengYing1314",
                        mapByEmailAliases: ["fengying@oom-wg.dev"],
                    },
                    {
                        name: "悠栾",
                        username: "NuoFang6",
                        mapByEmailAliases: ["ark@oom-wg.dev"],
                    },
                    {
                        name: "白彩恋",
                        username: "ShIroRRen",
                        mapByEmailAliases: ["shiro@oom-wg.dev"],
                    },
                    {
                        name: "Linso",
                        username: "Linso05",
                        mapByEmailAliases: ["linso@oom-wg.dev"],
                    },
                ],
            }),
            GitChangelogMarkdownSection({
                excludes: ["index.md"],
            }),
            PageProperties(),
            PagePropertiesMarkdownSection({
                excludes: ["index.md"],
            }),
            ...(process.env.ANALYZE
                ? [
                      visualizer({
                          filename: "dist/stats.html",
                          open: true,
                          gzipSize: true,
                          brotliSize: true,
                      }),
                  ]
                : []),
        ],
        optimizeDeps: {
            exclude: [
                "@nolebase/vitepress-plugin-enhanced-readabilities",
                "@nolebase/vitepress-plugin-enhanced-readabilities/client",
                "@nolebase/vitepress-plugin-inline-link-preview/client",
                "@nolebase/vitepress-plugin-breadcrumbs/client",
                "@nolebase/vitepress-plugin-git-changelog/client",
                "vitepress",
                "@nolebase/ui",
            ],
        },
        ssr: {
            noExternal: [
                "@nolebase/vitepress-plugin-enhanced-readabilities",
                "@nolebase/vitepress-plugin-enhanced-readabilities/client",
                "@nolebase/vitepress-plugin-breadcrumbs/client",
                "@nolebase/vitepress-plugin-inline-link-preview",
                "@nolebase/vitepress-plugin-highlight-targeted-heading",
                "@nolebase/vitepress-plugin-git-changelog/client",
                "vitepress",
                "@nolebase/ui",
                "naive-ui",
                "date-fns",
                "vueuc",
                "vitepress-plugin-nprogress",
            ],
        },
    },
});

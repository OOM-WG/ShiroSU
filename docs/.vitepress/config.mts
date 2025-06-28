import type { Plugin } from 'vite'
import { defineConfig } from 'vitepress'
import path from "path";
import { head } from "./local/head";
import { markdown } from "./local/markdown";
import { themeConfig } from "./local/theme";
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


export default defineConfig({
    title: "SakitinSU",
    description: "",

    base: "/",
    lastUpdated: true,
    ignoreDeadLinks: true,

    srcDir: "src",
    outDir: "./dist",
    srcExclude: [],
    scrollOffset: "header",
    cleanUrls: true,
    sitemap: {
        hostname: "https://ssu.oom-wg.dev",
    },
    head: head, // 头部配置
    lang: "zh-CN", // 语言配置
    markdown: markdown, // Markdown配置
    themeConfig,

    transformPageData(pageData, context) {
        generateBreadcrumbsData(pageData, context);
    },
    transformHtml(code, id, { pageData }) {
        if (process.env.NODE_ENV !== 'production') return

        const extra = [
            '<base href="https://sakitinsu.resource.sawahara.host/">',
            '',
            '<link crossorigin="" href="https://sakitinsu.resource.sawahara.host/" rel="preconnect">',
            '<link href="https://sakitinsu.resource.sawahara.host/" rel="dns-prefetch">',
            '',
            '<link crossorigin="" href="https://d.alicdn.com/" rel="preconnect">',
            '<link href="https://d.alicdn.com/" rel="dns-prefetch">'
        ].map(line => '    ' + line).join('\n')

        const newCode = code.replace(
            /(<meta\s+charset=["'][^"']*["']\s*?>)/i,
            `$1\n${extra}`
        )

        return newCode
    },
    vite: {
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
            rollupOptions: {
                output: {
                    manualChunks: {
                        nolebase: [
                            "@nolebase/vitepress-plugin-enhanced-readabilities/client",
                            "@nolebase/vitepress-plugin-git-changelog/client",
                            "@nolebase/vitepress-plugin-inline-link-preview/client",
                        ],
                    },
                },
            },
            chunkSizeWarningLimit: 1000,
        },
        plugins: [
            ThumbnailHashImages(),
            GitChangelog({
                // 填写在此处填写您的仓库链接
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
                        name: "安音咲汀",
                        username: "TianwanTW",
                        mapByEmailAliases: ["tianwan@oom-wg.dev"],
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
            // 构建分析插件
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
                // 如果还有别的依赖需要添加的话，并排填写和配置到这里即可 //
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
            ],
        },

    },
});
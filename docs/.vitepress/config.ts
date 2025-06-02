import {defineConfig} from "vitepress";
import {head} from "./local/head";
import {markdown} from "./local/markdown";
import {themeConfig} from "./local/theme";
import {fileURLToPath, URL} from "node:url";
import {
    GitChangelog,
    GitChangelogMarkdownSection,
} from "@nolebase/vitepress-plugin-git-changelog/vite";
import {ThumbnailHashImages} from "@nolebase/vitepress-plugin-thumbnail-hash/vite";
import {generateBreadcrumbsData} from "@nolebase/vitepress-plugin-breadcrumbs/vitepress";
import {visualizer} from "rollup-plugin-visualizer";
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
        hostname: "https://ssu.yumeyuka.plus",
    },
    head: head, // 头部配置
    lang: "zh-CN", // 语言配置
    markdown: markdown, // Markdown配置
    themeConfig,

    transformPageData(pageData, context) {
        generateBreadcrumbsData(pageData, context);
    },
    vite: {
        resolve: {
            alias: [
                {
                    find: /^.*\/VPFooter\.vue$/,
                    replacement: fileURLToPath(
                        new URL("./theme/components/Footer.vue", import.meta.url)
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
            chunkSizeWarningLimit: 600,
        },
        plugins: [
            ThumbnailHashImages(),
            GitChangelog({
                // 填写在此处填写您的仓库链接
                repoURL: () => "https://github.com/YumeYuka/SSU_Docs",
                mapAuthors: [
                    {
                        name: "YumeYuka",
                        username: "YumeYuka",
                        mapByEmailAliases: ["Miao@YumeYuka.plus"],
                    },
                ],
            }),
            GitChangelogMarkdownSection({
                excludes: ["index.md", "about.md"],
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
            ],
        },
    },
});

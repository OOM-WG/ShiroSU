import autoprefixer from 'autoprefixer'
//import enConfig from '../src/en/config'
//import jaConfig from '../src/ja/config'
import {readdir, writeFile} from 'fs/promises'
import {URL, fileURLToPath} from 'node:url'
// import { defineTeekConfig } from "vitepress-theme-teek/config";
import path from 'path'
import {resolve} from 'path'
import {visualizer} from 'rollup-plugin-visualizer'
import type {Plugin} from 'vite'
import {SiteConfig, defineConfig} from 'vitepress'
import {groupIconMdPlugin, groupIconVitePlugin} from 'vitepress-plugin-group-icons'
import {RSSOptions, RssPlugin} from 'vitepress-plugin-rss'

import {generateBreadcrumbsData} from '@nolebase/vitepress-plugin-breadcrumbs/vitepress'
import {GitChangelog, GitChangelogMarkdownSection} from '@nolebase/vitepress-plugin-git-changelog/vite'
import {
	PageProperties,
	PagePropertiesMarkdownSection
} from '@nolebase/vitepress-plugin-page-properties/vite'
import {ThumbnailHashImages} from '@nolebase/vitepress-plugin-thumbnail-hash/vite'

import zhConfig from '../src/config'
import {head} from './local/head'
import {markdown} from './local/markdown'
import {themeConfig} from './local/theme'

// const baseUrl = "https://ssu.oom-wg.dev";
// const RSS: RSSOptions = {
//     title: "ShiroSU",
//     baseUrl,
//     copyright: "Copyright © 2023-present SSU Developers (O.O.M. W.G.)",
// };

// Teek 主题配置
// const teekConfig = defineTeekConfig({});

// VitePress 配置
export default defineConfig({
	// export default defineConfig({
	// extends: teekConfig,
	title: 'ShiroSU',
	// description: "",

	// base: "/",
	lastUpdated: true,
	ignoreDeadLinks: true,

	srcDir: 'src',
	outDir: './dist',
	srcExclude: [],
	scrollOffset: 'header',
	cleanUrls: true,

	rewrites: {
		'zh/:rest*': ':rest*'
	},
	metaChunk: true,

	// 多语言配置
	locales: {
		// 默认简中
		root: {
			label: '简体中文',
			lang: 'zh-Hans',
			...zhConfig
		} /*,
		en: {
			label: 'English',
			lang: 'en',
			link: '/en/',
			...enConfig
		},
		ja: {
			label: '日本語',
			lang: 'ja',
			link: '/ja/',
			...jaConfig
		}*/
	},

	sitemap: {
		hostname: 'https://ssu.oom-wg.dev'
	},
	head: head,
	markdown: markdown,
	themeConfig,

	transformPageData(pageData, context) {
		generateBreadcrumbsData(pageData, context)
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
		css: {
			postcss: {
				plugins: [autoprefixer()]
			}
		},
		// experimental: {
		//     renderBuiltUrl(filename, { hostType, type, hostId }) {
		//         return "https://ssu.noidx.sawahara.host/" + filename;
		//     },
		// },
		define: {
			__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
		},
		resolve: {
			alias: [
				{
					find: /^.*\/VPFooter\.vue$/,
					replacement: fileURLToPath(new URL('./theme/components/Footer.vue', import.meta.url))
				},
				{
					find: /^.*\/VPHome\.vue$/,
					replacement: fileURLToPath(new URL('./theme/home/WalletApp.vue', import.meta.url))
				}
			]
		},
		build: {
			chunkSizeWarningLimit: 2000
		},
		plugins: [
			groupIconVitePlugin(),
			// RssPlugin(RSS),
			ThumbnailHashImages(),
			GitChangelog({
				repoURL: () => 'https://github.com/OOM-WG/ShiroSU',
				mapAuthors: [
					{
						name: 'YumeYuka',
						username: 'YumeYuka',
						mapByEmailAliases: ['yumeyuka@oom-wg.dev']
					},
					{
						name: '白彩恋',
						username: 'ShIroRRen',
						mapByEmailAliases: ['shiro@oom-wg.dev']
					},
					{
						name: 'Linso',
						username: 'Linso05',
						mapByEmailAliases: ['linso@oom-wg.dev']
					},
					{
						name: '枫莹',
						username: 'FengYing1314',
						mapByEmailAliases: ['fengying@oom-wg.dev']
					},
					{
						name: '悠栾',
						username: 'NuoFang6',
						mapByEmailAliases: ['ark@oom-wg.dev']
					}
				]
			}),
			GitChangelogMarkdownSection({
				excludes: ['index.md']
			}),
			PageProperties(),
			PagePropertiesMarkdownSection({
				excludes: ['index.md']
			}),
			...(process.env.ANALYZE
				? [
						visualizer({
							filename: 'dist/stats.html',
							open: true,
							gzipSize: true,
							brotliSize: true
						})
					]
				: [])
		],
		optimizeDeps: {
			exclude: [
				'@nolebase/vitepress-plugin-enhanced-readabilities',
				'@nolebase/vitepress-plugin-enhanced-readabilities/client',
				'@nolebase/vitepress-plugin-inline-link-preview/client',
				'@nolebase/vitepress-plugin-breadcrumbs/client',
				'@nolebase/vitepress-plugin-git-changelog/client',
				'vitepress',
				'@nolebase/ui'
			]
		},
		ssr: {
			noExternal: [
				'@nolebase/vitepress-plugin-enhanced-readabilities',
				'@nolebase/vitepress-plugin-enhanced-readabilities/client',
				'@nolebase/vitepress-plugin-breadcrumbs/client',
				'@nolebase/vitepress-plugin-inline-link-preview',
				'@nolebase/vitepress-plugin-highlight-targeted-heading',
				'@nolebase/vitepress-plugin-git-changelog/client',
				'vitepress',
				'@nolebase/ui',
				'naive-ui',
				'date-fns',
				'vueuc',
				'vitepress-plugin-nprogress'
			]
		}
	}
})

import type {MarkdownOptions} from "vitepress";
import mathjax3 from "markdown-it-mathjax3";
import footnote from "markdown-it-footnote";
import timeline from "vitepress-markdown-timeline";
import {BiDirectionalLinks} from "@nolebase/markdown-it-bi-directional-links";
import {InlineLinkPreviewElementTransform} from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it";

export const markdown: MarkdownOptions = {
    // Shiki主题, 所有主题参见: https://github.com/shikijs/shiki/blob/main/docs/themes.md
    theme: {
        light: "github-light",
        dark: "github-dark-dimmed",
    },
    lineNumbers: true, // 启用行号
    config: (md) => {
        md.use(mathjax3);
        md.use(footnote);
        md.use(timeline);
        md.use(BiDirectionalLinks({
            dir: process.cwd(), // 项目根目录opp
            baseDir: '/', // 基础路径
            includesPatterns: [
                '*.md',
                '*.vue',
                '*.png',
                '*.jpg',
                '*.jpeg',
                '*.gif',
                '*.svg',
                '*.webp'
            ],
            excludesPatterns: [
                '_*',
                'dist',
                'node_modules',
                '.vitepress',
                '.git',
                '.github',
                'public',
                'scripts'
            ],
            debug: false, // 生产环境设为 false
            noNoMatchedFileWarning: false, // 显示未匹配文件的警告
            stillRenderNoMatched: true, // 渲染无效链接便于调试
            isRelativePath: false // 使用绝对路径
        }));
        md.use(InlineLinkPreviewElementTransform);

        // md.use(markdownItTaskCheckbox); //todo

        // 在所有文档的<h1>标签后添加<ArticleMetadata/>组件
        md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
            let htmlResult = slf.renderToken(tokens, idx, options);
            if (tokens[idx].tag === "h1")
                htmlResult += `\n<ClientOnly><ArticleMetadata v-if="($frontmatter?.aside ?? true) && ($frontmatter?.showArticleMetadata ?? true)" :article="$frontmatter" /></ClientOnly>`;
            return htmlResult;
        };
    },
};

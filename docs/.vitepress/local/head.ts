import type { HeadConfig } from "vitepress";

export const head: HeadConfig[] = [
    ["link", { rel: "preconnect", href: "https://sakitinsu.resource.sawahara.host", crossorigin: "" }],
    ["link", { rel: "dns-prefetch", href: "https://sakitinsu.resource.sawahara.host" }],
    ["link", { rel: "preconnect", href: "https://d.alicdn.com", crossorigin: "" }],
    ["link", { rel: "dns-prefetch", href: "https://d.alicdn.com" }],

    // --- Google Fonts ---
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.cn", crossorigin: "" }],
    ["link", { rel: "dns-prefetch", href: "https://fonts.googleapis.cn" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.cn", crossorigin: "" }],
    ["link", { rel: "dns-prefetch", href: "https://fonts.gstatic.cn" }],
    ["link", { rel: "stylesheet", href: "https://fonts.googleapis.cn/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" }],

    // --- 基础和SEO元数据 ---
    ["link", { rel: "icon", href: "https://sakitinsu.resource.sawahara.host/logo.webp" }],
    [
        "meta",
        { name: "author", content: "安音咲汀, YumeYuka, Linso, 悠栾, 枫莹" },
    ],
    ["meta", { name: "description", content: "简单易上手的root实现" }],
    [
        "meta",
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
    ["meta", { name: "theme-color", content: "#3c8772" }],

    // --- Open Graph (OG) 协议元数据 (用于社交媒体分享) ---
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh_CN" }],
    ["meta", { property: "og:title", content: "SSU" }],
    ["meta", { property: "og:description", content: "简单易上手的root实现" }],
    ["meta", { property: "og:url", content: "https://ssu.oom-wg.dev" }],
    ["meta", { property: "og:site_name", content: "SSU" }],
    [
        "meta",
        {
            property: "og:image",
            content: "https://sakitinsu.resource.sawahara.host/og-template.png",
        },
    ],
    [
        "meta",
        { property: "og:image:alt", content: "SSU - 简单易上手的root实现" },
    ],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],
    ["meta", { property: "og:image:type", content: "image/png" }],

    // --- Twitter Card 元数据 ---
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:site", content: "@SSU" }],

    // --- 友盟(UMeng) Aplus 统计脚本 ---
    [
        "script",
        {},
        `
(function (w, d, s, q, i) {
    w[q] = w[q] || [];
    var f = d.getElementsByTagName(s)[0], j = d.createElement(s);
    j.async = true;
    j.id = 'beacon-aplus';
    j.src = 'https://d.alicdn.com/alilog/mlog/aplus/' + i + '.js';
    j.onerror = function() {
      console.warn('警告：友盟统计加载失败，可能已被广告拦截插件拦截。');
    };
    f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'aplus_queue', '203467608');

aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['appKey', '6849a077bc47b67d8382f404']
});
        `,
    ],
];

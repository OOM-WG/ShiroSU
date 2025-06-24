import type { HeadConfig } from "vitepress";

export const head: HeadConfig[] = [
    // --- 基础和SEO元数据 ---
    ["link", { rel: "icon", href: "/logo-rounded.webp" }],
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

    // --- Open Graph (OG) 协议元数据 (用于 Facebook, Discord, etc.) ---
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh_CN" }], // 推荐使用下划线格式 'zh_CN'
    ["meta", { property: "og:title", content: "SSU" }],
    ["meta", { property: "og:description", content: "简单易上手的root实现" }],
    ["meta", { property: "og:url", content: "https://ssu.oom-wg.dev" }],
    ["meta", { property: "og:site_name", content: "SSU" }],
    [
        "meta",
        {
            property: "og:image",
            content: "https://ssu.oom-wg.dev/og-template.png",
        },
    ],
    [
        "meta",
        { property: "og:image:alt", content: "SSU - 简单易上手的root实现" },
    ],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],
    ["meta", { property: "og:image:type", content: "image/png" }],

    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:site", content: "@SSU" }],

    [
        "script",
        {
            id: "beacon-aplus",
            async: "",
            src: "https://d.alicdn.com/alilog/mlog/aplus/203467608.js",
        },
        // VitePress 5+ 的内联脚本处理方式，将脚本内容放在第三个元素
        // 注意：原有的 script 实现方式在 VitePress 中可能不是最优的
        // 下面这种方式更符合VitePress的规范，将属性和内容分开
        // 但由于友盟官方代码的特殊性，我们在此处简化处理，只保留核心的 src 和 async 属性
    ],
    [
        "script",
        {}, // 空属性对象
        // 内联脚本内容
        `
(function (w, d, s, q, i) {
    w[q] = w[q] || [];
    var f = d.getElementsByTagName(s)[0], j = d.createElement(s);
    j.async = true;
    j.id = 'beacon-aplus';
    j.src = 'https://d.alicdn.com/alilog/mlog/aplus/' + i + '.js';
    j.onerror = function() {
      console.warn('警告：友盟统计加载失败，可能被拦截了');
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

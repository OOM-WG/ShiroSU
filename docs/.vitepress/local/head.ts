import type { HeadConfig } from "vitepress";

export const head: HeadConfig[] = [
    ["link", { rel: "icon", href: "/logo-rounded.webp" }],
    [
        "meta",
        { name: "author", content: "安音咲汀, YumeYuka, Linso, 悠栾, 枫莹" },
    ],
    [
        "meta",
        { name: "keywords", content: "SakitinSU, SakiSU, SKTSU, SSU, 咲苏" },
    ],
    ["meta", { name: "description", content: "简单易上手的root实现" }],

    ["meta", { name: "HandheldFriendly", content: "True" }],
    ["meta", { name: "MobileOptimized", content: "320" }],
    ["meta", { name: "theme-color", content: "#3c8772" }],

    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh-CN" }],
    ["meta", { property: "og:title", content: "SSU" }],
    ["meta", { property: "og:description", content: "简单易上手的root实现" }],
    ["meta", { property: "og:site", content: "https://ssu.oom-wg.dev" }],
    ["meta", { property: "og:site_name", content: "SSU" }],

    [
        "meta",
        {
            property: "og:image",
            content: "https://ssu.oom-wg.dev/og-template.png",
        },
    ],

    // 友盟：https://mp.umeng.com/
    [
        "script",
        {},
        `(function (w, d, s, q, i) {
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
    });`,
    ],
];

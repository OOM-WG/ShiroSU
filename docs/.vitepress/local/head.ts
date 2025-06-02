import type {HeadConfig} from "vitepress";

export const head: HeadConfig[] = [
    ["link", {rel: "icon", href: "/Logo_Rounded.webp"}],
    ["meta", {name: "author", content: "安音咲汀, YumeYuka"}],
    ["meta", {name: "keywords", content: "SakitinSU, SSU, 咲苏",}],
    ["meta", {name: "description", content: "新的Root实现方式"}],

    ["meta", {name: "HandheldFriendly", content: "True"}],
    ["meta", {name: "MobileOptimized", content: "320"}],
    ["meta", {name: "theme-color", content: "#3c8772"}],

    ["meta", {property: "og:type", content: "website"}],
    ["meta", {property: "og:locale", content: "zh-CN"}],
    ["meta", {property: "og:title", content: "咲苏"}],
    ["meta", {property: "og:description", content: "新的Root实现方式"}],
    ["meta", {property: "og:site", content: "https://ssu.yumeyuka.plus"}],
  ["meta", { property: "og:site_name", content: "咲苏" }],
    
    [
        "meta",
        {
            property: "og:image",
            content: "https://ssu.yumeyuka.plus/Logo_Rounded.webp",
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
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'aplus_queue', '203467608');
    aplus_queue.push({
      action: 'aplus.setMetaInfo',
      arguments: ['appKey', '68234476bc47b67d8364a026']
    });`,
    ]
];

import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
    {
        text: '<iconify-icon icon="fa6-solid:seedling" style="margin-right:0.25em;color:#66CC99;"></iconify-icon>关于 SSU',
        items: [
            {
                text: '<iconify-icon icon="fa6-solid:seedling" style="margin-right:0.25em;color:#66CC99;"></iconify-icon>起源',
                link: "/ssu/origin",
            },
            {
                text: '<iconify-icon icon="fa6-solid:handshake-angle" style="margin-right:0.25em;color:#FF6666;"></iconify-icon>致谢',
                link: "/ssu/3q",
            },
            {
                text: '<iconify-icon icon="fa6-solid:users" style="margin-right:0.25em;color:#99CCFF;"></iconify-icon>团队',
                link: "/ssu/team",
            },
        ],
    },
    {
        text: '<iconify-icon icon="f7:arrow-2-circlepath-circle-fill" style="margin-right:0.25em;color:#FF6B6B;"></iconify-icon>更新',
        items: [
            {
                text: '<iconify-icon icon="fa6-solid:clock-rotate-left" style="margin-right:0.25em;color:#808080;"></iconify-icon>历史版本',
                link: "/update/history",
            },
            {
                text: '<iconify-icon icon="f7:arrow-2-circlepath-circle-fill" style="margin-right:0.25em;color:#FF6B6B;"></iconify-icon>更新日志',
                link: "/update/changelog",
            },
        ],
    },
    {
        text: '<iconify-icon icon="fa6-solid:language" style="margin-right:0.25em;color:#A084DC;"></iconify-icon>多语言',
        items: [
            {
                text: '<iconify-icon icon="fa6-solid:book-open-reader" style="margin-right:0.25em;color:#6CB4EE;"></iconify-icon>说明',
                link: "/more/translation",
            },
            {
                text: '<iconify-icon icon="fa6-solid:globe" style="margin-right:0.25em;color:#45B8AC;"></iconify-icon>沉浸式翻译',
                link: "https://immersivetranslate.com/",
            },
            {
                text: '<iconify-icon icon="fa6-solid:language" style="margin-right:0.25em;color:#A084DC;"></iconify-icon>DeepL',
                link: "https://www.deepl.com/ja/translator/",
            },
        ],
    },
];

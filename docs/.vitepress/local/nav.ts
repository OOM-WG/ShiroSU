import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
    {
        text: "关于 SSU",
        items: [
            {
                text: "起源",
                link: "/ssu/origin",
            },
            {
                text: "致谢",
                link: "/ssu/3q",
            },
            {
                text: "团队",
                link: "/ssu/team",
            },
        ],
    },
    {
        text: "更新",
        items: [
            {
                text: "历史版本",
                link: "/update/history",
            },
            {
                text: "更新日志",
                link: "/update/changelog",
            },
        ],
    },
    {
        text: "多语言",
        items: [
            {
                text: "说明",
                link: "/more/translation",
            },
            {
                text: "沉浸式翻译",
                link: "https://immersivetranslate.com/",
            },
            {
                text: "DeepL",
                link: "https://www.deepl.com/ja/translator/",
            },
        ],
    },
];

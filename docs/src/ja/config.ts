import { defineConfig, type DefaultTheme } from "vitepress";


export default defineConfig({
    lang: "ja-JP",
    description: "SakitinSU - カーネルベースの Android Root ソリューション",

    themeConfig: {
        nav: nav(),

        sidebar: {
            "/ja/": { base: "/ja/", items: sidebar() },
        },

        search: { options: searchOptions() },
        editLink: {
            pattern:
                "https://github.com/OOM-WG/SSU_Docs/edit/main/src/:path",
            text: "GitHub でこのページを編集",
        },

        docFooter: {
            prev: "前のページ",
            next: "次のページ",
        },

        outline: {
            label: "このページの内容",
        },

        lastUpdated: {
            text: "最終更新",
        },

        notFound: {
            title: "ページが見つかりません",
            quote: "申し訳ございませんが、お探しのページが見つかりませんでした。",
            linkLabel: "ホームへ戻る",
            linkText: "ホームに戻る",
        },

        langMenuLabel: "言語",
        returnToTopLabel: "トップに戻る",
        sidebarMenuLabel: "メニュー",
        darkModeSwitchLabel: "テーマ",
        lightModeSwitchTitle: "ライトテーマに切り替え",
        darkModeSwitchTitle: "ダークテーマに切り替え",
        skipToContentLabel: "コンテンツにスキップ",
    },
});

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: "SSU について",
            items: [
                {
                    text: "特徴機能",
                    link: "/ja/base/feats",
                },
                {
                    text: "チームについて",
                    link: "/ja/ssu/team",
                },
                {
                    text: "開発謝辞",
                    link: "/ja/ssu/3q",
                },
            ],
        },
        {
            text: "バージョン更新",
            items: [
                {
                    text: "履歴バージョン",
                    link: "/ja/update/history",
                },
                {
                    text: "更新ログ",
                    link: "/ja/update/changelog",
                },
            ],
        },
        {
            text: "ドキュメント翻訳",
            link: "/ja/more/translation",
        },
    ];
}

function sidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: "使用ガイド",
            collapsed: false,
            items: [
                {
                    text: "SSU とは",
                    link: "/base/overview",
                },
                {
                    text: "インストールガイド",
                    link: "/base/install",
                },
                {
                    text: "よくある質問",
                    link: "/base/faq",
                },
            ],
        },
        {
            text: "開発者向け",
            collapsed: false,
            items: [
                {
                    text: "モジュール開発",
                    link: "/dev/module",
                },
                {
                    text: "モジュール WebUI",
                    link: "/dev/webui",
                },
                {
                    text: "Scheme 呼び出し",
                    link: "/dev/scheme",
                },
            ],
        },
        {
            text: "SSU について",
            collapsed: false,
            items: [
                {
                    text: "すべての始まり",
                    link: "/ssu/origin",
                },
                {
                    text: "カーネル動作原理",
                    link: "/ssu/principle",
                },
                {
                    text: "疑問への対応",
                    link: "/ssu/defense",
                },
            ],
        },
    ];
}

function searchOptions(): Partial<DefaultTheme.LocalSearchOptions> {
    return {
        translations: {
            button: {
                buttonText: "ドキュメントを検索",
                buttonAriaLabel: "ドキュメントを検索",
            },
            modal: {
                noResultsText: "関連する結果が見つかりません",
                resetButtonTitle: "検索条件をクリア",
                footer: {
                    selectText: "選択",
                    navigateText: "移動",
                    closeText: "閉じる",
                },
            },
        },
    };
}

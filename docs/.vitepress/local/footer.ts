import type { CustomConfig } from "./types";

const footer: CustomConfig["footer"] = {
    qrcodeTitle: "开发反馈渠道",
    qrcodeMessage: "欢迎QQ扫码联系我们",
    qrcodeLink: "https://qm.qq.com/q/YoA4Fa4mY2",
    navigation: [
        {
            title: "关于 SSU",
            items: [
                {
                    text: "特色",
                    link: "/base/feats"
                },
                {
                    text: "团队",
                    link: "/ssu/team",
                },
                {
                    text: "致谢",
                    link: "/ssu/3q",
                },
            ],
        },
        {
            title: "政策",
            items: [
                {
                    text: "许可证",
                    link: "/more/license",
                },
                {
                    text: "隐私政策",
                    link: "/more/privacy",
                },
            ],
        },
        {
            title: "更多",
            items: [
                {
                    text: "多语言",
                    link: "/more/translation",
                },
                {
                    text: "Latest File",
                    link: "https://latestfile.zip",
                },
                {
                    text: "YumeYuka++",
                    link: "https://yumeyuka.plus",
                },
            ],
        },
    ],
};

export default footer;

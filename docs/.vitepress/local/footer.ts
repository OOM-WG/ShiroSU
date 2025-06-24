import type { CustomConfig } from "./types";

const footer: CustomConfig["footer"] = {
    qrcodeTitle: "开发反馈渠道",
    qrcodeMessage: "欢迎QQ扫码联系我们",
    qrcodeLink: "https://qm.qq.com/q/YoA4Fa4mY2",
    navigation: [
        {
            title: "关于",
            items: [
                {
                    text: "团队信息",
                    link: "/about/author",
                },
                {
                    text: "项目起源",
                    link: "/about/origin",
                },
                {
                    text: "项目仓库",
                    link: "https://github.com/OOM-WG/SakitinSU",
                },
            ],
        },
        {
            title: "政策",
            items: [
                {
                    text: "分发协议",
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
                    text: "Latest Module",
                    link: "https://www.mod.latestfile.zip",
                },
                {
                    text: "YumeYuka",
                    link: "https://YumeYuka.plus",
                },
            ],
        },
    ],
};

export default footer;

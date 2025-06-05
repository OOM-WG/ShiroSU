import type { CustomConfig } from "./types";

const footer: CustomConfig["footer"] = {
	qrcodeTitle: "开发反馈频道",
	qrcodeMessage: "欢迎QQ扫码联系我们(欢律遗愉)",
	qrcodeLink: "https://pd.qq.com/s/91t3v4mr3",
	navigation: [
		{
			title: "关于",
			items: [
				{
					text: "团队信息",
					link: "/about/author",
				},
			],
		},
		{
			title: "政策",
			items: [
				{
					text: "分发协议",
					link: "/More/License",
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
			],
		},
	],
};

export default footer;

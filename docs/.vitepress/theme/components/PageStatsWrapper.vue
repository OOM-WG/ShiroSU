<template>
	<div ref="wrapperRef" style="display: none"></div>
</template>

<script setup lang="ts">
	import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
	import { useData, useRoute } from "vitepress";
	import { createApp } from "vue";
	import PageStats from "./PageStats.vue";

	const wrapperRef = ref<HTMLElement>();
	const { frontmatter } = useData();
	const route = useRoute();
	let pageStatsApp: any = null;

	const insertPageStats = async () => {
		// 只在有 showPageStats 标记时才显示
		if (!frontmatter.value.showPageStats) {
			cleanup();
			return;
		}

		// 使用 MutationObserver 等待 h1 元素出现
		const waitForH1 = () => {
			return new Promise<Element | null>((resolve) => {
				const checkH1 = () => {
					const h1Element = document.querySelector(".VPDoc .content h1");
					if (h1Element) {
						resolve(h1Element);
						return;
					}

					// 如果没有找到，继续观察
					const observer = new MutationObserver(() => {
						const h1 = document.querySelector(".VPDoc .content h1");
						if (h1) {
							observer.disconnect();
							resolve(h1);
						}
					});

					observer.observe(document.body, {
						childList: true,
						subtree: true,
					});

					// 5秒超时
					setTimeout(() => {
						observer.disconnect();
						resolve(null);
					}, 5000);
				};

				checkH1();
			});
		};

		try {
			const h1Element = await waitForH1();

			if (h1Element) {
				// 清理之前可能存在的组件
				cleanup();

				await nextTick();

				// 创建一个容器元素
				const container = document.createElement("div");
				container.classList.add("page-stats-container");

				// 将容器插入到 h1 标题后面
				h1Element.insertAdjacentElement("afterend", container);

				// 创建 PageStats 组件实例并挂载到容器
				pageStatsApp = createApp(PageStats);
				pageStatsApp.mount(container);
			}
		} catch (error) {
			console.warn("PageStatsWrapper: 无法插入 PageStats 组件", error);
		}
	};

	const cleanup = () => {
		if (pageStatsApp) {
			try {
				pageStatsApp.unmount();
			} catch (error) {
				console.warn("PageStatsWrapper: 卸载组件时出错", error);
			}
			pageStatsApp = null;
		}

		// 清理可能存在的容器
		const existingContainer = document.querySelector(".page-stats-container");
		if (existingContainer) {
			existingContainer.remove();
		}
	};

	onMounted(() => {
		setTimeout(insertPageStats, 50);
	});

	onUnmounted(() => {
		cleanup();
	});

	// 监听路由变化
	watch(
		() => route.path,
		() => {
			setTimeout(() => {
				insertPageStats();
			}, 100);
		}
	);

	// 监听 frontmatter 变化
	watch(
		() => frontmatter.value.showPageStats,
		() => {
			setTimeout(insertPageStats, 50);
		}
	);
</script>

<style>
	.page-stats-container {
		margin: 1.5rem 0;
	}
</style>

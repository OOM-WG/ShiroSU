<script setup lang="ts">
	import { computed, onMounted, onUnmounted, nextTick, ref, watch } from "vue";
	import { useData, useRoute } from "vitepress";
	// 获取前言数据
	const { frontmatter, page } = useData();
	const route = useRoute();
	const statsRef = ref<HTMLElement>();
	const calculatedWordCount = ref<number>(0);

	// 通过 showPageStats 字段控制显示
	const enableStats = computed(() => {
		return frontmatter.value?.showPageStats === true;
	});

	// 获取进度值
	const progressValue = computed(() => {
		const progress = frontmatter.value?.progress;
		if (typeof progress === "number" && progress >= 0 && progress <= 100) {
			return progress;
		}
		return undefined; // 如果无效或未定义，则不显示进度条
	}); // 计算字数的函数
	const calculateWordCount = () => {
		// 如果前言中有明确设置的字数，则使用它
		if (frontmatter.value?.wordCount !== undefined && frontmatter.value?.wordCount !== null) {
			calculatedWordCount.value = Number(frontmatter.value.wordCount);
			return;
		}

		// 否则尝试从页面内容计算
		if (typeof window !== "undefined") {
			try {
				// 获取文档主体内容区域的文本
				const contentElement =
					document.querySelector(".VPDoc .vp-doc") ||
					document.querySelector(".content") ||
					document.querySelector("main");
				if (contentElement) {
					const textContent = contentElement.textContent || "";
					// 使用正则表达式匹配中文字符、英文单词和数字
					const matches = textContent.match(/[\u4e00-\u9fa5]|[a-zA-Z0-9_]+/g);
					calculatedWordCount.value = matches ? matches.length : 0;
				} else {
					calculatedWordCount.value = 0;
				}
			} catch (error) {
				console.warn("Failed to calculate word count:", error);
				calculatedWordCount.value = 0;
			}
		} else {
			calculatedWordCount.value = 0;
		}
	};

	// 计算字数
	const wordCount = computed(() => {
		return calculatedWordCount.value;
	});

	// 计算阅读时间
	const readingTime = computed(() => {
		// 如果前言中有明确设置的阅读时间，则使用它
		if (frontmatter.value?.readingTime) {
			return frontmatter.value.readingTime;
		}
		if (wordCount.value === 0) {
			return "0 分钟";
		}
		const minutes = Math.ceil(wordCount.value / 400); // 假设平均阅读速度为每分钟400字
		return `${minutes} 分钟`;
	});

	// 格式化创建日期
	const createdTime = computed(() => {
		if (frontmatter.value?.createdAt) {
			return formatDate(new Date(frontmatter.value.createdAt));
		}
		return "";
	});

	// 格式化更新日期
	const updatedTime = computed(() => {
		if (frontmatter.value?.updatedAt) {
			return formatDate(new Date(frontmatter.value.updatedAt));
		}
		if (page.value.lastUpdated) {
			return formatDate(new Date(page.value.lastUpdated));
		}
		return "";
	});

	// 日期格式化函数
	function formatDate(date: Date): string {
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const seconds = Math.floor(diff / 1000);
		const days = Math.floor(seconds / (60 * 60 * 24));

		if (days === 0) {
			if (seconds < 60) return `刚刚`;
			if (seconds < 3600) return `${Math.floor(seconds / 60)} 分钟前`;
			return `${Math.floor(seconds / 3600)} 小时前`;
		} else if (days < 30) {
			return `${days} 天前`;
		} else if (days < 365) {
			const months = Math.floor(days / 30);
			return `${months} 个月前`;
		} else {
			const years = Math.floor(days / 365);
			return `超过 ${years} 年前`;
		}
	}
	// 定位逻辑
	const moveToCorrectPosition = async () => {
		if (!enableStats.value || !statsRef.value) {
			return;
		}

		await nextTick();

		// 查找第一个 h1 标题
		const h1Element = document.querySelector(".VPDoc .content h1");

		if (h1Element && statsRef.value) {
			// 将组件移动到 h1 标题后面
			h1Element.insertAdjacentElement("afterend", statsRef.value);
			// 添加适当的边距
			statsRef.value.style.marginTop = "1.5rem";
			statsRef.value.style.marginBottom = "1.5rem";

			// 移动完成后重新计算字数
			setTimeout(() => {
				calculateWordCount();
			}, 100);
		}
	};
	onMounted(() => {
		setTimeout(() => {
			moveToCorrectPosition();
			calculateWordCount();
		}, 100);
	});
	// 监听路由变化
	watch(
		() => route.path,
		() => {
			setTimeout(() => {
				moveToCorrectPosition();
				calculateWordCount();
			}, 100);
		}
	);
</script>

<template>
	<div v-if="enableStats" ref="statsRef" class="page-stats">
		<!-- Progress -->
		<div v-if="progressValue !== undefined" class="stat-item">
			<div class="stat-left">
				<div class="stat-icon">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						<circle cx="12" cy="12" r="10"></circle>
						<circle cx="12" cy="12" r="6"></circle>
						<circle cx="12" cy="12" r="2"></circle>
					</svg>
				</div>
				<div class="stat-label">进度</div>
			</div>
			<div class="stat-value progress-value-container">
				<div class="progress-bar-container">
					<div class="progress-bar-fill" :style="{ width: progressValue + '%' }"></div>
				</div>
			</div>
		</div>
		<!-- 创建时间 -->
		<div v-if="createdTime" class="stat-item">
			<div class="stat-left">
				<div class="stat-icon">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						<circle cx="12" cy="12" r="10"></circle>
						<polyline points="12 6 12 12 16 14"></polyline>
					</svg>
				</div>
				<div class="stat-label">创建时间</div>
			</div>
			<div class="stat-value">{{ createdTime }}</div>
		</div>

		<!-- 更新时间 -->
		<div v-if="updatedTime" class="stat-item">
			<div class="stat-left">
				<div class="stat-icon">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						<circle cx="12" cy="12" r="10"></circle>
						<polyline points="12 6 12 12 16 14"></polyline>
					</svg>
				</div>
				<div class="stat-label">更新时间</div>
			</div>
			<div class="stat-value">{{ updatedTime }}</div>
		</div>

		<!-- 字数统计 -->
		<div v-if="wordCount > 0" class="stat-item">
			<div class="stat-left">
				<div class="stat-icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						<polyline points="4 7 4 4 20 4 20 7"></polyline>
						<line x1="9" y1="20" x2="15" y2="20"></line>
						<line x1="12" y1="4" x2="12" y2="20"></line>
					</svg>
				</div>
				<div class="stat-label">字数</div>
			</div>
			<div class="stat-value">{{ wordCount }} 字</div>
		</div>

		<!-- 阅读时间 -->
		<div v-if="wordCount > 0" class="stat-item">
			<div class="stat-left">
				<div class="stat-icon">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						<circle cx="12" cy="12" r="10"></circle>
						<polyline points="12 6 12 12 16 14"></polyline>
					</svg>
				</div>
				<div class="stat-label">阅读时间</div>
			</div>
			<div class="stat-value">{{ readingTime }}</div>
		</div>
	</div>
</template>

<style scoped>
	.page-stats {
		display: flex;
		flex-direction: column;
		gap: 14px; /* 调整垂直间距，与参考图片匹配 */
		margin-bottom: 24px;
		padding-left: 0;
		max-width: 100%;
		font-size: 14px;
	}
	.stat-item {
		display: flex;
		align-items: center;
		width: 100%;
		line-height: 1.6;
	}
	/* 左侧区块样式 */
	.stat-left {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		width: 30%; /* 增加左侧宽度，使右侧数值往右移 */
		margin-right: 40px; /* 增加与右侧的间距 */
	}

	.stat-icon {
		width: 16px;
		height: 16px;
		color: var(--vp-c-text-3);
		flex-shrink: 0;
		margin-right: 10px; /* 增加图标和标签间距 */
		display: flex;
		align-items: center;
		justify-content: center; /* 确保图标居中显示 */
	}

	.stat-icon svg {
		width: 100%;
		height: 100%;
	}

	.stat-label {
		font-size: 14px;
		color: var(--vp-c-text-2);
		flex-shrink: 0;
		white-space: nowrap;
	}
	/* 右侧值样式 */
	.stat-value {
		font-size: 14px;
		color: var(--vp-c-text-1);
		text-align: left; /* 改为左对齐 */
		flex: 1; /* 占据剩余空间 */
		white-space: nowrap;
		flex-shrink: 0;
	} /* 进度条容器样式优化 */
	.progress-value-container {
		flex: 1; /* 占据剩余空间 */
		text-align: left; /* 确保进度条也是左对齐 */
	}

	.progress-bar-container {
		width: 80%; /* 缩短进度条长度 */
		height: 12px; /* 增加高度，让边框更明显 */
		background-color: var(--vp-c-bg-soft); /* 使用主题的软背景色 */
		border-radius: 12px; /* 增加圆角 */
		border: 1px solid var(--vp-c-divider); /* 添加边框 */
		overflow: hidden;
	}
	.progress-bar-fill {
		height: 100%;
		background-color: var(--vp-c-brand-1); /* 使用品牌色的较亮变体 */
		border-radius: 3px; /* 保持与容器一致的圆角 */
		transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1); /* 平滑过渡效果 */
	}

	/* 暗色模式下的样式优化 */
	:root.dark .progress-bar-container {
		background-color: rgba(255, 255, 255, 0.1); /* 暗色模式下使用更淡的背景 */
		border-color: rgba(255, 255, 255, 0.2); /* 暗色模式下的边框颜色 */
	}
</style>

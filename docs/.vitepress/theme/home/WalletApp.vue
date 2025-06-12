<template>
	<div class="VPHome">
		<div class="jetbrains-hero">
			<div class="hero-background">
				<div class="gradient-overlay"></div>
			</div>
			<div class="hero-content">
				<div class="content-wrapper">
					<div class="brand-tag">
						<span class="brand-icon">⚡</span>
						SakitinSU
					</div>
					<img src="/Logo.webp" alt="SakitinSU Logo" class="mobile-logo" />
					<h1 class="hero-title">
						<span class="title-highlight">Android Root </span> Implementation
						<br />
						<span class="platform-tag">Easy Start</span>
					</h1>
					<p class="hero-subtitle">Change reality with cutting-edge technology</p>
					<div class="cta-group">
						<a href="/guide/what-is-sakitinsu" class="cta-primary">
							<span class="cta-text">开始使用</span>
						</a>
						<a href="https://qq.yumeyuka.plus" class="cta-secondary" target="_blank" rel="noopener">
							<span class="cta-text">群组</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	// 移除对frontmatter的依赖，内容直接硬编码在模板中
	// 这样组件可以完全独立工作，不需要外部配置
</script>

<style scoped>
	@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

	/* VPHome 容器样式 */
	.VPHome {
		margin: 0;
		width: 100%;
	}

	.jetbrains-hero {
		position: relative;
		width: 100%;
		min-height: 100vh;
		overflow-x: hidden;
		overflow-y: hidden;
		font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
	}
	.hero-background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #ffffff;
		z-index: 1;
	}

	.gradient-overlay {
		display: none;
	}
	.hero-content {
		position: relative;
		z-index: 3;
		min-height: 100vh;
		display: flex;
		align-items: center;
		padding: 0 2vw;
		width: 100%;
		box-sizing: border-box;
		justify-content: flex-start;
	}
	.content-wrapper {
		max-width: none;
		width: 100%;
		margin: 0;
		animation: slideInUp 0.8s ease-out;
		padding: 0 25vw 10vw 20vw;
		box-sizing: border-box;
	}
	.brand-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: rgba(255, 119, 48, 0.1);
		color: #ff7730;
		padding: 0.625rem 1.25rem;
		border-radius: 2rem;
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 2rem;
		border: 1px solid rgba(255, 119, 48, 0.2);
		backdrop-filter: blur(10px);
	}

	.brand-icon {
		font-size: 1rem;
	}
	.hero-title {
		font-size: clamp(2.4rem, 8vw, 4.5rem);
		font-weight: 800;
		line-height: 1.1;
		color: #1e293b;
		margin-bottom: 1.5rem;
		letter-spacing: -0.02em;
		word-break: keep-all;
		max-width: 100%;
		white-space: normal;
		overflow: visible;
	}

	.title-highlight {
		background: linear-gradient(135deg, #ff7730 0%, #ff5722 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		position: relative;
	}

	.platform-tag {
		background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		position: relative;
	}
	.hero-subtitle {
		font-size: 1.5rem;
		color: #64748b;
		font-weight: 400;
		margin-bottom: 3rem;
		line-height: 1.6;
		max-width: 100%;
	}

	.cta-group {
		display: flex;
		gap: 1rem;
		align-items: center;
		flex-wrap: wrap;
	}
	.cta-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: #ff7730;
		color: #ffffff;
		padding: 0.95rem 2.1rem;
		border-radius: 2rem;
		font-weight: 700;
		font-size: 1.18rem;
		text-decoration: none;
		box-shadow: 0 2px 8px rgba(255, 119, 48, 0.2);
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		border: none;
		outline: none;
		min-width: 140px;
		justify-content: center;
		letter-spacing: 0.04em;
	}

	.cta-primary:active,
	.cta-primary:focus {
		box-shadow: 0 0 0 2px rgba(255, 119, 48, 0.3);
	}

	.cta-primary:hover {
		background: #ff5722;
		color: #fff;
		border-color: #ff5722;
		box-shadow: 0 4px 16px rgba(255, 119, 48, 0.3);
		transform: translateY(-2px);
	}

	.cta-icon {
		transition: transform 0.3s ease;
	}

	.cta-primary:hover .cta-icon {
		transform: translateX(4px);
	}
	.cta-secondary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: #ffffff;
		color: #333;
		padding: 0.95rem 2.1rem;
		border-radius: 2rem;
		font-weight: 700;
		font-size: 1.18rem;
		text-decoration: none;
		border: 1.5px solid #ddd;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		outline: none;
		min-width: 140px;
		justify-content: center;
		letter-spacing: 0.04em;
	}

	.cta-secondary:active,
	.cta-secondary:focus {
		box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
	}

	.cta-secondary:hover {
		background: #f5f5f5;
		color: #333;
		border-color: #ccc;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
		transform: translateY(-2px);
	}
	@keyframes slideInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	/* Dark Mode */
	:root.dark .hero-background {
		background: #1a1a1a;
	}

	:root.dark .gradient-overlay {
		display: none;
	}

	:root.dark .brand-tag {
		background: rgba(255, 119, 48, 0.15);
		border-color: rgba(255, 119, 48, 0.3);
	}

	:root.dark .hero-title {
		color: #f8fafc;
	}

	:root.dark .hero-subtitle {
		color: #94a3b8;
	}

	:root.dark .cta-secondary {
		background: rgba(30, 41, 59, 0.8);
		color: #cbd5e1;
		border-color: rgba(71, 85, 105, 0.5);
	}

	:root.dark .cta-secondary:hover {
		background: rgba(30, 41, 59, 0.95);
		border-color: rgba(255, 119, 48, 0.3);
		color: #ff7730;
	} /* Responsive Design */
	@media (max-width: 1200px) {
		.VPHome {
			padding-left: 6vw;
		}
		.content-wrapper {
			max-width: none;
			padding: 0 3vw;
		}
		.hero-content {
			padding: 0 3vw;
		}
	}
	@media (max-width: 768px) {
		.VPHome {
			padding-left: 3vw;
		}
		.hero-content {
			padding: 0 4vw;
		}
		.content-wrapper {
			max-width: none;
			padding: 0 2vw;
			text-align: center;
		}

		.brand-tag {
			display: none; /* 移动端设备不显示品牌标签 */
		}

		.mobile-logo {
			display: block; /* 在移动端显示logo */
		}
		.hero-title {
			font-size: clamp(2rem, 12vw, 3rem);
			margin-top: 0.5rem; /* 减少标题顶部间距 */
			margin-bottom: 1rem;
			white-space: normal;
			max-width: 100%;
		}
		.hero-subtitle {
			font-size: 1.25rem;
			margin-bottom: 2rem;
		}

		.cta-group {
			flex-direction: column;
			align-items: stretch;
		}

		.cta-primary,
		.cta-secondary {
			justify-content: center;
			padding: 0.875rem 1.5rem;
		}
	}
	@media (max-width: 480px) {
		.hero-title {
			font-size: clamp(1.75rem, 10vw, 2.5rem);
		}
		.mobile-logo {
			width: 140px; /* 较小屏幕上稍微缩小Logo */
			height: 140px;
			margin: -4rem auto 1.5rem; /* 更大的负上边距使logo位置更高 */
		}

		.cta-primary,
		.cta-secondary {
			padding: 0.75rem 1.25rem;
			font-size: 0.875rem;
		}
	}

	@media (max-width: 360px) {
		.mobile-logo {
			width: 120px; /* 超小屏幕进一步缩小Logo */
			height: 120px;
			margin: -4rem auto 1rem; /* 更大的负上边距使logo位置更高 */
		}

		.hero-title {
			font-size: clamp(1.5rem, 9vw, 2rem);
			margin-top: 0;
		}
	}

	/* VPFeatures 样式 */
	.VPFeatures {
		position: relative;
		padding: 60px 24px;
		background-color: var(--vp-c-bg-soft);
	}

	.VPFeatures .container {
		margin: 0 auto;
		max-width: 1152px;
	}

	.VPFeatures .items {
		display: flex;
		flex-wrap: wrap;
		margin: -8px;
	}

	.VPFeatures .item {
		padding: 8px;
		width: 100%;
	}

	@media (min-width: 640px) {
		.VPFeatures .item {
			width: 50%;
		}
	}

	@media (min-width: 960px) {
		.VPFeatures .item {
			width: 33.333333%;
		}
	}

	.VPFeatures .item .icon {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20px;
		border-radius: 6px;
		background-color: var(--vp-c-default-soft);
		width: 48px;
		height: 48px;
		font-size: 24px;
		transition: background-color 0.25s;
	}

	.VPFeatures .item .title {
		margin: 0 0 12px;
		border: 0;
		padding: 0;
		font-size: 18px;
		font-weight: 600;
		color: var(--vp-c-text-1);
	}

	.VPFeatures .item .details {
		margin: 0;
		font-size: 14px;
		font-weight: 500;
		color: var(--vp-c-text-2);
		line-height: 24px;
	}
	.mobile-logo {
		display: none; /* 默认在桌面端不显示 */
		width: 120px;
		height: 120px;
		margin: 0 auto 1.5rem;
		object-fit: contain;
		border-radius: 12px;
	}
	@media (max-width: 768px) {
		.mobile-logo {
			display: block;
			margin: -5.5rem auto 2rem; /* 更大的负上边距使logo位置更高 */
			width: 160px; /* 设置固定宽度而不是百分比 */
			height: 160px;
			object-fit: contain;
		}
	}
</style>

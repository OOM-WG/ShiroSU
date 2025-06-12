<template>
	<div class="wallet-hero-bg">
		<div class="wallet-hero-content">
			<div class="wallet-main">
				<div class="wallet-tagline">SakitinSU</div>
				<h1 class="wallet-title">
					New Root Implementation <br />
					For AndRoid
				</h1>
				<div class="wallet-subtitle">Change reality with me!</div>
				<a href="/guide/what-is-sakitinsu" class="wallet-btn wallet-download">开始</a>
			</div>
		</div>
	</div>
</template>

<script setup>
	// 无需任何脚本
</script>

<style scoped>
	.wallet-hero-bg {
		min-height: 100vh;
		width: 100vw;
		background: none;
		position: relative;
		animation: none;
		overflow: hidden;
	}
	.wallet-hero-bg::after {
		display: none;
	}
	.wallet-hero-content {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		min-height: 100vh;
		padding-left: 2vw;
		padding-top: 0;
		max-width: 80vw;
	}
	.wallet-main {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.8rem;
	}
	.wallet-tagline {
		font-size: 2rem;
		font-weight: 700;
		color: #222;
		margin-bottom: 0.8rem;
	}
	.wallet-title {
		font-size: 4.2rem;
		font-weight: 800;
		color: #222;
		line-height: 1.08;
		margin-bottom: 1rem;
		word-break: break-word;
		max-width: none;
	}
	.wallet-subtitle {
		font-size: 2rem;
		color: #333;
		font-weight: 400;
		margin-bottom: 2.2rem;
		max-width: 32em;
		line-height: 1.5;
	}
	.wallet-btn.wallet-download {
		background: #222;
		color: #fff;
		border: none;
		border-radius: 2.5rem;
		padding: 1rem 2.5rem;
		font-size: 1.3rem;
		font-weight: 500;
		cursor: pointer;
		text-decoration: none;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
		transition: background 0.2s, color 0.2s;
		margin-top: 1.5rem;
	}
	.wallet-btn.wallet-download:hover {
		background: #fff;
		color: #222;
	}
	:root.dark .wallet-tagline,
	:root.dark .wallet-title {
		color: #fff;
	}
	:root.dark .wallet-subtitle {
		color: #e0e0e0;
	}
	:root.dark .wallet-btn.wallet-download {
		background: #fff;
		color: #222;
	}
	:root.dark .wallet-btn.wallet-download:hover {
		background: #222;
		color: #fff;
	}
	@media (max-width: 900px) {
		.wallet-hero-content {
			max-width: 95vw;
			padding-left: 4vw;
		}
		.wallet-title {
			font-size: 2.6rem;
			max-width: 35ch;
		}
		.wallet-tagline {
			font-size: 1.3rem;
		}
		.wallet-subtitle {
			font-size: 1.2rem;
		}
	}
	@media (max-width: 600px) {
		.wallet-hero-content {
			padding-left: 2vw;
			padding-top: 2vh;
		}
		.wallet-title {
			font-size: 1.4rem;
		}
		.wallet-tagline {
			font-size: 1rem;
		}
		.wallet-subtitle {
			font-size: 1rem;
		}
		.wallet-btn.wallet-download {
			font-size: 1rem;
			padding: 0.7rem 1.5rem;
		}
	}
</style>

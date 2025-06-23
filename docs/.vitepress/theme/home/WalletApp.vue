<template>
  <div class="VPHome">
    <div class="jetbrains-hero">
      <div class="hero-background">
        <div class="gradient-overlay"></div>
      </div>
      <div class="hero-content">
        <div class="content-wrapper">
          <div class="hero-header">
            <div class="brand-tag">
              <span class="brand-icon">⚡</span>
              𝕊𝔸𝕂𝕀 𝕊𝕌 ✧
            </div>
          </div>
          <h1 class="hero-title">
            <span class="title-highlight">Android Root </span
            ><span class="implementation-text">Implementation</span
            > <span class="platform-tag">Easy Start</span>
          </h1>
          <p class="hero-subtitle">
            Change reality with cutting-edge technology
          </p>
          <div class="cta-group">
            <a href="/guide/what-is-sakitinsu" class="cta-primary">
              <span class="cta-text">开始使用</span>
            </a>
            <a
              href="https://qq.yumeyuka.plus"
              class="cta-secondary"
              target="_blank"
              rel="noopener">
              <span class="cta-text">群组</span>
            </a>
            <a
              href="https://discord.gg/RQBBVhSCa5"
              class="cta-secondary"
              target="_blank"
              rel="noopener">
              <span class="cta-text">频道</span>
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
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
}
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f8fafc;
  z-index: 1;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(247, 250, 255, 0.9) 100%);
  z-index: 2;
  backdrop-filter: blur(10px);
}
.hero-content {
  position: relative;
  z-index: 3;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  justify-content: flex-start;
}
.content-wrapper {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  animation: slideInUp 0.8s ease-out;
  padding: 0 5vw 0 10vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
}
.brand-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
  padding: 0.625rem 1.25rem;
  border-radius: 2rem;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem;
  border: 1px solid rgba(99, 102, 241, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1);
  transform: translateY(0);
  transition: all 0.3s ease;
  position: relative;
  left: 0;
  right: 0;
}

.brand-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.15);
}

.brand-icon {
  font-size: 1rem;
}
.hero-title {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 800;
  line-height: 1.2;
  color: #1e293b;
  margin: 2rem 0 1.5rem;
  letter-spacing: -0.02em;
  word-break: keep-all;
  max-width: 100%;
  white-space: normal;
  overflow: visible;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: left;
  animation: fadeIn 1s ease-out, scaleIn 1s ease-out;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.title-highlight {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  position: relative;
  text-shadow: none;
  display: inline-block;
  transform: scale(1);
  transition: transform 0.3s ease;
  white-space: nowrap;
}

.title-highlight:hover {
  transform: scale(1.03);
}

.implementation-text {
  display: inline-block; /* 确保元素不换行 */
  white-space: nowrap; /* 额外确保不换行 */
  color: #1e293b; /* 明确定义颜色 */
}

.platform-tag {
  background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  position: relative;
  display: inline-block;
  padding: 0.2rem 0 0.2rem 1rem;
  text-shadow: none;
  font-size: 0.85em;
}
.hero-subtitle {
  font-size: 1.5rem;
  color: #64748b;
  font-weight: 400;
  margin: 0 0 3rem 0;
  line-height: 1.6;
  max-width: 700px;
  text-align: left;
  animation: fadeIn 1.2s ease-out 0.3s both;
}

.cta-group {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 100%;
  margin: 0;
}
.cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #4f46e5;
  color: #ffffff;
  padding: 0.95rem 2.1rem;
  border-radius: 1rem;
  font-weight: 700;
  font-size: 1.18rem;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: none;
  outline: none;
  min-width: 140px;
  justify-content: center;
  letter-spacing: 0.04em;
  overflow: hidden;
}

.cta-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cta-primary:active,
.cta-primary:focus {
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.4);
}

.cta-primary:hover {
  background: #6366f1;
  color: #fff;
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
  transform: translateY(-3px);
}

.cta-primary:hover::before {
  opacity: 1;
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
  background: rgba(255, 255, 255, 0.8);
  color: #4f46e5;
  padding: 0.95rem 2.1rem;
  border-radius: 1rem;
  font-weight: 700;
  font-size: 1.18rem;
  text-decoration: none;
  border: 1.5px solid rgba(99, 102, 241, 0.3);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  min-width: 140px;
  justify-content: center;
  letter-spacing: 0.04em;
  backdrop-filter: blur(5px);
}

.cta-secondary:active,
.cta-secondary:focus {
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}

.cta-secondary:hover {
  background: rgba(255, 255, 255, 0.95);
  color: #6366f1;
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  transform: translateY(-3px);
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
}
/* Dark Mode */
:root.dark .hero-background {
  background: #1b1b1f;
}

:root.dark .gradient-overlay {
  display: block;
  background: #1b1b1f;
  backdrop-filter: none;
}

:root.dark .brand-tag {
  background: rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.3);
  color: #818cf8;
}

:root.dark .hero-title {
  color: #f8fafc;
}

:root.dark .title-highlight {
  background: linear-gradient(135deg, #818cf8 0%, #6366f1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
}

:root.dark .implementation-text {
  color: #f8fafc;
}

:root.dark .platform-tag {
  background: linear-gradient(135deg, #f472b6 0%, #ec4899 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
}

:root.dark .hero-subtitle {
  color: #cbd5e1;
}

:root.dark .cta-primary {
  background: #6366f1;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
}

:root.dark .cta-primary:hover {
  background: #818cf8;
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
}

:root.dark .cta-secondary {
  background: rgba(30, 41, 59, 0.5);
  color: #cbd5e1;
  border-color: rgba(99, 102, 241, 0.4);
}

:root.dark .cta-secondary:hover {
  background: rgba(30, 41, 59, 0.7);
  border-color: rgba(99, 102, 241, 0.6);
  color: #818cf8;
} /* Responsive Design */
@media (max-width: 1200px) {
  .VPHome {
    padding-left: 0;
  }
  .content-wrapper {
    max-width: 90%;
    padding: 0 5vw 0 8vw;
  }
  .hero-content {
    padding: 0;
  }

  .hero-title {
    font-size: clamp(2.2rem, 6vw, 3.5rem);
  }
}
@media (max-width: 768px) {
  .VPHome {
    padding-left: 0;
  }
  .hero-content {
    padding: 0;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 15vh;
  }
  .content-wrapper {
    max-width: 100%;
    padding: 0 5vw;
    text-align: left;
    align-items: flex-start;
  }

  .hero-header {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 1rem;
  }

  .brand-tag {
    display: inline-flex; /* 保持显示品牌标签 */
    margin: 1.5rem 0;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }

  .hero-title {
    font-size: clamp(2rem, 6vw, 2.25rem);
    margin-top: 0.5rem; /* 减少标题顶部间距 */
    margin-bottom: 1rem;
    white-space: normal; /* 移动端允许换行 */
    max-width: 100%;
    text-align: left;
    flex-direction: column;
    align-items: flex-start;
  }

  .platform-tag {
    padding: 0.2rem 0;
    margin-top: 0.5rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
    margin-bottom: 2rem;
    max-width: 90%;
    text-align: left;
  }

  .cta-group {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.75rem;
    width: 100%;
    max-width: 100%;
  }
  .cta-primary,
  .cta-secondary {
    flex: 0 1 auto;
    min-width: 0;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}
@media (max-width: 480px) {
  .hero-content {
    padding-top: 12vh;
  }
  .hero-title {
    font-size: clamp(1.5rem, 6vw, 1.75rem);
    line-height: 1.3;
    margin-top: 1rem;
    text-align: left;
    display: block;
  }

  .title-highlight,
  .implementation-text,
  .platform-tag {
    display: inline;
  }

  .platform-tag {
    font-size: 0.8em;
    padding-left: 0.5rem;
  }

  .brand-tag {
    font-size: 0.8rem;
    padding: 0.4rem 0.9rem;
    margin: 1rem 0;
  }

  .hero-subtitle {
    font-size: 1rem;
    margin-bottom: 1.75rem;
    max-width: 100%;
    text-align: left;
  }

  .cta-group {
    gap: 0.5rem;
    flex-wrap: wrap;
    max-width: 100%;
    justify-content: flex-start;
  }
  .cta-primary,
  .cta-secondary {
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
    max-width: none;
    width: auto;
    min-width: 120px;
  }
}

@media (max-width: 360px) {
  .hero-content {
    padding-top: 10vh;
  }
  .hero-title {
    font-size: clamp(1.4rem, 7vw, 1.5rem);
    margin-top: 0.5rem;
    line-height: 1.3;
    text-align: left;
  }

  .brand-tag {
    margin: 0.75rem 0;
  }

  .content-wrapper {
    padding: 0 4vw;
  }

  .cta-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .cta-primary,
  .cta-secondary {
    width: 100%;
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
.hero-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
}
</style>

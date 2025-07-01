<template>
  <div class="VPHome">
    <div class="jetbrains-hero">
      <div v-if="backgroundVisible" class="hero-background">
        <svg
          class="animated-bg"
          viewBox="0 0 1400 800"
          preserveAspectRatio="xMidYMid slice"
          width="1400" height="800"
          loading="lazy"
          aria-hidden="true"
        >
          <rect
            x="1300"
            y="400"
            rx="40"
            ry="40"
            width="300"
            height="300"
            stroke="#5D67E8"
            fill="#5D67E8"
          >
            <animateTransform
              attributeType="XML"
              attributeName="transform"
              begin="0s"
              dur="15s"
              type="rotate"
              from="0 1450 550"
              to="360 1450 550"
              repeatCount="indefinite"
            />
          </rect>

          <path
            d="M 100 350 A 150 150 0 1 1 400 350 Q400 370 380 370 L 250 370 L 120 370 Q100 370 100 350"
            stroke="rgb(253, 214, 99)"
            fill="rgb(253, 214, 99)"
          >
            <animateMotion
              path="M 800 -200 L 800 -300 L 800 -200"
              dur="8s"
              begin="0s"
              repeatCount="indefinite"
            />
            <animateTransform
              attributeType="XML"
              attributeName="transform"
              begin="0s"
              dur="12s"
              type="rotate"
              values="0 210 530 ; -30 210 530 ; 0 210 530"
              keyTimes="0 ; 0.5 ; 1"
              repeatCount="indefinite"
            />
          </path>

          <circle cx="200" cy="150" r="20" stroke="#5D67E8" fill="#5D67E8">
            <animateMotion
              path="M 0 0 L 40 20 Z"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          <path
            d="M 165 580 L 270 580 Q275 578 270 570 L 223 483 Q220 480 217 483 L 165 570 Q160 578 165 580"
            stroke="rgb(238, 103, 92)"
            fill="rgb(238, 103, 92)"
          >
            <animateTransform
              attributeType="XML"
              attributeName="transform"
              begin="0s"
              dur="18s"
              type="rotate"
              from="0 210 530"
              to="360 210 530"
              repeatCount="indefinite"
            />
          </path>

          <circle
            cx="1200"
            cy="600"
            r="30"
            stroke="rgb(241, 243, 244)"
            fill="rgb(241, 243, 244)"
          >
            <animateMotion
              path="M 0 0 L -20 40 Z"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>

          <path
            d="M 100 350 A 40 40 0 1 1 180 350 L 180 430 A 40 40 0 1 1 100 430 Z"
            stroke="rgb(241, 243, 244)"
            fill="rgb(241, 243, 244)"
          >
            <animateMotion
              path="M 140 390 L 180 360 L 140 390"
              dur="10s"
              begin="0s"
              repeatCount="indefinite"
            />
            <animateTransform
              attributeType="XML"
              attributeName="transform"
              begin="0s"
              dur="15s"
              type="rotate"
              values="0 140 390; -60 140 390; 0 140 390"
              keyTimes="0 ; 0.5 ; 1"
              repeatCount="indefinite"
            />
          </path>

          <rect
            x="400"
            y="600"
            rx="40"
            ry="40"
            width="100"
            height="100"
            stroke="rgb(129, 201, 149)"
            fill="rgb(129, 201, 149)"
          >
            <animateTransform
              attributeType="XML"
              attributeName="transform"
              begin="0s"
              dur="16s"
              type="rotate"
              from="-30 550 750"
              to="330 550 750"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      </div>

      <div class="hero-content">
        <div class="content-wrapper">
          <h1 class="hero-main-title">SakitinSU / SSU</h1>
          <h2 class="hero-subtitle">Android root 实现：简易上手的开始</h2>
          <p class="hero-description" v-once>
            SakitinSU 将继续坚持 NGA 和 CU 一贯的简洁设计理念， 您只需要享受 SSU
            带来的权能，繁琐的底层细节交给我们就好。
          </p>
          <div class="cta-group">
            <a href="/guide/what-is-sakitinsu" class="cta-primary">
              <span class="cta-text">开始使用</span>
            </a>
            <a
              href="https://qm.qq.com/q/YoA4Fa4mY2"
              class="cta-secondary"
              target="_blank"
              rel="noopener"
            >
              <span class="cta-text">群组</span>
            </a>
            <a
              href="https://discord.gg/RQBBVhSCa5"
              class="cta-secondary"
              target="_blank"
              rel="noopener"
            >
              <span class="cta-text">频道</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <Transition name="toast" appear>
        <div v-if="visible" class="toast-notification" @click="handleClose">
          <div class="toast-content">
            <span class="toast-text">{{ content }}</span>
            <button class="toast-close" @click.stop="handleClose">×</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, defineAsyncComponent } from "vue"

// 预加载关键内容，使用 ref 初始化为已准备好的状态
const preloadContent = ref(true)

// [优化 2]: 添加一个 ref 来控制背景的可见性
const backgroundVisible = ref(false)

// 通知弹窗相关逻辑
const content = ref("仅支持中文阅读 (Chinese Only)")
const duration = 5000
const storageKey = "toast-notification-dismissed"
const autoShow = true
const visible = ref(false)

const handleClose = () => {
  visible.value = false
}

const shouldShow = () => {
  if (typeof localStorage === "undefined") return true
  return !localStorage.getItem(storageKey)
}

const show = () => {
  if (shouldShow()) {
    nextTick(() => {
      visible.value = true
      if (duration > 0) {
        setTimeout(() => {
          handleClose()
        }, duration)
      }
    })
  }
}

onMounted(() => {
  // 使用requestIdleCallback延迟渲染动画背景，优先处理LCP
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      backgroundVisible.value = true
    }, { timeout: 1000 });
  } else {
    // 回退方案：延长延迟时间以确保关键内容已渲染
    setTimeout(() => {
      backgroundVisible.value = true
    }, 1000) 
  }

  // 原有的通知逻辑
  if (autoShow) {
    setTimeout(show, 1500) // 增加延迟时间
  }
})
</script>

<style scoped>
/* 关键渲染路径优化 */
@font-face {
  font-family: 'LocalHeroFont';
  font-display: swap; /* 使用swap策略加快文本显示 */
  src: local('Arial'), local('Helvetica'), local('sans-serif');
}

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
  font-family: var(--vp-font-family-base);
  /* [优化 3]: 将背景色移到父元素，防止闪烁 */
  background: #ffffff;
}
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background: #ffffff; -- 已移除 */
  z-index: 1;
}
.animated-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 1;
  transform: translateZ(0); /* 启用GPU加速 */
  will-change: transform; /* 提示浏览器该元素将发生变化 */
  contain: layout paint style; /* 优化渲染性能 */
}
.hero-content {
  position: relative;
  z-index: 3;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0;
  width: 100%;
  content-visibility: auto; /* 优化渲染性能 */
  contain-intrinsic-size: 1px 800px; /* 提供渲染提示 */
}
.content-wrapper {
  max-width: 800px;
  width: 100%;
  margin: 0;
  align-items: flex-start;
  text-align: left;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.hero-main-title {
  font-size: clamp(3.2rem, 9vw, 5rem);
  font-weight: 700;
  margin: 0 0 1.2rem 0;
  letter-spacing: -0.02em;
  color: #6366f1;
  background: linear-gradient(90deg, #6366f1 0%, #f43f5e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: normal;
  text-align: left;
  line-height: 1.1;
  display: block;
  text-shadow: none;
}
.hero-subtitle {
  font-size: clamp(1.8rem, 5vw, 2.4rem);
  color: #1e293b;
  font-weight: 600;
  margin: 0 0 1.8rem 0;
  line-height: 1.3;
  max-width: 100%;
  text-align: left;
  background: none;
  animation: none;
}
.hero-description {
  font-size: 1.3rem;
  color: #64748b;
  font-weight: 400;
  margin: 0 0 3rem 0;
  line-height: 1.6;
  max-width: 100%;
  text-align: left;
  background: none;
  animation: none;
  font-family: 'LocalHeroFont', var(--vp-font-family-base); /* 使用本地字体优先回退 */
  transform: translateZ(0); /* 激活GPU加速 */
  will-change: auto; /* 自动优化 */
}
.cta-group {
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 100%;
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
.cta-primary:hover {
  background: #6366f1;
  color: #fff;
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
  transform: translateY(-3px);
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
.cta-secondary:hover {
  background: rgba(255, 255, 255, 0.95);
  color: #6366f1;
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  transform: translateY(-3px);
}

/* --- 暗黑模式和媒体查询样式（保持不变） --- */

:root.dark .jetbrains-hero {
  /* [优化 3]: 为父元素添加暗黑模式背景色 */
  background: #1b1b1f;
}

:root.dark .hero-background {
  background: #1b1b1f;
}
:root.dark .hero-main-title {
  color: #f8fafc;
}
:root.dark .hero-subtitle {
  color: #e2e8f0;
}
:root.dark .hero-description {
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
}

/* --- 媒体查询和通知样式（保持不变） --- */
@media (max-width: 1200px) {
  .VPHome {
    padding-left: 0;
  }
  .content-wrapper {
    max-width: 90vw;
    padding: 0 5vw;
  }
  .hero-content {
    justify-content: flex-start;
  }
}
/* ... 其他媒体查询 ... */

.toast-notification {
  position: fixed;
  top: 10%;
  right: 20px;
  z-index: 10000;
  max-width: 500px; /* 桌面端更大 */
  min-width: 360px; /* 桌面端更大 */
  border-radius: 16px;
}
.toast-content {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 18px 28px; /* 桌面端更大 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px; /* 桌面端更大 */
  cursor: pointer;
  transition: all 0.2s ease;
}
.toast-content:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}
.toast-text {
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
  color: var(--vp-c-text-1);
  white-space: pre-line;
  word-break: break-all;
}
.toast-close {
  background: none;
  border: none;
  font-size: 18px;
  line-height: 1;
  color: var(--vp-c-text-2);
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}
.toast-close:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
:root.dark .toast-content {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
</style>
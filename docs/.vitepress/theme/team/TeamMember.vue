<script lang="ts" setup>
import { computed } from "vue"
import {
  VTIconCode,
  VTIconCodePen,
  VTIconGitHub,
  VTIconGlobe,
  VTIconHeart,
  VTIconLink,
  VTIconLinkedIn,
  VTIconMapPin,
  VTIconX,
  VTLink,
} from "@vue/theme"
import type { Member } from "./Member"

const props = defineProps<{
  member: Member
}>()

const avatarUrl = computed(() => {
  return (
    props.member.avatarPic ??
    `https://q1.qlogo.cn/g?b=qq&nk=${props.member.qq}&s=640`
  )
})
</script>

<template>
  <article class="TeamMember">
    <div class="liquid-glass-wrapper">
      <div class="member-content">
        <VTLink
          v-if="member.sponsor"
          :href="`https://github.com/sponsors/${member.socials.github}`"
          class="sponsor"
          no-icon>
          <VTIconHeart class="sponsor-icon" />
          Sponsor
        </VTLink>

        <figure class="avatar">
          <img
            :alt="`${member.name}'s Profile Picture`"
            :src="avatarUrl"
            class="avatar-img" />
        </figure>

        <div class="data">
          <h1 class="name">{{ member.name }}</h1>
          <p class="org">
            {{ member.title || "" }}
            <span v-if="member.company && member.company.trim()" class="nowrap">
              @
              <VTLink
                v-if="member.companyLink"
                :href="member.companyLink"
                :no-icon="true"
                class="company link">
                {{ member.company }}
              </VTLink>
              <span v-else class="company">
                {{ member.company }}
              </span>
            </span>
          </p>

          <div class="profiles">
            <!-- 项目信息 -->
            <div
              v-if="member.projects && member.projects.length > 0"
              class="info-row">
              <div class="info-icon">
                <VTIconCode class="desc-icon code" />
              </div>
              <div class="info-content">
                <span
                  v-for="(project, index) in member.projects"
                  :key="project.label">
                  <VTLink :href="project.url" :no-icon="true" class="desc-link">
                    {{ project.label }}
                  </VTLink>
                  <span
                    v-if="index < member.projects.length - 1"
                    class="separator"
                    >•</span
                  >
                </span>
              </div>
            </div>

            <!-- 位置信息 -->
            <div
              v-if="member.location && member.location.trim()"
              class="info-row">
              <div class="info-icon">
                <VTIconMapPin class="desc-icon" />
              </div>
              <div class="info-content">
                {{ member.location }}
              </div>
            </div>

            <!-- 语言信息 -->
            <div
              v-if="member.languages && member.languages.length > 0"
              class="info-row">
              <div class="info-icon">
                <VTIconGlobe class="desc-icon" />
              </div>
              <div class="info-content">
                <span
                  v-for="(language, index) in member.languages"
                  :key="language">
                  {{ language }}
                  <span
                    v-if="index < member.languages.length - 1"
                    class="separator"
                    >•</span
                  >
                </span>
              </div>
            </div>

            <!-- 网站信息 -->
            <div
              v-if="
                member.website && member.website.url && member.website.label
              "
              class="info-row">
              <div class="info-icon">
                <VTIconLink class="desc-icon" />
              </div>
              <div class="info-content">
                <VTLink
                  :href="member.website.url"
                  :no-icon="true"
                  class="desc-link">
                  {{ member.website.label }}
                </VTLink>
              </div>
            </div>

            <!-- 社交媒体链接 -->
            <div class="info-row social-row">
              <div class="info-icon"></div>
              <div class="info-content">
                <div class="social-list">
                  <VTLink
                    v-if="member.socials.github"
                    :href="`https://github.com/${member.socials.github}`"
                    :no-icon="true"
                    class="social-link">
                    <VTIconGitHub class="social-icon" />
                  </VTLink>
                  <VTLink
                    v-if="member.socials.x"
                    :href="`https://x.com/${member.socials.x}`"
                    :no-icon="true"
                    class="social-link">
                    <VTIconX class="social-icon" />
                  </VTLink>
                  <VTLink
                    v-if="member.socials.linkedin"
                    :href="`https://www.linkedin.com/in/${member.socials.linkedin}`"
                    :no-icon="true"
                    class="social-link">
                    <VTIconLinkedIn class="social-icon" />
                  </VTLink>
                  <VTLink
                    v-if="member.socials.codepen"
                    :href="`https://codepen.io/${member.socials.codepen}`"
                    :no-icon="true"
                    class="social-link">
                    <VTIconCodePen class="social-icon" />
                  </VTLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.TeamMember {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 液态玻璃包装器 - 纯 CSS 实现 */
.liquid-glass-wrapper {
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  position: relative;

  /* 基础玻璃效果 - 使用新的颜色 #fbfcff */
  background: linear-gradient(
    135deg,
    rgba(251, 252, 255, 0.85) 0%,
    rgba(251, 252, 255, 0.75) 50%,
    rgba(251, 252, 255, 0.8) 100%
  );
  backdrop-filter: blur(20px) saturate(150%) brightness(110%);
  -webkit-backdrop-filter: blur(20px) saturate(150%) brightness(110%);

  /* 增强的玻璃边框效果 */
  border: 2px solid transparent;
  background-clip: padding-box;

  /* 多层边框效果 */
  box-shadow:
    /* 外层发光边框 */
    0 0 0 1px rgba(251, 252, 255, 0.8),
    /* 外层彩色光晕 */
    0 0 0 2px rgba(123, 131, 255, 0.2),
    /* 内层高光边框 */ 
    inset 0 0 0 1px rgba(255, 255, 255, 0.9),
    /* 内层彩色边框 */
    inset 0 0 0 2px rgba(251, 252, 255, 0.7),
    /* 主要阴影 */ 
    0 8px 32px rgba(0, 0, 0, 0.12),
    /* 次要阴影层 */
    0 4px 16px rgba(123, 131, 255, 0.08),
    /* 玻璃反光效果 */ 
    inset 0 1px 0 rgba(255, 255, 255, 0.95),
    inset 0 -1px 0 rgba(255, 255, 255, 0.4),
    /* 侧边玻璃反光 */ 
    inset 1px 0 0 rgba(255, 255, 255, 0.5),
    inset -1px 0 0 rgba(255, 255, 255, 0.5),
    /* 边角高光 */
    inset 0 2px 4px rgba(255, 255, 255, 0.3),
    inset 0 -2px 4px rgba(255, 255, 255, 0.2);

  /* 过渡效果 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 悬停时的动态效果 */
.liquid-glass-wrapper:hover {
  backdrop-filter: blur(25px) saturate(180%) brightness(120%);
  -webkit-backdrop-filter: blur(25px) saturate(180%) brightness(120%);

  /* 悬停时增强玻璃边框效果 */
  box-shadow:
    /* 外层发光边框 - 增强 */
    0 0 0 1px rgba(251, 252, 255, 1),
    /* 外层彩色光晕 - 增强 */
    0 0 0 3px rgba(123, 131, 255, 0.35),
    /* 内层高光边框 - 增强 */ 
    inset 0 0 0 1px rgba(255, 255, 255, 1),
    /* 内层彩色边框 - 增强 */
    inset 0 0 0 2px rgba(251, 252, 255, 0.9),
    /* 主要阴影 - 增强 */ 
    0 12px 48px rgba(0, 0, 0, 0.18),
    /* 次要阴影层 - 增强 */
    0 6px 24px rgba(123, 131, 255, 0.15),
    /* 玻璃反光效果 - 增强 */ 
    inset 0 1px 0 rgba(255, 255, 255, 1),
    inset 0 -1px 0 rgba(255, 255, 255, 0.6),
    /* 侧边玻璃反光 - 增强 */ 
    inset 1px 0 0 rgba(255, 255, 255, 0.7),
    inset -1px 0 0 rgba(255, 255, 255, 0.7),
    /* 边角高光 - 增强 */
    inset 0 3px 6px rgba(255, 255, 255, 0.4),
    inset 0 -3px 6px rgba(255, 255, 255, 0.3),
    /* 额外的外围光晕 */ 
    0 0 20px rgba(251, 252, 255, 0.4),
    0 0 40px rgba(123, 131, 255, 0.2);

  transform: translateY(-2px);
}

/* 流动光效背景 */
.liquid-glass-wrapper::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  animation: liquid-flow 8s ease-in-out infinite;
  pointer-events: none;
  z-index: -1;
}

@keyframes liquid-flow {
  0%,
  100% {
    transform: translate(-50%, -50%) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translate(-30%, -30%) rotate(180deg);
    opacity: 0.6;
  }
}

/* Safari 和 Firefox 降级方案 */
@supports not (backdrop-filter: blur(20px)) {
  .liquid-glass-wrapper {
    background: linear-gradient(
      135deg,
      rgba(251, 252, 255, 0.9) 0%,
      rgba(251, 252, 255, 0.8) 50%,
      rgba(251, 252, 255, 0.85) 100%
    );
    border: 2px solid rgba(251, 252, 255, 0.7);
  }
}

/* 深色模式适配 */
.dark .liquid-glass-wrapper {
  background: linear-gradient(
    135deg,
    rgba(251, 252, 255, 0.12) 0%,
    rgba(251, 252, 255, 0.08) 50%,
    rgba(251, 252, 255, 0.1) 100%
  );

  /* 深色模式下的玻璃边框 */
  box-shadow:
    /* 外层发光边框 */
    0 0 0 1px rgba(251, 252, 255, 0.4),
    /* 外层彩色光晕 */
    0 0 0 2px rgba(123, 131, 255, 0.15),
    /* 内层高光边框 */ 
    inset 0 0 0 1px rgba(255, 255, 255, 0.5),
    /* 内层彩色边框 */
    inset 0 0 0 2px rgba(251, 252, 255, 0.3),
    /* 主要阴影 */ 
    0 8px 32px rgba(0, 0, 0, 0.7),
    /* 次要阴影层 */
    0 4px 16px rgba(123, 131, 255, 0.1),
    /* 玻璃反光效果 */ 
    inset 0 1px 0 rgba(255, 255, 255, 0.6),
    inset 0 -1px 0 rgba(255, 255, 255, 0.25),
    /* 侧边玻璃反光 */ 
    inset 1px 0 0 rgba(255, 255, 255, 0.3),
    inset -1px 0 0 rgba(255, 255, 255, 0.3),
    /* 边角高光 */
    inset 0 2px 4px rgba(255, 255, 255, 0.2),
    inset 0 -2px 4px rgba(255, 255, 255, 0.15);
}

.dark .liquid-glass-wrapper:hover {
  box-shadow:
    /* 外层发光边框 - 增强 */
    0 0 0 1px rgba(251, 252, 255, 0.6),
    /* 外层彩色光晕 - 增强 */
    0 0 0 3px rgba(123, 131, 255, 0.25),
    /* 内层高光边框 - 增强 */ 
    inset 0 0 0 1px rgba(255, 255, 255, 0.7),
    /* 内层彩色边框 - 增强 */
    inset 0 0 0 2px rgba(251, 252, 255, 0.5),
    /* 主要阴影 - 增强 */ 
    0 12px 48px rgba(0, 0, 0, 0.9),
    /* 次要阴影层 - 增强 */
    0 6px 24px rgba(123, 131, 255, 0.15),
    /* 玻璃反光效果 - 增强 */ 
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 -1px 0 rgba(255, 255, 255, 0.4),
    /* 侧边玻璃反光 - 增强 */ 
    inset 1px 0 0 rgba(255, 255, 255, 0.5),
    inset -1px 0 0 rgba(255, 255, 255, 0.5),
    /* 边角高光 - 增强 */
    inset 0 3px 6px rgba(255, 255, 255, 0.3),
    inset 0 -3px 6px rgba(255, 255, 255, 0.2),
    /* 额外的外围光晕 */ 
    0 0 20px rgba(251, 252, 255, 0.3),
    0 0 40px rgba(123, 131, 255, 0.15);
}

/* 成员内容容器 */
.member-content {
  position: relative;
  background-color: rgba(251, 252, 255, 0.95);
  transition: background-color 0.5s;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
}

@media (min-width: 512px) {
  .member-content {
    display: flex;
    flex-direction: row;
    border-radius: 24px;
  }

  .liquid-glass-wrapper {
    border-radius: 24px;
  }
}

@media (min-width: 640px) {
  .member-content {
    border-radius: 28px;
  }

  .liquid-glass-wrapper {
    border-radius: 28px;
  }
}

.sponsor {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  border: 1px solid #fd1d7c;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  color: #fd1d7c;
  transition:
    color 0.25s,
    background-color 0.25s;
}

.sponsor:hover {
  color: var(--vt-c-white);
  background-color: #fd1d7c;
}

.sponsor-icon {
  margin-right: 6px;
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.avatar {
  flex-shrink: 0;
  padding: 20px 20px 0;
}

@media (min-width: 512px) {
  .avatar {
    padding: 24px 0 0 24px;
  }
}

.avatar-img {
  border-radius: 50%;
  width: 90px;
  height: 90px;
  transform: translateX(0);
}

@media (min-width: 512px) {
  .avatar-img {
    width: 100px;
    height: 100px;
    transform: translateX(0);
  }
}

.data {
  padding: 16px 20px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

@media (min-width: 512px) {
  .data {
    padding: 24px 20px 20px 20px;
  }
}

.name {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.org {
  padding-top: 2px;
  line-height: 18px;
  max-width: 320px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
  margin: 0;
}

.company {
  color: var(--vt-c-text-1);
  transition: color 0.25s;
}

.company.link:hover {
  color: var(--vt-c-brand);
  transition: color 0.5s;
}

.profiles {
  padding-top: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px; /* 固定间隔 */
}

.desc {
  display: flex;
  align-items: flex-start;
  min-height: 20px;
}

.desc-title {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding-right: 12px;
  height: 20px;
}

/* 新的信息行样式 */
.info-row {
  display: flex;
  align-items: flex-start;
  min-height: 20px;
}

.info-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 28px;
  height: 20px;
}

.info-content {
  flex: 1;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vt-c-text-1);
  transition: color 0.25s;
}

.separator {
  margin: 0 6px;
  color: var(--vt-c-text-3);
}

.social-row .info-content {
  display: flex;
  align-items: center;
}

.desc-icon {
  width: 16px;
  height: 16px;
  fill: var(--vt-c-text-2);
  transition: fill 0.25s;
}

.desc-icon.code {
  transform: translateY(1px);
}

.desc-link {
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: #fcbfc7;
  transition: color 0.25s;
  text-decoration: none;
}

.desc-link:hover {
  color: var(--vt-c-brand-1);
}

.social-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 0; /* 移除额外的上边距，使用gap统一控制 */
}

.social-item + .social-item {
  padding-left: 0; /* 移除padding，使用gap控制间距 */
}

.social-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  color: var(--vt-c-text-2);
  transition: color 0.25s;
}

.social-link:hover {
  color: var(--vt-c-text-1);
}

.social-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}
</style>

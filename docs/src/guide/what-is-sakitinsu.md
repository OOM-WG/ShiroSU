---
layout: doc
title: 什么是 SakitinSU？
description: 了解 SakitinSU - 基于内核的 Android Root 解决方案
showPageStats: true
progress: 30
outline: deep
---

# 什么是 SakitinSU？

## 避嫌声明

我们不与其他 `ROOT` 实现竞争，人际关系那点破事我们也懒得搅和
所以不管别人说什么，我们希望你不要在意，只是选择你想要的就好，你觉得什么好用就用什么

<mark>SakitinSU</mark>（简称 <mark>SakiSU/SKTSU/SSU</mark>
）是由回忆溢出工作组 <mark>[(OOM. WG.)](https://oom-wg.dev)</mark> 以核心成员 [@安音咲汀](https://github.com/TianwanTW)
的名字命名的内核级 Root 解决方案。

SakitinSU 致力于为 Android 设备提供一套简单易用的内核级 Root 权限管理工具。它是继 `Magisk`、`KernelSU` 和 `APatch` 之后的新一代
Root 方案，与 `KernelSU` 一样在内核模式下运行，能够直接在内核空间为用户空间应用程序授予 Root 权限。

> [!TIP]
> 只想快速体验？请前往 [快速开始](installation.md)

---

## SakitinSU 的特点

- **内核模式运行**：直接在内核空间授予 Root 权限，带来更高的安全性与稳定性。
- **高兼容性**：目前支持内核版本 5.10 及以上（LKM 方式），未来计划支持非 GKI 内核。
- **多重安全认证**：管理器支持生物识别、密码等多种方式进行授权验证，保障设备安全。

## 如何使用？

请参考 [安装指南](installation.md) 获取详细的安装与使用说明。

## 模块开发

开发者可参考 [模块开发指南](../development/module-development.md) 进行自定义模块开发

## 了解更多

想了解 SakitinSU 的项目背景与发展历程？请参阅 [项目起源](../about/origin.md)

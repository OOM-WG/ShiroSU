---
layout: doc
title: 什么是 SakitinSU？
description: 了解 SakitinSU - 基于内核的 Android Root 解决方案
showPageStats: true
progress: 30
outline: deep
next:
  text: "安装指南"
  link: "/guide/installation"
---

# 什么是 SakitinSU？

<mark>SakitinSU</mark> ，简称<mark>SakiSU/SKTSU/SSU</mark>，是由回忆溢出工作组<mark>(OOM. WG.)</mark>
以核心成员[@安音咲汀](https://github.com/TianwanTW)的名称命名的内核级root实现

<mark>SakitinSU</mark> 是一款继 `Magisk、KernelSU` 和 `Apatch` 之后，为 Android 设备设计的易于上手的内核级 Root 解决方案。它与 `KernelSU` 一样，在内核模式下运行，直接在内核空间中为用户空间应用程序授予 `Root` 权限。

> [!TIP]
> 只是想尝试一下？跳到[快速开始](installation.md)

---

## SakitinSU 的特点

- **内核模式运行**：直接在内核空间中授予 `root` 权限，提供更高的安全性和稳定性
- **兼容性**：仅支持 内核版本为 `5.10 `及以上版本 `(LKM)`
- **安全性**: 管理器可通过 生物识别、密码等方式进行验证授权

---

## 如何使用 ?

请参考 [安装指南](installation.md)

---

## 模块开发

请参考 [模块开发指南](../development/module-development.md)

---

## 了解 SakitinSU 更多信息

请跳转 [项目起源](../about/origin.md)

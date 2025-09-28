---
layout: doc
title: 模块开发
description: 学习如何为 ShiroSU 开发和构建自定义模块
outline: deep
footer: false
---

# **模块开发**

ShiroSU 作为有多条开发方向的项目，为 ShiroSU 开发适配 ShiroSU 特性的模块有大致两条方向:

- **管理器**特性: 是 ShiroSU 管理器的特性，在其他 root 实现上也可使用
- **原生 root** 特性: 是 ShiroSU root 实现的特性，与其他 root 实现略有不同

> [!IMPORTANT]
> 如果将 ShiroSU 仅用于其他 root 实现的 root 管理器，那么模块标准应当以当前 root 实现为准，ShiroSU **不会干涉**其他 root 实现的任何行为
>
> 但不依赖 root 实现的标准可以**额外再遵守** ShiroSU 管理器 的标准，实现对 ShiroSU 管理器的专门适配

因此具体的开发内容由此分成两大块:

- 管理器相关:
  - [管理器特性开发](manager)
  - [ConfigUI](cfgui)
  - [WebUI](webui)
- 原生 root:
  - [原生特性开发](root)
  - [内核接口开发](kernel)

除此之外，还要以下额外内容:

- [模块构建工具](builder)

> [!TIP]
> 使用 ShiroSU 模块构建工具可以快速生成适配多种 root 实现并且适配 ShiroSU 本身的模块
>
> 同时也可以使用来自 [NGA SDK](https://app.niggergo.work) 的辅助函数以及 Shell 加密，
> 提升开发便利性以及安全性

---
layout: doc
title: 内核接口开发
description: 了解如何适配 ShiroSU 的内核接口
outline: deep
footer: false
---

# **内核接口开发**

> [!IMPORTANT]
> ShiroSU 的原生 root 还在开发中，具体内容随时可能变动！

一些模块会对获取已授权 root 的软件列表或需要隐藏 root 的软件列表有所需求，
目前 ShiroSU 内核会使用如下内容

## 接口文件

ShiroSU 使用 `/data/adb/ssu/._settings` 作为内核设置目录，通常包含以下文件:

- `._su_list`: 授权使用超级用户权限的列表
- `._bypass_list`: 绕过 SELinux 限制的列表
- `._hide_list`: 需要隐藏 root 使用痕迹的列表

<mark>以上文件均采用 `二进制 UID`(`32` 位整数) + `\0` + `软件包名` 格式存储，多个值之间以 `\n` 间隔</mark>

> [!IMPORTANT]
> 以上文件均为只读，任何模块/软件都不应该修改 ShiroSU 的内核配置文件，**仅 ShiroSU 管理器**有修改权限！
>
> 其他模块/软件修改理应无效，ShiroSU 会在后续更新中逐步添加对内核配置文件写入的限制

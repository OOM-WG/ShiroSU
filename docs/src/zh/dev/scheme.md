---
layout: doc
title: 管理器 Scheme
description: 了解如何使用 ShiroSU 管理器的 Scheme 方式调用
outline: deep
footer: false
---

# **管理器 Scheme**

ShiroSU 管理器会注册 `ssu` 和 `shirosu` 两个 `scheme`，只需要通过 `ssu://...` 或 `shirosu://...` 即可调用

如果没有传入或传入错误的内容，只会打开 ShiroSU 管理器的主页，支持的 `host` 如下:

## module

调用此 `host`，需要传入以下 `path` 之一:

### action

调用此 `path`，需要传入以下 `query`:

- `id`: 模块 ID

示例: `ssu://module/action?id=xxx`

调用后，会执行该模块的 `操作`，如果不存在该模块，则只会打开 ShiroSU 管理器的主页

### webui

调用此 `path`，需要传入以下 `query`:

- `id`: 模块 ID

示例: `ssu://module/webui?id=xxx`

调用后，会跳转该模块的 `WebUI`，如果不存在该模块，则只会打开 ShiroSU 管理器的主页

### install

调用此 `path`，需要传入以下 `query`:

- `name`: 模块名称，不传入则为 `未知`
- `url`: 模块下载链接

示例: `ssu://module/install?name=meow&url=https://meow.latestfile.zip`

调用后，会下载并安装该模块

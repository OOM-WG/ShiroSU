---
layout: doc
title: WebUI 模块开发
description: 了解如何开发具有 Web 界面的 SakitinSU 模块
outline: deep
footer: false
---

# **WebUI 模块开发**

SakitinSU 的 WebUI 标准与 KerenlSU 保持一致，详细规范请参考 [KerenlSU 模块 WebUI](https://kernelsu.org/zh_CN/guide/module-webui.html)。

除此之外，SakitinSU 的 WebUI JavaScript 接口的 `moduleInfo` 函数额外提供一个`updatable`值，此值会受到用户网络环境影响。

### **模块目录结构**

模块目录应遵循以下结构：

```
.
├── module.prop
└── webroot
  ├── index.html
  └── 其他Web资源...
```

**`webroot`** 目录是 WebUI 的根目录，包含所有前端资源。

## **开发 Demo**

我们提供了一个简单的 WebUI Demo，它使用 **`vite`** 进行打包，并基于 **`vue3`** 开发，同时集成了 **`KernelSU`** 包，以帮助您快速入门。

- **WebUI Demo 仓库**: <https://github.com/OOM-WG/WebUI_Demo>
- **WebUI Demo 截图**: [WebUI Demo 截图](/assets/img/webui.webp)

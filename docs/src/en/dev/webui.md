---
layout: doc
title: WebUI Module Development
description: Learn how to develop SakitinSU modules with a web interface
outline: deep
footer: false
---
# **WebUI Module Development**

SakitinSU's WebUI standard adheres to KerenlSU, please refer to the [KerenlSU Module WebUI](https://kernelsu.org/zh_CN/guide/module-webui.html) for detailed specifications.

In addition, SakitinSU's WebUI JavaScript interface's `moduleInfo` function provides an extra `updatable` value, which will be affected by the user's network environment.

### **Module Directory Structure**

The module directory should follow the following structure:

```
.
├── module.prop
└── webroot
  ├── index.html
  └── Other Web Resources...
```

The **`webroot`** directory is the root directory of the WebUI, containing all frontend resources.

## **Development Demo**

We provide a simple WebUI Demo, which uses **`vite`** for bundling and is based on **`vue3`**, and integrates **`KernelSU`** package to help you get started quickly.

- **WebUI Demo Repository**: <https://github.com/OOM-WG/WebUI_Demo>
- **WebUI Demo Screenshot**: [WebUI Demo Screenshot](/assets/img/webui.webp)
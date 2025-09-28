---
layout: doc
title: root 实现适配情况
footer: false
---

# **root 实现适配情况**

ShiroSU 作为以支持各类 root 实现为目标的软件，兼容性情况如下

## 模块兼容性

ShiroSU 支持管理其他 root 实现的模块，
所有模块目录在 `/data/adb/modules` 的 root 实现，ShiroSU 都可以兼容，
具体的模块功能适配如下:

> [!NOTE]
> 由于暂未出现有较多用户使用的模块目录不在 `/data/adb/modules` 的 root 实现，
> 故暂不推出模块目录自定义功能

- 操作(`action.sh`): 已完全适配
- WebUI(`webroot`): 已完全在 [KernelSU 标准](https://kernelsu.org/zh_CN/guide/module-webui.html) 上适配，未计划适配 [WebUIX](https://mmrl.dev/guide/webuix/)

## root 兼容性

ShiroSU 支持管理其他 root 实现的权能管理，
具体的 root 实现适配如下:

- [Magisk](https://topjohnwu.github.io/Magisk/): 支持 **root 权能**管理以及**排除列表**管理
- [KernelSU](https://kernelsu.org/zh_CN/): 支持 **root 权能**管理以及**卸载模块**管理 (使用**原版**但设备上安装了 `KernelSU Next` 或 `SukiSU Ultra` 会无法使用)
  - [KernelSU Next](https://kernelsu-next.github.io/webpage/zh_CN/): 有特别适配，可正常使用
  - [SukiSU Ultra](https://sukisu.org/zh/): 有特别适配，可正常使用
- [APatch](https://apatch.dev/zh_CN/): 暂不支持，仍在计划中
- [SKRoot](https://github.com/abcz316/SKRoot-linuxKernelRoot): 暂不支持，仍在计划中

> [!WARNING]
> 使用 KernelSU 时若开启了 `默认卸载模块`，则 ShiroSU 内的卸载模块管理会失效！

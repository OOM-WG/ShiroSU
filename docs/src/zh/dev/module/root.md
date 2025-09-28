---
layout: doc
title: 原生特性开发
description: 了解如何开发适配 ShiroSU 原生 root 的模块
outline: deep
footer: false
---

# **原生特性开发**

> [!IMPORTANT]
> ShiroSU 的原生 root 还在开发中，具体内容随时可能变动！

对于大部分内容，ShiroSU 与 **`Magisk` 和 `KernelSU`** 基本保持一致，此处仅介绍不同之处

> [!IMPORTANT]
> 请确保模块内的所有文本文件均使用 `UNIX (LF)` 换行类型，而不是 `Windows (CR + LF)` 或 `Macintosh (CR)`！

## 模块系统

### Systemless [^1]

ShiroSU 的 Systemless 是一种类似于 Magisk 的挂载机制，其接口完全兼容 Magisk，例如 `.replace` 用法，
但 ShiroSU 的挂载机制兼容性更强，是基于动态识别分区实现的，
也就是说，模块可以直接通过 Systemless 挂载例如 `odm` 以及其他 root 实现无法挂载的分区，无需为此而付出额外的心血

并且，为了保证更强的安全性，ShiroSU 的 Systemless 会无视模块挂载的 **文件/目录的 SELinux 上下文**、**目录的权限**以及**文件/目录的用户/组**，
如果文件挂载到了不存在的目录，那么其 **SELinux 上下文**、**权限**、**用户/组**均会继承自父目录。通常来说，这些行为不会影响模块的运行，反而有助于提高稳定性

::: tip

ShiroSU 的 Systemless 会使用模块目录中的 `systemless` 文件夹执行挂载，
如果模块通过 `system` 文件夹使用 Systemless，那么 `systemless` 文件夹会被**自动创建**

如果模块仅适配 ShiroSU，那么可以直接通过 `systemless` 文件夹使用 Systemless

:::

### Shell

ShiroSU 在此处与其他 root 实现有较大差异，ShiroSU 运行的 Shell 脚本默认**并不**在 `BusyBox` 中以 “独立模式” 运行。

为了提升 Shell 脚本开发的便利性，
ShiroSU 使用 [sush](https://github.com/shellgei/rusty_bash) (用 Rust 编写的 `Bash`)
运行 Shell 脚本，
并且优先使用 [uutils](https://github.com/uutils/coreutils) (用 Rust 编写的 `coreutils`)
的命令集，以 Magisk 的 BusyBox 作为替补。
也就是说，命令**优先从 uutils 获取**，没有的命令才会从 BusyBox 获取

由于并不在 BusyBox 中以 “独立模式” 运行，命令都是通过 `PATH` 环境变量注入的，请勿在模块的 Shell 脚本内硬编码修改 `PATH`！

#### 环境变量

为了便于区分，ShiroSU 在模块运行时注入以下变量:

- `SSU` (布尔值): 在 ShiroSU 环境下运行时，此值将为 `true`
  > 但这并不能代表可以通过 `$SSU && # code ...` 来执行代码，应当始终使用 `[ "$SSU" = true ]` 或类似方法来检测 ShiroSU
- `SSU_VER` (字符串): ShiroSU 的版本号 (不包括补丁号)
- `SSU_VER_CODE` (整数值): ShiroSU 的纯数字版本号 (包括补丁号)

#### Recovery

ShiroSU 不支持通过 Recovery 安装模块，
并且在模块安装时 `META-INF/com/google/android/update-binary` 中的代码不会被执行

#### SU 调用

ShiroSU 的 SU 实现默认附带了一个仅能用于直接执行 Shell 命令的 `sudo`，可以直接通过 `sudo` 来执行例如 `sudo ls /`。

`sudo` 仅作为一个简易的 `su -c` 替代品而存在，但是任何模块内都**不应该**通过 `sudo` 或 `su -c` 执行 Shell 命令！

<mark>同样的，任何模块也**不应该**通过**硬编码**来获取命令，例如 `/data/adb/ssu/bin/busybox crond`，
因为无论是在 BusyBox 的 “独立模式” 还是直接通过 `PATH` 注入命令，命令都已经可以直接调用，无需任何硬编码的手动获取行为。</mark>

[^1]: Systemless 机制是一种无需直接修改系统分区即可实现修改系统文件的方法，为模块提供了便利性

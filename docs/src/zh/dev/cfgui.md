---
layout: doc
title: ConfigUI 模块开发
description: 了解如何开发具有配置界面的 ShiroSU 模块
outline: deep
footer: false
---

# **ConfigUI 模块开发**

ConfigUI 是 ShiroSU 特有的一种功能，旨在通过 FVV [^1] 的 FWW [^2] 低学习成本地快速生成 CU NGA 风格 [^3] 的模块配置界面

使用 ConfigUI 要求模块的**配置文件必须以 FVV 格式 编写**，除非是能让 FVV 解析的简单赋值格式

ConfigUI 的 配置文件、多语言文件、UI 文件 也必须以 FVV 格式 编写，因此需要了解 FVV 格式 才能使用 ConfigUI

## 模块目录结构

模块目录应遵循以下结构:

```plaintext
.
├── module.prop
└── cfgui
  ├── config.fvv
  ├── ui
  │ └── FWW UI 配置文件...
  ├── lang (可选)
  │ └── FVV 多语言 配置文件...
  └── 其他资源...
```

- **`cfgui`** 目录是 ConfigUI 的根目录，包含所有配置
- **`module.prop`** 为模块描述文件

## 配置 ConfigUI

`config.fvv` 是 ConfigUI 的配置文件，其中应当包含以下内容:

- `ConfigPath`: 模块的 FVV 配置文件路径，将会以 `cfgui`的相对路径、模块目录的相对路径、绝对路径 顺序查找
- `DefaultLang` (可选): 多语言的默认回滚语言
- `IconPath` (可选): 图标路径，用于创建快捷方式
- `InitCommand` (可选): ConfigUI 初始化时需要执行的 Shell 代码

### 多语言

多语言的配置文件需要存储到 `lang` 目录内，以**下斜杠**语言标签作为子目录名称，其中的文件会被递归载入至当前语言标签

> [!IMPORTANT]
> 语言标签目录内的 FVV 配置文件会被**无差别**递归读取，子目录路径不会影响其被解析时的行为！

多语言内的文本会被存储到 `Lang` 内，故调用时需要在值名称前加上 `Lang.`

### 界面

界面的配置文件需要存储到 `ui` 目录内

> [!IMPORTANT]
> FWW 的文件后缀是 `fww` 而不是 `fvv`！
>
> 目录内的 FWW 配置文件会被**无差别**递归读取，子目录路径不会影响其被解析时的行为！

由于解析时会直接赋值多语言文本，故无法直接将 FWW 界面存储至 `UI` 内，请务必保证每个页面均以 `UI.` 开头！
仅有赋值进 `UI` 内的页面才会被解析为 FWW 界面！

ConfigUI 的 FWW 界面均使用 **FVV 列表** 作为页面，
其中 `UI.Main` 是 ConfigUI 的默认页面，编写 ConfigUI 需要确保至少有 `UI.Main` 一个界面！

ConfigUI 会将页面的注释设置为该页面的标题:

```fww
UI.PageA = [
    <...>
] <页面A>
<直接命名>

UI.PageB = [
    <...>
] <Lang.PageB>
<通过多语言命名>
```

每个页面的除 `UI.` 外的内容是其路由名称，并且 ConfigUI **不支持**多级定义！请确保所有页面定义均为 `UI` 的顶级定义！

[^1]: [FVV](https://github.com/OOM-WG/FVV) 是一种简单易上手的语言，主要目的是实现一种自由方便的配置文件格式

[^2]: FWW (FVV Widget) 是 FVV 的图形化实现，尽管 FVV 本身并不是一种独立语言，但是 FWW 通过其他语言解析 FWW 的配置文件从而生成界面

[^3]: CU NGA 风格 是基于 [Chenzyadb](https://github.com/chenzyadb) 的 [CU 风格](https://github.com/chenzyadb/CuprumTurbo-Scheduler) 的 [MD3 风格](https://m3.material.io/) 界面而设计的一种类似于它的界面风格，但是 CU NGA 风格 也可以基于 [FlexiUI](https://github.com/BetterAndroid/FlexiUI) 或 [Miuix](https://miuix-kotlin-multiplatform.github.io/miuix/zh_CN/) 实现

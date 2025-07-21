---
layout: doc
title: WebUI モジュール開発
description: Webインターフェースを持つSakitinSUモジュールを開発する方法を学びましょう
outline: deep
footer: false
---
# **WebUI 模块开发**

SakitinSU の WebUI 標準は KerenlSU と一致しています。詳細な仕様については、[KerenlSU 模块 WebUI](https://kernelsu.org/zh_CN/guide/module-webui.html) を参照してください。

それに加えて、SakitinSU の WebUI JavaScript インターフェースの `moduleInfo` 関数は、追加で `updatable` 値を提供します。この値はユーザーのネットワーク環境の影響を受けます。

### **モジュールディレクトリ構造**

モジュールディレクトリは、次の構造に従う必要があります。

```
.
├── module.prop
└── webroot
  ├── index.html
  └── 其他Web资源...
```

**`webroot`** ディレクトリは WebUI のルートディレクトリであり、すべてのフロントエンドリソースが含まれています。

## **開発 Demo**

**`vite`** を使用してパッケージ化され、**`vue3`** に基づいて開発された、シンプルな WebUI Demo を提供します。同時に **`KernelSU`** パッケージを統合して、迅速な開始を支援します。

- **WebUI Demo 仓库**: <https://github.com/OOM-WG/WebUI_Demo>
- **WebUI Demo 截图**: [WebUI Demo 截图](/assets/img/webui.webp)
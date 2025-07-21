---
layout: doc
title: Manager Scheme
description: Understanding how to call SakitinSU manager using Scheme.
outline: deep
footer: false
---
# **Manager Scheme**

SakitinSU Manager registers two schemes, `ssu` and `sakitinsu`.  You can invoke them using `ssu://...` or `sakitinsu://...`

If no content or incorrect content is provided, the SakitinSU Manager's home page will open. Supported hosts are as follows:

## module

To invoke this `host`, you need to provide one of the following `paths`:

### action

To invoke this `path`, you need to provide the following `query`:

- `id`: Module ID

Example: `ssu://module/action?id=xxx`

After invocation, the module's `operation` will be executed. If the module does not exist, the SakitinSU Manager's home page will open.

### webui

To invoke this `path`, you need to provide the following `query`:

- `id`: Module ID

Example: `ssu://module/webui?id=xxx`

After invocation, it will redirect to the module's `WebUI`. If the module does not exist, the SakitinSU Manager's home page will open.

### install

To invoke this `path`, you need to provide the following `query`:

- `name`: Module name, defaults to `unknown` if not provided.
- `url`: Module download link

Example: `ssu://module/install?name=meow&url=https://meow.latestfile.zip`

After invocation, the module will be downloaded and installed.
---
layout: doc
title: Installation Guide
description: Detailed ShiroSU Installation Steps and Configuration Instructions
outline: deep
footer: false
---
# Download ShiroSU Manager

<Downloaded />

## Obtaining Root Permissions

### Authorizing through other managers

When using `ShiroSU` as a module manager, you need to pre-install a Root solution like `Magisk` or `KernelSU`.

1.  Grant Root permissions to the `ShiroSU` application in the `Magisk` or `KernelSU` manager.
2.  After authorization, `ShiroSU` will automatically detect and load the module list for subsequent management.

### Through ShiroSU (Under Development)

> [!NOTE]
> The native Root implementation of `ShiroSU` is under development and is not currently supported in this version.

---

## Module Manager Usage Instructions

The module management interface provides centralized control over all installed modules, supporting search, sorting, enabling, disabling, and uninstalling core functions.

### 1. Global Operations for Module Lists

Located in the top right corner of the page, this provides one-click batch processing for all modules.

- **Enable All**: Activates all modules in the list.
- **Disable All**: Disables all modules in the list.
- **Update All**: Checks and updates all modules to the latest version.

### 2. Fine-grained Operations for Individual Modules

Each module is displayed as a separate card and supports the following interactions:

- **Status Switching**
  Use the switch on the card to enable or disable the module.  The module card background will turn gray when disabled.

- **Uninstall Module**
  Removes the specified module from the module list. After completion, the module card will display a strikethrough style.

- **Favorite and Pin to Top**
  By **long-pressing** the module card, you can add it to your favorites and pin it to the top of the list for quick access.

- **Exclusive Function Access**
  - **"Interface" button**: Launches the module's built-in WebUI.
  - **"Function" button**: Executes the module's `action.sh` script.

### 3. Command Set Extension Modules

The system supports loading additional command-line toolsets by installing independent modules to enhance terminal functionality.

- **Available Extension Modules**: `coreutils`, `busybox`, `sush`

> [!WARNING]
> These extension modules are planned to be directly integrated into the `ShiroSU` main program in the future.

---
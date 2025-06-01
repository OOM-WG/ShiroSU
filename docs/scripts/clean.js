#!/usr/bin/env node

/**
 * 高级清理脚本 - SSU_Docs 项目
 * 提供更详细的清理选项和进度显示
 */

import {execSync} from 'child_process';
import {existsSync, rmSync, statSync} from 'fs';
import {join, resolve} from 'path';

const projectRoot = process.cwd();

// 清理目标配置
const cleanTargets = {
    cache: [
        '.vitepress/.temp',
        '.vitepress/cache',
        'node_modules/.cache',
        'node_modules/.vite',
        '.temp',
        '.cache'
    ],
    build: [
        'dist',
        '.vitepress/dist'
    ],
    deps: [
        'node_modules',
        'pnpm-lock.yaml',
        'package-lock.json',
        'yarn.lock'
    ],
    logs: [
        '*.log',
        'logs',
        '.vitepress/*.log'
    ]
};

// 颜色输出工具
const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    reset: '\x1b[0m'
};

function colorLog(color, message) {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getDirectorySize(dirPath) {
    if (!existsSync(dirPath)) return 0;

    try {
        const stats = statSync(dirPath);
        if (stats.isFile()) {
            return stats.size;
        } else if (stats.isDirectory()) {
            const {execSync} = require('child_process');
            try {
                // Windows 和 Unix 系统的不同命令
                const isWindows = process.platform === 'win32';
                const command = isWindows
                    ? `powershell -Command "(Get-ChildItem -Path '${dirPath}' -Recurse -File | Measure-Object -Property Length -Sum).Sum"`
                    : `du -sb "${dirPath}" | cut -f1`;

                const result = execSync(command, {encoding: 'utf8'});
                return parseInt(result.trim()) || 0;
            } catch (error) {
                return 0;
            }
        }
    } catch (error) {
        return 0;
    }
    return 0;
}

function cleanPath(targetPath) {
    const fullPath = resolve(projectRoot, targetPath);

    if (!existsSync(fullPath)) {
        colorLog('yellow', `  ⚠️  路径不存在: ${targetPath}`);
        return 0;
    }

    const size = getDirectorySize(fullPath);

    try {
        rmSync(fullPath, {recursive: true, force: true});
        colorLog('green', `  ✅ 已删除: ${targetPath} (${formatBytes(size)})`);
        return size;
    } catch (error) {
        colorLog('red', `  ❌ 删除失败: ${targetPath} - ${error.message}`);
        return 0;
    }
}

async function cleanCategory(category, targets) {
    colorLog('blue', `\n🧹 清理 ${category.toUpperCase()}...`);

    let totalSize = 0;
    let cleanedCount = 0;

    for (const target of targets) {
        const size = cleanPath(target);
        if (size > 0) {
            totalSize += size;
            cleanedCount++;
        }
    }

    if (cleanedCount > 0) {
        colorLog('cyan', `  📊 ${category} 清理完成: ${cleanedCount} 项, 释放 ${formatBytes(totalSize)}`);
    } else {
        colorLog('yellow', `  📊 ${category} 无需清理`);
    }

    return totalSize;
}

async function showProjectStatus() {
    colorLog('magenta', '\n📋 项目状态检查...');

    const checks = [
        {name: 'node_modules', path: 'node_modules'},
        {name: 'dist', path: 'dist'},
        {name: 'cache', path: '.vitepress/.temp'},
        {name: 'lock文件', path: 'pnpm-lock.yaml'}
    ];

    for (const check of checks) {
        const exists = existsSync(resolve(projectRoot, check.path));
        const status = exists ? '✅ 存在' : '❌ 不存在';
        const size = exists ? ` (${formatBytes(getDirectorySize(resolve(projectRoot, check.path)))})` : '';
        colorLog('white', `  ${check.name}: ${status}${size}`);
    }
}

async function main() {
    const args = process.argv.slice(2);
    const command = args[0] || 'help';

    colorLog('cyan', '🚀 SSU_Docs 高级清理工具');
    colorLog('white', `📍 项目路径: ${projectRoot}\n`);

    switch (command) {
        case 'cache':
            await cleanCategory('缓存文件', cleanTargets.cache);
            break;

        case 'build':
            await cleanCategory('构建产物', cleanTargets.build);
            break;

        case 'deps':
            await cleanCategory('依赖文件', cleanTargets.deps);
            break;

        case 'logs':
            await cleanCategory('日志文件', cleanTargets.logs);
            break;

        case 'all':
            colorLog('red', '⚠️  执行完全清理 (包括 node_modules)...');
            let totalCleaned = 0;
            totalCleaned += await cleanCategory('缓存文件', cleanTargets.cache);
            totalCleaned += await cleanCategory('构建产物', cleanTargets.build);
            totalCleaned += await cleanCategory('日志文件', cleanTargets.logs);
            totalCleaned += await cleanCategory('依赖文件', cleanTargets.deps);

            colorLog('green', `\n🎉 完全清理完成! 总共释放: ${formatBytes(totalCleaned)}`);
            break;

        case 'basic':
            let basicCleaned = 0;
            basicCleaned += await cleanCategory('缓存文件', cleanTargets.cache);
            basicCleaned += await cleanCategory('构建产物', cleanTargets.build);
            basicCleaned += await cleanCategory('日志文件', cleanTargets.logs);

            colorLog('green', `\n🎉 基础清理完成! 总共释放: ${formatBytes(basicCleaned)}`);
            break;

        case 'status':
            await showProjectStatus();
            break;

        case 'help':
        default:
            colorLog('yellow', '📖 使用说明:');
            colorLog('white', '  node scripts/clean.js [command]');
            colorLog('white', '\n🔧 可用命令:');
            colorLog('white', '  cache   - 清理缓存文件');
            colorLog('white', '  build   - 清理构建产物');
            colorLog('white', '  deps    - 清理依赖文件 (node_modules, lock文件)');
            colorLog('white', '  logs    - 清理日志文件');
            colorLog('white', '  basic   - 基础清理 (cache + build + logs)');
            colorLog('white', '  all     - 完全清理 (包括 node_modules)');
            colorLog('white', '  status  - 显示项目状态');
            colorLog('white', '  help    - 显示此帮助信息');

            colorLog('cyan', '\n💡 推荐使用:');
            colorLog('white', '  pnpm run clean        # 基础清理');
            colorLog('white', '  pnpm run clean:all    # 完全清理');
            break;
    }

    colorLog('white', '\n✨ 清理操作完成!');
}

// 错误处理
process.on('uncaughtException', (error) => {
    colorLog('red', `❌ 未捕获的异常: ${error.message}`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    colorLog('red', `❌ 未处理的 Promise 拒绝: ${reason}`);
    process.exit(1);
});

main().catch((error) => {
    colorLog('red', `❌ 执行失败: ${error.message}`);
    process.exit(1);
});

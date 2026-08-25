---
layout: post
title: "解决配置代理环境变量后 SolidWorks 报 (-97,121,0) 许可错误的排错指南"
date: 2026-08-25
updated: 2026-08-25
category: 项目记录
tags:
  - Windows
  - SolidWorks
  - 计算机网络
  - 技术踩坑
---

> 本文记录在 Windows 环境下配置全局代理后，导致 SolidWorks 因 FlexLM 许可服务被误伤拦截而抛出 (-97,121,0) 报错的实际操作过程与解决方案。

## 一、背景与目标

**背景**：在 Windows 系统中配置全局网络环境变量后，打开 SolidWorks 弹出许可错误提示，导致软件无法启动。

**目标**：通过补齐 `NO_PROXY` 本地回环白名单，排除代理服务对本地 FlexLM 许可握手的干扰，恢复 SolidWorks 的正常授权通信。

## 二、环境与工具

- **操作系统**：Windows 11 / Windows 10
- **软件版本**：SolidWorks Standard (含 FlexLM / FlexNet 许可服务)
- **代理环境**：监听端口 `127.0.0.1:7890` (或 `7897`)
- **调试工具**：PowerShell (管理员)、Windows 服务管理器 (`services.msc`)

## 三、实现过程

### 3.1 第一步：快捷注入白名单（PowerShell）

以管理员身份打开 PowerShell，执行环境变量更新脚本。脚本会自动读取当前的本机计算机名（`$env:COMPUTERNAME`），并追加写入系统的 `NO_PROXY` 白名单中。

**原理解析**：SolidWorks 后台 FlexLM 许可服务通过“计算机名”（如 `DESKTOP-XXXXXX`）进行本地 TCP 通信。未加白名单前，发往计算机名的握手请求被强行丢进了代理软件，导致许可验证失败。

### 3.2 第二步：重启 SolidWorks 后台许可服务

按 `Win + R` 输入 `services.msc` 打开服务管理器，下拉找到 **SolidWorks Flexnet Server**（或 **SolidNetWorks License Manager**），右键选择 **重启**。

**原理解析**：环境变量修改后，需重新拉起被误伤拦截的后台服务，使其在新的网络环境配置下重新建立本地握手。

### 3.3 第三步：进程清理与验证

按 `Ctrl + Shift + Esc` 打开任务管理器，确认无残留的 `SLDWORKS.exe` 进程后，重新双击打开 SolidWorks 客户端验证。

## 四、代码示例

```powershell
# 自动读取本机计算机名并更新 NO_PROXY 用户环境变量
$comp = $env:COMPUTERNAME
[Environment]::SetEnvironmentVariable("NO_PROXY", "localhost,127.0.0.1,::1,$comp", "User")

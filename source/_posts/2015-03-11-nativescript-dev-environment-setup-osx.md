title: Mac安装NativeScript开发环境
date: 2015-03-11 23:35
tags: NativeScript
categories: NativeScript入门
---

## [Mac环境安装](http://docs.nativescript.org/setup/ns-cli-setup/ns-setup-os-x.html)

1. 安装Homebrew
        ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
2. 安装Nodejs
        brew install node
3. 安装iOS开发依赖
    安装Xcode命令行工具，安装Mono（可选）
        brew install mono
4. 安装android开发依赖
    安装JDK，安装Ant
        brew install ant
    配置ANT bin目录到PATH
5. 安装Android SDK
        brew install android-sdk
    添加tools和platform-tools目录到PATH
        android update sdk
    选择Android SDK
6. （可选）安装Genymotion
7. 安装NativeScript CLI
        npm i -g nativescript

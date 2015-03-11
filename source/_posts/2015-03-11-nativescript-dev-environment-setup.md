title: Windows安装NativeScript开发环境
date: 2015-03-11 11:22
tags: NativeScript
categories: NativeScript入门
---

## [Windows环境安装](http://docs.nativescript.org/setup/ns-cli-setup/ns-setup-win.html)

1. 安装Nodejs
2. 安装Chocolatey

        @powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

    这个执行脚本需要__管理员身份执行__，设置`Set-ExecutionPolicy RemoteSigned`。
<!--more-->
    安装完毕，命令行敲`choco`响应如下：

        λ choco
        Chocolatey v0.9.9.2
    （`λ`是[Cmder](http://bliker.github.io/cmder/)的提示符）

    如果安装过程中报错，可以先下载安装包，然后解压运行ps脚本。[官方教程](https://github.com/chocolatey/choco/wiki/Installation#download--powershell-method)在这里。
3. 安装jdk7
        choco install java
    配置`JAVA_HOME`环境变量
4. 安装ant
        choco install ant
    添加`bin`目录到`Path`中
5. 安装Android SDK
        choco install android-sdk
    添加`tools`和`platform-tools`目录到`Path`中，然后重启命令行，
        android update sdk
    选择Android SDK
    众多周知的原因，上面下载一定会很卡，然后超时...，
    这里有[国内的SDK映像](http://www.cnblogs.com/bjzhanghao/archive/2012/11/14/android-platform-sdk-download-mirror.html)，根据提示下载、解压
6. （可选）安装Genymotion
7. 安装NativeScript CLI
        npm i -g nativescript
    国内淘宝提供了npm镜像，可以安装`cnpm`来加速
        npm install -g cnpm --registry=https://registry.npm.taobao.org
    然后就可以这样安装NativeScript CLI
        cnpm i -g nativescript
    完整教程参考[[1]](http://npm.taobao.org/), [[2]](https://cnodejs.org/topic/5338c5db7cbade005b023c98)
目前为止，终于把环境建起来了!
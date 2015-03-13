title: NativeScript CLI创建HelloWorld项目
date: 2015-03-11 14:36
tags: NativeScript
categories: NativeScript入门
---

## 创建项目

切到工作空间，在命令行输入

        tns create hello-world

生成的大致目录结构：

        └── hello-world
            ├── app
            │   ├── app 开发主目录
            │   │   ├── app.css
            │   │   ├── app.js 程序入口点
            │   │   ├── bootstrap.js
            │   │   ├── main-page.js
            │   │   └── main-page.xml
            │   ├── App_Resources 平台特有资源
            │   │   └── ...
            │   └── tns_modules 需要引入的NativeScript模块
            │       └── ...
            └── platforms 所需平台
                └── ...

添加目标平台

    tns platform add ios
    tns platform add android
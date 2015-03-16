title: AS的HelloWorld项目
date: 2015-03-09 20:07:00
tags: ActionScript
categories: FlashBuilder和FlashCS手册
---

### 启动FB

首先启动FB，会提示选择__工作空间（Workspace）__。

> 工作空间是一个存放项目的文件目录，FB会保存用户的工作台和各种插件的设置。也就是说工作空间是FB/eclipse项目管理的单位。

![选择工作空间](/images/fbnfl/1_choose_workspace.png "选择工作空间")
<!--more-->
#### 导出首选项（可选）

如果想在其他工作空间使用这些配置，可以导出首选项，然后在另一个空间导入。
选择菜单`文件`>`导出`，选择`首选项`，

![选择首选项](/images/fbnfl/2_pref_export_choose.jpg "选择首选项")

下一步可以选择想导出的各种设置。

![选择首选项](/images/fbnfl/2_pref_export_filter.jpg "选择首选项")

### 创建项目

选择菜单`文件`>`新建`，可以看到很多类型的项目：

![新建项目](/images/fbnfl/3_create_project_choose.jpg "新建项目")

按所需库来分，

1. ActionScript项目，最基本的项目
2. Flex项目，需要包含`mx`，`spark` UI组件库

按运行时来分，

1. Web项目，运行在FlashPlayer上，Web应用
2. AIR项目，运行在AIR上，桌面应用

还有一种分类，

1. 库项目，主要目的是作为一种打包和代码重用的方式，编译生成swc文件
2. 普通项目，编译生成swf文件

> swc类似dll文件，不能直接运行；swf类似exe文件，可以被flash运行时直接运行

我们实际项目中最常见的是`ActionScript项目`，应用程序类型选`Web`。

![新建项目](/images/fbnfl/3_create_project_name.jpg "新建项目")

### 运行项目

`ASDemo`项目创建结束之后的项目结构如下：

![项目结构](/images/fbnfl/4_project_structure.png "项目结构")

运行项目之前，需要先编译，但是FB会在运行前自动编译，所以对于库项目之外的项目都可以直接运行。调试/运行项目有很多入口：

1. 菜单栏，选择要运行的项目，点击`运行`>`运行/调试`
2. 工具栏，选择要运行的项目，点击调试（`虫子`那个图标）、运行（`播放键`那个图标）
3. 包资源管理器，选择要运行的项目，右键`运行方式/调试方式`
4. 快捷键，选择要运行的项目，`F11`调试，`Ctrl+F11`运行

运行之后，我们发现项目结构中`bin-debug`目录多了很多文件，其中一个为`ASDemo.swf`，是我们项目编译后生成的文件。

![bin-debug](/images/fbnfl/4_run_project_bin.png "bin-debug")

运行项目其实打开的是一个IE网页，URL路径类似`E:\ws\work\builder\ASDemo\bin-debug\ASDemo.html`，其中`ASDemo.html`就是`ASDemo.swf`的HTML包装器模板。为了更好地调试项目，我们都是使用本地的独立调试版flashplayer。

#### 去掉HTML包装器

选择`ASDemo`项目，右键`属性`，选择`ActionScript编译器`，去掉`生成HTML包装器文件`复选框前面的钩。

![HTML包装器](/images/fbnfl/4_html_wrapper.jpg "HTML包装器")

### 完成HelloWorld

目前为止，我们还没有编写任何代码，一般语言的入门都需要编写一个`HelloWorld`。那我们在`ASDemo.as`文件的构造函数`ASDemo`下添加一行代码：

    trace("Hello World!");

然后保存文件，运行项目，我们就可以看到控制台下的输出：

![HelloWorld输出](/images/fbnfl/5_console_output.png "HelloWorld输出")

好了我们完成了`HelloWorld`例子。接下来我们来总结一下。

### 小结

首先，FB的项目保存在__工作空间__中，工作空间是FB项目管理的单位，包含用户的各种插件和快捷键等设置信息。

然后，FB项目分为ActionScript项目和Flex项目，它们的区别在于__所使用的库__不同。另外还有库项目和普通项目的区别，__库项目编译生成`swc`文件，不可以直接运行；普通项目生成`swf`文件，可以直接运行__。

运行一个项目可以通过菜单、右键菜单、工具栏、快捷键等方式，另外我们还学会了如何去掉HTML包装器模板。

#### 一个思考

在C/C++这类语言里，都有个程序入口`main`函数，但是在AS中，没有这个函数，那么AS的入口在哪里呢？

其实，上面的问题描述的不完全正确，应该是SWF文件的入口。Flash编译生成swf，swf文件是一种压缩文件格式，包含各种素材（比如图片、形状等）和代码（ABC二进制代码，由AVM虚拟机执行），代码有个__文档类__的概念。文档类就是swf文件的执行入口，通常文档类与swf文件名相同，比如我们上例中的`ASDemo`类。要查看项目的文档类，可以选择项目，右键`属性`，选择`ActionScript应用程序`，右侧标明`默认值`的就是文档类所在的文件。

![文档类](/images/fbnfl/5_document_class.png "文档类")
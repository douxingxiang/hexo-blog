---
title: Introduction to Python
tags: python
---

## [Python解释器](http://www.pythondoc.com/pythontutorial27/interpreter.html)

### Python解释器的启动和退出

启动解释器

``` bash
python
python -c # 执行脚本
python -m # 执行模块
```

退出

- Unix, `Ctrl + D`
- Windows, `Ctrl + E`
- `quit()`

### 参数传递

> 参数列表保存在`sys.argv`里

### 执行Python脚本

文件首添加shebang注释

``` python
#! /usr/bin/env python
```

### 源程序编码

默认源文件为`UTF-8`编码, 可以在文件首行或此行添加

``` python
# -*- coding: utf-8 -*-
```

## [Python简介](http://www.pythondoc.com/pythontutorial27/introduction.html)

- 注释
  - 行注释: `#`
  - 多行注释: 三引号`'''`, `"""`

- 数字
  - 整数，浮点数，复数
  - 实数间转换：`int()`, `long()`, `float()`

- 字符串
  - 表示: 单引号，双引号，三引号
  - 续行符: `\`, 三引号需要在每行末添加续行符
  - 原始字符串: 字符串前加`r`，不会转义
  - 字符串连接: `+`
  - 字符串可以切片, 切片可以采用负值
- unicode字符串
  - 字符串前面加`u`，字符串中间可以插入unicode转义字符
  - ASCII编码接受0-127范围的编码，否则报错
  - `str()`使用ASCII编码
  - `unicode()`可以将其他编码字符串转换为Unicode字符串
  - Unicode字符串可以通过`.encode()`转换为其他编码
  - 其他编码可以通过`.decode()`转换为Unicode字符串
- 列表list
  - 计算长度`len()`
  - 可以进行切片和连接

## [Python流程控制](http://www.pythondoc.com/pythontutorial27/controlflow.html)

- 条件语句
  - `if/elif/else`
- 循环语句
  - `for-in`
  - `range()`可以生成一个范围序列
- 流程跳转
  - `break/continue`
  - `else`
- `pass`
- 函数定义
  - `def`定义
  - 函数默认值只会被赋值一次？
  - 关键字参数: 元组`*tuple`, 字典`**dict`，元组必须在字典之前
  - 可变列表: `*args`
  - 参数列表分拆: `*tuple`拆分列表, `**dict`拆分字典
  - `lambda`形式: 返回短小匿名函数 `return lambda x: x + 1`
  - 文档字符串: 三引号(第一行用途，第二行空行，之后描述)

## [数据结构](http://www.pythondoc.com/pythontutorial27/datastructures.html)

列表

  - 列表是链表  
    - 添加删除: `append`, `extend`, `insert`, `remove`, `pop`
    - 排序搜索: `index`, `reverse`, `sort`
    - 计数: `count`
  - 可以当堆栈用: `append`, `pop`
  - 可以当队列用: `collections.deque`
  - 函数式编程
    - filter
    - map
    - reduce
  - 列表推导式: [结果表达式 计算语句块]

`del`语句

- 删除子项
- 删除分片
- 删除变量

元组

- 圆括号表示
- 不可变的列表

集合`set`

- 无序不重复
- 联合`union`
- 交`intersection`
- 差`difference`
- 对称差集`sysmmetric difference`
- 集合推导式: 大括号表示

字典

- `dict()`
- `in`检查键是否存在
- `keys`返回所有键
- 键必须是不变的

循环

- `enumerate()`可以返回索引和值元组
- `reversed()`逆向循环
- `sorted()`排序循环

条件控制

- `while`和`if`语句中不仅可以使用比较，还可以包含任意操作
- `in`和`not in`比较是否在某区间内
- `is`和`not is`比较对象是否相同

比较序列

- 序列对象可以与相同类型的对象进行比较
- 比较按字典序进行

## [模块](http://www.pythondoc.com/pythontutorial27/modules.html)

- 导入模块`import`
- 模块名 `__name__`

深入模块

- 模块除了函数定义外，还可以包括执行语句
- 执行语句只在模块初次被导入时执行__一次__
- `reload`可以重新加载
- 模块搜索路径`sys.path`
  - 当前目录
  - `PYTHONPATH`目录
  - python安装目录
- 预编译, `-O`, `-OO`

标准模块

- `sys.ps1`, `sys.ps2`, 只在解释器交互模式有意义
- `sys.path`解释器模块的搜索路径

`dir()`函数

- 搜索模块内的定义
- 内置函数和变量在`__builtin__`中定义

包

- 目录要成为内容包，需要增加`__init__.py`，其中可以定义`__all__`，执行包的初始化代码
- `import *`会先检查`__init__.py`是否有`__all__`，没有的话只导入部分，否则导入`__all__`指定的所有模块

## [输入输出](http://www.pythondoc.com/pythontutorial27/inputoutput.html)





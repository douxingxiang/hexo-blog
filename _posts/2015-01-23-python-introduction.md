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

格式化输出

- `print`
- `str.format()`
  - 可以使用`{0}`或`{name}`进行插值
  - 可以使用`{!s}`, `{!r}`在格式化前对值进行`str()`, `repr()`
  - 可以使用`:`指定宽度
- `str()`将任意值转换为人可读的格式
- `repr()`将任意值转换为机器可读的格式

文件读写

- 打开文件
  - `open()`打开文件
  - windows下打开文本文件默认会在行末添加行结束符，所以要指明用什么方式打开
- 读取文件
  - `read()`读取指定大小
  - `readline()`读取一行，行末添加换行符
  - `readlines()`读取指定行数的行
- 写入文件
  - `write()`写入指定字符串
  - `tell()`返回文件对象的在文件中的指针位置
  - `seek()`移动文件对象指针
- 关闭文件
  - `close()`关闭文件
  - `with`块会自动关闭文件

`pickle`模块

- 封装pickling，将任意对象表达为字符串
  - `pickle.dump()`
- 解封unpickling，将字符串表达为任意对象
  - `pickle.load()`

## [错误和异常](http://www.pythondoc.com/pythontutorial27/errors.html)

语法错误

- 语法分析器指出的错误

异常

- 运行时检测到的错误

异常处理

- `try/except/else`
- `try`没有抛出异常会执行`else`
- `try`没有抛出异常会忽略`except`语句
- `try`抛出异常，会匹配`except`语句，有匹配就执行`except`语句，然后返回`try`语句继续执行之后的代码；不然就传递给上层`try`语句；如果没有上层语句，就报错

抛出异常

- `raise`语句允许强制引发异常

用户自定义异常

- 派生子`Exception`类

定义清理行为

- `finally`任何情况下都会执行的语句

预定义清理行为

- `with`代码块的文件对象对被自动关闭

## [类](http://www.pythondoc.com/pythontutorial27/classes.html)

作用域和命名空间

- 命名空间是命名到对象的映射
  - 不同命名空间在不同时刻创建，有不同的生存期
  - 内置命名空间在解释器启动时创建，`__builtin__`
  - 模块的全局命名空间在模块被读入时创建，`__main__`
  - 调用函数时会创建局部命名空间，在函数调用结束时释放
- 作用域是可以直接访问命名的区域？
  - 包含局部命名的作用域在在最里面
  - 然后是中级作用域，包含同级的函数，包含当前模块的全局命名空间
  - 最后是包含内置命名的命名空间
  - 作用域是静态定义，动态使用的
  - 如果没有引用`global`，赋值操作总是在局部作用域进行的；赋值不会赋值数据，只会将命名绑定到对象，删除也是删除绑定

类

- 类定义
  - `class`
- 类对象
  - 类对象支持两种操作：属性引用，实例化
  - 属性引用: `Clazz.i`, `Clazz.f`, `Clazz.__doc__`
  - 实例化: `Clazz()`
- 实例对象
  - 实例对象唯一可用的操作是属性引用。有两种有效的属性名。
  - 一个是数据属性
  - 一个是方法
  - 方法可以直接调用，也可以保持后以后调用
- 说明
  - 数据属性会覆盖同名方法属性
  - python不能强制隐藏数据属性，一切基于约定
- 继承
  - `class Clazz(BaseClazz1, BaseClazz2)`
  - `isinstance`检查实例类型
  - `issubclass`检查类继承
  - 多重继承会依次深度遍历父类来检查命名
- 私有变量
  - python没有私有变量
  - 但约定下划线开头的命名为私有
  - python命名编码会把变量`__pvar`编译为`_classname__pvar`
- 异常也是类
  - 可以直接`raise Clazz`或者`raise Instance`
- 迭代器
  - `for`语句在容器对象中调用`iter()`方法，返回一个包含`next()`的迭代器对象，没有后续元素时`next()`抛出`StopIteration`异常
  - 定义`__iter__`方法，定义`next()`方法，没有元素时抛出`StopIteration`异常
- 生成器对象
  - `yield`会记录上一次执行位置和数据，每次`next()`调用时，生成器会恢复位置，返回数据
- 生成器表达式
  - 函数调用生成器

## [标准库](http://www.pythondoc.com/pythontutorial27/stdlib.html)

操作系统接口

- `os`模块封装了很多与操作性交互的函数
- `shutil`模块提供了日常文件和目录管理的高级接口

文件通配符

- `glob`模块提供了一个从目录中根据通配符生成文件列表的功能

命令行参数

- `sys.argv`

错误输出重定向和程序终止

- 输入输出`sys.stdin`, `sys.stdout`, `sys.stderr`
- 退出`sys.exit()`

字符串正则表达式

- `re`模块提供了字符串处理的高级接口
- 简单的处理使用字符串方法更好

数学

- `math`模块提供了对底层C函数库的访问
- `random`模块提供了生成随机数的工具

互联网访问

- 从url接收数据`urllib2`
- 收发邮件`stmplib`, `poplib`

日期和时间

- `datetime`

数据压缩

- `zlib`, `gzip`, `bz2`, `zipfile`, `tarfile`

性能度量

- `timeit`提供了细粒度的接口
- `profile`和`pstats`提供了更强大的功能

质量控制

- `doctest`扫描文档字符串进行测试
- `unittest`单元测试

`瑞士军刀`

- 远程过程调用`xmlrpc.client`, `xmlrpc.server`
- 邮件管理`email`
- 数据交换`xml.dom`, `xml.sax`, `csv`
- 国际化`gettext`, `locale`, `codecs`

输出格式

- `repr`模块针对大型容器
- `pprint`模块控制内置和用户自定义对象的打印
- `textwrap`格式文本段落适应屏宽
- `locale`访问国家信息数据库

模板

- `string.Template`
- `$`开头的作为占位符

二进制数据布局

- `struct`模块提供了`pack()`和`unpack()`函数

多线程

- `threading`
- `queue`

日志

- `logging`

弱引用

- `weakref`

列表工具

- `array`模块提供了`array()`对象
- `collections`模块提供了`deque()`对象
- `bisect`链表的存储
- `heapq`堆实现链表

十进制浮点运算

- `decimal`模块

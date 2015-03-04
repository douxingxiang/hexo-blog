---
title: Ruby Programming Language
tags: programming
---
<http://www.w3cschool.cc/ruby/ruby-method.html>

## 语言特征

- 扩展名 
    - `.rb`
- 大小写敏感
- 命名字符集
    - 字母，数字，下划线
- 注释
    - 单行注释 `#`
    - 块注释 `=begin, =end`
- Here Document
    - `<<END_STR`
    - 可以嵌套
- `BEGIN/END`
    - `BEGIN`在程序开始之前调用
    - `END`<div>在程序结束之后调用</div>

## 数据类型

- 数值
    - 整型
        - `Fixnum`
        - `Bignum`
    - 浮点型 `Float`
    - 算术操作
        - `+-*/`
        - 指数`**`
- 字符串类型
    - `String`
    - 单引号、双引号，Here Doc
    - 字符串插值 `#{expr}`, `#var`
    - 
- 数组
    - `[]`
    - `+ -`添加删除
    - `<<` 追加
    - `*`重复
    - `| &`并集和交集
- 哈希
    - `{key=>value, ...}`
- 范围
    - `Range`
    - 半闭区间`..`
    - 闭区间`...`

## 类和对象

- 类定义
    - 'class/end'
    - 变量
        - 局部变量
        - 实例变量 `@`
        - 类变量 `@@`
        - 全局变量 `$`
    - `new`创建类对象
    - `initialize`初始化类对象
    - 成员函数
        - `def/end`

## 变量和常量

- 变量
    - 全局变量
        - `$`
        - 未初始化为`nil`
    - 实例变量
        - `@`
        - 未初始化为`nil`
    - 类变量
        - `@@`
        - 初始化后才能在方法定义中使用
    - 局部变量
- 常量
    - 大写字母开头
    - 不能定义在函数中
- 伪变量
    - `self`
    - `true`, `false`
    - `nil`
    - `__FILE__`, `__LINE__`

## 运算符

- 算术
    - `+ - * / %`
    - `**`指数
- 比较
    - `== !=`
    - `> >= < <=`
    - `<=>` 联合比较
    - `===`测试`case`语句的`where`子句相等
    - `.eql?`有相同的值
    - `equal?`有相同的对象id
- 赋值
    - `=`
    - `+= -= *= /= %= **=`
    - 并行赋值/多重赋值
- 位运算符
    - `& | ~`
    - `^`
    - `<< >>`
- 逻辑
    - `and or not`
    - `&& || !`
- 三元
    - `?:`
- 范围
    - `..`
    - `...`
- `defined?`
- 点运算符和双冒号运算符
    - `.`
    - `::`引用类或模块的常量，常量解析运算符

## 流程控制

- 判断
    - `if/elsif/then/else`
    - `if`修饰符
    - `unless/then/else`
    - `unless`修饰符
    - `case/when/then/else`
- 循环
    - `while/do/end`
    - `while`修饰符
    - `until/do/end`
    - `until`修饰符
    - `for do end`
- 控制转移
    - `break`
    - `next`
    - `redo`
    - `retry`

## 方法

- 方法命名
    - 方法小写字母开头
- 方法参数
    - 默认参数
    - 可变参数`*param`
    - 调用时可以省略括号
- 别名
    - `alias`
    - 可以跟方法和全局变量起别名
- 返回值
    - 不指定`return`返回最后一个表达式的值
    - 指定`return`返回`return`后表达式的值
- 类方法
    - 方法前面加类名`Clazz.method`

## 块

- `{}`包围
- 可以传递给方法做参数
- 可以使用`yield`调用
- 块可以带参数
- `BEGIN, END`
    - `BEGIN`, 程序开始前调用
    - `EBD`，程序结束后调用

## 模块

- 作用
    - 定义了一个命名空间，避免名称冲突
    - 实现了`mixin`混入
    - `module`
- 导入
    - `require`导入文件
    - `include`导入模块
    - 混入`mixins`，直接包含模块 

## 字符串

- 字面量表示
    - 单引号，可以转义
    - 双引号
    - `%`加任意分隔字符
    - `%q`, `%Q`
- 插值
    - `#{}`
- 编码
    - 默认`ascii`
    - `$KCODE`可以改变字符集
        - `a, ascii`
        - `e, euc`
        - `n, none=ascii`
        - `u, utf-8`

## 数组

-  `Array`

## 哈希/散列

- `Hash`

## 日期和时间

- `Time`

## 范围

- `Range`

## 迭代器

- 集合支持方法(数组和散列)
- `.each`
- `.collect`

## 文件输入和输出

- 基本
    - `puts/gets`
    - `putc`
    - `print`
- 文件打开关闭
    - `File.new`
    - `File.open`
    - `sysread, syswrite`
    - `each_byte`
    - `IO.readlines`
    - `IO.foreach`
- 重命名和删除
    - 'rename'
    - 'delete'
- 文件权限
    - 'chmod'
- 文件和目录
    - `File`, 'Dir'

## 异常

- `begin, end, rescue, else, ensure, retry, raise`
    - 监听代码块`begin, end`
    - 异常发生，捕获`rescue`
    - 异常不发生`else`
    - 无论发不发生都执行`ensure`
    - 抛出`raise`
    - 重新进入`retry`
- `Exception`

## 面型对象

- 纯面向对象，一切都是对象
- 类定义
    - `class`
    - 构造函数`initialize`, 初始化
    - 访问器方法
        - `setter=`
    - 实例变量
        - `@`
    - 类变量
        - `@@`
    - 类常量
        - 大写
        - 使用常量解析运算符访问`::`
    - 类方法
        - `def self.method`
    - 实例方法
        - `def method`
    - 访问控制
        - `private`
        - `protected`
        - `public`
- 声明对象
    - `Clazz.new`，分配内存
    - `allocate`, 分配内存，未初始化
- 类继承
    - `class Child < Parent`
    - 不支持多重继承，但是可以使用mixin
    - 方法重载
        - 重新定义
    - 运算符重载
    - 冻结对象
        - `Object.freeze`
        - `Object.frozen?`
- 类信息
    - `self`代表类

## 正则表达式

- 字面量
    - `/expr/`
    - %r delim expr delim
- 修饰符
    - `i`, 大小写敏感性
    - `o`, 执行一次插值
    - `x`, 忽略空格
    - `m`, 多行
    - `u, e, s, n`, 对应字符集

## 数据库DBI

## WEB CGI

## 邮件

## Socket

## XML

## SOAP

## 多线程

- `Thread.new`
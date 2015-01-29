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
    - `END`在程序结束之后调用

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

##0 
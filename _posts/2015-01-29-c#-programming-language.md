---
title: C# Programming Language
tags: programming
---
<http://www.w3cschool.cc/csharp/csharp-tutorial.html>

## 语言特征

- 注释
    - 单行 `//`
    - 多行 `/**/`
- 标识符
    - 标识符第一个字符必须是字母

## 数据类型

- 值类型 value types
    - `System.ValueType`
    - `bool`, `true`, `false`
    - `char`
    - `decimal`, `double`, `float`
    - `int`, `byte`, `char`, `long`, `sbyte`, `short`, `uint`, `ulong`, `ushort`
    - `sizeof`计算类型所占字节
- 引用类型 reference types
    - 对象类型
        - Object, `System.Object`，可以存储任何类型，编译时类型检查
        - `object`
        - 所有数据类型的最终基类
    - 动态类型
        - Dynamic, 可以存储任何类型，运行时类型检查
        - `dynamic`
    - 字符串类型
        - `String`, `System.String`
        - 引号
        - `@`逐字符转义
    - 用户自定义类型
        - `class`, `interface`, `delegate`
- 指针类型 pointer types
    - 存储内存地址
    - `type*`
- 可空类型 nullable
    - `< data_type> ? <variable_name> = null;`
    - 
- 类型转换
    - 隐式类型转换
    - 显式类型转换
    - `ToBoolean`
    - `ToByte`, `ToSbyte`, `ToInt16`, `ToInt32`, `ToInt64`,`ToUInt16`, `ToUInt32`, `ToUInt64`
    - `ToDecimal`, `ToSingle`, `ToDouble`
    - `ToChar`, `toString`
    - `ToDateTime`
    - `ToType`

## 运算符

- 算术
    - `+ - * / % ++ --`
- 关系
    - `== != > >= < <=`
- 逻辑
    - `&& || !`
- 位
    - `& | ^ ~ << >>`
- 赋值
    - `= += -= *= /= %= <<= >>= &= |= ^= `
- 杂项
    - `sizeof`
    - `typeof`
    - `?:`
    - null合并运算符`??`，给可空类型设置默认值

## 流程控制

- 判断
    - `if else`
    - `switch`，可以嵌套
    - `?:`
- 循环
    - `while`
    - `for`
    - `do while`
- 控制转移
    - `break`
    - `continue`
    - `return`

## 封装

- 访问修饰符
    - `public`，外部均可以访问
    - `private`，同类内部可访问
    - `protected`，子类访问
    - `internal`，文件内可访问
    - `protected internal`，文件内类的子类可访问
- 方法
    - 定义

            <Access Specifier> <Return Type> <Method Name>(Parameter List)
            {
                Method Body
            }

    - 参数传递
        - 按值传递
            - 为参数创建存储位置
        - 按引用传递 
            - `ref`
        - 按输出传递
            - `out`
            - 可以返回多个值

## 数组

- 数组
    - 存储相同类型固定大小的顺序集合
    - `datatype[] arrayName;`
    - `Array`
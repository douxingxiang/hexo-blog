---
title: Ruby Programming Language Introduction
tags: ruby
---

## Ruby

> Ruby是__纯面向对象__的编程语言，同样支持__过程式__和__函数式__编程，拥有强大的__元编程__能力，可用于创建领域特定语言(DSL)。

Ruby是松本行弘(Matz)创立的一门语言，灵感源于Lisp, Smalltalk, Perl，包含了很多语法糖。

Ruby的包管理工具是`gem`，交互式shell是`irb`(interactive ruby)，使用`ri`查看文档，解释器是`ruby`。

## Ruby程序结构

### 词法结构

> 标记(token)。ruby解释器把程序解析为一个标记序列。标记包括字面量，注释，标点，标识符。
> 1. 组成这些标记的字符
> 2. 分隔这些标记的空白符

#### 注释

__行注释__

注释以`#`开头，到行末，字符串中的除外。

__嵌入式文档__

`=begin`开头，`=end`结束的多行文本

__文档化注释__

可以使用多行`#`和`=begin`、`=end`， 使用`=`数量来代表标题的级别。

#### 字面量

> 直接出现在代码中的值。

#### 标点

#### 标识符

> 标识符是一个名字，Ruby使用标识符对变量、常量、类、模块等进行命名。

Ruby的标识符由字母、数字、下划线组成，不能以数字开头。
按惯例，大写字母开头的是常量。

1. 标识符是大小写(ASCII字符集字母的大小写)敏感的
2. 标识符的字母可以是Unicode字符
3. 标识符开头或结尾可以出现标点
    1. `$`, 全局变量
    2. `@`, 实例变量`@`和类变量`@@`
    3. `?`, 返回布尔值的方法
    4. `!`, 方法后缀，表示方法会改变对象
    5. `=`, 可以省略，通常用于赋值

#### 关键字/保留字

1. Ruby解析器会特殊处理，语言相关的标记。
    - `__LINE__`, `__ENCODING__`, `__FILE__`
    - `BEGIN`, `END`
    - 语言相关
2. 类似关键字
    - `=begin`, `=end`, `__END__`
3. ruby类库用到的标记

#### 空白符

> 空白符包括空格符，制表符和换行符。

__语句终结与换行符__

Ruby中分号不是必须的，也可以使用换行来结束语句

__方法调用与空格符__

Ruby允许特定环境下方法调用的圆括号可以省略

### 句法结构

> 标记如何组成结构。Ruby中最基本的句法单元就是表达式。Ruby解释器将会评估表达式并且产生值。

__初级表达式__

最简单的表达式，直接代表值。包括

- 字面量
- 某些特定的关键字，如`true`, `false`, `self`
- 变量引用

操作符用于对多个值进行计算，通过操作符来组合成复合表达式。

表达式可以和关键字联合构成语句。

将表达式和语句组成参数化的单元，这些单元成为函数、方法、子例程等，在Ruby中叫做方法。

相关操作的方法组成类。

相关关联的类和独立于类的方法组成模块。

#### 块结构

> 嵌套语句构成块，块由关键字或标点进行分隔。

Ruby包括两种块结构

1. 一段与迭代器相关联的代码，可看做是传递给迭代器的代码段
2. 语句列表
    - Ruby不使用大括号作为分解符，而是使用关键字

### 文件结构

> 文件分布和执行

1. shebang注释第一行
2. coding注释紧随其后
3. 解释器不对`__END__`标记后面的数据做处理，但是可以通过`IO`流对象`DATA`进行读取
4. 程序不必全部位于一个文件，`require`可以加载其他模块，并且不会重复导入

### 程序编码

> Ruby采用ASCII字符集定义词法规则。默认情况下，Ruby解释器假定源码采用ASCII编码的，但是可以设置文件编码。

__指定程序使用的编码__

- 解释器`-K`参数指定解释器使用某字符集解析程序。如`-Ku`，UTF-8; `-Ke`, `-Ks`等
- `coding`注释。不区分大小写，可以包含任意前缀
- 如果文件前三个字节是`0xEF 0xBB 0xBF`, 文件就是UTF-8编码的
- `__ENCODING__`是个`Encoding`对象，包含当前程序的源编码

__源编码和默认外部编码__

源编码是告诉Ruby解释器如何解析程序文件，可以通过注释和命令参数来设置。一个程序可以包含多个文件，每个文件可以采用不同的编码。

默认外部编码，是Ruby从文件或流中读取内容时采用的默认编码，对Ruby进程是全局的，不会随文件改变而改变。通常，默认外部编码是根据电脑的区域设置来设置的。对IO来说是重要的。

解释器`-K`选项其实是设置进城的默认外部编码，然后用这个编码作为默认的外部编码。

- 可以使用`-E`, `-encoding`来设置，使用编码的全名，而不是缩写。
- 使用`Encoding.default_external`查询默认外部编码，返回一个`Encoding`对象
- `Encoding.locale_charmap`可以从区域设置获取字符编码的名称

### 程序运行

Ruby首先扫描`BEGIN`程序块执行，然后跳到文件第一行开始执行，直到

1. 执行了程序终结的语句
2. 到达了文件结尾
3. 读入了`__END__`

通常情况下(除非调用了`exit!`), Ruby在退出之前会执行`END`语句，以及通过`at_exit`函数注册的关闭钩子



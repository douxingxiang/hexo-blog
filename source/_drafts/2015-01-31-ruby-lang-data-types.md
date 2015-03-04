---
title: Ruby Data Types
tags: ruby
---

> Ruby程序操作什么样的数据(数据结构)，这些数据都有哪些操作(数据类型)。Ruby的值都是对象。

## 数字

数字内建类的结构关系

- `Numeric`
    - `Integer`
        - `Fixnum`
        - `Bignum`
    - `Float`
    - `Complex`
    - `BigDecimal`
    - `Rational`

数值对象都是不可变的，Ruby把它们是实现为立即值，而不是引用。

__整数字面量__

- 千分符`_`，可以在整数数字字面量里插入下划线
- `0b`,`0B`开头的是二进制
- `0x`, `0X`开头的是十六进制
- `0`开头的是八进制
- 其他是十进制
- `-`开头的是负数，也可以以`+`开头，但不会改变含义

__浮点字面量__

- 整数部分和可选的指数部分
- 指数部分由`e`或`E`开始，后跟十进制整数字面量
- 可以使用千分符
- 小数点前后都必须有数字，不能简写如`.1`是不合法的

__算术操作__

- 四则运算 `+ - * /`
    - 整数除法会被截断，返回整数值，除以0会报错
    - 浮点除法不会截断，返回浮点值，除以0得到`Infinity`
    - 整数除法如果有负值，Ruby采用向负向无穷圆整，不同于C/C++/Java
- 取模 `%`
    - 可以用于浮点数，返回浮点值
    - 如果有负值，结果的符号与第二个操作符的符号一致，不同于C/C++/Java
    - `remainder`方法与C/C++/Java一致(结果符号与第一个操作数保持一致)
- 指数`**`
    - 多个指数按照从右到左的顺序执行
    - 整数的指数操作可以为任意大，但是浮点数有上限`Float::MAX`，所以浮点数指数可能得到`Infinity`
- 位操作符 `~ & | ^ >> <<`
    - 支持对单个位进行索引

__浮点数的二进制表示和圆整错误__

使用二进制来表示十进制实数只能近似，所有采用IEEE-754浮点数的语言都存在这个问题(C/Java/JavaScript)。

可以使用`BigDecimal`用十进制来表示实数，但是速度要慢很多。

## 文本

Ruby使用`String`表示字符串，字符串是可变对象。`Regexp`表示文本模式。

- 字符串字面量
    - 单引号
        - 如果字符串里有单引号要转义`\'`
        - 反斜杠还可以转义反斜杠，但是如果反斜杠后面既不是反斜杠，也不是单引号就没有特殊含义，不能转义其他转义字符，如制表符`\t`
        - ~~多行文本可以使用 `\`续行~~(1.9.3不需要，添加续行符，字符串里也会包含续行符)，续行得到的字符串有换行符
        - 如果不想要单引号，多行文本每行都要用单引号包围，行末使用反斜杠续行，这样解释器在解释时会把字符串连接
    - 双引号
        - 支持更多转义`\t`, `\n`等
        - 支持`\u`Unicode转义序列
        - 可以包含表达式，进行字符串插值`#{expr}`, 只有当`#`后是`{`、`$`，`@`时`#`才有特殊含义
        - 支持`printf`样式的内插，多个插值，用数组传递值
        - 双引号可以跨越多行，除非用`\`进行转义，否则行末的终结符会成为字符串的一部分
        - 多行文本，如果不用双引号包围，会把代码前面的缩进算进去
    - Unicode转义序列
        - `\unnnn`4个十六进制数字，表示`0000`和`FFFF`之间的Unicode字符，开头的0不能省略
        - `\u{nnnnnn}`1-6个十六进制数字，表示`0`到`10FFFF`之间全部的Unicode字符，开头的0可以省略
        - `\u{}`可以嵌入多个码点，中间的空格不会编码到字符串
    - 字符串字面量的分界符
        - `%q`遵循单引号引用字符串的规则
        - `%Q`或`%`遵循双引号引用字符串的规则
        - 紧跟在q或Q后的第一个字符是字符串的定界符，直到遇到下一个未转义的定界符为止，如果定界符是`( [ } <`它们对应的定界符为`) ] } >`
        - 转义使用`\`进行
    - Here document
        - 允许包含各种字符
        - `<<`或`<<-`开头，后面紧跟一个定界符标识符或字符串，中间不能用空格，直到定界符单独出现在一行
        - 读取here document之后，ruby解释器会回到开头部分所在的行，然后继续解析剩余部分
        - 分界符必须单独出现在一行，如果以`<<`开头，结尾分界符必须出现在行的开头；如果以`<<-`开头，定界符前面可以有空白。定界符后面不能有注释
        - 定界符没用引号的话，反斜杠可以转义字符，`#`可以内插字符串。
        - 定界符用单引号包围，不解析任何转义字符，分界符可以有空格
        - 定界符用双引号包围，不解析转义字符，`#`可以内插字符串
    - 反引号引用命令执行
        - `反引号``包围的字符串将传递给`Kernel.``方法，作为shell命令来执行
        - 可以用泛型化的`%x`引用，如`%x[ls]`
    - 字符串字面量和可变性
        - 解释器无法用同一个对象表示相同的字符串，每次遇到字符串都会新建对象，应避免在循环中出现字符串
        - 字符串是可变的
    - `String.new`方法创建新字符串
- 字符字面量
    - Ruby 1.8使用字符前面加`?`方式来表示单个字符组成的字面量，被求值为字符对应的整数编码，只能用于ASCII字符和单字节字符
    - Ruby 1.9以后，字符是长度为1的字符串，可以使用`\u`用于多字节字符(多码点形式除外)
- 字符串操作符
    - `String` `+`用于连接字符串，不会自动转换类型为字符串，需要手动转换
    - 字符串内插更简单，对`to_s`调用时自动进行的
    - `<<`会追加，会修改第一个操作数，不是返回新对象，也不会对右侧对象进行类型转换
    - `*`重复字符串
    - `==`,`!=`,`> >= < <=`来比较相等性，字符串比较是大小写敏感的
- 访问字符和子字符串
    - 索引`[]`提取字串
        - 如果是负值，会从末尾解析
        - 如果超过范围，会返回`nil`，不会报错
        - 字串可以指定长度`[index, length]`, index是开始位置，length是字串长度，对其赋值，相当于替换字串
        - 可以使用`Range`来提取字串`index1..index2`
        - 可以使用字符串来索引字符串`s["L"]`，匹配字串L出现的首个位置
        - 还可以用正则表达式索引字符串`s[/[aeiou]/]`
    - 长度`length`, `size`
- 对字符串进行迭代
    - Ruby1.9定义了三个方法`each_byte`, `each_byte`, `each_line`
- 字符串编码和多字节字符
    - Ruby1.8中，字符串是字节序列，如果代表文本，就假定为ASCII字符，单个元素是数字/实际的字节值或字符值
    - Ruby1.9，字符串是字符序列，字符不局限于ASCII字符集，单个字符是长度为1的字符串，每个字符串都有一个编码方式
    - Ruby1.9多字节字符
        - `length/size`返回字符数，`bytesize`返回字节数
        - `[]`访问多字节字符串时，Ruby会在内部对字符串进行顺序迭代，从而找到期望的字符索引；所以尽量使用`each_char`来迭代，会保持高效
        - `encoding`方法返回字符串的编码方式
        - 可以使用`ascii_only?`对字符串进行测试是否全部由ASCII字符组成
        - `ASCII-8BIT`是Ruby1.8的字符串，与`BINARY`同义，`US-ASCII`是真正的7bitASCII
        - 某些操作，如连接和匹配要求两个字符串的编码方式要兼容，可以使用`Encoding.compatible?`来测试，兼容就会返回两个字符串编码方式的超级，否则返回`nil`
        - `force_encoding`方法显式设置一个字符串的编码方式(针对字节流)，会对字符串的编码方式更改后，返回，不会创建新字符串
        - `valid_encoding?`来验证是否是有效的字符序列
        - `encode`方法会返回一个新字符串，只是编码方式不同，`encode!`修改字符串本身
    - `Encoding`类
        - `name/to_s`返回编码方式的名称
        - `Encoding.find`会根据编码名称返回`Encoding`对象
        - `Encoding.list`会返回一个内建及已加载的编码方式的列表
        - `Encoding.default_external`返回默认外部编码`Encoding`对象
        - `Encoding.charmap`返回当前区域设置的编码方式
    - Ruby1.8多字节字符
        - `jcode`包含了对多字节字符的支持
        - 设置全局的`$KCODE`为多字节字符使用的编码方式
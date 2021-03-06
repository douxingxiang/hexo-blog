---
title: Swfit Programming Language
tags: programming
---

<http://c.biancheng.net/cpp/html/2270.html>

## 常量、变量和数据类型

- 声明
    - 常量声明: `let`
    - 变量声明: `var`
    - 声明时可以省略类型,编译器会自动推断
- 类型
    - 值不会隐式转换为其他类型
    - 字符串插值`\()`
    - 字符串:`String`
    - 元组:`Tuple`
        - 支持多重赋值
        - 使用`_`来忽略不需要的值
    - 可选类型:`Optional`
    - 集合类型:`Array`, `Dictionary`
    - 数组:[]
    - 字典:[key:value, ...]
    - 整型:`Int`,`UInt`, `Int8`, `UInt16`
    - 浮点型:`Float`, `Double`
    - 布尔型:`Bool`,值为`true`, `false`
- 类型转换
    - 使用类型包装器方法来转换
    - 类型别名`typealias`
- 整型字面量
    - 二进制`0b`
    - 八进制`0o`
    - 十六进制`0x`
- 可选值
    - 变量类型声明后加`?`
    - 值可以为具体值或者`nil`
    - 使用`if let name = optional`来处理缺失情况
        - 如果`optional`值缺失,会跳过代码块
    - 强制解析
        - 变量后加`!`,来获取真正的值
- 断言
    - `assert`

## 字符串

- `String`, `Character`
- 字面量: 双引号包围
- 初始化
    - 空字符串字面量
    - String实例

## 语言特征

### 注释

- 单行: `//`
- 多行: `/**/`
- 多行注释可以嵌套在其他多行注释

### 分号

- 分号可选
- 单行内多条语句必须加分号

## 运算符和表达式

- 赋值`=`,复合赋值符
- 数值运算
    - `+`
    - `-`
    - `*`
    - `/`
    - `%`,浮点可以求余
    - `++`,`--`
- 比较运算
    - `==`, `!=`
    - `>`, `<`
    - `>=`, `<=`
- 三元条件
    - `?:`
- 区间运算符
    - 闭区间`...`
    - 半闭区间`..`
- 逻辑运算
    - `!`
    - `&&`
    - `||`

## 控制流

- 条件语句
    - `if`
    - `switch/case/default`,支持各种类型
    - 条件必须是bool表达式
- 循环语句
    - `for-in`
    - `for`
    - `while`
    - `do-while`
    - 双点号`..`表示范围,不包括上界,`...`包括上界
- 条件和循环的圆括号可以省略
- 控制转移
    - `break`
    - `continue`
    - `fallthrough`
    - `return`

## 函数和闭包

- 函数
    - `func`声明函数
    - `->`指定返回值类型
    - 使用元组`()`返回多个值
    - `...`表示可变参数`args: Int...`
    - 函数可以嵌套
    - 函数是一等公民`first class citizen`
        - 可以作为其他函数的返回值
        - 可以作为参数传递给其他函数
- 函数实际上是特殊的闭包
    - `{(args: Int) -> Int in}`可以创建匿名闭包
    - `in`来分隔参数并返回值
    - 也可以通过位置来引用参数`$0, $1`
    - 闭包是最后一个函数参数时,可以直接跟在括号后面
    - `sort([1,3,4,2]) {$0 > $1}`
    - 可以给函数参数定义第二个名称
        - `func hello(msg textStr: String)`
- 参数
    - 外部参数与本地参数同名, `#`添加到变量前面
    - 输入输出参数, 变量名前加`&`, `inout`
- 闭包
    - 闭包表达式
            
            reversed = sort(names, {(s1: String, s2: String) -> Bool in return s1 > s2 })

        - 根据上下文推断类型
            
                reversed = sort(names, {s1, s2 in return s1 > s2 })

        - 单行表达式可以省略`return`
                
                reversed = sort(names, {s1, s2 in s1 > s2})

        - 参数吗简写
            
                reversed = sort(names, {$0 > $1})

        - 运算符函数
                
                reversed = sort(names, > )

    - Trailing闭包
        - 在函数括号之外的闭包表达式
            
                reversed = sort(names) {$0 > $1}

## 对象和类

- 类
    - `class`创建类
    - 类名后面加括号,可以创建类的实例`Shape()`
    - 构造函数`init`
    - 析构函数`deinit`
    - `self`属性，实例
- 继承
    - 子类后面跟冒号、父类来继承`class Child: Parent`
    - 重写父类方法，属性，属性观察器，`override`
    - 防止重写`@final`
- 访问器方法
    - `get/set`是放在类成员属性内部的

            var name: String {
                get {
                    return _name
                }
                set {
                    _name = newValue
                }
            }

    - 可以在`set`后面显示设置一个新值替代`newValue`
- 附属脚本
        
        subscript(index: Int) -> Int {
            //返回与index匹配的值
        }

## 枚举和结构

- 枚举
    - `enum/case`
    - 可以包含方法
    - `toRaw`和`fromRaw`在原始值和枚举值之间转换
- 结构体
    - `struct`
    - 结构体传值,类传引用

## swift属性

- 存储属性
    - 变量存储属性`var`
    - 常量存储属性`let`
    - 延迟存储属性`@lazy`
- 计算属性
    - getter只读计算属性
    - setter只写计算属性
- 类型属性
    - `static`定义值类型类型属性
    - `class`定义类类型属性

## 接口和扩展

- 接口
    - `protocol`
    - 类,枚举,结构体都可以实现接口
- 扩展
    - `extension`
    - 为现有类型添加功能
- 属性监视器
    - `willSet`设置新值前调用
    - `didSet`新值被设置后立即调用

## 泛型

- 尖括号 `<>`
- `where`来指定需求列表
 
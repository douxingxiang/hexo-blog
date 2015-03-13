title: TypeScript基本类型
date: 2015-03-08 09:00:00
tags: TypeScript
categories: TypeScript手册
---

> 声明：原文来自[TypeScript官网](http://www.typescriptlang.org/Handbook)，本文仅作为中文入门之用。

# 基本类型

但凡实用点的程序，都需要处理一些简单的数据单元：数字、字符串、结构、布尔值等。TypeScript支持JavaScript所支持的类型，还提供了方便的枚举类型。

## 布尔类型/boolean

最基本的数据类型是简单的`true`/`false`值，在JavaScript和TypeScript（还有其他语言）中称作`boolean`值。

    var isDone: boolean = false;

<!-- more --> 

## 数字类型/number

跟JavaScript一样，TypeScript中所有的数字都是浮点值。浮点值的类型是`number`。

    var height: number = 6;

## 字符串类型/string

文本数据是JavaScript中创建类似网页和服务器程序的另一个基本部分。与其他语言一样，我们使用`string`表示文本数据类型。类似JavaScript，TypeScript同样使用双引号（"）或单引号（'）来包围字符串数据。

    var name: string = "bob";
    name = 'smith';

## 数组类型

类似JavaScript，TyeScript允许使用数组值。数组类型可以通过以下两种方式来编写。第一种，使用元素的类型，后跟`[]`来表示该元素类型的数组：

    var list:number[] = [1, 2, 3];

The second way uses a generic array type, Array<elemType>:
第二种使用数组类型泛型表示法，`Array<elemType>`：

    var list:Array<number> = [1, 2, 3];

## 枚举类型/enum

`enum`是对JavaScript标准类型集的一个有用补充。类似C#等语言，枚举比数字值能更友好地表示命名。

    enum Color {Red, Green, Blue};
    var c: Color = Color.Green;

枚举默认从0开始对成员计数。你可以通过手动设置成员的值来改变。比如，我们设置上一个例子从1开始：

    enum Color {Red = 1, Green, Blue};
    var c: Color = Color.Green;

甚至手动设置枚举中的全部值：

    enum Color {Red = 1, Green = 2, Blue = 4};
    var c: Color = Color.Green;

枚举中一个方便的特性就是你可以使用数值，也可以使用名字。比如，我们知道值`2`，但是不确定它所对应的颜色枚举值，我们可以查询对应的名字：

    enum Color {Red = 1, Green, Blue};
    var colorName: string = Color[2];

    alert(colorName);


## 任意类型/any

我们有可能需要描述一种变量的类型，这种类型在编写应用时还不确定。这些值可能来自动态内容，比如用户或者第三方库。这种情况下，我们想选择性忽略类型检查，让它们能够在编译检查时通过。我们只需要标记成`any`类型：

    var notSure: any = 4;
    notSure = "maybe a string instead";
    notSure = false; // okay, definitely a boolean

`any`类型是一种处理现有JavaScript的强大方式，允许你在编译时选择性进行或忽略类型检查。

如果你知道部分类型，但不是全部，`any`类型也是很方便的。比如，你可能有个混合类型的数组：

    var list:any[] = [1, true, "free"];

    list[1] = 100;

## 空类型/void

Perhaps the opposite in some ways to 'any' is 'void', the absence of having any type at all. You may commonly see this as the return type of functions that do not return a value:

也许某种程度上`void`是与`any`相反的类型，意指没有任何类型。你可能经常遇到不返回值的函数：

    function warnUser(): void {
        alert("This is my warning message");
    }

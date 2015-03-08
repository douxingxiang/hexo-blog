title: TypeScript接口
date: 2015-03-08 13:01:00
tags: TypeScript
categories: TypeScript手册
---

> 声明：原文来自[TypeScript官网](http://www.typescriptlang.org/Handbook#interfaces)，本文仅作为中文入门之用。

# 接口

TypeScript的一个核心原则在于类型检查关注值所具有的“形状”上。有时候称作“鸭子类型（duck typing）”或“结构化子类型（structural subtyping）”。TypeScript中，接口担任着对类型进行命名的角色，不管是在自己代码内部定义约定（constract），还是定义与项目之外代码的约定上，都很强大。

<!-- more --> 

## 第一个接口

理解接口工作的最简单方式就是看个简单例子：

    function printLabel(labelledObj: {label: string}) {
      console.log(labelledObj.label);
    }

    var myObj = {size: 10, label: "Size 10 Object"};
    printLabel(myObj);

我们可以再次编写相同的例子，这次使用接口来描述包含一个字符串类型`label`属性的需求：

    interface LabelledValue {
      label: string;
    }

    function printLabel(labelledObj: LabelledValue) {
      console.log(labelledObj.label);
    }

    var myObj = {size: 10, label: "Size 10 Object"};
    printLabel(myObj);

`LabelledValue`接口现在可以用于描述上例中的要求了。它仍然表示包含单个字符串类型的`label`属性的意思。注意，我们没必要像其他语言一样，显式声明传递给`printLabel`的对象参数实现了这个接口。这里，只有形状才有关系。如果传递给函数的对象满足了列出的要求，就是允许的。

需要指出的是类型检查器并不要求属性的顺序，只要接口所要求的属性存在、类型匹配就可以。

## 可选属性

接口中并不是所有属性都是必须的。有些只有满足一定条件才存在，也可能根本不需要。在以下情形下可选属性会很流行：当创建一个类似“选项口袋（option bags）”的模式时，用户可以传递一个仅设置了部分属性的对象给函数。

下面是这个模式的例子：

    interface SquareConfig {
      color?: string;
      width?: number;
    }

    function createSquare(config: SquareConfig): {color: string; area: number} {
      var newSquare = {color: "white", area: 100};
      if (config.color) {
        newSquare.color = config.color;
      }
      if (config.width) {
        newSquare.area = config.width * config.width;
      }
      return newSquare;
    }

    var mySquare = createSquare({color: "black"});

包含可选属性的接口与其他接口的写法类似，每个可选属性的声明中需要加个`?`。

可选属性的优势是，你可以描述可能出现的属性，也能捕获不期望出现的属性。比如，我们拼错了传给`createSquare`的属性名，然后得到一个错误消息：

    interface SquareConfig {
      color?: string;
      width?: number;
    }

    function createSquare(config: SquareConfig): {color: string; area: number} {
      var newSquare = {color: "white", area: 100};
      if (config.color) {
        newSquare.color = config.collor;  // 类型检查器可以在这里捕获拼错的名字
      }
      if (config.width) {
        newSquare.area = config.width * config.width;
      }
      return newSquare;
    }

    var mySquare = createSquare({color: "black"});  

## 函数类型

接口可以描述很多JavaScript对象能支持的“形状”。除了描述包含属性的对象外，接口也可以描述函数类型。

要用接口来描述函数类型，我们需要给接口一个调用签名。它类似函数声明，但只有参数列表和返回类型。

    interface SearchFunc {
      (source: string, subString: string): boolean;
    }

一旦定义，我们就可以像其他接口一样使用函数类型接口。这里，我们演示如何创建一个函数类型的变量，然后给它赋值一个相同类型的函数值。

    var mySearch: SearchFunc;
    mySearch = function(source: string, subString: string) {
      var result = source.search(subString);
      if (result == -1) {
        return false;
      }
      else {
        return true;
      }
    }

对于函数类型的类型检查，参数名字没必要与声明匹配。比如，我们可以这样重写上面的例子：

    var mySearch: SearchFunc;
    mySearch = function(src: string, sub: string) {
      var result = src.search(sub);
      if (result == -1) {
        return false;
      }
      else {
        return true;
      }
    }

函数参数只被检查一次，每个位置上参数的类型都会被一一对应检查。这里，函数表达式的返回值由它返回的值隐式给出（_false_和_true_）。如果函数表达式返回数字或字符串，类型检查器将警告我们的返回类型与SearchFunc接口声明的返回类型不匹配。

## 数组类型

与使用接口描述函数类型类似，我们也可以描述数组类型。数组类型包含一个`index`类型来描述能用于索引对象的类型，还有相应的用于访问索引的返回类型。

    interface StringArray {
      [index: number]: string;
    }

    var myArray: StringArray;
    myArray = ["Bob", "Fred"];

支持两种索引类型：字符串和数字。可以同时支持两种类型的索引，但条件是数字索引返回类型必须是字符串索引返回类型的子类型。

虽然索引签名在描述数组和“字典”模式上很强大，它们同时强制所有属性匹配其返回类型。本例中，属性不匹配一般化的索引，类型检查器给出了一个错误：

    interface Dictionary {
      [index: string]: string;
      length: number;    // 错误，“length”类型不是索引的子类型
    } 

## 类类型

### 实现接口

类似C#和Java这些语言，TypeScript也同样支持接口最常见的用法（显式要求类满足特定的约定）。

    interface ClockInterface {
        currentTime: Date;
    }

    class Clock implements ClockInterface  {
        currentTime: Date;
        constructor(h: number, m: number) { }
    }

你可以在类中实现接口来描述方法，就像下面例子中`setTime`：

    interface ClockInterface {
        currentTime: Date;
        setTime(d: Date);
    }

    class Clock implements ClockInterface  {
        currentTime: Date;
        setTime(d: Date) {
            this.currentTime = d;
        }
        constructor(h: number, m: number) { }
    }

接口描述类公共的部分，而不是公共、私有两部分。因此你不能使用接口来检查一个类实例的私有部分是否包含某些特定类型。

### 类的静态/实例部分的区别

处理类和接口时，需要记住类有_两种_类型：静态的和实例的。你可能注意到了，如果你使用构造器签名来创建一个接口，然后尝试创建一个类来实现这个接口时，就会得到一个错误：

    interface ClockInterface {
        new (hour: number, minute: number);
    }

    class Clock implements ClockInterface  {
        currentTime: Date;
        constructor(h: number, m: number) { }
    }

因为当类实现接口时，只会检查类的实例部分。由于构造器属于静态部分，因此不会被检查。

相反，你需要直接处理类的“静态”部分。本例中，我们直接处理类：

    interface ClockStatic {
        new (hour: number, minute: number);
    }

    class Clock  {
        currentTime: Date;
        constructor(h: number, m: number) { }
    }

    var cs: ClockStatic = Clock;
    var newClock = new cs(7, 30);

## 扩展接口

与类相似，接口也可以相互扩展。扩展将会把一个接口中的成员拷贝到另一个，给予你更大自由来抽取接口到可重用组件。

    interface Shape {
        color: string;
    }

    interface Square extends Shape {
        sideLength: number;
    }

    var square = <Square>{};
    square.color = "blue";
    square.sideLength = 10;

接口可以通过扩展多个接口来建所有接口的组合。

    interface Shape {
        color: string;
    }

    interface PenStroke {
        penWidth: number;
    }

    interface Square extends Shape, PenStroke {
        sideLength: number;
    }

    var square = <Square>{};
    square.color = "blue";
    square.sideLength = 10;
    square.penWidth = 5.0;

## 混合类型

之前我们提到过，接口可以描述现有JavaScript中出现的丰富类型。因为JavaScript的动态和灵活特性，你可能偶尔碰到一个组合了上面所有类型的对象。

例如，一个作为函数和对象的对象，同时包含额外属性：

    interface Counter {
        (start: number): string;
        interval: number;
        reset(): void;
    }

    var c: Counter;
    c(10);
    c.reset();
    c.interval = 5.0;

当与第三方JavaScript打交道时，你可能需要使用上面的模式来完整地描述类型。
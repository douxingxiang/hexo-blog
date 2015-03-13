title: TypeScript接口
date: 2015-03-08
tags: TypeScript
categories: TypeScript手册
---

> 声明：原文来自[TypeScript官网](http://www.typescriptlang.org/Handbook#interfaces)，本文仅作为中文入门之用。

# Interfaces
# 接口

One of TypeScript's core principles is that type-checking focuses on the 'shape' that values have. This is sometimes called "duck typing" or "structural subtyping". In TypeScript, interfaces fill the role of naming these types, and are a powerful way of defining contracts within your code as well as contracts with code outside of your project. 

TypeScript的一个核心原则在于类型检查关注值所具有的“形状”上。有时候称作“鸭子类型（duck typing）”或“结构化子类型（structural subtyping）”。TypeScript中，接口担任着对类型进行命名的角色，不管是在自己代码内部定义约定（constract），还是定义与项目之外代码的约定上，都很强大。

## Our First Interface
## 第一个接口

The easiest way to see how interfaces work is to start with a simple example:

理解接口工作的最简单方式就是看个简单例子：

    function printLabel(labelledObj: {label: string}) {
      console.log(labelledObj.label);
    }

    var myObj = {size: 10, label: "Size 10 Object"};
    printLabel(myObj);

The type-checker checks the call to 'printLabel'. The 'printLabel' function has a single parameter that requires that the object passed in has a property called 'label' of type string. Notice that our object actually has more properties than this, but the compiler only checks to that _at least_ the ones required are present and match the types required. 

类型检查器检查对`printLabel`的调用。`printLabel`函数只有一个参数，这个参数需要传递一个对象，该对象有个字符串类型的`label`属性。注意，我们的对象事实上包含多个属性，但是编译器只检查_至少_必须的那个参数存在，并且类型也匹配。

We can write the same example again, this time using an interface to describe the requirement of having the 'label' property that is a string:

我们可以再次编写相同的例子，这次使用接口来描述包含一个字符串类型`label`属性的需求：

    interface LabelledValue {
      label: string;
    }

    function printLabel(labelledObj: LabelledValue) {
      console.log(labelledObj.label);
    }

    var myObj = {size: 10, label: "Size 10 Object"};
    printLabel(myObj);

The interface 'LabelledValue' is a name we can now use to describe the requirement in the previous example. It still represents having a single property called 'label' that is of type string. Notice we didn't have to explicitly say that the object we pass to 'printLabel' implements this interface like we might have to in other languages. Here, it's only the shape that matters. If the object we pass to the function meets the requirements listed, then it's allowed.

`LabelledValue`接口现在可以用于描述上例中的要求了。它仍然表示包含单个字符串类型的`label`属性的意思。注意，我们没必要像其他语言一样，显式声明传递给`printLabel`的对象参数实现了这个接口。这里，只有形状才有关系。如果传递给函数的对象满足了列出的要求，就是允许的。

It's worth pointing out that the type-checker does not require that these properties come in any sort of order, only that the properties the interface requires are present and have the required type.

需要指出的是类型检查器并不要求属性的顺序，只要接口所要求的属性存在、类型匹配就可以。

## Optional Properties
## 可选属性

Not all properties of an interface may be required. Some exist under certain conditions or may not be there at all. These optional properties are popular when creating patterns like "option bags" where the user passes an object to a function that only has a couple properties filled in.

接口中并不是所有属性都是必须的。有些只有满足一定条件才存在，也可能根本不需要。在以下情形下可选属性会很流行：当创建一个类似“选项口袋（option bags）”的模式时，用户可以传递一个仅设置了部分属性的对象给函数。

Here's as example of this pattern:

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

Interfaces with optional properties are written similar to other interfaces, which each optional property denoted with a '?' as part of the property declaration. 

包含可选属性的接口与其他接口的写法类似，每个可选属性的声明中需要加个`?`。

The advantage of optional properties is that you can describe these possibly available properties while still also catching properties that you know are not expected to be available. For example, had we mistyped the name of the property we passed to 'createSquare', we would get an error message letting us know:

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

## Function Types
## 函数类型

Interfaces are capable of describing the wide range of shapes that JavaScript objects can take. In addition to describing an object with properties, interfaces are also capable of describing function types.

接口可以描述很多JavaScript对象能支持的“形状”。除了描述包含属性的对象外，接口也可以描述函数类型。

To describe a function type with an interface, we give the interface a call signature. This is like a function declaration with only the parameter list and return type given.

要用接口来描述函数类型，我们需要给接口一个调用签名。它类似函数声明，但只有参数列表和返回类型。

    interface SearchFunc {
      (source: string, subString: string): boolean;
    }

Once defined, we can use this function type interface like we would other interfaces. Here, we show how you can create a variable of a function type and assign it a function value of the same type.

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

For function types to correctly type-check, the name of the parameters do not need to match. We could have, for example, written the above example like this:

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

Function parameters are checked one at a time, with the type in each corresponding parameter position checked against each other. Here, also, the return type of our function expression is implied by the values it returns (here _false_ and _true_). Had the function expression returned numbers or strings, the type-checker would have warned us that return type doesn't match the return type described in the SearchFunc interface.

函数参数只被检查一次，每个位置上参数的类型都会被一一对应检查。这里，函数表达式的返回值由它返回的值隐式给出（_false_和_true_）。如果函数表达式返回数字或字符串，类型检查器将警告我们的返回类型与SearchFunc接口声明的返回类型不匹配。

## Array Types
## 数组类型

Similarly to how we can use interfaces to describe function types, we can also describe array types. Array types have an 'index' type that describes the types allowed to index the object, along with the corresponding return type for accessing the index.

与使用接口描述函数类型类似，我们也可以描述数组类型。数组类型包含一个`index`类型来描述能用于索引对象的类型，还有相应的用于访问索引的返回类型。

    interface StringArray {
      [index: number]: string;
    }

    var myArray: StringArray;
    myArray = ["Bob", "Fred"];

There are two types of supported index types: string and number. It is possible to support both types of index, with the restriction that the type returned from the numeric index must be a subtype of the type returned from the string index.

支持两种索引类型：字符串和数字。可以同时支持两种类型的索引，但条件是数字索引返回类型必须是字符串索引返回类型的子类型。

While index signatures are a powerful way to describe the array and 'dictionary' pattern, they also enforce that all properties match their return type. In this example, the property does not match the more general index, and the type-checker gives an error:

虽然索引签名在描述数组和“字典”模式上很强大，它们同时强制所有属性匹配其返回类型。本例中，属性不匹配一般化的索引，类型检查器给出了一个错误：

    interface Dictionary {
      [index: string]: string;
      length: number;    // 错误，“length”类型不是索引的子类型
    } 

## Class Types
## 类类型

### Implementing an interface
### 实现接口

One of the most common uses of interfaces in languages like C# and Java, that of explicitly enforcing that a class meets a particular contract, is also possible in TypeScript.

类似C#和Java这些语言，TypeScript也同样支持接口最常见的用法（显式要求类满足特定的约定）。

    interface ClockInterface {
        currentTime: Date;
    }

    class Clock implements ClockInterface  {
        currentTime: Date;
        constructor(h: number, m: number) { }
    }

You can also describe methods in an interface that are implemented in the class, as we do with 'setTime' in the below example:

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

Interfaces describe the public side of the class, rather than both the public and private side. This prohibits you from using them to check that a class also has particular types for the private side of the class instance.

接口描述类公共的部分，而不是公共、私有两部分。因此你不能使用接口来检查一个类实例的私有部分是否包含某些特定类型。

### Difference between static/instance side of class
### 类的静态/实例部分的区别

When working with classes and interfaces, it helps to keep in mind that a class has _two_ types: the type of the static side and the type of the instance side. You may notice that if you create an interface with a construct signature and try to create a class that implements this interface you get an error:

处理类和接口时，需要记住类有_两种_类型：静态的和实例的。你可能注意到了，如果你使用构造器签名来创建一个接口，然后尝试创建一个类来实现这个接口时，就会得到一个错误：

    interface ClockInterface {
        new (hour: number, minute: number);
    }

    class Clock implements ClockInterface  {
        currentTime: Date;
        constructor(h: number, m: number) { }
    }

This is because when a class implements an interface, only the instance side of the class is checked. Since the constructor sits in the static side, it is not included in this check.

因为当类实现接口时，只会检查类的实例部分。由于构造器属于静态部分，因此不会被检查。

Instead, you would need to work with the 'static' side of the class directly. In this example, we work with the class directly:

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

## Extending Interfaces
## 扩展接口

Like classes, interfaces can extend each other. This handles the task of copying the members of one interface into another, allowing you more freedom in how you separate your interfaces into reusable components.

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

An interface can extend multiple interfaces, creating a combination of all of the interfaces.

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

## Hybrid Types
## 混合类型

As we mentioned earlier, interfaces can describe the rich types present in real world JavaScript. Because of JavaScript's dynamic and flexible nature, you may occasionally encounter an object that works as a combination of some of the types described above. 

之前我们提到过，接口可以描述现有JavaScript中出现的丰富类型。因为JavaScript的动态和灵活特性，你可能偶尔碰到一个组合了上面所有类型的对象。

One such example is an object that acts as both a function and an object, with additional properties:

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

When interacting with 3rd-party JavaScript, you may need to use patterns like the above to fully-describe the shape of the type.

当与第三方JavaScript打交道时，你可能需要使用上面的模式来完整地描述类型。
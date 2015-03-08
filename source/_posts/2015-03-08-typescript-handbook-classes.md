title: TypeScript类
date: 2015-03-08 16:55:00
tags: TypeScript
categories: TypeScript手册
---

> 声明：原文来自[TypeScript官网](http://www.typescriptlang.org/Handbook#classes)，本文仅作为中文入门之用。

# 类

传统的JavaScript将函数和基于原型的继承作为创建重用组件的方式，但是对于那些习惯面向对象方法（类继承功能，对象根据类来创建）的程序员来说会很诡异。从JavaScript的下个版本的ECMAScript 6开始，JavaScript程序员可以使用面向对象基于类（object-oriented class-based）的方法来构建应用了。在TypeScript中，我们现在就允许开发者使用这些技巧来编译成为跨主要浏览器和平台的JavaScript代码，而不用等待下个版本的JavaScript。
<!-- more -->
## 类

我们看一个简单的基于类的例子：

    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        greet() {
            return "Hello, " + this.greeting;
        }
    }

    var greeter = new Greeter("world");

如果你用过C#或Java，你可能会熟悉这种语法。我们声明一个新类`Greeter`。这个类有三个成员，一个`greeting`属性，一个构造器，一个`greet`方法。

你会注意到，在类中当我们引用类的成员时会在前面添加`this.`。这表示成员访问。

最后一行我们使用`new`创建了`Greeter`类的一个实例。它会调用我们前面定义的构造器，根据`Greeter`来创建一个新对象，然后运行构造器来初始化。

## 继承

TypeScript中，我们使用通用的面向对象模式。当然，基于类编程中最基本的模式之一就是可以通过继承扩展旧类来创建新类。

看个例子：

    class Animal {
        name:string;
        constructor(theName: string) { this.name = theName; }
        move(meters: number = 0) {
            alert(this.name + " moved " + meters + "m.");
        }
    }

    class Snake extends Animal {
        constructor(name: string) { super(name); }
        move(meters = 5) {
            alert("Slithering...");
            super.move(meters);
        }
    }

    class Horse extends Animal {
        constructor(name: string) { super(name); }
        move(meters = 45) {
            alert("Galloping...");
            super.move(meters);
        }
    }

    var sam = new Snake("Sammy the Python");
    var tom: Animal = new Horse("Tommy the Palomino");

    sam.move();
    tom.move(34);

这个例子包含了TypeScript中与其他语言通用的部分继承特性。这里我们使用`extends`关键词来创建子类。你可以看到`Horse`和`Snake`子类继承了基类`Animal`，然后可以访问其特性。

这个例子同时也展示了，可以在子类中创建特定方法来覆盖基类中的方法。这里`Snake`和`Horse`都创建了`move`方法覆盖了`Animal`中的`move`，使得每个类的功能都是特定的。

## private /public修饰符

### 默认public

你可能注意到上面的例子中我们没必要使用`public`来让类中的成员可见。类似C#的语言要求每个成员都要加上`public`标签才可见。在TypeScript，每个成员默认都是公共的。

你可能仍然想标记成员为`private`，这样你可以控制类外部公共可见的东西。我们可以重写上节的`Animal`类：

    class Animal {
        private name:string;
        constructor(theName: string) { this.name = theName; }
        move(meters: number) {
            alert(this.name + " moved " + meters + "m.");
        }
    }

### 理解private

TypeScript是个结构化类型系统。当我们比较两个不同类型时，不考虑它们的来源，如果每个成员都兼容，那么我们说这些类型是兼容的。

当比较包含`private`成员的类型时，我们会区别对待。对两个兼容的类型，如果其中一个包含`private`成员，那么另一个必须包含来自相同声明的私有成员。

我们看个例子来更好地理解实际中的用法：

    class Animal {
        private name:string;
        constructor(theName: string) { this.name = theName; }
    }

    class Rhino extends Animal {
        constructor() { super("Rhino"); }
    }

    class Employee {
        private name:string;
        constructor(theName: string) { this.name = theName; }   
    }

    var animal = new Animal("Goat");
    var rhino = new Rhino();
    var employee = new Employee("Bob");

    animal = rhino;
    animal = employee; //错误：Animal和Employee不兼容

这个例子中，有一个`Animal`和一个`Rhino`，`Rhino`是`Animal`的子类。还有一个`Employee`，从形式上看与`Animal`相同。我们创建这些类的实例，然后尝试相互赋值来看看会发生什么。由于`Animal`和`Rhino`共享`Animal`中私有部分`private name: string`声明，它们是兼容的。但是，`Employee`不一样。当我们尝试将`Employee`赋值给一个`Animal`时，我们得到一个类型不兼容的错误。尽管`Employee`同样包含名称为`name`的私有成员，但它与`Animal`中创建的那个不同。

### 参数属性

`public`和`private`关键词还提供了一种简写，通过创建参数属性来创建和初始化类中的成员。这种属性可以让你一步就可以创建和初始化成员。这里有个上面例子更进一步的版本。注意我们如何去掉`theName`的，只在构造器中使用了简写的`private name: string`参数来创建和初始化`name`成员。

    class Animal {
        constructor(private name: string) { }
        move(meters: number) {
            alert(this.name + " moved " + meters + "m.");
        }
    }

按照这种方式使用`private`可以创建并初始化私有成员，`public`类似。

## 访问器

TypeScript支持getter/setter来拦截对对象成员的访问。这提供了一种细粒度的方式来控制对每个对象
成员的访问。

我们将一个简单的类转换为使用`get`和`set`的形式。首先，我们从一个不包含getter和setter的例子开始。

    class Employee {
        fullName: string;
    }

    var employee = new Employee();
    employee.fullName = "Bob Smith";
    if (employee.fullName) {
        alert(employee.fullName);
    }

虽然允许大家直接随机地设置`fullName`是很方便的，但是一旦人们一时冲动改了名字，就可能出现问题。

这个版本中，我们在允许他们修改employee之前检查他们是否有可用密码。我们先将对`fullName`的访问替换为`set`来检查密码。我们添加了对应的`get`来让上例继续无缝地工作。

    var passcode = "secret passcode";

    class Employee {
        private _fullName: string;

        get fullName(): string {
            return this._fullName;
        }

        set fullName(newName: string) {
            if (passcode && passcode == "secret passcode") {
                this._fullName = newName;
            }
            else {
                alert("Error: Unauthorized update of employee!");
            }
        }
    }

    var employee = new Employee();
    employee.fullName = "Bob Smith";
    if (employee.fullName) {
        alert(employee.fullName);
    }

为了证明访问器检查了密码，我们修改下密码来看下当它不匹配时，是否会有个提示框警告我们没有权限更新employee。

注意：访问器需要设置编译器输出ECMAScript 5。

## 静态属性

现在我们只讨论了类的_实例_成员，它们会在实例化的时候出现在对象中。我们还可以创建类的_静态_成员，它们在类本身中可见而不是在实例中。这个例子中，我们在`origin`前使用`static`，因为它是所有各grid的通用值。每个实例通过在前面添加类名来访问这个值。类似实例访问中在前面放`this.`，这里静态访问中我们在前面添加`Grid.`。

    class Grid {
        static origin = {x: 0, y: 0};
        calculateDistanceFromOrigin(point: {x: number; y: number;}) {
            var xDist = (point.x - Grid.origin.x);
            var yDist = (point.y - Grid.origin.y);
            return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
        }
        constructor (public scale: number) { }
    }

    var grid1 = new Grid(1.0);  // 1x scale
    var grid2 = new Grid(5.0);  // 5x scale

    alert(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
    alert(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));

## 高级技巧

### 构造器函数

在TypeScript中声明一个类时，你事实上同时创建了多个声明。首先是类_实例_的类型。

    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        greet() {
            return "Hello, " + this.greeting;
        }
    }

    var greeter: Greeter;
    greeter = new Greeter("world");
    alert(greeter.greet());

这里，当写下`var greeter: Greeter`时，我们将`Greeter`作为类`Greeter`实例的类型。这几乎是其他面向对象语言程序员的第二本能。

我们也可以调用_构造器函数_来创建另一个值。它就是我们`new`类实例时所调用的函数。为了看看实际上它长什么样，我们看看上例生成的JavaScript：

    var Greeter = (function () {
        function Greeter(message) {
            this.greeting = message;
        }
        Greeter.prototype.greet = function () {
            return "Hello, " + this.greeting;
        };
        return Greeter;
    })();

    var greeter;
    greeter = new Greeter("world");
    alert(greeter.greet());

这里`var Greeter`将被赋值为构造器函数。当调用`new`并运行该函数时，我们得到了类的一个实例。这个构造函数同时包含了类中的所有静态成员。思考每个类的另一种方式就是认为它们都有_实例_部分和_静态_部分。

我们稍微修改下例子来看看区别：

    class Greeter {
        static standardGreeting = "Hello, there";
        greeting: string;
        greet() {
            if (this.greeting) {
                return "Hello, " + this.greeting;
            }
            else {
                return Greeter.standardGreeting;
            }
        }
    }

    var greeter1: Greeter;
    greeter1 = new Greeter();
    alert(greeter1.greet());

    var greeterMaker: typeof Greeter = Greeter;
    greeterMaker.standardGreeting = "Hey there!";
    var greeter2:Greeter = new greeterMaker();
    alert(greeter2.greet());

这个例子中，`greeter1`跟之前的功能类似。我们实例化`Greeter`类，然后使用该对象。这些我们之前都看到过。

接着，我们直接使用类。这里我们创建了一个新的`greeterMaker`变量。这个变量将会保存类本身，或者换种说法，构造器函数。这里我们使用`typeof Greeter`，意思是“告诉我Greeter类的类型”而不是实例的类型。或者，更准确地讲，“告诉我Greeter符号的类型”，它是构造函数的类型。这个类型将包含Greeter的所有静态成员，还有生成Greeter类实例的构造器。我们对`greeterMaker`使用`new`，生成了`Greeter`的新实例并像之前一样调用它们。

### 作为接口使用类

上节中我们说过，类声明生成了两种东西：表示类实例的类型和构造函数。由于类创建了类型，你可以在使用接口的地方使用它们。

    class Point {
        x: number;
        y: number;
    }

    interface Point3d extends Point {
        z: number;
    }

    var point3d: Point3d = {x: 1, y: 2, z: 3};

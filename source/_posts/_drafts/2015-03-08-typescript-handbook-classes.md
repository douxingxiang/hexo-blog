title: TypeScript类
date: 2015-03-08 16:55:00
tags: TypeScript
categories: TypeScript手册
---

> 声明：原文来自[TypeScript官网](http://www.typescriptlang.org/Handbook#classes)，本文仅作为中文入门之用。

# Classes
# 类

Traditional JavaScript focuses on functions and prototype-based inheritance as the basic means of building up reusable components, but this may feel a bit awkward to programmers more comfortable with an object-oriented approach, where classes inherit functionality and objects are built from these classes. Starting with ECMAScript 6, the next version of JavaScript, JavaScript programmers will be able to build their applications using this object-oriented class-based approach. In TypeScript, we allow developers to use these techniques now, and compile them down to JavaScript that works across all major browsers and platforms, without having to wait for the next version of JavaScript.

传统的JavaScript关注函数和基于原型的继承作为创建重用组件的方式，但是对于那些习惯面向对象方法（类继承功能，对象根据类来创建）的程序员来说会感到很诡异。从JavaScript的下个版本的ECMAScript 6开始，JavaScript程序员可是使用面向对象基于类的方法来构建应用了。在TypeScript，我们现在允许开发者使用这些技巧来编译成为跨主要浏览器和平台的JavaScript代码，而不用等待下个版本的JavaScript。

## Classes
## 类

Let's take a look at a simple class-based example:
我们看下一个简单的基于类的例子：

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

The syntax should look very familiar if you've used C# or Java before. We declare a new class 'Greeter'. This class has three members, a property called 'greeting', a constructor, and a method 'greet'. 

如果你用过C#或Java，你可能会熟悉这种语法。我们声明一个新类`Greeter`。这个类有三个成员，一个`greeting`属性，一个构造器，一个`greet`方法。

You'll notice that in the class when we refer to one of the members of the class we prepend 'this.'. This denotes that it's a member access.

你会注意到，在类中当我们引用类的成员时会在前面添加`this.`。这表示成员访问。

In the last line we construct an instance of the Greeter class using 'new'. This calls into the constructor we defined earlier, creating a new object with the Greeter shape, and running the constructor to initialize it.

最后一行我们使用`new`创建了Greeter类的一个实例。它会调用我们前面定义的构造器，根据Greeter来创建一个新对象，然后运行构造器来初始化。

## Inheritance
## 继承

In TypeScript, we can use common object-oriented patterns. Of course, one of the most fundamental patterns in class-based programming is being able to extend existing classes to create new ones using inheritance.

TypeScript中，我们使用通过的面向对象模式。当然，基于类编程中最基本的模型之一就是可以通过继承扩展旧类来创建新类。

Let's take a look at an example:
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

This example covers quite a bit of the inheritance features in TypeScript that are common to other languages. Here we see using the 'extends' keywords to create a subclass. You can see this where 'Horse' and 'Snake' subclass the base class 'Animal' and gain access to its features.

这个例子包含了TypeScript中与其他语言通用的一部分继承特性。这里我们使用`extends`关键词来创建子类。你可以看到`Horse`和`Snake`子类继承了基类`Animal`，然后可以访问其特性。

The example also shows off being able to override methods in the base class with methods that are specialized for the subclass. Here both 'Snake' and 'Horse' create a 'move' method that overrides the 'move' from 'Animal', giving it functionality specific to each class.

这个例子同时也展示了，可以在子类中创建专有方法来覆盖基类中的方法。这里`Snake`和`Horse`都创建了`move`方法覆盖了`Animal`中的`move`，使得每个类的功能都是特定的。

## Private/Public modifiers
## private /public修饰符

### Public by default
### 默认public

You may have noticed in the above examples we haven't had to use the word 'public' to make any of the members of the class visible. Languages like C# require that each member be explicitly labelled 'public' to be visible. In TypeScript, each member is public by default. 

你可能注意到上面的例子中我们没必要使用`public`来让类中的成员可见。类似C#的语言要求每个成员都要加上`public`标签才可见。在TypeScript，每个成员都是默认公共的。

You may still mark members a private, so you control what is publicly visible outside of your class. We could have written the 'Animal' class from the previous section like so:

你可能仍然想标记成员为`private`，这样你可以控制类外部公共可见的东西。我们可以重写上节的`Animal`类：

    class Animal {
        private name:string;
        constructor(theName: string) { this.name = theName; }
        move(meters: number) {
            alert(this.name + " moved " + meters + "m.");
        }
    }

### Understanding private
### 理解private

TypeScript is a structural type system. When we compare two different types, regardless of where they came from, if the types of each member are compatible, then we say the types themselves are compatible. 

TypeScript是个结构化类型系统。当我们比较两个不同类型时，不考虑它们的来源，如果每个成员都兼容，那么我们说这些类型是兼容的。

When comparing types that have 'private' members, we treat these differently. For two types to be considered compatible, if one of them has a private member, then the other must have a private member that originated in the same declaration. 

当比较包含`private`成员的类型时，我们会区别对待。对两个兼容的类型，如果其中一个包含`private`成员，那么另一个必须包含来自相同声明的私有成员。

Let's look at an example to better see how this plays out in practice:

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
    animal = employee; //error: Animal and Employee are not compatible

In this example, we have an 'Animal' and a 'Rhino', with 'Rhino' being a subclass of 'Animal'. We also have a new class 'Employee' that looks identical to 'Animal' in terms of shape. We create some instances of these classes and then try to assign them to each other to see what will happen. Because 'Animal' and 'Rhino' share the private side of their shape from the same declaration of 'private name: string' in 'Animal', they are compatible. However, this is not the case for 'Employee'. When we try to assign from an 'Employee' to 'Animal' we get an error that these types are not compatible. Even though 'Employee' also has a private member called 'name', it is not the same one as the one created in 'Animal'. 

这个例子中，有一个`Animal`和一个`Rhino`，`Rhino`是`Animal`的子类。还有一个`Employee`，从形式上看与`Animal`相同。我们创建这些类的实例，然后尝试相互赋值来看看会发生什么。由于`Animal`和`Rhino`共享`Animal`中`private name: string`声明的私有部分，它们是兼容的。但是，`Employee`不一样。当我们尝试将`Employee`赋值给一个`Animal`时，我们得到一个类型不兼容的错误。尽管`Employee`同样包含名称为`name`的私有成员，但它与`Animal`中创建的那个不同。

### Parameter properties
### 参数属性

The keywords 'public' and 'private' also give you a shorthand for creating and initializing members of your class, by creating parameter properties. The properties let you can create and initialize a member in one step. Here's a further revision of the previous example. Notice how we drop 'theName' altogether and just use the shortened 'private name: string' parameter on the constructor to create and initialize the 'name' member.

`public`和`private`关键词还提供了一种简写，通过创建参数属性来创建和初始化类中的成员。这种属性可以让你一步就可以创建和初始化成员。这里有个上面例子更进一步的版本。注意我们如何去掉`theName`的，只在构造器中使用了简写的`private name: string`参数来创建和初始化`name`成员。

    class Animal {
        constructor(private name: string) { }
        move(meters: number) {
            alert(this.name + " moved " + meters + "m.");
        }
    }

Using 'private' in this way creates and initializes a private member, and similarly for 'public'. 

按照这种方式使用`private`可以创建并初始化私有成员，`public`类似。

## Accessors
## 访问器

TypeScript supports getters/setters as a way of intercepting accesses to a member of an object. This gives you a way of having finer-grained control over how a member is accessed on each object.

TypeScript支持getter/setter来拦截对对象成员的访问。这提供了一种细粒度的方式来控制对每个对象
成员的访问。

Let's convert a simple class to use 'get' and 'set'. First, let's start with an example without getters and setters.

我们将一个简单的类转换为使用`get`和`set`的形式。首先，我们从一个不包含getter和setter的例子开始。

    class Employee {
        fullName: string;
    }

    var employee = new Employee();
    employee.fullName = "Bob Smith";
    if (employee.fullName) {
        alert(employee.fullName);
    }

While allowing people to randomly set fullName directly is pretty handy, this might get us in trouble if we people can change names on a whim. 

虽然允许大家随机地直接设置`fullName`是很方便的，但是一旦人们一时冲动改了名字，就可能出现问题。

In this version, we check to make sure the user has a secret passcode available before we allow them to modify the employee. We do this by replacing the direct access to fullName with a 'set' that will check the passcode. We add a corresponding 'get' to allow the previous example to continue to work seamlessly.

这个版本中，我们在允许他们修改employee之前检查他们是否有可用密码。我们先将对`fullName`的访问替换为`set`来检查密码。我们添加了对应的`get`来让上例继续无缝的工作。

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

To prove to ourselves that our accessor is now checking the passcode, we can modify the passcode and see that when it doesn't match we instead get the alert box warning us we don't have access to update the employee.

为了证明访问器检查了密码，我们修改下密码来看下当它不匹配时，是否会有个提示框警告我们没有权限更新employee。

Note: Accessors require you to set the compiler to output ECMAScript 5.

注意：访问器需要设置编译器输出ECMAScript 5。

## Static Properties
## 静态属性

Up to this point, we've only talked about the _instance_ members of the class, those that show up on the object when its instantiated. We can also create _static_ members of a class, those that are visible on the class itself rather than on the instances. In this example, we use 'static' on the origin, as it's a general value for all grids. Each instance accesses this value through prepending the name of the class. Similarly to prepending 'this.' in front of instance accesses, here we prepend 'Grid.' in front of static accesses.

现在我们只讨论了类的_实例_成员，它们会在实例化的时候出现在对象中。我们还可以创建类的_静态_成员，它们在类本身中可见而不是在实例中。这个例子中，我们在`origin`前使用`static`，因为它使所有各自的通用值。每个实例通过在前面添加类名来访问这个值。类似实例访问中在前面放`this.`，这里静态访问中我们在前面`Grid.`。

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

## Advanced Techniques
## 高级技巧

### Constructor functions
### 构造器函数

When you declare a class in TypeScript, you are actually creating multiple declarations at the same time. The first is the type of the _instance_ of the class.

在TypeScript中声明一个类时，你事实上同时创建了声明。首先是类_实例_的类型。

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

Here, when we say 'var greeter: Greeter', we're using Greeter as the type of instances of the class Greeter. This is almost second nature to programmers from other object-oriented languages. 

这里，当写下`var greeter: Greeter`时，我们将`Greeter`作为类`Greeter`的实例的类型。这几乎是其他面向对象语言程序员的第二本能。

We're also creating another value that we call the _constructor function_. This is the function that is called when we 'new' up instances of the class. To see what this looks like in practice, let's take a look at the JavaScript created by the above example:

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

Here, 'var Greeter' is going to be assigned the constructor function. When we call 'new' and run this function, we get an instance of the class. The constructor function also contains all of the static members of the class. Another way to think of each class is that there is an _instance_ side and a _static_ side.

这里`var Greeter`将被赋值为构造器函数。当调用`new`并运行该函数时，我们得到了类的一个实例。这个构造函数同时包含了类中的所有静态成员。思考每个类的另一种方式就是认为它们都有_实例_部分和_静态_部分。

Let's modify the example a bit to show this difference:

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

In this example, 'greeter1' works similarly to before. We instantiate the 'Greeter' class, and use this object. This we have seen before.

这个例子中，`greeter1`跟之前的功能类似。我们实例化`Greeter`类，然后使用该对象。这些我们之前都看到过。

Next, we then use the class directly. Here we create a new variable called 'greeterMaker'. This variable will hold the class itself, or said another way its constructor function. Here we use 'typeof Greeter', that is "give me the type of the Greeter class itself" rather than the instance type. Or, more precisely, "give me the type of the symbol called Greeter", which is the type of the constructor function. This type will contain all of the static members of Greeter along with the constructor that creates instances of the Greeter class. We show this by using 'new' on 'greeterMaker', creating new instances of 'Greeter' and invoking them as before.

接着，我们直接使用类。这里我们创建了一个新的`greeterMaker`变量。这个变量将会保存类本身，或者换种说法，构造器函数。这里我们使用`typeof Greeter`，意思是“告诉我Greeter类的类型”而不是实例的类型。或者，更准确地将，“告诉我Greeter符号的类型”，它使构造函数的类型。这个类型将包含Greeter的所有静态成员，还有生成Greeter类实例的构造器。我们对`greeterMaker`使用`new`，生成了`Greeter`的新实例并像之前一样调用它们。

### Using a class as an interface
### 作为接口使用类

As we said in the previous section, a class declaration creates two things: a type representing instances of the class and a constructor function. Because classes create types, you can use them in the same places you would be able to use interfaces.

上节中我们说过，类声明生成了两种东西：表示类实例的类型和构造函数。由于类创建了类型，你可以在使用接口的地方使用它们。

    class Point {
        x: number;
        y: number;
    }

    interface Point3d extends Point {
        z: number;
    }

    var point3d: Point3d = {x: 1, y: 2, z: 3};

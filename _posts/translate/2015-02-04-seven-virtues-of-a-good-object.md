好对象的 7 大美德

Martin Fowler [says](http://martinfowler.com/bliki/InversionOfControl.html):

Marin Folwer [说](http://martinfowler.com/bliki/InversionOfControl.html)：

> A library is essentially a set of functions that you can call, these days usually organized into classes.

> 库本质上是一组可以调用的函数，这些函数现在经常被组织到类中。

Functions organized into classes? With all due respect, this is wrong. And it is a very common misconception of a class in object-oriented programming. Classes are not organizers of functions. And objects are not data structures.

函数组织到类中？恕我冒昧，这个观点是错误的。而且这是对面向对象编程中类的非常普遍的误解。类不是函数的组织者，对象也不是数据结构。

So what is a "proper" object? Which one is not a proper one? What is the difference? Even though it is a very polemic subject, it is very important. Unless we understand what an object is, how can we write object-oriented software? Well, thanks to Java, Ruby, and others, we can. But how good will it be? Unfortunately, this is not an exact science, and there are many opinions. Here is my list of qualities of a good object.

那么什么是“合理的”对象呢？哪些不合理呢？区别又是什么？虽然这是个争论比较激烈的主题，但同时也是非常重要的。如果我们不了解对象到底是什么，我们怎么才能编写出面向对象的软件呢？好吧，幸亏Java, Ruby, 还有其他语言，我们可以。但是它到底有多好呢？很不幸，这不是精确的科学，而且有很多不同的观点。下面是我认为一个良好对象应该具有的品质。

## Class vs. Object

## 类与对象

<figure>![badge](http://www.yegor256.com/images/2014/11/good-object-1.png)</figure>

Before we start talking about objects, let's define what a _class_ is. It is a place where objects are being born (a.k.a._instantiated_). The main responsibility of a class is to _construct_ new objects on demand and _destruct_ them when they are not used anymore. A class knows how its children should look and how they should behave. In other words, it knows what _contracts_ they should obey.

在我们谈论对象之前，我们先来看看*类*是什么。类是对象出生(也叫*实例化*)的地方。类的主要职责是根据需要*创建*新对象，以及当它们不再被使用时*销毁*它们。类知道它的孩子长什么样、如何表现。换言之，类知道它们遵循的*合约(contract)*。

Sometimes I hear classes being called "object templates" (for example,[Wikipedia says so](https://en.wikipedia.org/wiki/Class_%28computer_programming%29)). This definition is not correct because it places classes into a passive position. This definition assumes that someone will get a template and build an object by using it. This may be true, technically speaking, but conceptually it's wrong. Nobody else should be involved — there are only a class and its children. An object asks a class to create another object, and the class constructs it; that's it. Ruby expresses this concept much better than Java or C++:

有时我听到类被称作“对象模板”(比如，[Wikipedia就这样说](https://en.wikipedia.org/wiki/Class_%28computer_programming%29))。这个定义是不对的，因为它把类放到了被动的境地。这个定义假设有人先取得一个模板，然后使用这个模板创建一个对象。技术上这可能是对的，但是在概念上是错误的。其他人不应该牵涉进来 — 应该只有类和它的孩子。一个对象请求类创建另一个对象，然后类创建了一个对象；就是这样。Ruby表达这个概念要比Java或C++好多了：

``` ruby
photo = File.new('/tmp/photo.png')
```

The object `photo` is constructed by the class `File` (`new` is an entry point to the class). Once constructed, the object is acting on its own. It shouldn't know who constructed it and how many more brothers and sisters it has in the class. Yes, I mean that [reflection](https://en.wikipedia.org/wiki/Reflection_%28computer_programming%29) is a terrible idea, but I'll write more about it in one of the next posts :) Now, let's talk about objects and their best and worst sides.

`photo`对象被类`File`创建(`new`是类的入口点)。一旦被创建后，对象可以自我支配。它不应该知道是谁创建了它，以及类中它的兄弟姐妹有多少。是的，我的意思是[反射(reflection)](https://en.wikipedia.org/wiki/Reflection_%28computer_programming%29) 是个可怕的观点，我将会在接下来用一篇博客来详细阐述:) 现在，我们来谈谈对象以及它们最好和最糟的方面。

## 1. He Exists in Real Life
## 1. 他存在于现实生活中

First of all, an object is a **living organism**. Moreover, an object should be[anthropomorphized](https://en.wikipedia.org/wiki/Anthropomorphism), i.e. treated like a human being (or a pet, if you like them more). By this I basically mean that an object is not a _data structure_ or a collection of functions. Instead, it is an independent entity with its own life cycle, its own behavior, and its own habits.

首先，对象是一个**活着的有机体**。而且，对象应该被[人格化](https://en.wikipedia.org/wiki/Anthropomorphism)，即，被当做人一样对待(或者宠物，如果你更喜欢宠物的话)。根本上说，我的意思是对象不是一个_数据结构_或者一组函数的集合。相反，它是一个独立的实体，有自己的生命周期，自己的行为，自己的习惯。

An employee, a department, an HTTP request, a table in MySQL, a line in a file, or a file itself are proper objects — because they exist in real life, even when our software is turned off. To be more precise, an object is a_representative_ of a real-life creature. It is a _proxy_ of that real-life creature in front of all other objects. Without such a creature, there is — obviously — no object.

一名雇员，一个部门，一个HTTP请求，MySQL中的一张表，文件的一行，或者文件本身都是合理的对象 — 因为它们存在于现实生活，即使当软件被关闭时。更准确来说，一个对象是现实生活中一个生物的_表示(representative)_。与其他对象来一样，它作为现实生活中生物的代理。如果没有这样的生物，显然不存在这样的对象。

``` ruby
photo = File.new('/tmp/photo.png')
puts photo.width()
```

In this example, I'm asking `File` to construct a new object `photo`, which will be a representative of a real file on disk. You may say that a file is also something virtual and exists only when the computer is turned on. I would agree and refine the definition of "real life" as follows: It is everything that exists aside from the scope of the program the object lives in. The disk file is outside the scope of our program; that's why it is perfectly correct to create its representative inside the program.

这个例子中，我请求`File`创建一个新对象`photo`，它将是磁盘上一个真实文件的表示。你也许会说文件也是虚拟的东西，只有电脑开机时才会存在。我同意，那么我把“现实生活”的重新定义为：它是对象所处的程序范围之外的一切事物。磁盘上的文件在我们的程序范围之外；这就是为何在程序内创建它的表示是完全正确的。

A controller, a parser, a filter, a validator, a service locator, a singleton, or a factory are **not** good objects (yes, most GoF patterns are anti-patterns!). They don't exist apart from your software, in real life. They are invented just to tie other objects together. They are artificial and fake creatures. They don't represent anyone. Seriously, an XML parser — who does it represent? Nobody.

一个控制器，一个解析器，一个过滤器，一个验证器，一个服务定位器，一个单例，或者一个工厂都__不是__良好对象(是的，多数GoF模式都是反模式(anti-patterns)！)。脱离了软件，它们并不存在于现实生活中。它们被创建完全是为了将其他对象联系在一起。它们是人造的、仿冒的生物。它们并不表示任何人。严格上说，一个XML解析器到底表示谁呢？没有人。

Some of them may become good if they change their names; others can never excuse their existence. For example, that XML parser can be renamed to "parseable XML" and start to represent an XML document that exists outside of our scope.

它们中的一些如果改变名字可能变成良好的；其余对象的存在则是毫无理由的。比如，XML解析器可以更名为“可解析的XML”，然后可以表示我们程序范围外的XML文档。

Always ask yourself, "What is the real-life entity behind my object?" If you can't find an answer, start thinking about refactoring.

始终问问自己，“我的对象所对应现实生活中的实体是什么？”如果你不能找到答案，考虑下重构吧。

## 2. He Works by Contracts

## 2. 他根据合约办事

<figure>![badge](http://www.yegor256.com/images/2014/11/good-object-3.png)</figure>

A good object always works by contracts. He expects to be hired not because of his personal merits but because he obeys the contracts. On the other hand, when we hire an object, we shouldn't discriminate and expect some specific object from a specific class to do the work for us. We should expect _any_ object to do what our contract says. As long as the object does what we need, we should not be interested in his class of origin, his sex, or his religion.

一个良好对象总是根据合约(constract)办事。他期望被雇佣是因为他遵循合约而不是他的个人优点。另一方面，当我们雇佣一个对象，我们不应该歧视它，并期望一个特定类的特定对象来为我们工作。我们应该期望_任何_对象做我们间的合约所约定的事情。只要这个对象做我们所需要的事，我们就不应该关心他的出身，他的性别，或者他的信仰。

For example, I need to show a photo on the screen. I want that photo to be read from a file in PNG format. I'm contracting an object from class`DataFile` and asking him to give me the binary content of that image.

比如，我想要在屏幕上展示一张图片。我希望图片从一个PNG格式的文件读取。我其实是在雇佣一个来自`DataFile`类的对象，要求他给我那幅图片的二进制内容。

But wait, do I care where exactly the content will come from — the file on disk, or an HTTP request, or maybe a document in Dropbox? Actually, I don't. All I care about is that some object gives me a byte array with PNG content. So my contract would look like this:

但是等会，我关心内容到底来自哪里吗 — 磁盘上的文件，或者HTTP请求，或者可能Dropbox中的一个文档？事实上，我不关心。我所关心的是有对象给我PNG内容的字节数组。所以，我的合约是这样的：

``` java
interface Binary {
  byte[] read();
}
```

Now, any object from any class (not just `DataFile`) can work for me. All he has to do, in order to be eligible, is to obey the contract — by implementing the interface `Binary`.

现在，任何类的任何对象(不仅仅是`DataFile`)都可以为我工作。如果他是合格的，那么他所应该做的，就是遵循合约 — 通过实现`Binary`接口。

The rule here is simple: every public method in a good object should implement his counterpart from an interface. If your object has public methods that are not inherited from any interface, he is badly designed.

规则很简单：良好对象的每个公共方法都应该实现接口中对应的方法。如果你的对象有公共方法没有实现任何接口，那么他被设计得很糟糕。

There are two practical reasons for this. First, an object working without a contract is impossible to mock in a unit test. Second, a contractless object is impossible to extend via [decoration](https://en.wikipedia.org/wiki/Decorator_pattern).

这里有两个实际原因。首先，一个没有合约的对象不能在单元测试中进行模拟(mock)。另外，无合约的对象不能通过[装饰(decoration)](https://en.wikipedia.org/wiki/Decorator_pattern)来扩展。

## 3. He Is Unique

## 3. 他是独特的

A good object should always encapsulate something in order to be unique. If there is nothing to encapsulate, an object may have identical clones, which I believe is bad. Here is an example of a bad object, which may have clones:

一个良好对象应当总是封装一些东西以保持独特性。如果没有可以封装的东西，这个对象可能有完全一样的复制品(克隆)，我认为这是糟糕的。下面是一个可能有克隆的糟糕对象的例子：

``` java
class HTTPStatus implements Status {
  private URL page = new URL("http://www.google.com");
  @Override
  public int read() throws IOException {
    return HttpURLConnection.class.cast(
      this.page.openConnection()
    ).getResponseCode();
  }
}
```

I can create a few instances of class `HTTPStatus`, and all of them will be equal to each other:

我可以创建很多`HTTPStatus`类的实例，它们都是相等的：

``` java
first = new HTTPStatus();
second = new HTTPStatus();
assert first.equals(second);
```

Obviously utility classes, which have only static methods, can't instantiate good objects. More generally, utility classes don't have any of the merits mentioned in this article and can't even be called "classes". They are simply terrible abusers of an object paradigm and exist in modern object-oriented languages only because their inventors enabled static methods.

很显然，实用类(utility classes)，可能只包含静态方法，不能实例化良好对象。更一般地说，实用类没有本文提到的任何优点，甚至不能称作"类"。它们仅仅滥用了对象范式(object paradign)，它们能存在于面向对象中仅仅由于它们的创造者启用了静态方法。

## 4. He Is Immutable

## 4. 他是不可变的

A good object should never change his encapsulated state. Remember, an object is a representative of a real-life entity, and this entity should stay the same through the entire life of the object. In other words, an object should never betray those whom he represents. He should never change owners. :)

一个良好对象应该永远不改变他封装的状态。记住，对象是现实生活中实体的表示，而这个实体应该在对象的整个生命周期中保持不变。换句话说，对象不应该背叛他所表示的实体。他永远不应该换主人。:)

Be aware that immutability doesn't mean that all methods always return the same values. Instead, a good immutable object is very dynamic. However, he never changes his internal state. For example:

注意，不可变性(immutability)并不意味着所有方法都应该返回相同的值。相反，一个良好的不可变对象是非常动态的。然而，他不应该改变他的内部状态。比如：

``` java
@Immutable
final class HTTPStatus implements Status {
  private URL page;
  public HTTPStatus(URL url) {
    this.page = url;
  }
  @Override
  public int read() throws IOException {
    return HttpURLConnection.class.cast(
      this.page.openConnection()
    ).getResponseCode();
  }
}
```

Even though the method `read()` may return different values, the object is immutable. He points to a certain web page and will never point anywhere else. He will never change his encapsulated state, and he will never betray the URL he represents.

尽管`read()`方法返回不同的值，这个对象仍然是不可变的。他指向一个特定的Web页面，并且永远不会指向其他地方。他永远不会改变他的内部状态，也不会背叛他所表示的URL。

Why is immutability a virtue? This article explains in detail: [Objects Should Be Immutable](http://www.yegor256.com/2014/06/09/objects-should-be-immutable.html). In a nutshell, immutable objects are better because:

为什么不可变性是一个美德呢？这篇文章进行了详细的解释：[对象应该是不可变的](http://www.yegor256.com/2014/06/09/objects-should-be-immutable.html)。简而言之，不可变对象更好，因为：

*   Immutable objects are simpler to construct, test, and use.
*   Truly immutable objects are always thread-safe.
*   They help avoid temporal coupling.
*   Their usage is side-effect free (no defensive copies).
*   They always have failure atomicity.
*   They are much easier to cache.
*   They prevent [NULL references](http://www.yegor256.com/2014/05/13/why-null-is-bad.html).

*   不可变对象创建、测试和使用更加简单。
*   真正的不可变对象总是线程安全的。
*   他们可以帮助避免时间耦合(temporal coupling，[[译者注](http://blog.ploeh.dk/2011/05/24/DesignSmellTemporalCoupling/)]指系统中组件的依赖关系与时间有关，如，两行代码，后一行需要前一行代码先执行，这种依赖关系就是与时间有关的，对应的还有空间耦合/spatial coupling)。
*   他们的用法没有副作用(没有防御性拷贝，[[译者注](http://www.javapractices.com/topic/TopicAction.do?Id=15)]由于对象是可变的，为了保存对象在执行代码前的状态，需要对该对象做一份拷贝)。
*   他们总是具有失败原子性(failure atomicity, [[译者注](http://www.cnblogs.com/haokaibo/p/strive-for-failure-atomicity.html)]如果方法失败，那么对象状态应该与方法调用前一致)。
*   他们更容易缓存。
*   他们可以防止[空引用](http://www.yegor256.com/2014/05/13/why-null-is-bad.html)。

Of course, a good object doesn't have [setters](http://www.yegor256.com/2014/09/16/getters-and-setters-are-evil.html), which may change his state and force him to betray the URL. In other words, introducing a `setURL()`method would be a terrible mistake in class `HTTPStatus`.

当然，一个良好的对象不应该有[setter方法](http://www.yegor256.com/2014/09/16/getters-and-setters-are-evil.html)，因为这些方法可以改变他的状态，强迫他背叛URL。换言之，在`HTTPStatus`类中加入一个`setURL()`方法是个可怕的错误。

Besides all that, immutable objects will force you to make more cohesive, solid, and understandable designs, as this article explains: [How Immutability Helps](http://www.yegor256.com/2014/11/07/how-immutability-helps.html).

除了这些，不可变对象将督促你进行更加内聚(cohesive)、健壮(solid)、容易理解(understandable)的设计，如这篇文件阐述的：[不可变性如何有用](http://www.yegor256.com/2014/11/07/how-immutability-helps.html)。

## 5. His Class Doesn't Have Anything Static

## 5. 他的类不应该包含任何静态的东西

A static method implements a behavior of a class, not an object. Let's say we have class `File`, and his children have method `size()`:

一个静态方法实现了类的行为，而不是对象的。假如我们有个类`File`，他的孩子都拥有`size()`方法：

``` java
final class File implements Measurable {
  @Override
  public int size() {
    // calculate the size of the file and return
  }
}
```

So far, so good; the method `size()` is there because of the contract`Measurable`, and every object of class `File` will be able to measure his size. A terrible mistake would be to design this class with a static method instead (this design is also known as [a utility class](http://www.yegor256.com/2014/05/05/oop-alternative-to-utility-classes.html) and is very popular in Java, Ruby, and almost every OOP language):

目前为止，一切都还好；`size()`方法的存在是因为合约`Measurable`，每个`File`类的对象都可以测量自身的大小。一个可怕的错误可能是将类的这个方法设计为静态方法(这种类被称作[实用类](http://www.yegor256.com/2014/05/05/oop-alternative-to-utility-classes.html)，在Java，Ruby，几乎每一个OOP语言中都很流行)：

``` java
// 糟糕的设计，请勿使用！
class File {
  public static int size(String file) {
    // 计算文件大小并返回
  }
}
```

This design runs completely against the object-oriented paradigm. Why? Because static methods turn object-oriented programming into "class-oriented" programming. This method, `size()`, exposes the behavior of the class, not of his objects. What's wrong with this, you may ask? Why can't we have both objects and classes as first-class citizens in our code? Why can't both of them have methods and properties?

这种设计完全违背了面向对象范式(object-oriented paradigm)。为什么？因为静态方法将面向对象编程变成“面向类”编程(class-oriented programming)了。`size()`方法将类的行为暴露出去，而不是他的对象。这有什么错呢，你可能会问？为什么我们不能在代码中将对象和类都当做第一类公民(first-class citizens，[[译者注](http://my.oschina.net/douxingxiang/blog/374629)]可以参与其他实体所有操作的实体，这些操作可能是赋值给变量，作为参数传递给方法，可以从方法返回等，比如int就是大多数语言的第一类公民，函数是函数式语言的第一类公民等)呢？为什么他们不能同时有方法和属性呢？

The problem is that with class-oriented programming, decomposition doesn't work anymore. We can't break down a complex problem into parts, because only a single instance of a class exists in the entire program. The power of OOP is that it allows us to use objects as an instrument for scope decomposition. When I instantiate an object inside a method, he is dedicated to my specific task. He is perfectly isolated from all other objects around the method. This object is a _local variable_ in the scope of the method. A class, with his static methods, is always a _global variable_ no matter where I use him. Because of that, I can't isolate my interaction with this variable from others.

问题是在面向类编程中，分解(decomposition)不适用。我们不能拆分一个复杂的问题，因为整个程序中只有一个类的实例存在。而OOP的强大是允许我们将对象作为一种作用域分解(scope decomposition)的工具来用。当我在方法中实例化一个对象，他将专注于我的特定任务。他与这个方法中的其他对象是完全隔离的。这个对象在此方法的作用域中是个_局部变量_。含有静态方法的类，总是一个_全局变量_，不管我在哪里使用他。因此，我不能把与这个变量的交互与其他变量隔离开来。

Besides being conceptually against object-oriented principles, public static methods have a few practical drawbacks:

除了概念上与面向对象的原则相悖，公共静态方法有一些实际的缺点：

First, it's **impossible to mock** them (Well, you can use [PowerMock](https://code.google.com/p/powermock/), but this will then be the most terrible decision you could make in a Java project ... I made it once, a few years ago).

首先，__不可能模拟__他们(好吧，你可以使用[PowerMock](https://code.google.com/p/powermock/)，这将成为你在一个Java项目所能做出的最可怕决定...几年前，我犯过一次)。

Second, they are **not thread-safe** by definition, because they always work with static variables, which are accessible from all threads. You can make them thread-safe, but this will always require explicit synchronization.

再者，概念上他们__不是线程安全的__，因为他们总是根据静态变量交互，而静态变量可以被所有线程访问。你可以使他们线程安全，但是这总是需要显式地同步(explicit synchronization)。

Every time you see a public static method, start rewriting immediately. I don't even want to mention how terrible static (or global) variables are. I think it is just obvious.

每次你遇到一个静态方法，马上重写！我不想再说静态(或全局)变量有多可怕了。我认为这是很明显的。

## 6. His Name Is Not a Job Title

## 6. 他的名字不是一个工作头衔

<figure>![badge](http://www.yegor256.com/images/2014/11/good-object-4.png)</figure>

The name of an object should tell us what this object **is**, not what it **does**, just like we name objects in real life: book instead of page aggregator, cup instead of water holder, T-shirt instead of body dresser. There are exceptions, of course, like printer or computer, but they were invented just recently and by those who didn't read this article. :)

一个对象的名字应该告诉我们这个对象__是__什么，而不是它__做__什么，就像我们在现实生活中给物体起名字一样：书而不是页面聚合器，杯子而不是装水器，T恤而不是身体服装师(body dresser)。当然也有例外，比如打印机和计算机，但是他们都是最近才被发明出来，而且这些人没有读过这篇文章。:)

For example, these names tell us who their owners are: an apple, a file, a series of HTTP requests, a socket, an XML document, a list of users, a regular expression, an integer, a PostgreSQL table, or Jeffrey Lebowski. A properly named object is always possible to draw as a small picture. Even a regular expression can be drawn.

比如，这些名字告诉我们他们的主人是谁：苹果，文件，一组HTTP请求，一个socket，一个XML文档，一个用户列表，一个正则表达式，一个整数，一个PostgreSQL表，或者Jeffrey Lebowski。一个命名合理的对象总是可以用一个小的示意图就能画出来。即使正则表达式也可以画出来。

In the opposite, here is an example of names that tell us what their owners do: a file reader, a text parser, a URL validator, an XML printer, a service locator, a singleton, a script runner, or a Java programmer. Can you draw any of them? No, you can't. These names are not suitable for good objects. They are terrible names that lead to terrible design.

相反，下面例子中的命名，是在告诉我们他们的主人做什么：一个文件阅读器，一个文本解析器，一个URL验证器，一个XML打印机，一个服务定位器，一个单例，一个脚本运行器，或者一个Java程序员。你能画出来他们吗？不，你不能。这些名字对良好对象来说是不合适的。他们是糟糕的名字，会导致糟糕的设计。

In general, avoid names that end with "-er" — most of them are bad.

一般来说，避免以“-er”结尾的命名 — 他们中的大多数都是糟糕的。

"What is the alternative of a `FileReader`?" I hear you asking. What would be a better name? Let's see. We already have `File`, which is a representative of a real-world file on disk. This representative is not powerful enough for us, because he doesn't know how to read the content of the file. We want to create a more powerful one that will have that ability. What would we call him? Remember, the name should say what he is, not what he does. What is he? He is a file that has data; not just a file, like `File`, but a more sophisticated one, with data. So how about `FileWithData` or simply `DataFile`?

“`FileReader`的替代名字是什么呢？”我听到你问了。什么将会是个好命名呢？我们想想。我们已经有`File`了，他是真实世界中磁盘上文件的表示。这个表示并不足够强大，因为他不知道怎么读取文件内容。我们希望创建更强大的，并且具有此能力的一个。我们怎么称呼他呢？记住，名字应该说明他是什么，而不是他做什么。那他是什么呢？他是个拥有数据的文件；但是不仅仅是类似`File`的文件，而是一个更复杂的拥有数据的文件。那么`FileWithData`或者更简单`DataFile`怎么样？

The same logic should be applicable to all other names. Always think about**what it is** rather than what it does. Give your objects real, meaningful names instead of job titles.

相同的逻辑也适用于其他名字。始终思考下他__是什么__而不是他做什么。给你的对象一个真实的、有意义的名字而不是一个工作头衔。

## 7. His Class Is Either Final or Abstract

## 7. 他的类要么是最终的要么是抽象的

<figure>![badge](http://www.yegor256.com/images/2014/11/good-object-5.png)</figure>

A good object comes from either a final or abstract class. A `final` class is one that can't be extended via inheritance. An`abstract` class is one that can't have children. Simply put, a class should either say, "You can never break me; I'm a black box for you" or "I'm broken already; fix me first and then use".

一个良好对象要么来自一个最终类，要么来自一个抽象类。一个`final`类不能通过继承被扩展。一个`abstract`类不能拥有孩子。简单上说，一个类应该要么声称，“你不能破坏我，我对你来说是个黑盒”，要么“我已经被破坏了；先修复我然后再使用我”。

There is nothing in between. A final class is a black box that you can't modify by any means. He works as he works, and you either use him or throw him away. You can't create another class that will inherit his properties. This is not allowed because of that `final` modifier. The only way to extend such a final class is through decoration of his children. Let's say I have the class`HTTPStatus` (see above), and I don't like him. Well, I like him, but he's not powerful enough for me. I want him to throw an exception if HTTP status is over 400. I want his method, `read()`, to do more that it does now. A traditional way would be to extend the class and overwrite his method:

它们中间不会有其他选项。最终类是个黑盒，你不能通过任何方式进行修改。当他工作他就工作，你要么用他，要么丢弃他。你不能创建另外一个类继承他的属性。这是不允许的，因为`final`修饰符的存在。唯一可以扩展最终类的方法是对他的孩子进行包装。假如有个类`HTTPStatus`(见上)，我不喜欢他。好吧，我喜欢他，但是他对我来说不是足够强大。我希望如果HTTP状态码大于400时能抛出一个异常。我希望他的方法`read()`可以做得更多。一个传统的方式是扩展这个类，并重写他的方法：

``` java
class OnlyValidStatus extends HTTPStatus {
  public OnlyValidStatus(URL url) {
    super(url);
  }
  @Override
  public int read() throws IOException {
    int code = super.read();
    if (code > 400) {
      throw new RuntimException("unsuccessful HTTP code");
    }
    return code;
  }
}
```

Why is this wrong? It is very wrong because we risk breaking the logic of the entire parent class by overriding one of his methods. Remember, once we override the method `read()` in the child class, all methods from the parent class start to use his new version. We're literally injecting a new "piece of implementation" right into the class. Philosophically speaking, this is an offense.

为什么这是错的？我们冒险破坏了整个父类的逻辑，因为重写了他的一个方法。记住，一旦我在子类重写了`read()`方法，所有来自父类的方法都会使用新版本的`read()`方法。字面上讲，我们其实是在将一份新的“实现片段”插入到类中。理论上讲，这是种冒犯。

On the other hand, to extend a final class, you have to treat him like a black box and decorate him with your own implementation (a.k.a. [Decorator Pattern](https://en.wikipedia.org/wiki/Decorator_pattern)):

另外，扩展一个最终类，你需要把他当做一个黑盒，然后使用自己的实现来包装他(也叫[装饰器模式](https://en.wikipedia.org/wiki/Decorator_pattern))：

``` java
final class OnlyValidStatus implements Status {
  private final Status origin;
  public OnlyValidStatus(Status status) {
    this.origin = status;
  }
  @Override
  public int read() throws IOException {
    int code = this.origin.read();
    if (code > 400) {
      throw new RuntimException("unsuccessful HTTP code");
    }
    return code;
  }
}
```

Make sure that this class is implementing the same interface as the original one: `Status`. The instance of `HTTPStatus` will be passed into him through the constructor and encapsulated. Then every call will be intercepted and implemented in a different way, if necessary. In this design, we treat the original object as a black box and never touch his internal logic.

确保该类实现了与原始类相同的接口：`Status`。`HTTPStatus`的实例将会通过构造函数被传递和封装给他。然后所有的调用将会被拦截，如果需要，可以通过其他方式来实现。这个设计中，我们把原始对象当做黑盒，而没有触及他的内部逻辑。

If you don't use that `final` keyword, anyone (including yourself) will be able to extend the class and ... offend him :( So a class without `final` is a bad design.

如果你不使用`final`关键字，任何人(包括你自己)都可以扩展这个类并且...冒犯他:( 所以没有`final`的类是个糟糕的设计。

An abstract class is the exact oposite case — he tells us that he is incomplete and we can't use him "as is". We have to inject our custom implementation logic into him, but only into the places he allows us to touch. These places are explicitly marked as `abstract` methods. For example, our `HTTPStatus`may look like this:

抽象类则完全相反 - 他告诉我们他是不完整的，我们不能"原封不动(as is)"直接使用他。我们需要将我们自己的实现逻辑插入到其中，但是只插入到他开放给我们的位置。这些位置被显式地标记为`abstract`。比如，我们的`HTTPStatus`可能看起来像这样：

``` java
abstract class ValidatedHTTPStatus implements Status {
  @Override
  public final int read() throws IOException {
    int code = this.origin.read();
    if (!this.isValid()) {
      throw new RuntimException("unsuccessful HTTP code");
    }
    return code;
  }
  protected abstract boolean isValid();
}
```

As you see, the class doesn't know how exactly to validate the HTTP code, and he expects us to inject that logic through inheritance and through overloading the method `isValid()`. We're not going to offend him with this inheritance, since he defended all other methods with `final` (pay attention to the modifiers of his methods). Thus, the class is ready for our offense and is perfectly guarded against it.

你也看到了，这个类不能够准确地知道如何去验证HTTP状态码，他期望我们通过继承或者重载`isValid()`方法来插入那一部分逻辑。我们将不会通过继承来冒犯他，因为他通过`final`来保护其他方法(注意他的方法的修饰符)。因此，这个类预料到我们的冒犯，并完美地保护了这些方法。

To summarize, your class should either be `final` or `abstract` — nothing in between.

总结一下，你的类应该要么是`final`要么是`abstract`的 - 而不是其他任何类型。
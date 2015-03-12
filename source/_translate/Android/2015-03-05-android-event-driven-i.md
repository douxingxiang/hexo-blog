(This is the first article in a three-part series)
（这时三篇系列文章的第一篇）

Although Android includes some event-driven features in its development, it is far away from being a pure event-driven architecture. Is this something good or bad? As in every issue with software development the answer is not easy: it depends.

尽管Android开发中包含一些事件驱动的特性，但是离纯事件驱动架构还很远。这是好是坏？就像软件开发中的所有问题一样，这个答案也不简单：看情况。

First, let’s establish a definition for event-driven development. This is a programming paradigm where the flow of execution is determined by events triggered by actions (such user interaction, messaging from other threads, etc). In this sense, Android is partially event-driven: we all can think of the onClick listeners or the Activity lifecycle, which are events able to trigger actions in an application. Why I said it is not a pure event-driven system? By default, each event is bound to a particular controller, and it is difficult to operate besides it (for example, the onClick events are defined for a view, having a limited scope).

首先，我们来定义一下事件驱动开发。这个编程范型中，执行流由动作触发的事件决定（比如交互，其他线程的消息等）。这个意义上，Android是部分事件驱动的：我们可以认为onClick监听器或Activity生命周期（它们是事件）可以触发应用中的动作。我为什么说它不是一个纯事件驱动系统呢？默认情况下，每个事件都绑定到一个特定的控制器，除此之外很难进行其他操作（比如，为视图定义的onClick，作用域是有限的）。

Wait, you are talking about a new programming paradigm. Adopting frameworks or methodologies has always a cost, could this bring any advantage? I say yes, and to show it I want to present some limitations with traditional Android development.

等会，你在说一个新的编程范型。采用框架或方法学总会有成本，它能带来好处吗？是的，我想展示给大家一些传统Android开发的限制。

In many scenarios it will be easy to end up with a structure as the following diagram is showing:

很多情形下，容易造成下图所示的结构：

![structure](https://d262ilb51hltx0.cloudfront.net/max/800/1*E8LdhGivILj-DZntgtctrg.png)

_Activities _can communicate with _Fragments_, _Fragments _can send messages to another _Fragments _and _Services. _There is a tight coupling of components, and applying changes can be expensive(*). This leads frequently to boilerplate code, interfaces that implement functions that need to callback and propagate through different layers… you probably know where I want to go. As the amount of code increases, the maintainability and good software engineering practices are decreasing.

_Activity_可以跟_Fragment_通信，_Fragment_可以向_Fragment_和_Service_发送消息。组件之间是紧密耦合的，对其进行更改代价会很高（*）。这经常导致样板代码，还有需要在不同层之间回调和传播的函数的借口...你很可能知道我要从何说起。随着代码量的增长，可维护性和良好的软件工程实践都在下降。

How does event-driven programming apply here? Let’s represent another system proposal:

事件驱动编程怎么应用到这里？我们来描述另一个系统倡议：

![event architecture](https://d262ilb51hltx0.cloudfront.net/max/1576/1*8WqRoVCAdoc8c5Tfu5myWQ.png)

Conceptually, the represented system have an event bus. There are different entities subscribed to the Event Bus, and posting events or listening to events — being respectively a producer or a consumer. Any subscriber can perform an action without knowing the logic. Think about it. Think about particular possibilities: a Fragment could render again and update its screen without knowing the logic behind any operation, just knowing that an event took place. Think about the possibilities of decoupling code and having a clean, compartmentalized architecture.

概念上，这个系统包含一个时间总线（event bus）。不同的实体订阅事件总线，派发或监听事件 -- 它们分别是生产者和消费者。任何订阅者都可以在不知晓逻辑的情况下执行一个动作。想一想，特别是可行性：Fragment可以不知晓操作之后的逻辑的情况下重复渲染并更新屏幕，只需要知道事件发生了。想象一下代码解耦，还有一个简洁、隔离的架构的可行性。

Is this paradigm supported in Android? Well, partially. As mentioned, the SDK offers natively a reduced set of event handling techniques, but we we want to go further. There are some names I want to mention here:

Android支持这个范型吗？好吧，部分支持。上文提到过，SDK原生提供了一个事件处理技巧的子集，但是我们希望能走的更远。这里有一些我想提到的名字：

*   [EventBus](https://github.com/greenrobot/EventBus/), from [greenrobot](http://greenrobot.de/). This library has been optimized for Android, and has some advanced features like delivery threads and subscriber priorities.
*   [greenrobot](http://greenrobot.de/)的[EventBus](https://github.com/greenrobot/EventBus/)。这个库根据Android进行优化过，包含一些高级特性，比如分发线程和订阅者优先级。
*   [Otto](http://square.github.io/otto/), from [Square](https://squareup.com/global/en/register). Originally a fork from [Guava](https://code.google.com/p/guava-libraries/), it has evolved and being refined to the Android platform.
*   [Square](https://squareup.com/global/en/register)的[Otto](http://square.github.io/otto/)。它原来是[Guava](https://code.google.com/p/guava-libraries/)的一个分支，它不断演化并且为Android平台进行了改进。

Having tried both I prefer EventBus over Otto. Greenrobot [claims](https://github.com/greenrobot/EventBus/blob/master/COMPARISON.md) that EventBus is significantly better at performing than its pair, and provides an extra amount of features.

试过之后，对于Otto，我更喜欢EventBus。Greenrobot[声明](https://github.com/greenrobot/EventBus/blob/master/COMPARISON.md)EventBus性能比对手更好，提供了很多附加特性。

![compare i](https://d262ilb51hltx0.cloudfront.net/max/800/1*uw1QaSKhDc_J_zDTMH24ow.png)

![compare ii](https://d262ilb51hltx0.cloudfront.net/max/1544/1*4FFuBtsHh1OFtm-lts4OSA.png)

The next article will explore how to implement basic functions in EventBus

下一篇文章将会探索如何在EventBus中实现基本功能。

(*) I deliberately like to use the word “expensive” when referring to “lot of time”. Thinking in economical terms is frequently more effective.

（*）当表达“用时很多”时，我故意使用“代价很高/expensive”这个词。经济学中的术语经常更有效。
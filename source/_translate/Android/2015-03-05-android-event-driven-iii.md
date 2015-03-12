(This is the third article in a three-part series)
（这是三篇文章系列的第三篇）

Previously, I have given an introduction to Event Driven programming with Android, and show some code to create a _HelloWorld Event-Driven_application.

之前，我简单介绍了Android中的事件驱动编程，并给出了_事件驱动的HelloWorld_应用代码。

Now we are likely facing another problem: how can we easily scale an application using Event-Driven development without falling into a messy and unorganised code? In this article, I will provide a proposal architecture that serves to scale an application based on Event-Driven development, but that can also be used to create a more general type of applications.

现在我们可能面对另一个问题：我们如何伸缩使用事件驱动开发的应用，同时不陷入混乱和无组织的代码？这篇文章，我将提供一个基于事件驱动开发的伸缩的建议性架构，但也能用于创建更通用类型的应用。

I have been using this architecture for a while, and it has made a change. Using Events and an MVP pattern ensures that I can easily add features to an application. I have also reduced the period between refactoring and rewriting, so the software I write can actually live longer and with a better quality.

这个架构我已经用了一段时间，并做了一些更改。使用事件和MVP模式能够保证，我可以简单地向应用添加特性。我同时缩减了重构和重写之间的周期，所以我写的软件可以高质量地存在更久。

### A first term: MVP
### 第一个术语：MVP

MVP stands for Model View Presenter, and is a programming pattern that defines three basic entities to be implemented within a software system:

MVP代表模型、视图、表示器（Model View Presenter），是个编程范型，定义了一个软件系统中需要实现的三种基本实体：

The **Model**: what to render

__模型__：要渲染什么

The **View**: how to render

__视图__：怎么渲染

The **Presenter**: handles the communication between the model and the view. The presenter updates the view with content from the model, abstracting the view of any complexity underneath.

__表示器__：处理模型和视图间的通信。表示器用模型中的内容来更新视图，抽象视图之下的复杂度。

![Courtesy of WikiMedia](https://d262ilb51hltx0.cloudfront.net/max/800/1*QlAXwccEelGOyGSzP3tmcA.png "Courtesy of WikiMedia")

MVP (as well as other programming patterns) is a concept rather than a concept solid framework, so there are no strict rules about it. Android does not implement a pure MVP pattern, but contains some elements:

MVP（以及其他编程范型）更像一个概念而不是概念坚实的框架，所以基本上没有严格的规则。Android并没有实现一个纯MVP模式，但是包含一些元素：

*   The user interface (Views) are defined in XML files.
*   用户界面（视图）定义在XML文件中。
*   We extend classes (Activity, Fragment) that inflate the views, and update them.
*   我们通过inflate视图，然后更新这些视图来扩展类（Activity，Fragment）。

From all the components of the MVP pattern, the _presenter_ has no direct representation in Android. This is however an important component: imagine that tomorrow we need to retrieve our data from a web service rather than a database. If we have followed a MVP approach, this change would be rather trivial to implement.

在所有MVP模型的组件中，_表示器_在Android中没有直接的表示。但它是个重要的组件：想象下我们需要从web service获取数据而不是数据库。如果我们遵守MVP方法，这一点是微不足道的。

### An Event-Driven supporting architecture
### 事件驱动支撑的架构

The following architecture aims to make easier the implementation of an Event-Driven based applications. It also has some other advantages, such as a high modularity and easiness for testing.

下面的架构目标在于让基于事件驱动的应用实现更简单。同时还有其他优势，比如高模块化、易于测试。

We are going to create our own instance of _Application_. This instance will host an EventBus Registry, which is a class that contains a comprehensive list of all the subscribers to the bus (more on this later). Our _Application_ will register all the subscribers and de-register them when it has been terminated.

我们将创建自己的_Application_实例。该实例将容纳一个EventBus Registry，这个类包含事件总线订阅者的完整列表（稍后再细说）。我们的_Application_将会注册所有的订阅者，然后在终止时解除注册。

#### The EventBusRegistry
### EventBusRegistry

This class is basically a register containing all the subscribers to the bus. I ended up naming my subscribers as PluginControllers, since you can plug them in and out and the application will keep working (of course, if they are not plug in they will not listen to events). I understand this naming can confuse the reader, so I will name then as Subscribers in this article.

该类基本上是包含事件总线所有订阅者的注册器。我将自己的订阅者命名为PluginController，因为你可以随意插拔而不影响应用的工作（当然，如果不插入它们，就无法监听事件）。我明白这种命名可能会误导读者，所以本文中我命名为Subscriber。

The EventBus Registry keeps a reference to the EventBus (which is a static class), so it can register the subscribers.

EventBus Registry保留了EventBus（是个静态类）的一个引用，这样它才可以注册订阅者。

![Application](https://d262ilb51hltx0.cloudfront.net/max/800/1*vqVV2XZ0HiZVlCNTBADxBw.png "概念上Application将包含一个EventBus Registry，这个类包含订阅者的引用，这样它们才可以被注册和解除注册。EventBus在应用中是个静态实例。")

#### The Subscribers
#### 订阅者（Subscriber）

The Subscribers will be the only class able to listen to events. This classes will always contain one or more _OnEvent()_ method. The Subscribers will perform actions after they received an Event. A basic example: you can have a subscriber that performs a call when receives the “PerformCallEvent”.

订阅者将是唯一可以监听事件的类。这些类可以包含一个或多个_onEnter()_方法。订阅者接到一个事件就会执行动作。简单例子：你可以定义一个接到“PerformCallEvent”时执行调用的订阅者。

Subscribers can also post events into the EventBus as a response to an incoming Event.

订阅者也可以在事件到来时，发送事件到EventBus。

#### Presenters
#### 表示器（Presenter）

The presenters take actions. The Views give them orders, and they act in consequence. They can also post events into the EventBus.

表示器执行动作。视图会分配优先顺序，它们一个接一个地执行。它们也可以发送事件到EventBus。

This architecture uses a single Activity. There are arguments in favour and against this, but since we will be using different Fragments to represent the screens, using a single Activity makes things easier (and remember, as a developer your main target should be to program less).

此架构使用单个Activity。肯定有赞成或反对的声音，但是由于我们使用不同的Fragment表示屏幕，使用单个Activity会让事情更简单（记住，作为一个开发者，你的主要目标是少编码）。

I have uploaded to [GitHub](https://github.com/kikoso/Event-Bus-Architecture) a sample project that includes a login screen, that triggers event to perform the login and loads a different fragment after it. Take a look at the project structure:

我把示例项目上传到了[GitHub](https://github.com/kikoso/Event-Bus-Architecture)，这个项目包含一个登陆页面，会触发事件执行登陆和加载后续的片段。项目架构如下：

![structure](https://d262ilb51hltx0.cloudfront.net/max/800/1*hcpitlMO3V8yrW47pApIug.png)

There are base classes for the EventBus Registry, the Activities and the Subscriber (you might want to add a base Fragment class depending on your project needs). The Application, EventBus and EventBus registry have been customized for the project (thus the ED prefix).

EventBus Registry有很多基础类，Activity和Subscriber（你可能想根据项目需求增加一个Fragment类）。Application，EventBus和EventBus Registry可以根据项目进行定制（因此加上了ED前缀，Event-Driven）。

Extending this application into new features will basically require new events, subscribers and a presenter and view per feature. Following this pattern ensures that the application is scalable, the code is decoupled and therefore easy to test and understand.

扩展该应用来添加新特性的话，基本上每个特性都需要新事件、订阅者、表示器和视图。遵守这个模式可以保证应用是可伸缩的，代码是解耦的，因此容易测试和理解。
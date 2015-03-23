Over the last months and after having friendly discussions at [Tuenti](http://corporate.tuenti.com/en/dev/blog) with colleagues like[@pedro_g_s](https://twitter.com/pedro_g_s) and [@flipper83](https://twitter.com/flipper83) (by the way 2 badass of android development), I have decided that was a good time to write an article about architecting android applications.
 The purpose of it is to show you a little approach I had in mind in the last few months plus all the stuff I have learnt from investigating and implementing it.

过去几个月，在与我[Tuenti](http://corporate.tuenti.com/en/dev/blog)的几位同事进行友好交流之后，其中有[@pedro_g_s](https://twitter.com/pedro_g_s)和[@flipper83](https://twitter.com/flipper83)（他们都是android开发中很难对付的人），我认为是时候写篇关于架构androi应用的文章了。这篇文章的目的是介绍近几个月来我所想到的一些方法，以及从调查和实践中学到的东西。


### Getting Started
### 开始

We know that writing quality software is hard and complex: It is not only about satisfying requirements, also should be robust, maintainable, testable, and flexible enough to adapt to growth and change. This is where “the clean architecture” comes up and could be a good approach for using when developing any software application.
 The idea is simple: clean architecture stands for a group of practices that produce systems that are:

我们知道编写高质量软件是既困难又复杂的：不仅是满足需求方面，还要健壮、可维护、可测试，并且足够灵活以适应增长和变化。这就是“简洁架构”的来源，并可以成为开发任何软件应用的良好方法。思想很简单：简洁架构代表构建系统的一组这样的实践：

*   Independent of Frameworks.
*   独立于框架。
*   Testable.
*   可测试。
*   Independent of UI.
*   独立于UI。
*   Independent of Database.
*   独立于数据库。
*   Independent of any external agency.
*   独立于任何外部代理。

[![clean architecture 1](http://fernandocejas.com/wp-content/uploads/2014/09/clean_architecture1.png)](http://fernandocejas.com/wp-content/uploads/2014/09/clean_architecture1.png)

It is not a must to use only 4 circles (as you can see in the picture), because they are only schematic but you should take into consideration the Dependency Rule: source code dependencies can only point inwards and nothing in an inner circle can know anything at all about something in an outer circle.

使用图示中的4个圆圈并不是必须，因为这只是语义描述，你还要考虑依赖规则（the Dependency Rule）：源码依赖只应该指向内圈，内圈不应该知道外圈的任何东西。

Here is some vocabulary that is relevant for getting familiar and understanding this approach in a better way:

下面的相关词汇可以帮助熟悉理解这个方法：

*   Entities: These are the business objects of the application.
*   实体（Entities）：应用的逻辑对象。
*   Use Cases: These use cases orchestrate the flow of data to and from the entities. Are also called Interactors.
*   用例（Use Cases）：用例编排数据流从实体的流入和流出。也叫交互器（Interactor）。
*   Interface Adapters: This set of adapters convert data from the format most convenient for the use cases and entities. Presenters and Controllers belong here.
*   接口适配器（Interface Adapters）：这些适配器将数据转换为用例和实体最合适的格式。表示器（Presenter）和控制器（Controller）就位于这里。
*   Frameworks and Drivers: This is where all the details go: UI, tools, frameworks, etc.
*   框架和驱动器（Frameworks and Drivers）：这是所有细节集中的地方，UI、工具、框架等。

For a better and more extensive explanation, refer to [this article](http://blog.8thlight.com/uncle-bob/2012/08/13/the-clean-architecture.html) or [this video](http://vimeo.com/43612849).

为了更好更深入地理解，看下[这篇文章](http://blog.8thlight.com/uncle-bob/2012/08/13/the-clean-architecture.html)或者[这个视频](http://vimeo.com/43612849)。

### Our Scenario
### 我们的场景

I will start with a simple scenario to get things going: simply create an small app that shows a list of friends or users retrieved from the cloud and, when clicking any of them, a new screen will be opened showing more details of that user.
 I leave you a video so you can have the big picture of what I’m talking about:

我用一个简单的场景来描述事情过程：创建一个小应用，显示从云端获取的朋友或用户列表，点击其中任意一个，将会打开新窗口来显示用户的更多信息。我放一个视频来帮助理解我所说的大致过程：

[嵌入视频，需自备梯子](https://www.youtube.com/watch?v=XSjV4sG3ni0)

### Android Architecture
### Android架构

The objective is the separation of concerns by keeping the business rules not knowing anything at all about the outside world, thus, they can can be tested without any dependency to any external element.
 To achieve this, my proposal is about breaking up the project into 3 different layers, in which each one has its own purpose and works separately from the others.
 It is worth mentioning that each layer uses its own data model so this independence can be reached (you will see in code that a data mapper is needed in order to accomplish data transformation, a price to be paid if you do not want to cross the use of your models over the entire application).
 Here is an schema so you can see how it looks like:

目标是通过将业务规则与外部世界隔离来分离关注点，这样，才可以在不依赖外部元素的情况下测试业务规则。为了达到这个目标，我的建议是将项目拆分为3个不同的层，每层都有自己的目标，独立地工作。需要提及的是每层都使用自己的数据模型，这样才可以取得依赖（你可以看到，在代码中需要数据映射器(data mapper)来完成数据转换，不想在整个应用之上交叉使用自己的模型总要付出点代价）。下面是一些模式：

[![clean_architecture_android](http://fernandocejas.com/wp-content/uploads/2014/09/clean_architecture_android.png)](http://fernandocejas.com/wp-content/uploads/2014/09/clean_architecture_android.png)

NOTE: I did not use any external library (except gson for parsing json data and junit, mockito, robolectric and espresso for testing). The reason was because it made the example a bit more clear. Anyway do not hesitate to add ORMs for storing disk data or any dependency injection framework or whatever tool or library you are familiar with, that could make your life easier.(Remember that reinventing the wheel is not a good practice).

注意：我没有使用任何外部库（除了解析json数据的gson，还有测试用的junit, mockito, robolectri和espresso）。原因是例子会更清楚。无论如何，让生活更美好的东西，比如添加ORM来存储磁盘数据，或者任何依赖注入框架，或者任何你熟悉的工具或库，一定不要犹豫。（记住重新发明轮子不是一个好的实践）。

#### Presentation Layer
#### 表示层

Is here, where the logic related with views and animations happens. It uses no more than aModel View Presenter ([MVP](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter) from now on), but you can use any other pattern like MVC or MVVM. I will not get into details on it, but here fragments and activities are only views, there is no logic inside them other than UI logic, and this is where all the rendering stuff takes place.
 Presenters in this layer are composed with interactors (use cases) that perform the job in a new thread outside the android UI thread, and come back using a callback with the data that will be rendered in the view.

 这里是与视图和动画有关的逻辑所处的位置。它只使用一个模型-视图-表示器（Model View Presenter, 下文称[MVP](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter)），但是你可以使用其他任何模式，如MVC或MVVM。我不会深入介绍，这里的片段和活动只有视图，除了UI逻辑之外没有任何其他逻辑，这也是所有渲染发生的地方。这层中的表示器与交互器（用例）共同在android UI线程之外的新线程中执行这些工作，通过回调来处理数据，数据将在视图中渲染。

[![clean_architecture_mvp](http://fernandocejas.com/wp-content/uploads/2014/09/clean_architecture_mvp.png)](http://fernandocejas.com/wp-content/uploads/2014/09/clean_architecture_mvp.png)

If you want a cool example about [Effective Android UI](https://github.com/pedrovgs/EffectiveAndroidUI/) that uses MVP and MVVM, take a look at what my friend Pedro Gómez has done.

如何你想要一个使用MVP和MVVM，关于[高效Android UI](https://github.com/pedrovgs/EffectiveAndroidUI/)更酷的例子，去看看我朋友Pedro Gómez所做的工作。

#### Domain Layer
#### 领域层

Business rules here: all the logic happens in this layer. Regarding the android project, you will see all the interactors (use cases) implementations here as well.
 This layer is a pure java module without any android dependencies. All the external components use interfaces when connecting to the business objects.

这里的业务规则：所有逻辑都在这层。至于android项目，你也将会看到所有的交互器（用例）实现。这层是无android依赖的纯java模块。所有的外部组件使用接口连接到业务对象。

[![clean_architecture_domain](http://fernandocejas.com/wp-content/uploads/2014/09/clean_architecture_domain.png)](http://fernandocejas.com/wp-content/uploads/2014/09/clean_architecture_domain.png)

#### Data Layer
#### 数据层


All data needed for the application comes from this layer through a UserRepository implementation (the interface is in the domain layer) that uses a [Repository Pattern](http://martinfowler.com/eaaCatalog/repository.html) with a strategy that, through a factory, picks different data sources depending on certain conditions.
 For instance, when getting a user by id, the disk cache data source will be selected if the user already exists in cache, otherwise the cloud will be queried to retrieve the data and later save it to the disk cache.
 The idea behind all this is that the data origin is transparent for the client, which does not care if the data is coming from memory, disk or the cloud, the only truth is that the data will arrive and will be got.

应用需要的全部数据都来自这层，数据通过一个使用[仓储模式（Repository Pattern）](http://martinfowler.com/eaaCatalog/repository.html)实现的UserRepository存取，其策略是通过一个工厂，根据特定的条件来选择不同的数据源。比如，当通过id获取用户时，如果用户已存在于缓存中，就会选取磁盘缓存数据源，不然就会查询云端获取数据，之后保存到磁盘缓存。这其中的思想是，数据的来源对客户端是透明的，它不关系数据到底来自内存、磁盘还是云端，唯一的事实是数据将会到达，然后被获取。

[![clean_architecture_data](http://fernandocejas.com/wp-content/uploads/2014/09/clean_architecture_data.png)](http://fernandocejas.com/wp-content/uploads/2014/09/clean_architecture_data.png)

NOTE: In terms of code I have implemented a very simple and primitive disk cache using the file system and android preferences, it was for learning purpose. Remember again that youSHOULD NOT REINVENT THE WHEEL if there are existing libraries that perform these jobs in a better way.

注意：我使用文件系统和android首选项实现了一个简单的磁盘缓存，仅用于学习目的。再次记住，如果已经存在某些库可以更好地实现这些功能，你__不应该重新发明轮子__。

### Error Handling
### 错误处理

This is always a topic for discussion and could be great if you share your solutions here.
 My strategy was to use callbacks, thus, if something happens in the data repository for example, the callback has 2 methods onResponse() and onError(). The last one encapsulates exceptions in a wrapper class called “ErrorBundle”: This approach brings some difficulties because there is a chains of callbacks one after the other until the error goes to the presentation layer to be rendered. Code readability could be a bit compromised.
 On the other side, I could have implemented an event bus system that throws events if something wrong happens but this kind of solution is like using a [GOTO](http://www.drdobbs.com/jvm/programming-with-reason-why-is-goto-bad/228200966), and, in my opinion, sometimes you can get lost when you’re subscribed to several events if you do not control that closely.

这个话题很容易引发讨论，如果你能分享自己的解决方案会更棒。我的策略是采用回调，因此，一旦数据仓库有事件发生，回调包含2个方法onResponse()和onError().最后一个将异常封装到称作"ErrorBundle"的包装类中：这种方法会带来很多难处，因为只有一个回调链，错误会一直到达表示层被渲染。代码可读性略显不佳。另外，我也可以实现一个事件总线系统，一旦出错就抛出事件，但是这个方案就像使用[GOTO](http://www.drdobbs.com/jvm/programming-with-reason-why-is-goto-bad/228200966)一样；我认为，有时候如果你订阅了多个事件，不仔细控制的话很容易迷失。

### Testing
### 测试

Regarding testing, I opted for several solutions depending on the layer:

关于测试，我倾向于根据不同层选择多重方案：

*   Presentation Layer: used android instrumentation and espresso for integration and functional testing.
*   表示层：使用android instrumentation或espresso进行集成和功能测试。
*   Domain Layer: JUnit plus mockito for unit tests was used here.
*   领域层：JUnit和mockito进行单元测试。
*   Data Layer: Robolectric (since this layer has android dependencies) plus junit plus mockito for integration and unit tests.
*   数据层：Robolectric（由于这层有android依赖）和junit、mockito进行集成和单元测试。

### Show me the code
### 代码在哪里

I know that you may be wondering where is the code, right? Well [here is the github link](https://github.com/android10/Android-CleanArchitecture) where you will find what I have done. About the folder structure, something to mention, is that the different layers are represented using modules:

我知道你可能想知道代码在哪里，对吧？这里是[github链接](https://github.com/android10/Android-CleanArchitecture)，你可以找到。关于目录结构要说明的是，不同层使用模块来表示：

*   presentation: It is an android module that represents the presentation layer.
*   presentation：表示层的android模块。
*   domain: A java module without android dependencies.
*   domain：无android依赖的java模块。
*   data: An android module from where all the data is retrieved.
*   data：所有数据存放的android模块。
*   data-test: Tests for the data layer. Due to some limitations when using Robolectric I had to use it in a separate java module.
*   data-test：数据层的测试。由于使用Robolectric有些限制，我不得不在新的java模块中使用。

### Conclusion
### 结论

As Uncle Bob says, “Architecture is About Intent, not Frameworks” and I totally agree with this statement. Of course there are a lot of different ways of doing things (different implementations) and I’m pretty sure that you (like me) face a lot of challenges every day, but by using this technique, you make sure that your application will be:

就像Bob大叔说过的，“架构是关于意图，而不是框架”，我完全赞同。当然，做事有很多不同的方式（不同的实现），我确定你（像我一样）每天都面对很多挑战，但是使用这些技巧，你可以保证应用将会：

*   Easy to maintain.
*   易于维护。
*   Easy to test.
*   易于测试。
*   Very cohesive.
*   非常内聚。
*   Decoupled.
*   解耦。

As a conclusion I strongly recommend you give it a try and see and share your results and experiences, as well as any other approach you’ve found that works better: we do know thatcontinuous improvement is always a very good and positive thing.
 I hope you have found this article useful and, as always, any feedback is very welcome.

作为一个结论，我非常推荐你试试，分享你的结果和体验，当然也有你所发现更好的方法：我们都知道持续的提升总是很好很正面的事。希望这篇文章对你有用，非常欢迎你的反馈。

### Links and Resources
### 链接和资源

1.  Source code: [https://github.com/android10/Android-CleanArchitecture](https://github.com/android10/Android-CleanArchitecture)
1. 源代码：[https://github.com/android10/Android-CleanArchitecture](https://github.com/android10/Android-CleanArchitecture)
2.  [The clean architecture by Uncle Bob](http://blog.8thlight.com/uncle-bob/2012/08/13/the-clean-architecture.html)
2.  [Bob大叔的简洁架构](http://blog.8thlight.com/uncle-bob/2012/08/13/the-clean-architecture.html)
3.  [Architecture is about Intent, not Frameworks](http://www.infoq.com/news/2013/07/architecture_intent_frameworks)
3.  [架构是关于意图，而不是框架](http://www.infoq.com/news/2013/07/architecture_intent_frameworks)
4.  [Model View Presenter](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter)
4.  [模型 视图 表示器](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter)
5.  [Repository Pattern by Martin Fowler](http://martinfowler.com/eaaCatalog/repository.html)
5.  [Martin Fowler仓储模式](http://martinfowler.com/eaaCatalog/repository.html)
6.  [Android Design Patterns Presentation](http://www.slideshare.net/PedroVicenteGmezSnch/)
6.  [Android设计模式演示稿](http://www.slideshare.net/PedroVicenteGmezSnch/)
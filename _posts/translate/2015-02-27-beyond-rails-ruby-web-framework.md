Before we get started, let’s address the elephant in the room. [Rails](http://rubyonrails.org/) is great. It really is what you need for large scale production applications _most_ of the time. It has history. And if you got started in Ruby working on the web, chances are Rails is what you are most familiar with. All these things are a fair argument for Rails as the framework of choice for many projects.

开始之前，我们先说说Rails这头大象。[Rails](http://rubyonrails.org/)非常棒。它_大部分_时间绝对是你构建大型产品应用所需的。它有段历史了。如果你刚开始使用Ruby进行web开发，很有可能Rails是你最熟悉的。这些都表明Rails作为多数项目的选择是合理的。

The point of this article is not to... derail (sorry, could not resist!) our beloved Rails. The main goal is to shed some light on alternatives that you may or may not have been aware of. Some will focus on small scale projects, others fast prototyping, but all of them will work with Ruby and hopefully you will have fun exploring the frameworks and micro-frameworks that help bring this great language to the web.

这篇文章的观点不是...抛弃（抱歉，忍不住！）我们所热爱的Rails。主要目标是提供你可能意识或没有意识到的备选框架。有些人专注小规模项目，其他人快速原型，但所有人，都可以使用Ruby。希望你可以在探索把Ruby这个出色语言应用到web领域的框架和微框架的过程中能够找到乐趣。

## Cuba Microframework
## Cuba微框架

[Cuba](http://cuba.is/) is one of the most easy to start with micro-frameworks currently available to Rubyists. Written by [Michel Martens](https://twitter.com/soveran), the key to Cuba is simplicity. With the avoidance of large scale overhead, this micro-framework is designed to build and deploy simple apps while avoiding bloat and unnecessary functionality.

[Cuba](http://cuba.is/)是目前Ruby开发者接触微框架的最简单途径之一。Cuby由[Michel Martens](https://twitter.com/soveran)编写，关键点在于简洁。这个微框架的设计目标是构建和部署简单应用，去除了膨胀而非必须的功能，从而避免了大规模开销之忧。

Like many micro-frameworks, Cuba is [Rack](http://rack.github.io/) based. Rack minimizes the interaction between the webserver supporting Ruby and the framework itself. This helps improve app response times and makes using the framework, in this case Cuba, fairly simple.

类似其他很多微框架，Cuba基于[Rack](http://rack.github.io/)。Rack最小化了支撑Ruby的web服务器和框架本身之间的交互。这有助于提升应用的响应时间，使得使用Cuba这类框架变得非常简单。

One of the best parts of Cuba is the documentation. A [walkthrough guide](http://theguidetocuba.io/) is available online and allows anyone to look into and take advantage of Cuba’s functionality. After working for a short time with the walkthrough guide you will have a simple Twitter clone called Frogger. At this point, you should be familiar enough with Cuba to start using it in your own projects.

文档是Cuba最棒的部分之一。在线的[演练引导](http://theguidetocuba.io/)让每个人都可以学习利用Cuba的功能。学习了引导不久，你就可以自己搭建一个类似Twitter的应用Frogger。现在，在开始用到项目中之前，你应该足够了解Cuba了。

In addition to the walkthrough guide, there is a [small app](https://github.com/citrusbyte/cuba-app) to test getting Cuba setup on a server.

除了这个演练引导，还有个[小应用](https://github.com/citrusbyte/cuba-app)可以测试在服务器上配置Cuba。

## Trailblazer
## Trailblazer

Technically not a framework, [Trailblazer](https://github.com/apotonick/trailblazer) is the latest gift from long time Ruby punk rocker, [Nick Sutterer](https://twitter.com/apotonick). The idea behind it is to help Rails to work more efficiently as a framework by enforcing encapsulation and adopting a more intuitive code structure. The idea is to offer more layers of abstraction to make Rails easier to work with.

[Trailblazer](https://github.com/apotonick/trailblazer)是Ruby朋克摇滚歌手[Nick Sutterer](https://twitter.com/apotonick)最新奉献的礼物，虽然技术上讲不是个框架。它背后的思想是通过增强封装、采用更直观的代码结构来帮助Rails框架更高效。它提供多层抽象使得Rails更简单。

Since it’s not an _actual_ framework, we won’t go into too many details about Trailblazer, but we will say it makes projects easier to use when Rails is the framework of choice. It’s easy to implement and there is a book in the works that can be used in its [partial state](https://leanpub.com/trailblazer).

由于Trailblazer并不是真正意义上的框架，我们就不过多讨论，但是我们说它让Rails更易用。它易于实现，这里有本[未完工](https://leanpub.com/trailblazer)的书。

## Volt
## Volt

[Volt](http://voltframework.com/) is another framework that has been fresh in the mind of many Rubyists recently. With a focus on building a fast application and eschewing the yak shaving, Volt offers the opportunity to get things moving quickly. Instead of focusing on syncing data via HTTP, Volt works using a persistent connection. Part of the reason for Volt’s quickness is that it lives on top of [Opal](https://github.com/opal/opal), a really amazing gem that translates Ruby to JavaScript conveniently.

[Volt](http://voltframework.com/)是很多Ruby开发者脑海中的又一个新框架。Volt专注在构建快速应用，而不是瞎忙活，它让应用跑得更快。Volt使用持久连接而不是通过HTTP同步数据。Volt快速的部分原因就是它建立在[Opal](https://github.com/opal/opal)之上，Opal将Ruby方便地转换为JavaScript，是个很棒的模块。

One inconvenience for Volt at the moment is that it only supports MongoDB. While MongoDB is a great database solution, it’s not always what you want to use.

目前Volt一点不方便之处是它只支持MongoDB。虽然MongoDB是个不错的数据库方案，但它不一定是你中意的。

## Cramp
## Cramp

Looking for something of the asynchronous variety? Perhaps [Cramp](http://cramp.in/) is what you’re looking for. Built on top of [Event Machine](http://rubyeventmachine.com/), Cramp is designed to function with tons of open connections and provides full-duplex bi-directional communication.

是不是在寻找异步类型的框架？可能[Cramp](http://cramp.in/)就是你要找的。Cramp建立在[Event Machine](http://rubyeventmachine.com/)之上，设计目标是工作在有大量连接环境下，提供全双工双向通信。

Also supported by Rack, Cramp uses Ruby 1.9.2 or higher and a simple gem installation is all that’s necessary to get started. If you are familiar with building simple applications using Ruby, the style used in Cramp will not be strange or unusual to you. The [examples](http://cramp.in/examples) they use clearly set the stage for ease of use.

Cramp需要也Rack支持，使用Ruby 1.9.2及以上版本，你只需要安装这个gem就可以开始了。如果你熟悉使用Ruby构建简单应用，Cramp采用的风格也不会让你感到陌生。它们的[例子](http://cramp.in/examples)简单易用。

Another beautiful feature of Cramp is the inclusion of an application generator. Type cramp new realapp in your console to get started with a new Cramp application.

Cramp另一个出色的特性就是包含应用生成器。在控制台敲入`cramp new realapp`就可以生成一个新Cramp应用。

## Ramaze
## Ramaze

Built on the ancient coding ideal of KISS (Keep It Simple, Stupid), [Ramaze](http://ramaze.net/) is a framework that is looking to do just that: remove complexity in favor of making things easier. Ramaze is built to work with various [ORMs](http://en.wikipedia.org/wiki/Object-relational_mapping), adapters like [Unicorn](http://unicorn.bogomips.org/) or [Passenger](https://www.phusionpassenger.com/), as well as various implementations of Ruby such as [JRuby](http://jruby.org/) and [Rubinius](http://rubini.us/). If MRI is not your favorite flavor of Ruby, perhaps Ramaze will be your framework of choice.

[Ramaze](http://ramaze.net/)建立在古老的KISS（Keep It Simple, Stupid）原则之上，这个框架看似只做：移除复杂度，让事情更简单。Ramaze与不同[ORM](http://en.wikipedia.org/wiki/Object-relational_mapping)、适配器（如[Unicorn](http://unicorn.bogomips.org/)，[Passenger](https://www.phusionpassenger.com/)）一起工作，以及Ruby的各种实现，如[JRuby](http://jruby.org/)和[Rubinius](http://rubini.us/)。如果MRI是你最爱的Ruby风格，也许Ramaze是你的框架选择。

Ramaze is fast and flexible, which puts it at an advantage over some of the other frameworks mentioned here. The other benefit is how it functions similar to other frameworks. For example, if you are familiar with Sinatra, chances are Ramaze will not be that hard to get into.

Ramaze快速、灵活，比起这里提到的其他框架更有优势。另一个优势是它与其他框架的功能很相像。比如，如果你熟悉Sinatra，Ramaze也不会太难学。

## Sinatra
## Sinatra

I’ve gone over my feeling on [Sinatra vs. Rails](https://blog.engineyard.com/2014/rails-vs-sinatra) before, perhaps [more than once](https://blog.engineyard.com/2014/doing-an-api-mashup-with-sinatra). It’s easy to say[Sinatra](http://www.sinatrarb.com/) is my framework of choice for most small projects. Since the many uses of Sintra have been covered there we can focus on other things like something smaller. And for that there is [Konstantin Hasse](https://twitter.com/konstantinhaase)’s [Almost Sinatra](https://github.com/rkh/almost-sinatra). (_Do not actually ever use Almost Sinatra ever for anything ever_.) Sinatra is easy to setup and there are more than a few Sinatra apps running in production on Engine Yard.

我曾仔细对比过[Sinatra vs. Rails](https://blog.engineyard.com/2014/rails-vs-sinatra)，也许不止一次。[Sinatra](http://www.sinatrarb.com/)是我大多数小项目的选择。由于Sintra的用法在那篇文章中基本都被覆盖到了，我们可以关注更小的事情。这里有一篇[Konstantin Hasse](https://twitter.com/konstantinhaase)的[Almost Sinatra](https://github.com/rkh/almost-sinatra)。（_绝对不要在任何地方上使用Almost Sinatra_。）Sintra设置很简单，Engine Yard上线了很多Sinatra应用。

## Lotus
## Lotus

After seeing all these options you may still be looking for something Rails-like and familiar, but not Rails. Enter [Lotus](http://lotusrb.org/), a complete erb framework for Ruby built by [Luca Guidi](https://twitter.com/jodosha). The key difference between Rails and Lotus is Lotus’ lightweight speed, which should attract those frustrated with the bulkiness of Rails.

看了这么多，你可能还在寻找类似Rails的框架。[Lotus](http://lotusrb.org/)就是，它由[Luca Guidi](https://twitter.com/jodosha)编写，是一个完全的erb框架。Rails和Lotus的主要区别在于Lotus的轻量级，对于那些对Rails的庞大很失望的人会很有吸引力。

Lotus is a full MVC framework and acts as such, so switching isn’t a big jump. The one drawback of Lotus is its maturity: it's not _quite_ ready for production apps. But it is nearly there.

Lotus是个完整的MVC框架，做的就是MVC做的事，所以转换并不是很大。它的缺点是还不够成熟：它还不_适于_生产应用，但接近了。

## Conclusion
## 结论

We’ve taken a look at just a handful of the frameworks rubyists can use outside of Rails. Again, this isn’t a call to abandon Rails. I do think, however, it’s good to expand your horizons and try out new things. And when you’re ready to get one of these things running in production, our [support team](https://www.engineyard.com/support)is happy to help.

我们介绍了一些除Rails之外Ruby开发者可以选用的框架。再次说明，这不是要大家放弃Rails。但是我认为，开阔视野、尝试新东西是很好的。如果你准备在生产环境中好采用其中一个框架，我们的[支持团队](https://www.engineyard.com/support)会很乐意提供帮助。

P.S. Have you tried one of these frameworks before? Have we missed your favorite framework? Throw us a comment below.
P.S. 你是否曾尝试过这些框架？我们是否遗漏了你最爱的框架？在下面给我们留言。
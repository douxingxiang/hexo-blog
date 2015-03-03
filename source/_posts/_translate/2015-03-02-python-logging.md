Python has a very rich [logging](https://docs.python.org/3/library/logging.html) system. It's very easy to add structured or unstructured log output to your python code, and have it written to a file, or output to the console, or sent to syslog, or to customize the output format.

Python[日志](https://docs.python.org/3/library/logging.html)系统非常丰富。添加结构化或非结构化日志输出到python代码，写到文件，输出到控制台，发送到系统日志，或者自定义输出格式都很容易。

We're in the middle of re-examining how logging works in [mozharness](https://wiki.mozilla.org/ReleaseEngineering/Mozharness) to make it easier to factor-out code and have fewer [mixins](https://mgerva.wordpress.com/2015/02/25/on-mixins/).

我们正在重新检查[mozharness](https://wiki.mozilla.org/ReleaseEngineering/Mozharness)中日志的工作机制，希望提取代码能更容易，并减少[mixin](https://mgerva.wordpress.com/2015/02/25/on-mixins/)。

Here are a few tips and tricks that have really helped me with python logging:

下面是一些在python日志中真正帮到我们的建议和技巧：

## There can be <s>only</s> more than one
## ~~仅有一种~~有很多种

Well, there can be only one logger with a given name. There is a special "root" logger with no name. Multiple `getLogger(name)` calls with the same name will return the same logger object. This is an important property because it means you don't need to explicitly pass logger objects around in your code. You can retrieve them by name if you wish. The logging module is maintaining a global registry of logging objects.

好吧，对一个给定名称确实只会有一个logger。特殊的“根”logger没有名称。对相同名称多次调用`getLogger(name)`会返回相同的logger对象。这个特性很重要，你不用在代码中显式将logger对象传来传去。你可以通过名称来获取它们。日志模块维护了一个全局日志对象注册表。

You can have multiple loggers active, each specific to its own module or even class or instance.

你可以使用多个logger对象，每个只限定于其特定模块，甚至类或实例。

Each logger has a name, typically the name of the module it's being used from. A common pattern you see in python modules is this:

每个logger都有一个名称，通常是logger所处模块的名称。你能在Python模块中看到的通用模式大概这样：

        # in module foo.py
        import logging
        log = logging.getLogger(__name__)

This works because inside `foo.py`, `__name__` is equal to "foo". So inside this module the `log` object is specific to this module.

这段代码没错是因为`foo.py`中，`__name__`等于"foo"。所以在此模块中，`log`对象只会用于这个模块。

## Loggers are hierarchical
## logger是继承的

The names of the loggers form their own namespace, with "." separating levels. This means that if you have have loggers called `foo.bar`, and `foo.baz`, you can do things on logger `foo` that will impact both of the children. In particular, you can set the logging level of `foo` to show or ignore debug messages for both submodules.

名称空间中的logger名称使用“.”来分层。这意味着如果你有`foo.bar`和`foo.baz`两个logger，你可以操作`foo`，这样它的两个孩子都会起作用。尤其是，你可以设置`foo`的日志等级来显示或忽略两个子模块的调试消息。

        # 我们为所有的foo模块启用全部调试日志输出
        import logging
        logging.getLogger('foo').setLevel(logging.DEBUG)

## Log messages are like events that flow up through the hierarchy
## 日志消息类似事件，会在层次结构中流动

Let's say we have a module foo.bar:
假设我们有个模块foo.bar：

        import logging
        log = logging.getLogger(__name__)  # __name__ is "foo.bar" here

        def make_widget():
            log.debug("made a widget!")

When we call `make_widget()`, the code generates a debug log message. Each logger in the hierarchy has a chance to output something for the message, ignore it, or pass the message along to its parent.

当我们调用`make_widget()`时，代码生成了一个调试日志消息。层次结构中的每个logger都有机会将这个消息输出、忽略、传递给父级。

The default configuration for loggers is to have their levels unset (or set to [`NOTSET`](https://docs.python.org/3/library/logging.html#logging-levels)). This means the logger will just pass the message on up to its parent. Rinse &amp; repeat until you get up to the root logger.

日志默认并没有配置其等级（或设置为[`NOTSET`](https://docs.python.org/3/library/logging.html#logging-levels))）。这意味着logger只会把消息传递给父级，然后不断重复这个步骤，一直到根logger。

So if the `foo.bar` logger hasn't specified a level, the message will continue up to the `foo` logger. If the `foo` logger hasn't specified a level, the message will continue up to the root logger.

所以如果`foo.bar`logger没有指定等级，消息将继续传递到`foo`logger。如果`foo`logger没有指定等级，消息将会传递给根logger。

This is why you typically configure the logging output on the root logger; it typically gets ALL THE MESSAGES!!! Because this is so common, there's a dedicated method for configuring the root logger: [`logging.basicConfig()`](https://docs.python.org/3/library/logging.html#logging.basicConfig)

这就是为什么你通常需要在根logger上配置日志输出的原因；它通常会输出__全部消息__！！！这太常见了，所以有个专门的方法来配置根logger：[`logging.basicConfig()`](https://docs.python.org/3/library/logging.html#logging.basicConfig)。

This also allows us to use mixed levels of log output depending on where the message are coming from:

这也允许我们根据消息的来源使用混合等级的日志输出：
        
        import logging

        # 为所有的foo模块启动调试日志输出
        logging.getLogger("foo").setLevel(logging.DEBUG)

        # 配置根logger只打印INFO消息，并输出到控制台
        # (默认值)
        logging.basicConfig(level=logging.INFO)

        # 将会输出调试消息
        logging.getLogger("foo.bar").debug("ohai!")

If you comment out the `setLevel(logging.DEBUG)` call, you won't see the message at all.

如果注释掉`setLevel(logging.DEBUG)`，你将不会看到任何消息。

## exc_info is teh awesome
## exc_info是最棒的

All the built-in logging calls support a keyword called `exc_info`, which if isn't false, causes the current exception information to be logged in addition to the log message. e.g.:

所有的内建日志调用都支持`exc_info`关键字，如果它不是false，当前异常信息将会附加到日志消息中，比如：

        import logging
        logging.basicConfig(level=logging.INFO)

        log = logging.getLogger(__name__)

        try:
            assert False
        except AssertionError:
            log.info("surprise! got an exception!", exc_info=True)


There's a special case for this, `log.exception()`, which is equivalent to `log.error(..., exc_info=True)`

`log.exception()`是个特例，等价于`log.error(..., exc_info=True)`。

Python 3.2 introduced a new keyword, `stack_info`, which will output the current stack to the current code. Very handy to figure out _how_ you got to a certain point in the code, even if no exceptions have occurred!

Python 3.2引入了一个新的关键字`stack_info`，将会输出当前栈到当前代码。当你想知道_如何_运行到代码的某处时，非常方便，即使没有异常发生也可以。

## "No handlers found..."
## "找不到处理函数..."

You've probably come across this message, especially when working with 3rd party modules. What this means is that you don't have any logging handlers configured, and something is trying to log a message. The message has gone all the way up the logging hierarchy and fallen off the...top of the chain (maybe I need a better metaphor).

你很可能遇到过这个消息，尤其是使用第三方模块时。这个错误的意思是，你没有配置任何日志处理函数，但是某处尝试打印日志消息。这个消息沿着层次结构向上传递，直到在结构链的顶处失败（也许我需要一个更好的隐喻）。

        import logging
        log = logging.getLogger()
        log.error("no log for you!")

outputs:

输出：

     No handlers could be found for logger "root"

There are two things that can be done here:

这里可以做两件事：

1.  Configure logging in your module with `basicConfig()` or similar
1. 在模块中使用`basicConfig()`或类似的方法配置日志

2.  Library authors should add a [NullHandler](https://docs.python.org/3/library/logging.handlers.html#logging.NullHandler) at the root of their module to prevent this. See the [cookbook](https://docs.python.org/3/howto/logging.html#library-config) and [this blog](http://pythonsweetness.tumblr.com/post/67394619015/use-of-logging-package-from-within-a-library) for more details here.
2. 库作者应该在模块顶层添加一个[NullHandler](https://docs.python.org/3/library/logging.handlers.html#logging.NullHandler) 来防止这种情况发生。看下这里的[指南](https://docs.python.org/3/howto/logging.html#library-config)和这篇博客](http://pythonsweetness.tumblr.com/post/67394619015/use-of-logging-package-from-within-a-library)来了解更多信息。

## Want more?
## 更多？

I really recommend that you read the [logging documentation](https://docs.python.org/3/library/logging.html) and [cookbook](https://docs.python.org/3/howto/logging-cookbook.html) which have a lot more great information (and are also very well written!) There's a lot more you can do, with custom log handlers, different output formats, outputting to many locations at once, etc. Have fun!

我极力推荐你读下[日志文档](https://docs.python.org/3/library/logging.html)和[指南](https://docs.python.org/3/howto/logging-cookbook.html)，它们提供了更多有用信息（写的很好！）。你也可以通过定制自己的日志处理器来做更多事情，不同的输出格式、一次输出到多个位置等。玩得高兴！
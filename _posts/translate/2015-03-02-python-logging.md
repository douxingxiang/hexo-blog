Python has a very rich [logging](https://docs.python.org/3/library/logging.html) system. It's very easy to add structured or unstructured log output to your python code, and have it written to a file, or output to the console, or sent to syslog, or to customize the output format.

We're in the middle of re-examining how logging works in [mozharness](https://wiki.mozilla.org/ReleaseEngineering/Mozharness) to make it easier to factor-out code and have fewer [mixins](https://mgerva.wordpress.com/2015/02/25/on-mixins/).

Here are a few tips and tricks that have really helped me with python logging:

## There can be <s>only</s> more than one

Well, there can be only one logger with a given name. There is a special "root" logger with no name. Multiple `getLogger(name)` calls with the same name will return the same logger object. This is an important property because it means you don't need to explicitly pass logger objects around in your code. You can retrieve them by name if you wish. The logging module is maintaining a global registry of logging objects.

You can have multiple loggers active, each specific to its own module or even class or instance.

Each logger has a name, typically the name of the module it's being used from. A common pattern you see in python modules is this:
<pre># in module foo.py
import logging
log = logging.getLogger(__name__)
</pre>

This works because inside `foo.py`, `__name__` is equal to "foo". So inside this module the `log` object is specific to this module.

## Loggers are hierarchical

The names of the loggers form their own namespace, with "." separating levels. This means that if you have have loggers called `foo.bar`, and `foo.baz`, you can do things on logger `foo` that will impact both of the children. In particular, you can set the logging level of `foo` to show or ignore debug messages for both submodules.
<pre># Let's enable all the debug logging for all the foo modules
import logging
logging.getLogger('foo').setLevel(logging.DEBUG)
</pre>

## Log messages are like events that flow up through the hierarchy

Let's say we have a module foo.bar:
<pre>import logging
log = logging.getLogger(__name__)  # __name__ is "foo.bar" here

def make_widget():
    log.debug("made a widget!")
</pre>

When we call `make_widget()`, the code generates a debug log message. Each logger in the hierarchy has a chance to output something for the message, ignore it, or pass the message along to its parent.

The default configuration for loggers is to have their levels unset (or set to [`NOTSET`](https://docs.python.org/3/library/logging.html#logging-levels)). This means the logger will just pass the message on up to its parent. Rinse &amp; repeat until you get up to the root logger.

So if the `foo.bar` logger hasn't specified a level, the message will continue up to the `foo` logger. If the `foo` logger hasn't specified a level, the message will continue up to the root logger.

This is why you typically configure the logging output on the root logger; it typically gets ALL THE MESSAGES!!! Because this is so common, there's a dedicated method for configuring the root logger: [`logging.basicConfig()`](https://docs.python.org/3/library/logging.html#logging.basicConfig)

This also allows us to use mixed levels of log output depending on where the message are coming from:
<pre>import logging

# Enable debug logging for all the foo modules
logging.getLogger("foo").setLevel(logging.DEBUG)

# Configure the root logger to log only INFO calls, and output to the console
# (the default)
logging.basicConfig(level=logging.INFO)

# This will output the debug message
logging.getLogger("foo.bar").debug("ohai!")
</pre>

If you comment out the `setLevel(logging.DEBUG)` call, you won't see the message at all.

## exc_info is teh awesome

All the built-in logging calls support a keyword called `exc_info`, which if isn't false, causes the current exception information to be logged in addition to the log message. e.g.:
<pre>import logging
logging.basicConfig(level=logging.INFO)

log = logging.getLogger(__name__)

try:
    assert False
except AssertionError:
    log.info("surprise! got an exception!", exc_info=True)
</pre>

There's a special case for this, `log.exception()`, which is equivalent to `log.error(..., exc_info=True)`

Python 3.2 introduced a new keyword, `stack_info`, which will output the current stack to the current code. Very handy to figure out _how_ you got to a certain point in the code, even if no exceptions have occurred!

## "No handlers found..."

You've probably come across this message, especially when working with 3rd party modules. What this means is that you don't have any logging handlers configured, and something is trying to log a message. The message has gone all the way up the logging hierarchy and fallen off the...top of the chain (maybe I need a better metaphor).
<pre>import logging
log = logging.getLogger()
log.error("no log for you!")
</pre>

outputs:
<pre>No handlers could be found for logger "root"
</pre>

There are two things that can be done here:

1.  Configure logging in your module with `basicConfig()` or similar

2.  Library authors should add a [NullHandler](https://docs.python.org/3/library/logging.handlers.html#logging.NullHandler) at the root of their module to prevent this. See the [cookbook](https://docs.python.org/3/howto/logging.html#library-config) and [this blog](http://pythonsweetness.tumblr.com/post/67394619015/use-of-logging-package-from-within-a-library) for more details here.

## Want more?

I really recommend that you read the [logging documentation](https://docs.python.org/3/library/logging.html) and [cookbook](https://docs.python.org/3/howto/logging-cookbook.html) which have a lot more great information (and are also very well written!) There's a lot more you can do, with custom log handlers, different output formats, outputting to many locations at once, etc. Have fun!
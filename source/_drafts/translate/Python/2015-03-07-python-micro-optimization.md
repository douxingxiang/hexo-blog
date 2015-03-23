I'm going to show you how a micro optimization can speed up your python code by a whopping 5%. 5%! It can also annoy anyone that has to maintain your code.

我将示范微优化（micro optimization）如何提升python代码5%的执行速度。5%！同时也会触怒任何维护你代码的人。

But really, this is about explaining code might you see occasionally see in the standard library or in other people's code. Let's take an example from the standard library, specifically the <tt>collections.OrderedDict</tt> class:

但实际上，这篇文章只是解释一下你偶尔会在标准库或者其他人的代码中碰到的代码。我们先看一个标准库的例子，`collections.OrderedDict`类：

    def __setitem__(self, key, value, dict_setitem=dict.__setitem__):
        if key not in self:
            root = self.__root
            last = root[0]
            last[1] = root[0] = self.__map[key] = [last, root, key]
        return dict_setitem(self, key, value)

Notice the last arg: <tt>dict_setitem=dict.__setitem__</tt>. It makes sense if you think about it. To associate a key with a value, you'll need to provide a <tt>__setitem__</tt> method which takes three arguments: the key you're setting, the value associated with the key, and the <tt>__setitem__</tt> class method to the built in dict class. Wait. Ok maybe the last argument makes no sense.

注意最后一个参数：`dict_setitem=dict.__setitem__`。如果你仔细想就会感觉有道理。将值关联到键上，你只需要给`__setitem__`传递三个参数：要设置的键，与键关联的值，传递给内建dict类的`__setitem__`类方法。等会，好吧，也许最后一个参数没什么意义。

## Scope Lookups
## 作用域查询

To understand what's going on here, we need to take a look at scopes. Let's start with a simple question, if I'm in a python function, and I encounter something named <tt>open</tt>, how does python go about figuring out the value of <tt>open</tt>?

为了理解到底发生了什么，我们看下作用域。从一个简单问题开始：在一个python函数中，如果遇到了一个名为`open`的东西，python如何找出`open`的值？

    # <GLOBAL: bunch of code here>

    def myfunc():
        # <LOCAL: bunch of code here>
        with open('foo.txt', 'w') as f:
            pass

The short answer is that without knowing the contents of the GLOBAL and the LOCAL section, you can't know for certain the value of <tt>open</tt>. Conceptually, python checks three namespaces for a name (ignoring nested scopes to keep things simple):

简单作答：如果不知道GLOBAL和LOCAL的内容，你不可能确定`open`的值。概念上，python查找名称时会检查3个命名空间（简单起见忽略嵌套作用域）：

*   locals
*   globals
*   builtin
*   局部命名空间
*   全局命名空间
*   内建命名空间

So in the <tt>myfunc</tt> function, if we're trying to find a value for <tt>open</tt>, we'll first check the local namespace, then the globals namespace, then the builtins namespace. And if<tt>open</tt> is not defined in any namespace, a <tt>NameError</tt> is raised.

所以在`myfunc`函数中，如果尝试查找`open`的值时，我们首先会检查本地命名空间，然后是全局命名空间，接着内建命名空间。如果在这3个命名空间中都找不到`open`的定义，就会引发`NameError`异常。

## Scope Lookups, the Implementation
## 作用域查找的实现

The lookup process above is just conceptual. The implementation of this lookup process gives us room to exploit the implementation.

上面的查找过程只是概念上的。这个查找过程的实现给予了我们探索实现的空间。

    def foo():
        a = 1
        return a

    def bar():
        return a

    def baz(a=1):
        return a

Let's look at the bytecode of each function:

我们看下每个函数的字节码：

    >>> import dis
    >>> dis.dis(foo)
      2           0 LOAD_CONST               1 (1)
                  3 STORE_FAST               0 (a)

      3           6 LOAD_FAST                0 (a)
                  9 RETURN_VALUE

    >>> dis.dis(bar)
      2           0 LOAD_GLOBAL              0 (a)
                  3 RETURN_VALUE

    >>> dis.dis(baz)
      2           0 LOAD_FAST                0 (a)
                  3 RETURN_VALUE</pre>

Look at the differences between foo and bar. Right away we can see that at the bytecode level python has already determined what's a local variable and what is not because <tt>foo</tt> is using <tt>LOAD_FAST</tt> and <tt>bar</tt> is using <tt>LOAD_GLOBAL</tt>.

注意foo和bar的区别。我们立即就可以看到，在字节码层面，python已经判断了什么是局部变量、什么不是，因为`foo`使用`LOAD_FAST`，而`bar`使用`LOAD_GLOBAL`。

We won't get into the details of how python's compiler knows when to emit which bytecode (perhaps that's another post), but suffice to say python knows which type of lookup it needs to perform when it executes a function.

我们不会具体阐述python的编译器如何知道何时生成何种字节码（也许那是另一篇文章了），但足以理解，python在执行函数时已经知道进行何种类型的查找。

One other thing that can be confusing is that <tt>LOAD_GLOBAL</tt> is used for lookups in the global as well as the builtin namespace. You can think of this as "not local", again ignoring the issue of nested scopes. The C code for this is roughly [[1]](http://jamesls.com/micro-optimizations-in-python-code-speeding-up-lookups.html#id3):

另一个容易混淆的是，`LOAD_GLOBAL`既可以用于全局，也可以用于内建命名空间的查找。忽略嵌套作用域的问题，你可以认为这是“非局部的”。对应的C代码大概是[[1]](http://jamesls.com/micro-optimizations-in-python-code-speeding-up-lookups.html#id3)：

    case LOAD_GLOBAL:
        v = PyObject_GetItem(f->f_globals, name);
        if (v == NULL) {
            v = PyObject_GetItem(f->f_builtins, name);
            if (v == NULL) {
                if (PyErr_ExceptionMatches(PyExc_KeyError))
                    format_exc_check_arg(
                                PyExc_NameError,
                                NAME_ERROR_MSG, name);
                goto error;
            }
        }
        PUSH(v);

Even if you've never seen any of the C code for CPython, the above code is pretty straightforward. First, check if the key name we're looking for is in <tt>f->f_globals</tt> (the globals dict), then check if the name is in <tt>f->f_builtins</tt> (the builtins dict), and finally, raise a <tt>NameError</tt> if both checks failed.

即使你从来没有看过CPython的C代码，上面的代码已经相当直白了。首先，检查我们查找的键名是否在`f->f_globals`（全局字典）中，然后检查名称是否在`f->f_builtins`（内建字典）中，最后，如果上面两个位置都没找到，就会抛出`NameError`异常。

## Binding Constants to the Local Scope
## 将常量绑定到局部作用域

Now when we look at the initial code sample, we can see that the last argument is binding a function into the local scope of a function. It does this by assigning a value,<tt>dict.__setitem__</tt>, as the default value of an argument. Here's another example:

现在我们再看最开始的代码例子，就会理解最后一个参数其实是将一个函数绑定到局部作用域中的一个函数上。具体是通过将`dict.__setitem__`赋值为参数的默认值。这里还有另一个例子：

    def not_list_or_dict(value):
      return not (isinstance(value, dict) or isinstance(value, list))

    def not_list_or_dict(value, _isinstance=isinstance, _dict=dict, _list=list):
      return not (_isinstance(value, _dict) or _isinstance(value, _list))

We're doing the same thing here, binding what would normally be objects that are in the builtin namespace into the local namespace instead. So instead of requiring the use of <tt>LOAD_GLOBAL</tt> (a global lookup), python instead will use <tt>LOCAL_FAST</tt>. So how much faster is this? Let's do some crude testing:

这里我们做同样的事情，把本来将会在内建命名空间中的对象绑定到局部作用域中去。因此，python将会使用`LOCAL_FAST`而不是`LOAD_GLOBAL`（全局查找）。那么这到底有多快呢？我们做个简单的测试：

    $ python -m timeit -s 'def not_list_or_dict(value): return not (isinstance(value, dict) or isinstance(value, list))' 'not_list_or_dict(50)'
    1000000 loops, best of 3: 0.48 usec per loop
    $ python -m timeit -s 'def not_list_or_dict(value, _isinstance=isinstance, _dict=dict, _list=list): return not (_isinstance(value, _dict) or _isinstance(value, _list))' 'not_list_or_dict(50)'
    1000000 loops, best of 3: 0.423 usec per loop

Or in other words, **that's an 11.9% improvement** [[2]](http://jamesls.com/micro-optimizations-in-python-code-speeding-up-lookups.html#id4). That's way more than the 5% I promised at the beginning of this post!

换句话说，__大概11.9%的提升__ [[2]](http://jamesls.com/micro-optimizations-in-python-code-speeding-up-lookups.html#id4)。比我在文章开始处承诺的5%还多！

## There's More to the Story
## 还有更多内涵

It's reasonable to think that the speed improvment is because <tt>LOAD_FAST</tt> reads from the local namespace whereas <tt>LOAD_GLOBAL</tt> will first check the global namespace before falling back to checking the builtin namespace. And in the example function above, <tt>isinstance</tt>, <tt>dict</tt>, and <tt>list</tt> all come from the built in namespace.

可以合理地认为，速度提升在于`LOAD_FAST`读取局部作用域，而`LOAD_GLOBAL`在检查内建作用域之前会先首先检查全局作用域。上面那个示例函数中，`isinstance`、`dict`、`list`都位于内建命名空间。

However, there's more going on. Not only are we able to skip additional lookup with<tt>LOAD_FAST</tt>, **it's also a different type of lookup**.

但是，还有更多。我们不仅可以使用`LOAD_FAST`跳过多余的查找，__它也是一种不同类型的查找__。

The C code snippet above showed the code for <tt>LOAD_GLOBAL</tt>, but here's the code for<tt>LOAD_FAST</tt>:

上面C代码片段给出了`LOAD_GLOBAL`的代码，下面是`LOAD_FAST`的：

    case LOAD_FAST:
        PyObject *value = fastlocal[oparg];
        if (value == NULL) {
            format_exc_check_arg(PyExc_UnboundLocalError,
                                 UNBOUNDLOCAL_ERROR_MSG,
                                 PyTuple_GetItem(co->co_varnames, oparg));
            goto error;
        }
        Py_INCREF(value);
        PUSH(value);
        FAST_DISPATCH();

We're retrieving the local value by indexing into an _array_. It's not shown here, but<tt>oparg</tt> is just an index into that array.

我们通过索引一个_数组_获取局部值。虽然没有直接出现，但是`oparg`只是那个数组的一个索引。

Now it's starting to make sense. In our first version <tt>not_list_or_dict</tt> had to perform 4 lookups, and each name was in the builtins namespace which we only look at after looking in the globals namespace. That's 8 dictionary key lookups. Compare that to directly indexing into a C array 4 times, which is what happens in the second version of<tt>not_list_or_dict</tt>, which all use <tt>LOAD_FAST</tt> under the hood. This is why lookups in the local namespace are faster.

现在听起来才合理。我们第一个版本的`not_list_or_dict`要进行4个查询，每个名称都位于内建命名空间，它们只有在查找全局命名空间之后才会查询。这就是8个字典键的查询操作了。相比之下，`not_list_or_dict`的第二版中，直接索引C数组4次，底层全部使用`LOAD_FAST`。这就是为什么局部查询更快的原因。

## Wrapping Up
## 总结

Now the next time you see this in someone else's code you'll know what's going on.

现在当下次你在其他人代码中看到这种例子，就会明白了。

And one final thing. Please don't actually do these kinds of optimizations unless you really need to. And most of the time you don't need to. But when the time really comes, and you really need to squeeze out every last bit of performance, you'll have this in your back pocket.

最后，除非确实需要，请不要在具体应用中进行这类优化。而且大部分时间你都没必要做。但是如果时候到了，你需要挤出最后一点性能，就需要搞懂这点。

### Footnotes
### 脚注

[[1]](http://jamesls.com/micro-optimizations-in-python-code-speeding-up-lookups.html#id1)Though keep in mind that I removed some performance optimizations in the above code to make it simpler to read. The real code is slightly more complicated.

[[1]](http://jamesls.com/micro-optimizations-in-python-code-speeding-up-lookups.html#id1)注意，为了更易读，上面的代码中我去掉了一些性能优化。真正的代码稍微有点复杂。


[[2]](http://jamesls.com/micro-optimizations-in-python-code-speeding-up-lookups.html#id2)On a toy example for a function that doesn't really do anything interesting nor does it perform any IO and is mostly bound by the python VM loop.

[[2]](http://jamesls.com/micro-optimizations-in-python-code-speeding-up-lookups.html#id2)示例函数事实上没有做什么有价值的东西，也没进行IO操作，大部分是受python VM循环的限制。
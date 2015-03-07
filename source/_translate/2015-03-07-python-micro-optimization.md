I'm going to show you how a micro optimization can speed up your python code by a whopping 5%. 5%! It can also annoy anyone that has to maintain your code.

But really, this is about explaining code might you see occasionally see in the standard library or in other people's code. Let's take an example from the standard library, specifically the <tt>collections.OrderedDict</tt> class:
<div><pre>def __setitem__(self, key, value, dict_setitem=dict.__setitem__):
    if key not in self:
        root = self.__root
        last = root[0]
        last[1] = root[0] = self.__map[key] = [last, root, key]
    return dict_setitem(self, key, value)</pre></div>

Notice the last arg: <tt>dict_setitem=dict.__setitem__</tt>. It makes sense if you think about it. To associate a key with a value, you'll need to provide a <tt>__setitem__</tt> method which takes three arguments: the key you're setting, the value associated with the key, and the <tt>__setitem__</tt> class method to the built in dict class. Wait. Ok maybe the last argument makes no sense.
<div id="scope-lookups">

## Scope Lookups

To understand what's going on here, we need to take a look at scopes. Let's start with a simple question, if I'm in a python function, and I encounter something named <tt>open</tt>, how does python go about figuring out the value of <tt>open</tt>?
<div><pre># &lt;GLOBAL: bunch of code here&gt;

def myfunc():
    # &lt;LOCAL: bunch of code here&gt;
    with open('foo.txt', 'w') as f:
        pass</pre></div>

The short answer is that without knowing the contents of the GLOBAL and the LOCAL section, you can't know for certain the value of <tt>open</tt>. Conceptually, python checks three namespaces for a name (ignoring nested scopes to keep things simple):

*   locals
*   globals
*   builtin

So in the <tt>myfunc</tt> function, if we're trying to find a value for <tt>open</tt>, we'll first check the local namespace, then the globals namespace, then the builtins namespace. And if<tt>open</tt> is not defined in any namespace, a <tt>NameError</tt> is raised.
</div><div id="scope-lookups-the-implementation">

## Scope Lookups, the Implementation

The lookup process above is just conceptual. The implementation of this lookup process gives us room to exploit the implementation.
<div><pre>def foo():
    a = 1
    return a

def bar():
    return a

def baz(a=1):
    return a</pre></div>

Let's look at the bytecode of each function:
<pre>&gt;&gt;&gt; import dis
&gt;&gt;&gt; dis.dis(foo)
  2           0 LOAD_CONST               1 (1)
              3 STORE_FAST               0 (a)

  3           6 LOAD_FAST                0 (a)
              9 RETURN_VALUE

&gt;&gt;&gt; dis.dis(bar)
  2           0 LOAD_GLOBAL              0 (a)
              3 RETURN_VALUE

&gt;&gt;&gt; dis.dis(baz)
  2           0 LOAD_FAST                0 (a)
              3 RETURN_VALUE</pre>

Look at the differences between foo and bar. Right away we can see that at the bytecode level python has already determined what's a local variable and what is not because <tt>foo</tt> is using <tt>LOAD_FAST</tt> and <tt>bar</tt> is using <tt>LOAD_GLOBAL</tt>.

We won't get into the details of how python's compiler knows when to emit which bytecode (perhaps that's another post), but suffice to say python knows which type of lookup it needs to perform when it executes a function.

One other thing that can be confusing is that <tt>LOAD_GLOBAL</tt> is used for lookups in the global as well as the builtin namespace. You can think of this as "not local", again ignoring the issue of nested scopes. The C code for this is roughly [[1]](http://jamesls.com/micro-optimizations-in-python-code-speeding-up-lookups.html#id3):
<div><pre>case LOAD_GLOBAL:
    v = PyObject_GetItem(f-&gt;f_globals, name);
    if (v == NULL) {
        v = PyObject_GetItem(f-&gt;f_builtins, name);
        if (v == NULL) {
            if (PyErr_ExceptionMatches(PyExc_KeyError))
                format_exc_check_arg(
                            PyExc_NameError,
                            NAME_ERROR_MSG, name);
            goto error;
        }
    }
    PUSH(v);</pre></div>

Even if you've never seen any of the C code for CPython, the above code is pretty straightforward. First, check if the key name we're looking for is in <tt>f-&gt;f_globals</tt> (the globals dict), then check if the name is in <tt>f-&gt;f_builtins</tt> (the builtins dict), and finally, raise a <tt>NameError</tt> if both checks failed.
</div><div id="binding-constants-to-the-local-scope">

## Binding Constants to the Local Scope

Now when we look at the initial code sample, we can see that the last argument is binding a function into the local scope of a function. It does this by assigning a value,<tt>dict.__setitem__</tt>, as the default value of an argument. Here's another example:
<div><pre>def not_list_or_dict(value):
  return not (isinstance(value, dict) or isinstance(value, list))

def not_list_or_dict(value, _isinstance=isinstance, _dict=dict, _list=list):
  return not (_isinstance(value, _dict) or _isinstance(value, _list))</pre></div>

We're doing the same thing here, binding what would normally be objects that are in the builtin namespace into the local namespace instead. So instead of requiring the use of <tt>LOAD_GLOBAL</tt> (a global lookup), python instead will use <tt>LOCAL_FAST</tt>. So how much faster is this? Let's do some crude testing:
<pre>$ python -m timeit -s 'def not_list_or_dict(value): return not (isinstance(value, dict) or isinstance(value, list))' 'not_list_or_dict(50)'
1000000 loops, best of 3: 0.48 usec per loop
$ python -m timeit -s 'def not_list_or_dict(value, _isinstance=isinstance, _dict=dict, _list=list): return not (_isinstance(value, _dict) or _isinstance(value, _list))' 'not_list_or_dict(50)'
1000000 loops, best of 3: 0.423 usec per loop</pre>

Or in other words, **that's an 11.9% improvement** [[2]](http://jamesls.com/micro-optimizations-in-python-code-speeding-up-lookups.html#id4). That's way more than the 5% I promised at the beginning of this post!
</div><div id="there-s-more-to-the-story">

## There's More to the Story

It's reasonable to think that the speed improvment is because <tt>LOAD_FAST</tt> reads from the local namespace whereas <tt>LOAD_GLOBAL</tt> will first check the global namespace before falling back to checking the builtin namespace. And in the example function above, <tt>isinstance</tt>, <tt>dict</tt>, and <tt>list</tt> all come from the built in namespace.

However, there's more going on. Not only are we able to skip additional lookup with<tt>LOAD_FAST</tt>, **it's also a different type of lookup**.

The C code snippet above showed the code for <tt>LOAD_GLOBAL</tt>, but here's the code for<tt>LOAD_FAST</tt>:
<div><pre>case LOAD_FAST:
    PyObject *value = fastlocal[oparg];
    if (value == NULL) {
        format_exc_check_arg(PyExc_UnboundLocalError,
                             UNBOUNDLOCAL_ERROR_MSG,
                             PyTuple_GetItem(co-&gt;co_varnames, oparg));
        goto error;
    }
    Py_INCREF(value);
    PUSH(value);
    FAST_DISPATCH();</pre></div>

We're retrieving the local value by indexing into an _array_. It's not shown here, but<tt>oparg</tt> is just an index into that array.

Now it's starting to make sense. In our first version <tt>not_list_or_dict</tt> had to perform 4 lookups, and each name was in the builtins namespace which we only look at after looking in the globals namespace. That's 8 dictionary key lookups. Compare that to directly indexing into a C array 4 times, which is what happens in the second version of<tt>not_list_or_dict</tt>, which all use <tt>LOAD_FAST</tt> under the hood. This is why lookups in the local namespace are faster.
</div><div id="wrapping-up">

## Wrapping Up

Now the next time you see this in someone else's code you'll know what's going on.

And one final thing. Please don't actually do these kinds of optimizations unless you really need to. And most of the time you don't need to. But when the time really comes, and you really need to squeeze out every last bit of performance, you'll have this in your back pocket.
<div id="footnotes">

### Footnotes
<table id="id3" rules="none"><colgroup><col /> <col /></colgroup><tbody valign="top"><tr><td>[[1]](http://jamesls.com/micro-optimizations-in-python-code-speeding-up-lookups.html#id1)</td><td>Though keep in mind that I removed some performance optimizations in the above code to make it simpler to read. The real code is slightly more complicated.</td></tr></tbody></table><table id="id4" rules="none"><colgroup><col /> <col /></colgroup><tbody valign="top"><tr><td>[[2]](http://jamesls.com/micro-optimizations-in-python-code-speeding-up-lookups.html#id2)</td><td>On a toy example for a function that doesn't really do anything interesting nor does it perform any IO and is mostly bound by the python VM loop.</td></tr></tbody></table></div></div>
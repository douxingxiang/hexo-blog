In python, everything is an object. Classes provide the mechanism for creating new kinds of objects. In this tutorial, we ignore the basics of classes and object oriented programming and focus on topics that provide a better understanding of object oriented programming in python. It is assumed that we are dealing with new style classes. These are python classes that inherit from _object_ super class.

Python中一切都是对象。类提供了创建新类型对象的机制。这篇教程中，我们忽略类和面向对象的基本知识，而专注在更好地理解Python的面向对象编程上。假设我们在处理新风格的python类，它们继承自_对象_父类。

## Defining Classes
## 定义类

The `class` statement is used to define new classes. The class statement defines a set of attributes, variables and methods, that are associated with and shared by a collection of instances of such a class. A simple class definition is given below:

`class`语句用来定义新类，可以定义该类的所有实例相关或共享的属性、变量和方法。下面给出一个简单类定义：

        class Account(object):
            num_accounts = 0

            def __init__(self, name, balance):
                self.name = name 
                self.balance = balance 
                Account.num_accounts += 1

            def del_account(self):
                Account.num_accounts -= 1

            def deposit(self, amt):
                self.balance = self.balance + amt 

            def withdraw(self, amt):
                self.balance = self.balance - amt 

            def inquiry(self):
                return self.balance `</pre>

Class definitions introduce the following new objects:

类定义引入了以下新对象：

1.  Class object
2.  Instance object
3.  Method object

1. 类对象
2. 实例对象
3. 方法对象

# Class Objects
#类对象

When a class definition is encountered during the execution of a program, a new namespace is created and this serves as the namespace into which all class variable and method definition name bindings go. Note that this namespace does not create a new local scope that can be used by class methods hence the need for fully qualified names when accessing variables in methods. The `Account` class from the previous section illustrates this; methods trying to access the `num_of_accounts` variable must use the fully qualified name, `Account.num_of_accounts` else an error results as shown below when the fully qualified name is not used in the `__init__` method:

程序执行过程中遇到类定义时，就会创建新的命名空间，命名空间包含所有类变量和方法定义的名称绑定。注意该命名空间并没有创建类方法可以使用的新局部作用域，因此在方法中访问变量需要全限定名称。上一节的`Account`类演示了该特性；尝试访问`num_of_accounts`变量的方法需要使用全限定名称`Account.num_of_accounts`，否则，如果没有在`__init__`方法中使用全限定名称，会触发如下的错误：

    class Account(object):
        num_accounts = 0

        def __init__(self, name, balance):
            self.name = name 
            self.balance = balance 
            num_accounts += 1

        def del_account(self):
            Account.num_accounts -= 1

        def deposit(self, amt):
            self.balance = self.balance + amt 

        def withdraw(self, amt):
            self.balance = self.balance - amt 

        def inquiry(self):
            return self.balance 

    >>> acct = Account('obi', 10)
    Traceback (most recent call last):
      File "python", line 1, in <module>
      File "python", line 9, in __init__
    UnboundLocalError: local variable 'num_accounts' referenced before assignment`</pre>

At the end of the execution of a class definition, a class object is created. The scope that was in effect just before the class definition was entered is reinstated, and the class object is bound here to the class name given in the class definition header.

类定义执行的最后，会创建一个类对象。在进入类定义之前有效的作用域现在被恢复了，同时类对象被绑定到类定义头的类名上。

A little diversion here, one may ask, **_if the class created is an object then what is the class of the class object ?_**. In accordance to the _everything is an object_ philosophy of python, the class object does indeed have a class which it is created from and in the python new style class, this is the `type`class.

先偏离下话题，你可能会问**_如果创建的类是对象，那么类对象的类是什么呢？_**。与_一切都是对象_的python哲学一致，类对象确实有个类，即python新风格类中的`type`类。
    
    >>> type(Account)
    <class 'type'>

So just to confuse you a bit, the type of a type, the Account type, is type. The type class is a **_metaclass_**, a class used for creating other classes and we discuss this in a later tutorial.

让你更迷惑一点，Account类型的类型是type。type类是个**_元类_**，用于创建其他类，我们稍后教程中再介绍。

Class objects support attribute reference and instantiation. Attributes are referenced using the standard dot syntax of object followed by dot and then attribute name: obj.name. Valid attribute names are all the variable and method names present in the class’s namespace when the class object was created. For example:

类对象支持属性引用和实例化。属性通过标准的点语法引用，即对象后跟句点，然后是属性名：obj.name。有效的属性名是类对象创建后类命名空间中出现的所有变量和方法名。例如：

    >>> Account.num_accounts
    >>> 0
    >>> Account.deposit
    >>> <unbound method Account.deposit>`</pre>

Class instantiation uses function notation. Instantiation involved calling the class object like a normal functions without parameter as shown below for the Account class:

类实例化使用函数表示法。实例化会像普通函数一样无参数调用类对象，如下文中的Account类：

    >>> Account()

After instantiation of a class object, an instance object is returned and the`__init__` , if it has been defined in the class, is called with the instance object as the first argument. This performs any user defined initialization such as initializing instance variable values. In the case of the `Account`class the account name and balance are set and the number of instance objects is incremented by one.

类对象实例化之后，会返回实例对象，如果类中定义了`__init__`方法，就会调用，实例对象作为第一个参数传递过去。这个方法会进行用户自定义的初始化过程，比如实例变量的初始化。`Account`类为例，账户name和balance会被设置，实例对象的数目增加1。

# Instance Objects
# 实例对象

If class objects are the cookie cutters then instance objects are the cookies that are the result of instantiating class objects. Attribute, data and method objects, references are the only operations that are valid on instance objects.

如果类对象是饼干切割刀，饼干就是实例化类对象的结果。实例对象上的全部有效操作为属性、数据和方法对象，引用。

# Method Objects
# 方法对象

Method objects are similar to function objects. If `x` is an instance of the`Account` class, `x.deposit` is an example of a method object. Methods have an extra argument included in their definition, the `self` argument. This `self` argument refers to an instance of the class. _Why do we have to pass an instance as an argument to a method?_ This is best illustrated by a method call:

方法对象和函数对象类似。如果`x`是`Account`类的实例，`x.deposit`就是方法对象的例子。方法定义中有个附加参数，`self`。`self`指向类实例。_为什么我们需要把实例作为参数传递给方法？_方法调用能最好地说明：

    >>> x = Account()
    >>> x.inquiry()
    10

What exactly happens when an instance method is called? You may have noticed that `x.inquiry()` is called without an argument above, even though the method definition for `inquiry()` requires the `self` argument. What happened to this argument?

实例方法调用时发生了什么？你应该注意到`x.inquiry()`调用时没有参数，虽然方法定义包含`self`参数。那么这个参数到底发生了什么？

The special thing about methods is that the object on which a method is being called is passed as the first argument of the function. In our example, the call to `x.inquiry()` is exactly equivalent to `Account.f(x)`. In general, calling a method with a list of _n_ arguments is equivalent to calling the corresponding function with an argument list that is created by inserting the method’s object before the first argument.

特殊之处在于方法所作用的对象被作为函数的第一个参数。在我们的例子中，对`x.inquiry()`的调用等价于`Account.f(x)`。一般，调用_n_参数的方法等同于将方法的作用对象插入到第一个参数位置。

The python tutorial says:
        
python教程上讲：

> When an instance attribute is referenced that isn’t a data attribute, its class is searched. If the name denotes a valid class attribute that is a function object, a method object is created by packing (pointers to) the instance object and the function object just found together in an abstract object: this is the method object. When the method object is called with an argument list, a new argument list is constructed from the instance object and the argument list, and the function object is called with this new argument list.

> 当引用的实例属性不是数据属性时，就会搜索类。如果名称表示一个合法的函数对象，实例对象和函数对象将会把打包到一个抽象对象，即方法对象。包含参数列表的方法对象被调用时，将会根据实例对象和参数列表创建一个新的参数列表，然后函数对象将会使用新的参数列表被调用。

The above applies to all instance method object including the `__init__`method. The self argument is actually not a keyword and any valid argument name can be used as shown in the below definition for the Account class:

这适用于所有的实例方法对象，包括`__init__`方法。self参数其实不是一个关键字，任何有效的参数名都可以使用，如下Account类定义所示：
    
    class Account(object):
        num_accounts = 0

        def __init__(obj, name, balance):
            obj.name = name 
            obj.balance = balance 
            Account.num_accounts += 1

        def del_account(obj):
            Account.num_accounts -= 1

        def deposit(obj, amt):
            obj.balance = obj.balance + amt 

        def withdraw(obj, amt):
            obj.balance = obj.balance - amt 

        def inquiry(obj):
            return obj.balance 

    >>> Account.num_accounts
    >>> 0
    >>> x = Account('obi', 0)
    >>> x.deposit(10)
    >>> Account.inquiry(x)
    >>> 10`</pre>

# Static and Class Methods

All methods defined in a class by default operate on instances. However, one can define static or class methods by decorating such methods with the corresponding `@staticmethod` or `@classmethod` decorators.

# Static Methods

Static methods are normal functions that exist in the namespace of a class. Referencing a static method from a class shows that rather than an _unbound_method type, a _function_ type is returned as shown below:
    <pre>`
    class Account(object):
        num_accounts = 0

        def __init__(self, name, balance):
            self.name = name 
            self.balance = balance 
            Account.num_accounts += 1

        def del_account(self):
            Account.num_accounts -= 1

        def deposit(self, amt):
            self.balance = self.balance + amt 

        def withdraw(self, amt):
            self.balance = self.balance - amt 

        def inquiry(self):
            return "Name={}, balance={}".format(self.name, self.balance) 

        @staticmethod
        def type():
            return "Current Account"

    >>> Account.deposit
    <unbound method Account.deposit>
    >>> Account.type
    <function type at 0x106893668>`</pre>

To define a static method, the `@staticmethod` decorator is used and such methods do not require the `self` argument. Static methods provide a mechanism for better organization as code related to a class are placed in that class and can be overridden in a sub-class as needed.

# Class Methods

Class methods as the name implies operate on classes themselves rather than instances. Class methods are created using the `@classmethod`decorator with the `class` rather than `instance` passed as the first argument to the method.
    <pre>`import json

    class Account(object):
        num_accounts = 0

        def __init__(self, name, balance):
            self.name = name 
            self.balance = balance 
            Account.num_accounts += 1

        def del_account(self):
            Account.num_accounts -= 1

        def deposit(self, amt):
            self.balance = self.balance + amt 

        def withdraw(self, amt):
            self.balance = self.balance - amt 

        def inquiry(self):
            return "Name={}, balance={}".format(self.name, self.balance) 

        @classmethod 
        def from_json(cls, params_json):
                    params = json.loads(params_json)
            return cls(params.get("name"), params.get("balance"))

        @staticmethod
        def type():
            return "Current Account"`</pre>

A motivating example of the usage of class methods is as a _factory_ for object creation. Imagine data for the `Account` class comes in different formats such as _tuples, json string_ etc. We cannot define multiple `__init__`methods as a Python class can have only one `__init__` method so class methods come in handy for such situations. In the `Account` class defined above for example, we want to initialize an account from a _json_ string object so we define a class factory method, `from_json` that takes in a json string object and handles the extraction of parameters and creation of the account object using the extracted parameters. Another example of a class method in action is the [`dict.fromkeys`](https://docs.python.org/3/library/stdtypes.html#dict.fromkeys) methods that is used for creating _dict_objects from a sequence of supplied keys and value.

## Python Special Methods

Sometimes we may want to customize user-defined classes. This may be either to change the way class objects are created and initialized or to provide polymorphic behavior for certain operations. Polymorphic behavior enables user-defined classes to define their own implementation for certain python operation such as the `+` operation. Python provides _special_methods that enable this. These methods are normally of the form `__*__`where `*` refers to a method name. Examples of such methods are`__init__` and `__new__` for customizing object creation and initialization,`__getitem__`, `__get__`, `__add__` and `__sub__` for emulating in built python types, `__getattribute__`, `__getattr__` etc. for customizing attribute access etc. These are just a few of the special methods. We discuss a few important special methods below to provide an understanding but the [python documentation](https://docs.python.org/2/reference/datamodel.html#special-method-names) provides a comprehensive list of these methods.

# Special methods for Object Creation

New class instances are created in a two step process using the `__new__`method to create a new instance and the `__init__` method to initialize the newly created object. Users are already familiar with defining the `__init__`method; the `__new__` method is rarely defined by the user for each class but this is possible if one wants to customize the creation of class instances.

# Special methods for Attribute access

We can customize attribute access for class instances by implementing the following listed methods.
    <pre>`class Account(object):
        num_accounts = 0

        def __init__(self, name, balance):
            self.name = name 
            self.balance = balance 
            Account.num_accounts += 1

        def del_account(self):
            Account.num_accounts -= 1

        def __getattr__(self, name):
            return "Hey I dont see any attribute called {}".format(name)

        def deposit(self, amt):
            self.balance = self.balance + amt 

        def withdraw(self, amt):
            self.balance = self.balance - amt 

        def inquiry(self):
            return "Name={}, balance={}".format(self.name, self.balance) 

        @classmethod 
        def from_dict(cls, params):
            params_dict = json.loads(params)
            return cls(params_dict.get("name"), params_dict.get("balance"))

        @staticmethod
        def type():
            return "Current Account"

    x = Account('obi', 0)`</pre>

1.  `__getattr__(self, name)__`: This method is **_only_** called when an attribute, _name_, that is referenced is neither an instance attribute nor is it found in the class tree for the object. This method should return some value for the attribute or raise an `AttributeError` exception. For example, if _x_ is an instance of the _Account_ class defined above, trying to access an attribute that does not exist will result in a call to this method.
    <pre>`>>> acct = Account("obi", 10)
    >>> acct.number
    Hey I dont see any attribute called number`</pre>
    Note that If `__getattr__` code references instance attributes, and those attributes do not exist, an infinite loop may occur because the`__getattr__` method is called successively without end.
2.  `__setattr__(self, name, value)__`: This method is called whenever an attribute assignment is attempted. `__setattr__` should insert the value being assigned into the dictionary of the instance attributes rather than using `self.name=value` which results in a recursive call and hence to an infinite loop.
3.  `__delattr__(self, name)__`: This is called whenever `del obj` is called.
4.  `__getattribute__(self, name)__`: This method is **always** called to implement attribute accesses for instances of the class.

# Special methods for Type Emulation

Python defines certain special syntax for use with certain types; for example, the elements in _lists_ and _tuples_ can be accessed using the index notation`[]`, numeric values can be added with the `+` operator and so on. We can create our own classes that make use of this special syntax by implementing certain special methods that the python interpreter calls whenever it encounters such syntax. We illustrate this with a very simple example below that emulates the basics of a python _list_.
    <pre>`class CustomList(object):

        def __init__(self, container=None):
            # the class is just a wrapper around another list to 
            # illustrate special methods
            if container is None:
                self.container = []
            else:
                self.container = container

        def __len__(self):
            # called when a user calls len(CustomList instance)
            return len(self.container)

        def __getitem__(self, index):
            # called when a user uses square brackets for indexing 
            return self.container[index]

        def __setitem__(self, index, value):
            # called when a user performs an index assignment
            if index <= len(self.container):
                self.container[index] = value
            else:
                raise IndexError()

        def __contains__(self, value):
            # called when the user uses the 'in' keyword
            return value in self.container

        def append(self, value):
            self.container.append(value)

        def __repr__(self):
            return str(self.container)

        def __add__(self, otherList):
            # provides support for the use of the + operator 
            return CustomList(self.container + otherList.container)`</pre>

In the above, the `CustomList` is a thin wrapper around an actual list. We have implemented some custom methods for illustration purposes:

1.  `__len__(self)` : This is called when the `len()` function is called on an instance of the `CustomList` as shown below:
    <pre>`>>> myList = CustomList()    >>> myList.append(1)    >>> myList.append(2)
    >>> myList.append(3)
    >>> myList.append(4)
    >>> len(myList)
    4`</pre>
2.  `__getitem__(self, value)`: provides support for the use of square bracket indexing on an instance of the CustomList class as shown below:
    <pre>`>>> myList = CustomList()
    >>> myList.append(1)    >>> myList.append(2)
    >>> myList.append(3)
    >>> myList.append(4)
    >>> myList[3]
    4`</pre>
3.  `__setitem__(self, key, value)`: Called to implement the assignment of value to to self[key] on an instance of the _CustomList_ class.
    <pre>`>>> myList = CustomList()
    >>> myList.append(1)    >>> myList.append(2)
    >>> myList.append(3)
    >>> myList.append(4)
    >>> myList[3] = 100
    4
    >>> myList[3]
    100`</pre>
4.  `__contains__(self, key)`: Called to implement membership test operators. Should return true if item is in self, false otherwise.
    <pre>`>>> myList = CustomList()
    >>> myList.append(1)    >>> myList.append(2)
    >>> myList.append(3)
    >>> myList.append(4)
    >>> 4 in myList
    True`</pre>
5.  `__repr__(self)`: Called to compute the object representation for _self_when print is called with _self_ as argument.
    <pre>`>>> myList = CustomList()
    >>> myList.append(1)    >>> myList.append(2)
    >>> myList.append(3)
    >>> myList.append(4)
    >>> print myList
    [1, 2, 3, 4]`</pre>
6.  `__add__(self, otherList)`: Called to compute the addition of two instances of CustomList when the `+` operator is used to add two instances together.
    <pre>`>>> myList = CustomList()
    >>> otherList = CustomList()
    >>> otherList.append(100)
    >>> myList.append(1)    >>> myList.append(2)
    >>> myList.append(3)
    >>> myList.append(4)
    >>> myList + otherList + otherList
    [1, 2, 3, 4, 100, 100]

The above provide an example of how we can customize class behavior by defining certain special class methods. For a comprehensive listing of all such custom methods, see the [python documentation](https://docs.python.org/2/reference/datamodel.html#basic-customization). In a follow-up tutorial, we put all we have discussed about special methods together and explain**descriptors**, a very important functionality that has widespread usage in python object oriented programming.

## Further Reading

1.  Python Essential Reference

2.  [Python Data Model](https://docs.python.org/2/reference/datamodel.html#)
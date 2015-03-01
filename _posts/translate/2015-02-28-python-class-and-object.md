In python, everything is an object. Classes provide the mechanism for creating new kinds of objects. In this tutorial, we ignore the basics of classes and object oriented programming and focus on topics that provide a better understanding of object oriented programming in python. It is assumed that we are dealing with new style classes. These are python classes that inherit from _object_ super class.

Python中一切都是对象。类提供了创建新类型对象的机制。这篇教程中，我们不谈类和面向对象的基本知识，而专注在更好地理解Python面向对象编程上。假设我们使用新风格的python类，它们继承自_对象_父类。

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
                return self.balance 

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

程序执行过程中遇到类定义时，就会创建新的命名空间，命名空间包含所有类变量和方法定义的名称绑定。注意该命名空间并没有创建类方法可以使用的新局部作用域，因此在方法中访问变量需要全限定名称。上一节的`Account`类演示了该特性；尝试访问`num_of_accounts`变量的方法需要使用全限定名称`Account.num_of_accounts`，否则，如果没有在`__init__`方法中使用全限定名称，会引发如下错误：

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
    UnboundLocalError: local variable 'num_accounts' referenced before assignment

At the end of the execution of a class definition, a class object is created. The scope that was in effect just before the class definition was entered is reinstated, and the class object is bound here to the class name given in the class definition header.

类定义执行的最后，会创建一个类对象。在进入类定义之前有效的那个作用域现在被恢复了，同时类对象被绑定到类定义头的类名上。

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
    >>> <unbound method Account.deposit>

Class instantiation uses function notation. Instantiation involved calling the class object like a normal functions without parameter as shown below for the Account class:

类实例化使用函数表示法。实例化会像普通函数一样无参数调用类对象，如下文中的Account类：

    >>> Account()

After instantiation of a class object, an instance object is returned and the`__init__` , if it has been defined in the class, is called with the instance object as the first argument. This performs any user defined initialization such as initializing instance variable values. In the case of the `Account`class the account name and balance are set and the number of instance objects is incremented by one.

类对象实例化之后，会返回实例对象，如果类中定义了`__init__`方法，就会调用，实例对象作为第一个参数传递过去。这个方法会进行用户自定义的初始化过程，比如实例变量的初始化。`Account`类为例，账户name和balance会被设置，实例对象的数目增加1。

# Instance Objects
# 实例对象

If class objects are the cookie cutters then instance objects are the cookies that are the result of instantiating class objects. Attribute, data and method objects, references are the only operations that are valid on instance objects.

如果类对象是饼干切割刀，饼干就是实例化类对象的结果。实例对象上的全部有效操作为对属性、数据和方法对象的引用。

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

特殊之处在于方法所作用的对象被作为函数的第一个参数传递过去。在我们的例子中，对`x.inquiry()`的调用等价于`Account.f(x)`。一般，调用_n_参数的方法等同于将方法的作用对象插入到第一个参数位置。

The python tutorial says:
        
python教程上讲：

> When an instance attribute is referenced that isn’t a data attribute, its class is searched. If the name denotes a valid class attribute that is a function object, a method object is created by packing (pointers to) the instance object and the function object just found together in an abstract object: this is the method object. When the method object is called with an argument list, a new argument list is constructed from the instance object and the argument list, and the function object is called with this new argument list.

> 当引用的实例属性不是数据属性时，就会搜索类。如果名称表示一个合法的函数对象，实例对象和函数对象将会被打包到一个抽象对象，即方法对象中。包含参数列表的方法对象被调用时，将会根据实例对象和参数列表创建一个新的参数列表，然后函数对象将会使用新的参数列表被调用。

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
    >>> 10

# Static and Class Methods
# 静态和类方法

All methods defined in a class by default operate on instances. However, one can define static or class methods by decorating such methods with the corresponding `@staticmethod` or `@classmethod` decorators.

类中定义的方法默认由实例调用。但是，我们也可以通过对应的`@staticmethod`和`@classmethod`装饰器来定义静态或类方法。

# Static Methods
# 静态方法

Static methods are normal functions that exist in the namespace of a class. Referencing a static method from a class shows that rather than an _unbound_method type, a _function_ type is returned as shown below:

静态方式是类命名空间中的普通函数。引用类的静态方法返回的是_函数_类型，而不是_非绑定_方法类型：

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
    <function type at 0x106893668>

To define a static method, the `@staticmethod` decorator is used and such methods do not require the `self` argument. Static methods provide a mechanism for better organization as code related to a class are placed in that class and can be overridden in a sub-class as needed.

使用`@staticmethod`装饰器来定义静态方法，这些方法不需要`self`参数。静态方法可以更好地组织与类相关的代码，也可以在子类中被重写。

# Class Methods
# 类方法

Class methods as the name implies operate on classes themselves rather than instances. Class methods are created using the `@classmethod`decorator with the `class` rather than `instance` passed as the first argument to the method.
类方法由类自身来调用，而不是实例。类方法使用`@classmethod`装饰器定义，作为第一个参数被传递给方法的是`类`而不是`实例`。

    import json

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
            return "Current Account"

A motivating example of the usage of class methods is as a _factory_ for object creation. Imagine data for the `Account` class comes in different formats such as _tuples, json string_ etc. We cannot define multiple `__init__`methods as a Python class can have only one `__init__` method so class methods come in handy for such situations. In the `Account` class defined above for example, we want to initialize an account from a _json_ string object so we define a class factory method, `from_json` that takes in a json string object and handles the extraction of parameters and creation of the account object using the extracted parameters. Another example of a class method in action is the [`dict.fromkeys`](https://docs.python.org/3/library/stdtypes.html#dict.fromkeys) methods that is used for creating _dict_objects from a sequence of supplied keys and value.

类方法一个常见的用法是作为对象创建的_工厂_。假如`Account`类的数据格式有很多种，比如_元组、json字符串_等。由于Python类只能定义一个`__init__`方法，所以类方法在这些情形中就很方便。以上文`Account`类为例，我们想根据一个_json_字符串对象来初始化一个账户，我们定义一个类工厂方法`from_json`，它读取json字符串对象，解析参数，根据参数创建账户对象。另一个类实例的例子是[`dict.fromkeys`](https://docs.python.org/3/library/stdtypes.html#dict.fromkeys) 方法，它从一组键和值序列中创建_dict_对象。

## Python Special Methods
## Python特殊方法

Sometimes we may want to customize user-defined classes. This may be either to change the way class objects are created and initialized or to provide polymorphic behavior for certain operations. Polymorphic behavior enables user-defined classes to define their own implementation for certain python operation such as the `+` operation. Python provides _special_methods that enable this. These methods are normally of the form `__*__`where `*` refers to a method name. Examples of such methods are`__init__` and `__new__` for customizing object creation and initialization,`__getitem__`, `__get__`, `__add__` and `__sub__` for emulating in built python types, `__getattribute__`, `__getattr__` etc. for customizing attribute access etc. These are just a few of the special methods. We discuss a few important special methods below to provide an understanding but the [python documentation](https://docs.python.org/2/reference/datamodel.html#special-method-names) provides a comprehensive list of these methods.

有时我们希望自定义类。这需要改变类对象创建和初始化的方法，或者对某些操作提供多态行为。多态行为允许定制在类定义中某些如`+`等python操作的自身实现。Python的_特殊_方法可以做到这些。这些方法一般都是`__*__`形式，其中`*`表示方法名。如`__init__`和`__new__`来自定义对象创建和初始化，`__getitem__`、`__get__`、`__add__`、`__sub__`来模拟python内建类型，还有`__getattribute__`、`__getattr__`等来定制属性访问。只有为数不多的特殊方法，我们讨论一些重要的特殊方法来做个简单理解，[python文档](https://docs.python.org/2/reference/datamodel.html#special-method-names)有全部方法的列表。

# Special methods for Object Creation
# 进行对象创建的特殊方法

New class instances are created in a two step process using the `__new__`method to create a new instance and the `__init__` method to initialize the newly created object. Users are already familiar with defining the `__init__`method; the `__new__` method is rarely defined by the user for each class but this is possible if one wants to customize the creation of class instances.

新的类实例通过两阶段过程创建，`__new__`方法创建新实例，`__init__`初始化该实例。用户已经很熟悉`__init__`方法的定义；但用户很少定义`__new__`方法，但是如果想自定义类实例的创建，也是可以的。

# Special methods for Attribute access
# 属性访问的特殊方法

We can customize attribute access for class instances by implementing the following listed methods.

我们可以通过实现以下方法来定制类实例的属性访问。

    class Account(object):
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

    x = Account('obi', 0)

1.  `__getattr__(self, name)__`: This method is **_only_** called when an attribute, _name_, that is referenced is neither an instance attribute nor is it found in the class tree for the object. This method should return some value for the attribute or raise an `AttributeError` exception. For example, if _x_ is an instance of the _Account_ class defined above, trying to access an attribute that does not exist will result in a call to this method.
1.  `__getattr__(self, name)__`：这个方法**_只有_**当_name_既不是实例属性也不能在对象的类继承链中找到时才会被调用。这个方法应当返回属性值或者引发`AttributeError`异常。例如，如果_x_是_Account_类的实例，尝试访问不存在的属性将会调用这个方法。
    >>> acct = Account("obi", 10)
    >>> acct.number
    Hey I dont see any attribute called number
Note that If `__getattr__` code references instance attributes, and those attributes do not exist, an infinite loop may occur because the`__getattr__` method is called successively without end.
注意如果 `__getattr__`引用不存在的实例属性，可能会发生死循环，因为`__getattr__`方法不断被调用。
2.  `__setattr__(self, name, value)__`: This method is called whenever an attribute assignment is attempted. `__setattr__` should insert the value being assigned into the dictionary of the instance attributes rather than using `self.name=value` which results in a recursive call and hence to an infinite loop.
2. `__setattr__(self, name, value)__`：这个方法当属性赋值发生时调用。`__setattr__`将会把值插入到实例属性字典中，而不是使用`self.name=value`，因为它会导致递归调用的死循环。
3.  `__delattr__(self, name)__`: This is called whenever `del obj` is called.
3. `__delattr__(self, name)__`：`del obj`发生时调用。
4.  `__getattribute__(self, name)__`: This method is **always** called to implement attribute accesses for instances of the class.
4. `__getattribute__(self, name)__`：这个方法会被__一直__调用以实现类实例的属性访问。

# Special methods for Type Emulation
# 类型模拟的特殊方法

Python defines certain special syntax for use with certain types; for example, the elements in _lists_ and _tuples_ can be accessed using the index notation`[]`, numeric values can be added with the `+` operator and so on. We can create our own classes that make use of this special syntax by implementing certain special methods that the python interpreter calls whenever it encounters such syntax. We illustrate this with a very simple example below that emulates the basics of a python _list_.

对某些类型，Python定义了某些特定语法；比如，_列表_和_元组_的元素可以通过索引表示法来访问，数值可以通过`+`操作符来进行加法等等。我们可以创建自己的使用这些特殊语法的类，python解释器遇到这些特殊语法时就会调用我们实现的方法。我们在下面用一个简单的例子来演示这个特性，它模拟python_列表_的基本用法。

    class CustomList(object):

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
            return CustomList(self.container + otherList.container)

In the above, the `CustomList` is a thin wrapper around an actual list. We have implemented some custom methods for illustration purposes:

上面，`CustomList`是个真实列表的简单包装器。我们为了演示实现了一些自定义方法：

1.  `__len__(self)` : This is called when the `len()` function is called on an instance of the `CustomList` as shown below:
1. `__len__(self)`：对`CustomList`实例调用`len()`函数时被调用。
    >>> myList = CustomList()    
    >>> myList.append(1)    
    >>> myList.append(2)
    >>> myList.append(3)
    >>> myList.append(4)
    >>> len(myList)
    4
2.  `__getitem__(self, value)`: provides support for the use of square bracket indexing on an instance of the CustomList class as shown below:
2.  `__getitem__(self, value)`：提供CustomList类实例的方括号索引用法支持：
    >>> myList = CustomList()
    >>> myList.append(1)    
    >>> myList.append(2)
    >>> myList.append(3)
    >>> myList.append(4)
    >>> myList[3]
    4
3.  `__setitem__(self, key, value)`: Called to implement the assignment of value to to self[key] on an instance of the _CustomList_ class.
3.  `__setitem__(self, key, value)`：当对_CustomList_类实例上self[key]赋值时调用。
    >>> myList = CustomList()
    >>> myList.append(1)    
    >>> myList.append(2)
    >>> myList.append(3)
    >>> myList.append(4)
    >>> myList[3] = 100
    4
    >>> myList[3]
    100
4.  `__contains__(self, key)`: Called to implement membership test operators. Should return true if item is in self, false otherwise.
4.  `__contains__(self, key)`：成员检测时调用。如果包含该项就返回true，否则false。
    >>> myList = CustomList()
    >>> myList.append(1)    
    >>> myList.append(2)
    >>> myList.append(3)
    >>> myList.append(4)
    >>> 4 in myList
    True
5.  `__repr__(self)`: Called to compute the object representation for _self_when print is called with _self_ as argument.
5.  `__repr__(self)`：当用print打印_self_时调用，将会打印_self_的对象表示。
    >>> myList = CustomList()
    >>> myList.append(1)    
    >>> myList.append(2)
    >>> myList.append(3)
    >>> myList.append(4)
    >>> print myList
    [1, 2, 3, 4]
6.  `__add__(self, otherList)`: Called to compute the addition of two instances of CustomList when the `+` operator is used to add two instances together.
6.  `__add__(self, otherList)`：使用`+`操作符来计算两个CustomList实例相加时调用。
    >>> myList = CustomList()
    >>> otherList = CustomList()
    >>> otherList.append(100)
    >>> myList.append(1)    
    >>> myList.append(2)
    >>> myList.append(3)
    >>> myList.append(4)
    >>> myList + otherList + otherList
    [1, 2, 3, 4, 100, 100]

The above provide an example of how we can customize class behavior by defining certain special class methods. For a comprehensive listing of all such custom methods, see the [python documentation](https://docs.python.org/2/reference/datamodel.html#basic-customization). In a follow-up tutorial, we put all we have discussed about special methods together and explain**descriptors**, a very important functionality that has widespread usage in python object oriented programming.

上面的例子演示了如何通过定义某些特殊类方法来定制类行为。可以在[Python文档](https://docs.python.org/2/reference/datamodel.html#basic-customization)中查看这些自定义方法的完整列表。在接下来的教程中，我们会将特殊方法放到一起来讨论，并解释__描述符__这个在python面向对象编程中广泛使用的重要功能。

## Further Reading
## 进一步阅读

1.  Python Essential Reference
1. Python核心参考

2.  [Python Data Model](https://docs.python.org/2/reference/datamodel.html#)
2. [Python数据模型](https://docs.python.org/2/reference/datamodel.html#)
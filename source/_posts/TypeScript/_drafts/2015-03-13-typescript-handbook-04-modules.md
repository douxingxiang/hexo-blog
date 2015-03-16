title: TypeScript模块
date: 2015-03-13 15:57
tags: TypeScript
categories: TypeScript手册
---

# Modules
# 模块

This post outlines the various ways to organize your code using modules in TypeScript. We'll be covering internal and external modules and we'll discuss when each is appropriate and how to use them. We'll also go over some advanced topics of how to use external modules, and address some common pitfalls when using modules in TypeScript.

这篇文章会概述在TypeScript中使用模块来组织代码的多种方式。我们将会讲到内部和外部模块，并且会讨论何时使用会更合适以及如果使用。我们同时还会讲到如果使用外部模块的高级话题，并解释在TypeScript中使用模块常见的陷阱。

#### First steps
#### 第一步

Let's start with the program we'll be using as our example throughout this page. We've written a small set of simplistic string validators, like you might use when checking a user's input on a form in a webpage or checking the format of an externally-provided data file.

我们从一个程序开始，这个程序将在整个页面中作为例子使用。我们编写了一组简化的字符串验证器，你可能在网页上验证用户输入或者检查外部提供的数据文件格式时使用。

###### Validators in a single file
###### 验证器存在一个文件

    interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    var lettersRegexp = /^[A-Za-z]+$/;
    var numberRegexp = /^[0-9]+$/;

    class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }

    class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }

    // Some samples to try
    var strings = ['Hello', '98052', '101'];
    // Validators to use
    var validators: { [s: string]: StringValidator; } = {};
    validators['ZIP code'] = new ZipCodeValidator();
    validators['Letters only'] = new LettersOnlyValidator();
    // Show whether each string passed each validator
    strings.forEach(s => {
        for (var name in validators) {
            console.log('"' + s + '" ' + (validators[name].isAcceptable(s) ? ' matches ' : ' does not match ') + name);
        }
    });

#### Adding Modularity
#### 添加模块化

As we add more validators, we're going to want to have some kind of organization scheme so that we can keep track of our types and not worry about name collisions with other objects. Instead of putting lots of different names into the global namespace, let's wrap up our objects into a module.

当我们添加更多验证器时，我们想拥有多种组织模式来跟踪类型而不用担心与其他对象的命名冲突。我们将对象包装到模块中，而不是把很多不同的名字放到全局命名空间中去。

In this example, we've moved all the Validator-related types into a module called _Validation_. Because we want the interfaces and classes here to be visible outside the module, we preface them with _export_. Conversely, the variables _lettersRegexp_ and_numberRegexp_ are implementation details, so they are left unexported and will not be visible to code outside the module. In the test code at the bottom of the file, we now need to qualify the names of the types when used outside the module, e.g._Validation.LettersOnlyValidator_.

这个例子中，我们将全部与验证器有关的类型都移动到_Validation_模块中。由于我们想要这里的借口和类在模块外也可见，我们使用_export_来开始。相反，_lettersRegexp_和_numberRegexp_变量都是实现细节，所以它们将不会导出，在模块外的代码中不可见。这个文件底部的测试代码中，我们需要在模块外使用它们时验证类型的名字，比如_Validation.LettersOnlyValidator_。

###### Modularized Validators
###### 模块化的验证器

    module Validation {
        export interface StringValidator {
            isAcceptable(s: string): boolean;
        }

        var lettersRegexp = /^[A-Za-z]+$/;
        var numberRegexp = /^[0-9]+$/;

        export class LettersOnlyValidator implements StringValidator {
            isAcceptable(s: string) {
                return lettersRegexp.test(s);
            }
        }

        export class ZipCodeValidator implements StringValidator {
            isAcceptable(s: string) {
                return s.length === 5 && numberRegexp.test(s);
            }
        }
    }

    // Some samples to try
    var strings = ['Hello', '98052', '101'];
    // Validators to use
    var validators: { [s: string]: Validation.StringValidator; } = {};
    validators['ZIP code'] = new Validation.ZipCodeValidator();
    validators['Letters only'] = new Validation.LettersOnlyValidator();
    // Show whether each string passed each validator
    strings.forEach(s => {
        for (var name in validators) {
            console.log('"' + s + '" ' + (validators[name].isAcceptable(s) ? ' matches ' : ' does not match ') + name);
        }
    });

## Splitting Across Files
## 分离到多个文件

As our application grows, we'll want to split the code across multiple files to make it easier to maintain.

随着应用的增长，我们希望把代码分离到多个文件，这样易于维护。

Here, we've split our Validation module across many files. Even though the files are separate, they can each contribute to the same module and can be consumed as if they were all defined in one place. Because there are dependencies between files, we've added reference tags to tell the compiler about the relationships between the files. Our test code is otherwise unchanged.

这里，我们把Validation模块分为多个文件。尽管文件是分开的，但是它们属于同一个模块，可以像在一个地方定义那样使用。由于文件之间有依赖，我们添加一些引用标签来告诉编译器文件之间的关系。测试代码其他地方都不变。

#### Multi-file internal modules
#### 多文件内部模块

###### Validation.ts
    module Validation {
        export interface StringValidator {
            isAcceptable(s: string): boolean;
        }
    }

###### LettersOnlyValidator.ts
    /// <reference path="Validation.ts" />
    module Validation {
        var lettersRegexp = /^[A-Za-z]+$/;
        export class LettersOnlyValidator implements StringValidator {
            isAcceptable(s: string) {
                return lettersRegexp.test(s);
            }
        }
    }

###### ZipCodeValidator.ts
    /// <reference path="Validation.ts" />
    module Validation {
        var numberRegexp = /^[0-9]+$/;
        export class ZipCodeValidator implements StringValidator {
            isAcceptable(s: string) {
                return s.length === 5 && numberRegexp.test(s);
            }
        }
    }

###### Test.ts
    /// <reference path="Validation.ts" />
    /// <reference path="LettersOnlyValidator.ts" />
    /// <reference path="ZipCodeValidator.ts" />

    // Some samples to try
    var strings = ['Hello', '98052', '101'];
    // Validators to use
    var validators: { [s: string]: Validation.StringValidator; } = {};
    validators['ZIP code'] = new Validation.ZipCodeValidator();
    validators['Letters only'] = new Validation.LettersOnlyValidator();
    // Show whether each string passed each validator
    strings.forEach(s => {
        for (var name in validators) {
            console.log('"' + s + '" ' + (validators[name].isAcceptable(s) ? ' matches ' : ' does not match ') + name);
        }
    });

Once there are multiple files involved, we'll need to make sure all of the compiled code gets loaded. There are two ways of doing this.

一旦涉及到多个文件，我们需要确认所有的代码都被加载。有两种操作方式。

First, we can use concatenated output using the _--out_ flag to compile all of the input files into a single JavaScript output file:

第一种，使用_--out_标志连接编译所有输入文件到单个JavaScript输出文件：

    tsc --out sample.js Test.ts

The compiler will automatically order the output file based on the reference tags present in the files. You can also specify each file individually:

编译器会自动根据文件中的引用标签对输出文件进行排序。你也可以单独指定每个文件：

    tsc --out sample.js Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts

Alternatively, we can use per-file compilation (the default) to emit one JavaScript file for each input file. If multiple JS files get produced, we'll need to use _&lt;script&gt;_ tags on our webpage to load each emitted file in the appropriate order, for example:

另外，我们也可以使用逐文件编译（默认）方式来生成单个文件。如果生成了多个JS文件，需要在网页上按照合适顺序使用_&lt;script&gt;_标签来加载每个文件，比如：

###### MyTestPage.html (excerpt)
###### MyTestPage.html (摘要)

    <script src="Validation.js" type="text/javascript" />
    <script src="LettersOnlyValidator.js" type="text/javascript" />
    <script src="ZipCodeValidator.js" type="text/javascript" />
    <script src="Test.js" type="text/javascript" />

## Going External
## 外部模块

TypeScript also has the concept of an external module. External modules are used in two cases: node.js and require.js. Applications not using node.js or require.js do not need to use external modules and can best be organized using the internal module concept outlined above.

TypeScript还有外部模块的概念。外部模块用于两种情景：node.js和require.js。不使用node.js或require.js的应用不需要使用外部模块，可以根据上文内部模块的概念来更好地组织。

In external modules, relationships between files are specified in terms of imports and exports at the file level. In TypeScript, any file containing a top-level _import_ or _export_ is considered an external module.

外部模块中，文件间的关系通过文件级的导入和导出来指定。TypeScript中，任何顶部包含_import_或_export_的文件都会被认为是外部模块。

Below, we have converted the previous example to use external modules. Notice that we no longer use the module keyword – the files themselves constitute a module and are identified by their filenames.

下面，我们使用外部模块来改写上文的例子。注意我们不再使用module关键字 - 文件本身就构成一个模块，并根据文件名来区分。

The reference tags have been replaced with _import_ statements that specify the dependencies between modules. The _import_statement has two parts: the name that the module will be known by in this file, and the require keyword that specifies the path to the required module:

_import_语句将会替换引用标签来指定模块间的依赖关系。_import_语句包含两部分：模块在文件中的名字，指定模块路径的require关键字：

    import someMod = require('someModule');

We specify which objects are visible outside the module by using the _export_ keyword on a top-level declaration, similarly to how _export_ defined the public surface area of an internal module.

与定义内部模块公共接口的_export_类似，我们在顶部声明处使用_export_关键字来指定模块外可见的对象。

To compile, we must specify a module target on the command line. For node.js, use _--target commonjs_; for require.js, use _--target amd_. For example:

编译时我们必须在命令行指定模块目标。node.js中使用_--target comonjs_；require.js使用_--target amd_。比如：

    tsc --module commonjs Test.ts

When compiled, each external module will become a separate .js file. Similar to reference tags, the compiler will follow_import_ statements to compile dependent files.

编译后，每个外部模块都是单独的.js文件。与引用标签类似，编译器使用_import_语句编译依赖文件。

###### Validation.ts

    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

###### LettersOnlyValidator.ts

    import validation = require('./Validation');
    var lettersRegexp = /^[A-Za-z]+$/;
    export class LettersOnlyValidator implements validation.StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }

###### ZipCodeValidator.ts
    
    import validation = require('./Validation');
    var numberRegexp = /^[0-9]+$/;
    export class ZipCodeValidator implements validation.StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }

###### Test.ts
    
    import validation = require('./Validation');
    import zip = require('./ZipCodeValidator');
    import letters = require('./LettersOnlyValidator');

    // Some samples to try
    var strings = ['Hello', '98052', '101'];
    // Validators to use
    var validators: { [s: string]: validation.StringValidator; } = {};
    validators['ZIP code'] = new zip.ZipCodeValidator();
    validators['Letters only'] = new letters.LettersOnlyValidator();
    // Show whether each string passed each validator
    strings.forEach(s => {
        for (var name in validators) {
            console.log('"' + s + '" ' + (validators[name].isAcceptable(s) ? ' matches ' : ' does not match ') + name);
        }
    });

#### Code Generation for External Modules
#### 外部模块的代码生成

Depending on the module target specified during compilation, the compiler will generate appropriate code for either node.js (commonjs) or require.js (AMD) module-loading systems. For more information on what the _define_ and _require_ calls in the generated code do, consult the documentation for each module loader.

编译器会根据编译时指定的模块目标生成针对node.js（commonjs）或require.js（AMD）模块加载系统的合适代码。想了解更多_define_和_require_的作用，查看下每个模块加载器的文档。

This simple example shows how the names used during importing and exporting get translated into the module loading code.

这个简单例子说明导入和导出中使用的名字如何转换为模块加载代码的。

###### SimpleModule.ts

    import m = require('mod');
    export var t = m.something + 1;

###### AMD / RequireJS SimpleModule.js:

    define(["require", "exports", 'mod'], function(require, exports, m) {
        exports.t = m.something + 1;
    });

###### CommonJS / Node SimpleModule.js:

    var m = require('mod');
    exports.t = m.something + 1;

## Export =

In the previous example, when we consumed each validator, each module only exported one value. In cases like this, it's cumbersome to work with these symbols through their qualified name when a single identifier would do just as well.

上一个例子，每次我们使用验证器时，每个模块只导出一个值。这类例子中，单个标识符就可以，所以通过限定名来处理这些符号就比较麻烦。

The export = syntax specifies a single object that is exported from the module. This can be a class, interface, module, function, or enum. When imported, the exported symbol is consumed directly and is not qualified by any name.

export =语法指定模块导出的单个对象。可以是类、接口、函数或枚举。符号导入后可以直接使用，也不用通过任何名称来限定。

Below, we've simplified the Validator implementations to only export a single object from each module using the export = syntax. This simplifies the consumption code – instead of referring to 'zip.ZipCodeValidator', we can simply refer to 'zipValidator'.

下面，我们简化Validator的实现，使用`export =` 语法每个模块值导出单个对象。这样代码得到了简化，我们可以简单地引用`zipValidator`而不用引用`zip.ZipCodeValidator`。

###### Validation.ts

    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

###### LettersOnlyValidator.ts

    import validation = require('./Validation');
    var lettersRegexp = /^[A-Za-z]+$/;
    class LettersOnlyValidator implements validation.StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
    export = LettersOnlyValidator;

###### ZipCodeValidator.ts
    
    import validation = require('./Validation');
    var numberRegexp = /^[0-9]+$/;
    class ZipCodeValidator implements validation.StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
    export = ZipCodeValidator;

###### Test.ts
    
    import validation = require('./Validation');
    import zipValidator = require('./ZipCodeValidator');
    import lettersValidator = require('./LettersOnlyValidator');

    // Some samples to try
    var strings = ['Hello', '98052', '101'];
    // Validators to use
    var validators: { [s: string]: validation.StringValidator; } = {};
    validators['ZIP code'] = new zipValidator();
    validators['Letters only'] = new lettersValidator();
    // Show whether each string passed each validator
    strings.forEach(s => {
        for (var name in validators) {
            console.log('"' + s + '" ' + (validators[name].isAcceptable(s) ? ' matches ' : ' does not match ') + name);
        }
    });

## Alias
## 别名

Another way that you can simplify working with either kind of module is to use _import q = x.y.z_ to create shorter names for commonly-used objects. Not to be confused with the _import x = require('name')_ syntax used to load external modules, this syntax simply creates an alias for the specified symbol. You can use these sorts of imports (commonly referred to as aliases) for any kind of identifier, including objects created from external module imports.

简化处理模块的另一方式可以使用_import q = x.y.z_来为常用对象创建短名称。不要与_import x = require('name')_混淆，那个语法用于加载外部模块，这个可以为特定符号创建别名。你可以导入（通常称作别名）任何类型的标识符，包括外部模块导入中创建的对象。

###### Basic Aliasing
###### 基本别名
    
    module Shapes {
        export module Polygons {
            export class Triangle { }
            export class Square { }
        }
    }

    import polygons = Shapes.Polygons;
    var sq = new polygons.Square(); // Same as 'new Shapes.Polygons.Square()'

Notice that we don't use the _require_ keyword; instead we assign directly from the qualified name of the symbol we're importing. This is similar to using _var_, but also works on the type and namespace meanings of the imported symbol. Importantly, for values, _import_ is a distinct reference from the original symbol, so changes to an aliased _var_ will not be reflected in the original variable.

注意我们没有使用_require_关键字；相反我们直接使用所导入的符号限定名来直接赋值。这种方式与使用_var_类似，导入符号的类型和名称空间上也可用。对值来说重要的一点是，_import_是原始符号的特定引用，所以一个别名_var_的改变不会影响原始变量。

## Optional Module Loading and Other Advanced Loading Scenarios
## 可选的模块加载和其他高级加载场景

In some cases, you may want to only load a module under some conditions. In TypeScript, we can use the pattern shown below to implement this and other advanced loading scenarios to directly invoke the module loaders without losing type safety.

某些情形下，你可能希望根据条件只加载一个模块。TypeScript中，我们可以使用下面的模式通过直接调用模块加载器而又不失类型安全性的方式来实现这个目的以及其他高级加载场景。

The compiler detects whether each module is used in the emitted JavaScript. For modules that are only used as part of the type system, no require calls are emitted. This culling of unused references is a good performance optimization, and also allows for optional loading of those modules.

编译器会检测每个模块是否会被用到。对只作为部分类型系统的模块，不会进行require调用。剔除未用到的引用可以进行很好的性能优化，同时还允许可选地加载这些模块。

The core idea of the pattern is that the _import id = require('...')_ statement gives us access to the types exposed by the external module. The module loader is invoked (through require) dynamically, as shown in the if blocks below. This leverages the reference-culling optimization so that the module is only loaded when needed. For this pattern to work, it's important that the symbol defined via import is only used in type positions (i.e. never in a position that would be emitted into the JavaScript).

该模式的核心思想是_import id = require('...')_语句允许我们访问外部模块暴露给我们的类型。模块加载器会动态调用（通过require），如下面的if代码块。这会影响引用剔除优化，模块只会在需要的时候才加载。要让这个模式起作用，通过import定义的符号只能用于类型位置（即不能用在可以导出到JavaScript的位置）。

To maintain type safety, we can use the _typeof_ keyword. The _typeof_ keyword, when used in a type position, produces the type of a value, in this case the type of the external module.

我们可以使用_typeof_关键字来维护类型安全性。用在类型位置时，_typeof_关键字将会生成一个值的类型，本例中是外部模块的类型。

###### Dynamic Module Loading in node.js
###### node.js中的冬天模块加载
    
    declare var require;
    import Zip = require('./ZipCodeValidator');
    if (needZipValidation) {
        var x: typeof Zip = require('./ZipCodeValidator');
        if (x.isAcceptable('.....')) { /* ... */ }
    }

###### Sample: Dynamic Module Loading in require.js
###### 例子：require.js中的动态模块加载

    declare var require;
    import Zip = require('./ZipCodeValidator');
    if (needZipValidation) {
        require(['./ZipCodeValidator'], (x: typeof Zip) => {
            if (x.isAcceptable('...')) { /* ... */ }
        });
    }

## Working with Other JavaScript Libraries
## 使用其他JavaScript库

To describe the shape of libraries not written in TypeScript, we need to declare the API that the library exposes. Because most JavaScript libraries expose only a few top-level objects, modules are a good way to represent them. We call declarations that don't define an implementation "ambient". Typically these are defined in .d.ts files. If you're familiar with C/C++, you can think of these as .h files or 'extern'. Let's look at a few examples with both internal and external examples.

为了描述非TypeScript编写的库，我们需要声明该库暴露的API。由于大多数JavaScript库只暴露一些顶级对象，用模块来表示是个很好的方式。我们称没有定义实现的声明是“周边的”（ambient）。通常这些在.d.ts文件中定义。如果熟悉C/C++，你可以认为他们是.h文件或“extern”。我们看几个内部和外部模块的例子。

#### Ambient Internal Modules
#### 周边内部模块

The popular library D3 defines its functionality in a global object called 'D3'. Because this library is loaded through a _script_tag (instead of a module loader), its declaration uses internal modules to define its shape. For the TypeScript compiler to see this shape, we use an ambient internal module declaration. For example:

著名的D3库使用一个全局对象“D3”来定义其功能。由于库是通过_script_标签（而不是模块加载器）加载，所以它的声明使用内部模块来定义其类型。让TypeScript编译器检查类型，我们使用周边内部模块声明。例如：

###### D3.d.ts (simplified excerpt)
###### D3.d.ts (简化的摘录)
    
    declare module D3 {
        export interface Selectors {
            select: {
                (selector: string): Selection;
                (element: EventTarget): Selection;
            };
        }

        export interface Event {
            x: number;
            y: number;
        }

        export interface Base extends Selectors {
            event: Event;
        }
    }

    declare var d3: D3.Base;

#### Ambient External Modules
#### 周边外部模块

In node.js, most tasks are accomplished by loading one or more modules. We could define each module in its own .d.ts file with top-level export declarations, but it's more convenient to write them as one larger .d.ts file. To do so, we use the quoted name of the module, which will be available to a later import. For example:

node.js中，绝大多数任务都要加载一个或多个模块来完成任务。我们可以使用顶级导出声明在其.d.ts文件中定义每个模块，但是编写单个更大的.d.ts文件更方便。为了达到母的，我们引用模块的名称，用于延期导入。例如：

###### node.d.ts (simplified excerpt)
###### node.d.ts（简化摘录）
    
    declare module "url" {
        export interface Url {
            protocol?: string;
            hostname?: string;
            pathname?: string;
        }

        export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
    }

    declare module "path" {
        export function normalize(p: string): string;
        export function join(...paths: any[]): string;
        export var sep: string;
    }

Now we can _/// <reference>_ node.d.ts and then load the modules using e.g. _import url = require('url');_.

现在我们可以使用_/// <reference>_来引用node.d.ts，然后使用_import url = require('url');_来加载模块。

    ///<reference path="node.d.ts"/>
    import url = require("url");
    var myUrl = url.parse("http://www.typescriptlang.org");

## Pitfalls of Modules
## 模块的陷阱

In this section we'll describe various common pitfalls in using internal and external modules, and how to avoid them.

本节我们描述一些使用内部和外部模块的常见陷阱，以及如何避免。

#### /// <reference> to an external module
#### /// <reference>来引用外部模块

A common mistake is to try to use the /// <reference> syntax to refer to an external module file, rather than using import. To understand the distinction, we first need to understand the three ways that the compiler can locate the type information for an external module.

一个常见错误是使用/// <reference>语法而不是使用import来引用外部模块文件。为了理解其中的区别，我们首先需要理解编译器定位外部模块中类型信息的三种方式。

The first is by finding a .ts file named by an _import x = require(...);_ declaration. That file should be an implementation file with top-level import or export declarations.

第一种是查找_import x = require(...);_命名的.ts文件。那个文件必须是包含顶部导入和导出声明的实现文件。

The second is by finding a .d.ts file, similar to above, except that instead of being an implementation file, it's a declaration file (also with top-level import or export declarations).

第二种是寻找.d.ts文件，与上面类似，但是这个文件不是实现文件，而是声明文件（也包含顶级导入或导出声明）。

The final way is by seeing an "ambient external module declaration", where we 'declare' a module with a matching quoted name.

最后一种是查看“周边外部模块声明”，我们使用引号包裹的名称来`declare`一个模块。

###### myModules.d.ts
    
    // In a .d.ts file or .ts file that is not an external module:
    declare module "SomeModule" {
        export function fn(): string;
    }

###### myOtherModule.ts

    /// <reference path="myModules.d.ts" />
    import m = require("SomeModule");

The reference tag here allows us to locate the declaration file that contains the declaration for the ambient external module. This is how the node.d.ts file that several of the TypeScript samples use is consumed, for example.

这里的引用标签允许我们定位包含周边外部模块声明的声明文件。这就是一些TypeScript例子中用到的node.d.ts文件的方式。

#### Needless Namespacing
#### 不必要的命名空间

If you're converting a program from internal modules to external modules, it can be easy to end up with a file that looks like this:

如果想把内部模块中的程序转到外部模块，很容易就会变成这样：

###### shapes.ts
    
    export module Shapes {
        export class Triangle { /* ... */ }
        export class Square { /* ... */ }
    }

The top-level module here _Shapes_ wraps up _Triangle_ and _Square_ for no reason. This is confusing and annoying for consumers of your module:

这里的顶级模块_Shapes_毫无道理地包装了_Triangle_和_Square_。这会让使用你模块的用户感到困惑和烦恼。

###### shapeConsumer.ts

    import shapes = require('./shapes');
    var t = new shapes.Shapes.Triangle(); // shapes.Shapes?

A key feature of external modules in TypeScript is that two different external modules will never contribute names to the same scope. Because the consumer of an external module decides what name to assign it, there's no need to proactively wrap up the exported symbols in a namespace.

TypeScript中外部模块的一个关键特性是两个不同的外部模块不会共享同一块作用域。由于外部模块的使用者决定其名称，没有必要事先将导出符号包装到一个命名空间。

To reiterate why you shouldn't try to namespace your external module contents, the general idea of namespacing is to provide logical grouping of constructs and to prevent name collisions. Because the external module file itself is already a logical grouping, and its top-level name is defined by the code that imports it, it's unnecessary to use an additional module layer for exported objects.

解释下你为什么不应该用命名空间包装外部模块的内容：命名空间的一般思想是提供构建的逻辑分组，以及避免命名冲突。由于外部模块文件本身已经是个逻辑分组，顶级命名由导入它的代码定义，所以没有必要对导出对象使用附加模块层

Revised Example:
修改后的例子：

###### shapes.ts

    export class Triangle { /* ... */ }
    export class Square { /* ... */ }
 
###### shapeConsumer.ts

    import shapes = require('./shapes');
    var t = new shapes.Triangle(); 

#### Trade-offs for External Modules
#### 外部模块的取舍

Just as there is a one-to-one correspondence between JS files and modules, TypeScript has a one-to-one correspondence between external module source files and their emitted JS files. One effect of this is that it's not possible to use the _--out_compiler switch to concatenate multiple external module source files into a single JavaScript file.

就像JS文件和模块之间没有一对一对应关系一样，TypeScript的外部模块源文件和生成的JS文件之间也没有一一对应关系。其中一个影响是不能使用_--out_编译器开关来连接多个外部模块源文件生成单个JavaScript文件。
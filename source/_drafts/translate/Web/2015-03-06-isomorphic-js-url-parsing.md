Most web applications require URL parsing whether it’s to extract the domain name, implement a REST API or find an image path. A typical URL structure is described by the image below:
大部分web应用都需要解析URL，无论是提取域名、实现REST API，还是查找图片路径。一个典型的URL路径如下图所示：

![URL structure](http://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2015/02/1425127463991-js-url-parsing.png)

You can break a URL string into constituent parts using regular expressions but it’s complicated and unnecessary…

你可以使用正则表达式把URL字符串拆分为连续的部分，但是这有点复杂而且没必要...

## Server-side URL Parsing
## 服务端URL解析

Node.js (and forks such as io.js) provide a [URL API](http://nodejs.org/api/url.html):

Node.js（及其分支，比如io.js）提供了[URL API](http://nodejs.org/api/url.html)：

    // Server-side JavaScript
    var urlapi = require('url'),
        url = urlapi.parse('http://site.com:81/path/page?a=1&b=2#hash');
    console.log(
        url.href + '\n' +           // the full URL
        url.protocol + '\n' +       // http:
        url.hostname + '\n' +       // site.com
        url.port + '\n' +           // 81
        url.pathname + '\n' +       // /path/page
        url.search + '\n' +         // ?a=1&b=2
        url.hash                    // #hash
    );

As you can see in the snippet above, the `parse()` method returns an object containing the data you need such as the protocol, the hostname, the port, and so on.

你可以从上面的片段中看出，`parse()`方法返回一个包含所需数据（比如协议、主机名、端口等）的对象。

## Client-side URL Parsing
## 客户端URL解析

There’s no equivalent API in the browser. But if there’s one thing browsers do well, it’s URL parsing and all links in the DOM implement a similar [Location](https://developer.mozilla.org/en-US/docs/Web/API/Location) interface, e.g.:

浏览器端没有对应的API。但是如果浏览器有件事做得好的话，那就是URL解析和DOM中的链接实现了类似的[Location](https://developer.mozilla.org/en-US/docs/Web/API/Location)接口，例如：

    // Client-side JavaScript
    // find the first link in the DOM
    var url = document.getElementsByTagName('a')[0];
    console.log(
        url.href + '\n' +           // the full URL
        url.protocol + '\n' +       // http:
        url.hostname + '\n' +       // site.com
        url.port + '\n' +           // 81
        url.pathname + '\n' +       // /path/page
        url.search + '\n' +         // ?a=1&b=2
        url.hash                    // #hash
    );

If we have a URL string, we can use it on an in-memory anchor element (`a`) so it can be parsed without regular expressions, e.g.:

如果我们把URL字符串放到内存的锚点元素（`a`）中，就可以不依赖正则表达式来解析，例如：

    // Client-side JavaScript
    // create dummy link
    var url = document.createElement('a');
    url.href = 'http://site.com:81/path/page?a=1&b=2#hash';
    console.log(url.hostname); // site.com

## Isomorphic URL Parsing
## 同构URL解析

Aurelio recently discussed [isomorphic JavaScript applications](http://www.sitepoint.com/isomorphic-javascript-applications/). In essence, it’s progressive enhancement taken to an extreme level where an application will happily run on either the client or server. A user with a modern browser would use a single-page application. Older browsers and search engine bots would see a server-rendered alternative. In theory, an application could implement varying levels of client/server processing depending on the speed and bandwidth capabilities of the device.

Aurelio最近讨论了[同构JavaScript应用](http://www.sitepoint.com/isomorphic-javascript-applications/)。实质上，它是将渐进增强（progressive enhancement）推到了极致：应用可以在客户端或服务器上快乐地运行了。使用现代浏览器的用户可以使用单页应用。老式浏览器和搜索引擎爬虫将会看到服务端渲染的应用。理论上，应用可以根据设备的速度和带宽能力来实现不同等级的客户端/服务器处理。

Isomorphic JavaScript has been discussed for many years but it’s complex. Few projects go further than
 implementing sharable views and there aren’t many situations where standard progressive enhancement wouldn’t work just as well _(if not better given most “isomorphic” frameworks appear to fail without client-side JavaScript)_. That said, it’s possible to create environment-agnostic micro libraries which offer a tentative first step into isomorphic concepts.

同构JavaScript（Isomorphic JavaScript）已经被讨论过很多年，但是太复杂。很少项目能够在实现共享视图基础之上更进一步，而且标准渐进增强不起作用的情况也不多_（如果没有更好地考虑到，大部分没有客户端JavaScript的“同构”框架都会失效）_。意思是，可以实现环境无关的宏观库来试探性地迈出同构概念的第一步。

Let’s consider how we could write a URL parsing library in a `lib.js` file. First we’ll detect where the code is running:

我们考虑下怎样在`lib.js`文件中编写一个URL解析库。首先，我们检测代码运行的位置：

    // running on Node.js?
    var isNode = ( typeof module === 'object' && module.exports);

This isn’t particularly robust since you could have a `module.exports` function defined client-side but I don’t know of a better way _(suggestions welcome)_. A similar approach used by other developers is to test for the presence of the `window` object:

这个方法不是特别健壮，因为你可能在客户端定义了`module.exports`函数，但是我不知道其他更好的方式_（欢迎提供建议）_。其他开发者的类似方法是检测`window`对象是否存在：

    // running on Node.js?
    var isNode = typeof window === 'undefined';

Let’s now complete our lib.js code with a `URLparse` function:

现在我们使用`URLparse`函数完成lib.js代码：

    // lib.js library functions
    // running on Node.js?
    var isNode = ( typeof module === 'object' && module.exports);
    ( function (lib) {
        "use strict" ;
        // require Node URL API
        var url = (isNode ? require('url') : null);
        // parse URL
        lib.URLparse = function(str) {
            if (isNode) {
                return url.parse(str);
            }
            else {
                url = document.createElement('a');
                url.href = str;
                return url;
            }
        }
    })(isNode ? module.exports : this.lib = {});

In this code I’ve used an `isNode` variable for clarity. However, you can avoid it by placing the test directly inside the last parenthesis of the snippet.

我在代码中使用`isNode`变量作澄清。但是，你可以直接把检测代码放到代码片段的最后一个圆括号内。

Server-side, `URLparse` is exported as a Common.JS module. To use it:

服务器端，`URLparse`导出为Common.JS模块。这样使用：

    // include lib.js module
    var lib = require('./lib.js');
    var url = lib.URLparse('http://site.com:81/path/page?a=1&b=2#hash');
    console.log(
        url.href + '\n' +           // the full URL
        url.protocol + '\n' +       // http:
        url.hostname + '\n' +       // site.com
        url.port + '\n' +           // 81
        url.pathname + '\n' +       // /path/page
        url.search + '\n' +         // ?a=1&b=2
        url.hash                    // #hash
    );

Client-side, `URLparse` is added as a method to the global `lib` object:

客户端，`URLparse`作为全局`lib`对象的一个方法：


    <script src="./lib.js"></script>
    <script>
    var url = lib.URLparse('http://site.com:81/path/page?a=1&b=2#hash');
        console.log(
        url.href + '\n' +           // the full URL
        url.protocol + '\n' +       // http:
        url.hostname + '\n' +       // site.com
        url.port + '\n' +           // 81
        url.pathname + '\n' +       // /path/page
        url.search + '\n' +         // ?a=1&b=2
        url.hash                    // #hash
    );

Other than the library inclusion method, the client and server API is identical.

除了库中包含的方法，客户端和服务端API都是相同的。

Admittedly, this is a simple example and `URLparse` runs (mostly) separate code on the client and server. But we have implemented a consistent API and it illustrates how JavaScript code can be written to run anywhere. We could extend the library to offer further client/server utility functions such as field validation, cookie parsing, date handling, currency formatting etc.

要承认的是，这是一个简单例子，`URLparse`在不同客户端和服务端上运行（大部分）不同代码。但是我们实现了一致性的API，可以说明JavaScript代码可以运行在任意位置。我们可以扩展这个库来提供更多客户端/服务器实用函数，比如字段验证、cookie解析、日期处理、货币格式等。

I’m not convinced full isomorphic applications are practical or possible given the differing types of logic required on the client and server. However, environment-agnostic libraries could ease the pain of having to write two sets of code to do the same thing.

考虑到客户端和服务器上不同类型的逻辑，我不确定完全的同构应用是否具有实用性或者可行。但是，环境无关的库可以消除对相同功能编写两份代码的痛苦。
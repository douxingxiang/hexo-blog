### 关键词：事件驱动，event-driven programming, event-driven architecture

[事件驱动编程](http://en.wikipedia.org/wiki/Event-driven_programming)（event-driven programming）是种编程范型，程序执行流由事件决定，比如用户交互，其他程序的消息等。常用于响应用户输入的系统，比如图形用户界面，web应用。

### 关键词：主循环

事件驱动的应用，通常都有一个主循环（main loop）来监听事件，检测到事件触发回调。嵌入系统中，也已通过硬件中断来实现主循环的功能。
主循环/主事件循环/主消息循环是中等待并派发事件/消息的编程结构。它会请求内部或外部__事件提供者（event provider）__，然后调用相关__事件处理器（event handler）__。

[程序设置两个线程](http://www.ruanyifeng.com/blog/2013/10/event_loop.html)：一个负责程序本身运行，成为“主线程”，另一个负责主线程与其他线程的通信，称作“Event Loop”线程，或者“消息线程”。

[libev/xnix, iocp/win]()
理解Nodejs事件循环：[英文](http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/)[中文](https://cnodejs.org/topic/50462f51329c5139760bff98)
[阮一峰：Event Loop](http://www.ruanyifeng.com/blog/2013/10/event_loop.html)
[Nodejs事件循环](https://strongloop.com/strongblog/node-js-event-loop/)
[JS并发模型和事件循环](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

### 关键词：消息传递/message passing，进程间通信/inter-process communication，消息队列/message queue，消息处理/message process

消息会从程序的__消息队列（message queue）__中传递到正在处理的程序中。主循环是实现了进程间通信（inter-process communication）的方法。

与事件循环相对的设计：
1. 传统程序，只简单地运行一次，比如常见的命令行程序。
2. 菜单驱动程序，虽然可能包含主循环，但是交互性有限。
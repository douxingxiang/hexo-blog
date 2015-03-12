title: ActionScript事件机制
date: 2015-03-09 13:36:00
tags: ActionScript
---
状态：草稿

## 在AS中自定义事件
继承Event类

## 如何发送事件
1. 继承EventDispatcher类
2. 实现EventDispatcher接口
3. 复合EventDispatcher对象

## 事件监听管理
注册addEventListener
移除removeEventListener
检测hasEventListener

## 事件处理函数
匿名函数
具名函数

## 事件流
显示列表
捕获
目标：默认行为，如何阻止默认行为
冒泡

## 事件循环
事件源生成事件，事件在显示列表中形成事件流，从舞台到响应者是捕获阶段，到达响应者进行目标阶段，有响应器就调用，没有就进行默认行为，然后从目标到舞台是冒泡

## DOM3事件机制

注册事件侦听器、发送事件、侦听事件、移除事件侦听器

[游戏框架设计Ⅰ—— 游戏中的事件机制](http://dev.gameres.com/Program/Abstract/Design/GameTruss.htm)
[Flex事件机制详细讲解](http://joe-feng.iteye.com/blog/1401933)
#! /usr/bin/env python
# coding: utf-8

def speak(): 
	print "first-class function"

#1 函数可以被赋值
parle = speak
parle()

def people(action):
	action()

#2 函数可以作为参数传递给函数
people(speak)

def parent_do():
	def child_do():
		print "child function"
	return child_do

#3 函数可以作为返回值从函数返回
#4 函数可以在运行时动态创建
do_func = parent_do()
do_func()

f1 = lambda x: x + 1
f2 = lambda x: x + 1

#5 函数有固有身份
print (f1 == f2)

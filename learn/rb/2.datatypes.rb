#! /usr/bin/ruby
# coding: utf-8

# 演示Ruby数据类型
# 1.不同进制的整数
# 2.整数除法
# 3.浮点除法
# 4.取模运算
# 5.指数上限
# 6.浮点表示

def integer
	bin = 0b1101
	oct = 07654
	hex = 0xFED
	dec = 9876
	puts "bin #{bin}"
	puts "oct #{oct}"
	puts "jex #{hex}"
	puts "dec #{dec}"
end

def divide
	pos_divide = 7 / 2
	neg_divide = -7 / 2
	puts "7 / 2 = #{pos_divide}"
	puts "-7 / 2 = #{neg_divide}"

	fpos_dv = 3.5 / 1.2
	fneg_dv = -3.5 / 1.2
	fneg_s_dv = 3.5 / -1.2
	puts "3.5 / 1.2 = #{fpos_dv}"
	puts "-3.5 / 1.2 = #{fneg_dv}"
	puts "3.5 / -1.2 = #{fneg_s_dv}"

	f_dv_z = 1.0 / 0
	puts "1 / 0 将会报错"
	puts "1.0 / 0 = #{f_dv_z}"
end

def exponent
	int_exp = 3 ** 2 ** 2
	int_big_exp = 40 ** 20
	float_big_exp = 40.5 ** 200
	puts "3 ** 2 ** 2 = #{int_exp}"
	puts " 40 ** 20 = #{int_big_exp}"
	puts "40.5 ** 200 = #{float_big_exp}"
end

def mod
	int_m = 7 % 2
	int_n_m = 7 % -2
	int_n_m2 = -7 % 2
	f_m = 3.5 % 1.4
	f_n_m = 3.5 % -1.4
	f_n_m2 = -3.5 % 1.4
	puts "7 % 2 = #{int_m}"
	puts "7 % -2 = #{int_n_m}"
	puts "-7 % 2 = #{int_n_m2}"
	puts "3.5 % 1.4 = #{f_m}"
	puts "3.5 % -1.4 = #{f_n_m}"
	puts "-3.5 % 1.4 = #{f_n_m2}"
end

def float_notate
	fl = 0.4 - 0.1
	puts "0.4 - 0.1 = #{fl}"
end

def single_quote
	one_line  = '单行文本可以包含\'也可以包含\单个反斜杠不能包含\t制表符'
	many_line = '第一行
	第二行'
	many_line2 = '第一行' \
		'也是第一行'
	puts one_line
	puts many_line
	puts many_line2
end

def double_quote
	more_esc = "支持\t制表符"
	uni_esc = "支持Uniocde转义\u03C0"
	str_ins = "支持字符串内插#{__FILE__}"
	print_ins = "支持prinf样式的内插%d,%s" %[1, "%"]
	many_line = "第一行
	第二行带续行 \
	第二行剩余部分"
	puts more_esc
	puts uni_esc
	puts str_ins
	puts print_ins
	puts many_line
end

integer
divide
exponent
mod
float_notate
single_quote
double_quote

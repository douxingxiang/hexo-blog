# /usr/bin/ruby
# coding: utf-8

=begin

目的
= 注释
= 编码
= 结束
= 关键字
=end

def comment
	puts "行注释：#"
	puts "文档注释: =begin, =end"
end

def encoding
	puts "外部编码:#{Encoding.default_external}"
	puts "区域设置:#{Encoding.locale_charmap}"
	puts "内部编码:#{Encoding.default_internal}"
	puts "支持列表:#{Encoding.name_list}"
end

def keywords
	puts "文件名:#{__FILE__}"
	puts "行号:#{__LINE__}"
	puts "编码:#{__ENCODING__}"
end

comment
keywords
encoding

END {
	puts "program will always enter here"
}

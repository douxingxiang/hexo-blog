title: Mac下编译AVM
date: 2015-03-14 20:04
tags: ActionScript
categories: AVM
---

## 检出源码

```
git clone git@github.com:adobe-flash/avmplus.git
```

Adobe把AVM源代码捐给了Mozilla，Mozilla成立了Tamarin项目，也可以从Mozilla下载源码。[项目主页](http://www-archive.mozilla.org/projects/tamarin/)，[下载地址](http://hg.mozilla.org/)，下载tamarin-redux压缩包。_下面使用的是github上检出的代码。_
<!--more-->
## 生成Makefile

进入`avmplus`目录，执行`configure.py`

``` bash
$ ./configure.py
...
Exception: It appears you're trying to build in the source directory.  (Source file /Users/dou/ws/repos/avmplus/core/avmplus.h exists here.)  You must use an object directory to build Tamarin.  Create an empty directory, cd into it, and run this configure.py script from there.
```
不让在源目录执行。_新建个`release`文件夹，重新执行_

``` bash
$ md release
$ cd release
$ ../configure.py
Configured with: --prefix=/Applications/Xcode.app/Contents/Developer/usr --with-gxx-include-dir=/usr/include/c++/4.2.1
Traceback (most recent call last):
  File "../configure.py", line 238, in <module>
    ver = vre.match(rawver).group(1)
AttributeError: 'NoneType' object has no attribute 'group'
```

正则匹配返回`None`，查看`configure.py`238行

``` python
233     if 'CXX' in os.environ:
234         rawver = build.process.run_for_output(['$CXX', '--version'])
235     else:
236         rawver = build.process.run_for_output(['gcc', '--version'])
237     vre = re.compile(".* ([3-9]\.[0-9]+\.[0-9]+)[ \n]")
238     ver = vre.match(rawver).group(1)
239     ver_arr = ver.split('.')
240     GCC_MAJOR_VERSION = int(ver_arr[0])
241     GCC_MINOR_VERSION = int(ver_arr[1])
```

检查下`CXX`环境变量是否存在，

``` bash
$ echo $CXX
```

没有定义，说明走到了`else`分支，看下输出，

``` bash
$ gcc --version
Configured with: --prefix=/Applications/Xcode.app/Contents/Developer/usr --with-gxx-include-dir=/usr/include/c++/4.2.1
Apple LLVM version 6.0 (clang-600.0.51) (based on LLVM 3.5svn)
Target: x86_64-apple-darwin14.0.0
Thread model: posix
```

这段代码是匹配`gcc`版本号，但是正则表达式要求版本号前后都要有空白，所以返回`None`，匹配不成功。_硬编码下版本号：_

``` python
233     '''
234     if 'CXX' in os.environ:
235         rawver = build.process.run_for_output(['$CXX', '--version'])
236     else:
237         rawver = build.process.run_for_output(['gcc', '--version'])
238     vre = re.compile(".* ([3-9]\.[0-9]+\.[0-9]+)[ \n]")
239     ver = vre.match(rawver).group(1)
240     ver_arr = ver.split('.')
241     '''
242     GCC_MAJOR_VERSION = 600 #int(ver_arr[0])
243     GCC_MINOR_VERSION = 0 #int(ver_arr[1])
```

继续执行脚本，

``` bash
$ ../configure.py
Unknown SDK version -> 1010
. Expected values are 104u, 105, 106 or 107.
```

vim grep一下，定位错误信息在，

``` python
45 def _setSDKParams(sdk_version, os_ver, xcode_version):
...
89         return os_ver,sdk_path
```

这个函数根据操作系统版本猜测SDK位置，但是只列出10.7及以下的系统版本，Yosemite版本号10.10，我本机只有10.9的SDK，位置`/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.9.sdk`。

``` python
 46     '''
        ...
 76     '''
 77     sdk_number = '10.9'
 78     xcode_version = '4'
```

最后终于生成了Makefile

``` bash
$ ../configure.py                                                         ✘
Generating /Users/dou/ws/repos/avmplus/release/Makefile...
```

## 编译

``` bash
$ make
Makefile:7: *** missing separator.  Stop.
```

查看下Makefile文件的空白

``` bash
$ cat -e -t -v Makefile
...
-mmacosx-version-min=10.10$
 -isysroot /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.9.sdk -arch x86_64 $
...
```

发现`-isysroot`前面被换行了，去掉换行标记，

``` bash
$ make
...
true "Preprocessing VMPI/MacDebugUtils"
clang: error: unknown argument: '-fno-check-new'
clang: error: unknown argument: '-fno-check-new'
clang: error: invalid argument '-faltivec' only allowed with 'ppc/ppc64/ppc64le'
make: *** [VMPI/MacDebugUtils.ii] Error 1
make: *** Deleting file `VMPI/MacDebugUtils.ii'
```

发现Makefile中参数`-fno-exceptions -fno-rtti -fno-check-new`重复了，所以上面会报错两次，同时去掉`-faltivec`，`-fno-check-new`

``` bash
$ make
...
true "Preprocessing VMPI/MacDebugUtils"
error: unknown warning option '-Wstrict-null-sentinel' [-Werror,-Wunknown-warning-option]
error: unknown warning option '-Wno-logical-op'; did you mean '-Wno-long-long'? [-Werror,-Wunknown-warning-option]
error: unknown warning option '-Wstrict-aliasing=3'; did you mean '-Wstring-plus-int'? [-Werror,-Wunknown-warning-option]
error: unknown warning option '-Wno-clobbered'; did you mean '-Wno-consumed'? [-Werror,-Wunknown-warning-option]
make: *** [VMPI/MacDebugUtils.ii] Error 1
make: *** Deleting file `VMPI/MacDebugUtils.ii'
```

删掉不识别的参数，

``` bash
$ make
...
clang: error: treating 'c-header' input as 'c++-header' when in C++ mode, this behavior is deprecated
make: *** [vmbase/vmbase-precompiled.ii] Error 1
make: *** Deleting file `vmbase/vmbase-precompiled.ii'
```
注释掉`vmbase/manifest.mk`中

``` bash
  9 #ifdef USE_GCC_PRECOMPILED_HEADERS
 10 #vmbase_PCH_SRC := $(srcdir)/vmbase.h
 11 #vmbase_PCH := $(curdir)/vmbase-precompiled.h
 12 #endif
```

```
$ make
../vmbase/VMThread.cpp:213:63: error: cast to 'void *' from smaller integer type 'int32_t' (aka 'int') [-Werror,-Wint-to-void-pointer-cast]
            VMPI_callWithRegistersSaved(sleepInSafepointGate, (void*)timeout);
                                                              ^
1 error generated.
make: *** [vmbase/VMThread.o] Error 1
```

修改文件`VMThread.cpp`213行，
``` cpp
213             VMPI_callWithRegistersSaved(sleepInSafepointGate, (void*)（intptr_32) timeout    );
```

``` bash
$ make
...
true "Preprocessing ../MMgc/MMgc.h to MMgc/MMgc-precompiled.ii"
clang: error: treating 'c-header' input as 'c++-header' when in C++ mode, this behavior is deprecated
make: *** [MMgc/MMgc-precompiled.ii] Error 1
make: *** Deleting file `MMgc/MMgc-precompiled.ii'
```


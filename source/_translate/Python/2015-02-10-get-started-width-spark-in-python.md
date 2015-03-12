[Hadoop](http://hadoop.apache.org/) is the standard tool for distributed computing across really large data sets and is the reason why you see "Big Data" on advertisements as you walk through the airport. It has become an operating system for Big Data, providing a rich ecosystem of tools and techniques that allow you to use a large cluster of relatively cheap commodity hardware to do computing at supercomputer scale. Two ideas from Google in 2003 and 2004 made Hadoop possible: a framework for distributed storage ([The Google File System](http://static.googleusercontent.com/media/research.google.com/en/us/archive/gfs-sosp2003.pdf)), which is implemented as HDFS in Hadoop, and a framework for distributed computing ([MapReduce](http://research.google.com/archive/mapreduce.html)).
[Hadoop](http://hadoop.apache.org/)是对大量的数据集进行分布式计算的标准工具，这也是为什么当你穿过机场时能看到"大数据(Big Data)"广告的原因。它已经成为大数据的操作系统，提供了包括工具和技巧在内的丰富生态，允许使用相对便宜的商业硬件集群进行超级计算机级别的计算。2003和2004年，两个来自Google的观点使Hadoop成为可能：一个分布式存储框架([Google文件系统](http://static.googleusercontent.com/media/research.google.com/en/us/archive/gfs-sosp2003.pdf))，在Hadoop中被实现为HDFS；一个分布式计算框架([MapReduce](http://research.google.com/archive/mapreduce.html))。

These two ideas have been the prime drivers for the advent of scaling analytics, large scale machine learning, and other big data appliances for the last ten years! However, in technology terms, ten years is an incredibly long time, and there are some well-known limitations that exist, with MapReduce in particular. Notably, programming MapReduce is difficult. You have to chain Map and Reduce tasks together in multiple steps for most analytics. This has resulted in _specialized_ systems for performing SQL-like computations or machine learning. Worse, MapReduce requires data to be serialized to disk between each step, which means that the I/O cost of a MapReduce job is high, making interactive analysis and iterative algorithms very expensive; and the thing is, almost all optimization and machine learning is iterative.
这两个观点成为过去十年规模分析（scaling analytics）、大规模机器学习（machine learning），以及其他大数据应用出现的主要推动力！但是，从技术角度上讲，十年是一段非常长的时间，而且Hadoop还存在很多已知限制，尤其是MapReduce。对MapReduce编程明显是困难的。对大多数分析，你都必须用很多步骤将Map和Reduce任务串接起来。这造成类SQL的计算或机器学习需要_专门_的系统来进行。更糟的是，MapReduce要求每个步骤间的数据要串行到磁盘，这意味着MapReduce作业的I/O成本很高，导致交互分析和迭代算法（iterative algorithms）开销很大；而事实是，几乎所有的最优化和机器学习都是迭代的。

To address these problems, Hadoop has been moving to a more general resource management framework for computation, [YARN](http://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/YARN.html) (Yet Another Resource Negotiator). YARN implements the next generation of MapReduce, but also allows applications to leverage distributed resources without having to compute with MapReduce. By generalizing the management of the cluster, research has moved toward generalizations of distributed computation, expanding the ideas first imagined in MapReduce.
为了解决这些问题，Hadoop转向进行计算的更通用资源管理框架，[YARN](http://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/YARN.html)(Yet Another Resource Negotiator, 又一个资源协调者)。YARN实现了下一代的MapReduce，但同时也允许应用利用分布式资源而不必采用MapReduce进行计算。通过将集群管理一般化，研究转到分布式计算的一般化上，来扩展了MapReduce的初衷。

[Spark](https://spark.apache.org/) is the first fast, general purpose distributed computing paradigm resulting from this shift and is gaining popularity rapidly. Spark extends the MapReduce model to support more types of computations using a functional programming paradigm, and it can cover a wide range of workflows that previously were implemented as specialized systems built on top of Hadoop. Spark uses in-memory caching to improve performance and, therefore, is fast enough to allow for interactive analysis (as though you were sitting on the Python interpreter, interacting with the cluster). Caching also improves the performance of iterative algorithms, which makes it great for data theoretic tasks, especially machine learning.
[Spark](https://spark.apache.org/)是第一个脱胎于该转变的快速、通用分布式计算范式，并且很快流行起来。Spark使用函数式编程范式扩展了MapReduce模型以支持更多计算类型，可以涵盖广泛的工作流，这些工作流之前被实现为Hadoop之上的特殊系统。Spark使用内存缓存来提升性能，因此进行交互式分析也足够快速(就如同使用Python解释器，与集群进行交互一样)。缓存同时提升了迭代算法的性能，这使得Spark非常适合数据理论任务，特别是机器学习。

In this post we will first discuss how to set up Spark to start easily performing analytics, either simply on your local machine or in a cluster on EC2. We then will explore Spark at an introductory level, moving towards an understanding of what Spark is and how it works (hopefully motivating further exploration). In the last two sections we will start to interact with Spark on the command line and then demo how to write a Spark application in Python and submit it to the cluster as a Spark job.
本文中，我们将首先讨论如何在本地机器上或者EC2的集群上设置Spark进行简单分析。然后，我们在入门级水平探索Spark，了解Spark是什么以及它如何工作(希望可以激发更多探索)。最后两节我们开始通过命令行与Spark进行交互，然后演示如何用Python写Spark应用，并作为Spark作业提交到集群上。

## Setting up Spark
## 设置Spark

Spark is pretty simple to set up and get running on your machine. All you really need to do is download one of the pre-built packages and so long as you have Java 6+ and Python 2.6+ you can simply run the Spark binary on Windows, Mac OS X, and Linux. Ensure that the `java` program is on your `PATH` or that the `JAVA_HOME` environment variable is set. Similarly, `python` must also be in your `PATH`.
在本机设置和运行Spark非常简单。你只需要下载一个预构建的包，只要你安装了Java 6+和Python 2.6+，就可以在Windows、Mac OS X和Linux上运行Spark。确保`java`程序在`PATH`环境变量中，或者设置了`JAVA_HOME`环境变量。类似的，`python`也要在`PATH`中。

Assuming you already have Java and Python:
假设你已经安装了Java和Python：

1.  Visit the [Spark downloads](http://spark.apache.org/downloads.html) page
2.  Select the latest Spark release (1.2.0 at the time of this writing), a prebuilt package for Hadoop 2.4, and download directly.

1. 访问[Spark下载页](http://spark.apache.org/downloads.html)
2. 选择Spark最新发布版(本文写作时是1.2.0)，一个预构建的Hadoop 2.4包，直接下载。

At this point, you'll have to figure out how to go about things depending on your operating system. Windows users, please feel free to comment about tips to set up in the comments section.
现在，如何继续依赖于你的操作系统，靠你自己去探索了。Windows用户可以在评论区对如何设置的提示进行评论。

Generally, my suggestion is to do as follows (on a POSIX OS):
一般，我的建议是按照下面的步骤(在POSIX操作系统上)：

1.  Unzip Spark
1. 解压Spark
        ~$ tar -xzf spark-1.2.0-bin-hadoop2.4.tgz

2.  Move the unzipped directory to a working application directory (`C:\Program Files`for example on Windows, or `/opt/` on Linux). Where you move it to doesn't really matter, so long as you have permissions and can run the binaries there. I typically install Hadoop and related tools in `/srv/` on my Ubuntu boxes, and will use that directory here for illustration.
2. 将解压目录移动到有效应用程序目录中(如Windows上的`C:\Program Files`，Linux上的`/opt/`)。移动到哪里都没关系，只要你有权限在那里运行二进制包。我一般将Hadoop和相关工具安装到我Ubuntu虚拟机上的`/srv/`中，并使用这个目录进行演示。
        ~$ mv spark-1.2.0-bin-hadoop2.4 /srv/spark-1.2.0

3.  Symlink the version of Spark to a `spark` directory. This will allow you to simply download new/older versions of Spark and modify the link to manage Spark versions without having to change your path or environment variables.
3. 创建指向该Spark版本的符号链接到`spark`目录。这样你可以简单地下载新/旧版本的Spark，然后修改链接来管理Spark版本，而不用更改路径或环境变量。
        ~$ ln -s /srv/spark-1.2.0 /srv/spark

4.  Edit your BASH profile to add Spark to your `PATH` and to set the `SPARK_HOME`environment variable. These helpers will assist you on the command line. On Ubuntu, simply edit the `~/.bash_profile` or `~/.profile` files and add the following:
4. 修改BASH配置，将Spark添加到`PATH`中，设置`SPARK_HOME`环境变量。这些小技巧在命令行上会帮到你。在Ubuntu上，只要编辑`~/.bash_profile`或`~/.profile`文件，将以下语句添加到文件中：
        export SPARK_HOME=/srv/spark
        export PATH=$SPARK_HOME/bin:$PATH

5.  After you source your profile (or simply restart your terminal), you should now be able to run a `pyspark` interpreter locally. Execute the `pyspark` command, and you should see a result as follows:
5. source这些配置（或者重启终端）之后，你就可以在本地运行一个`pyspark`解释器。执行`pyspark`命令，你会看到以下结果：
        ~$ pyspark
        Python 2.7.8 (default, Dec  2 2014, 12:45:58)
        [GCC 4.2.1 Compatible Apple LLVM 6.0 (clang-600.0.54)] on darwin
        Type "help", "copyright", "credits" or "license" for more information.
        Spark assembly has been built with Hive, including Datanucleus jars on classpath
        Using Sparks default log4j profile: org/apache/spark/log4j-defaults.properties
        [… snip …]
        Welcome to
              ____              __
             / __/__  ___ _____/ /__
            _\ \/ _ \/ _ `/ __/  `_/
           /__ / .__/\_,_/_/ /_/\_\   version 1.2.0
              /_/

            Using Python version 2.7.8 (default, Dec  2 2014 12:45:58)
        SparkContext available as sc.
        >>>

At this point Spark is installed and ready to use on your local machine in "standalone mode." You can develop applications here and submit Spark jobs that will run in a multi-process/multi-threaded mode, or you can configure this machine as a client to a cluster (though this is not recommended as the driver plays an important role in Spark jobs and should be in the same network as the rest of the cluster). Probably the most you will do with Spark on your local machine beyond development is to use the `spark-ec2` scripts to configure an EC2 Spark cluster on Amazon's cloud.
现在Spark已经安装完毕，可以在本机以”单机模式“（standalone mode）使用。你可以在本机开发应用并提交Spark作业，这些作业将以多进程/多线程模式运行的，或者，配置该机器作为一个集群的客户端（不推荐这样做，因为在Spark作业中，驱动程序(driver)是个很重要的角色，并且应该与集群的其他部分处于相同网络）。可能除了开发，你在本机使用Spark做得最多的就是利用`spark-ec2`脚本来配置Amazon云上的一个EC2 Spark集群了。

### Minimizing the Verbosity of Spark
### 简略Spark输出

The execution of Spark (and PySpark) can be extremely verbose, with many INFO log messages printed out to the screen. This is particularly annoying during development, as Python stack traces or the output of `print` statements can be lost. In order to reduce the verbosity of Spark - you can configure the log4j settings in `$SPARK_HOME/conf`. First, create a copy of the `$SPARK_HOME/conf/log4j.properties.template` file, removing the ".template" extension.
Spark（和PySpark）的执行可以特别详细，很多INFO日志消息都会打印到屏幕。开发过程中，这些非常恼人，因为可能丢失Python栈跟踪或者`print`的输出。为了减少Spark输出 - 你可以设置`$SPARK_HOME/conf`下的log4j。首先，拷贝一份`$SPARK_HOME/conf/log4j.properties.template`文件，去掉“.template”扩展名。

    ~$ cp $SPARK_HOME/conf/log4j.properties.template $SPARK_HOME/conf/log4j.properties

Edit the newly copied file and replace `INFO` with `WARN` at every line in the code. You log4j.properties file should look similar to:
编辑新文件，用`WARN`替换代码中出现的`INFO`。你的log4j.properties文件类似：

    # Set everything to be logged to the console
     log4j.rootCategory=WARN, console
     log4j.appender.console=org.apache.log4j.ConsoleAppender
     log4j.appender.console.target=System.err
     log4j.appender.console.layout=org.apache.log4j.PatternLayout
     log4j.appender.console.layout.ConversionPattern=%d{yy/MM/dd HH:mm:ss} %p %c{1}: %m%n
    # Settings to quiet third party logs that are too verbose
     log4j.logger.org.eclipse.jetty=WARN
     log4j.logger.org.eclipse.jetty.util.component.AbstractLifeCycle=ERROR
     log4j.logger.org.apache.spark.repl.SparkIMain$exprTyper=WARN
     log4j.logger.org.apache.spark.repl.SparkILoop$SparkILoopInterpreter=WARN

Now when you run PySpark you should get much simpler output messages! Special thanks to [@genomegeek](https://twitter.com/genomegeek) who pointed this out at a District Data Labs workshop!
现在运行PySpark，输出消息将会更简略！感谢[@genomegeek](https://twitter.com/genomegeek)在一次District Data Labs的研讨会中指出这一点。

### Using IPython Notebook with Spark
### 在Spark中使用IPython Notebook

When Googling around for helpful Spark tips, I discovered a couple posts that mentioned how to configure PySpark with IPython notebook. [IPython notebook](http://ipython.org/notebook.html) is an essential tool for data scientists to present their scientific and theoretical work in an interactive fashion, integrating both text and Python code. For many data scientists, IPython notebook is their first introduction to Python and is used widely so I thought it would be worth including it in this post.
当搜索有用的Spark小技巧时，我发现了一些文章提到在PySpark中配置IPython notebook。[IPython notebook](http://ipython.org/notebook.html)对数据科学家来说是个交互地呈现科学和理论工作的必备工具，它集成了文本和Python代码。对很多数据科学家，IPython notebook是他们的Python入门，并且使用非常广泛，所以我想值得在本文中提及。

Most of the instructions here are adapted from an IPython notebook: [Setting up IPython with PySpark](http://nbviewer.ipython.org/gist/fperez/6384491/00-Setup-IPython-PySpark.ipynb). However, we will focus on connecting your IPython shell to PySpark in standalone mode on your local computer rather than on an EC2 cluster. If you would like to work with PySpark/IPython on a cluster, feel free to check out those instructions and if you do, please comment on how it went!
这里的大部分说明都来改编自IPython notebook: [在PySpark中设置IPython](http://nbviewer.ipython.org/gist/fperez/6384491/00-Setup-IPython-PySpark.ipynb)。但是，我们将聚焦在本机以单机模式将IPtyon shell连接到PySpark，而不是在EC2集群。如果你想在一个集群上使用PySpark/IPython，查看并评论下文的说明吧！

1.  Create an iPython notebook profile for our Spark configuration.
1.  为Spark创建一个iPython notebook配置
        ~$ ipython profile create spark
        [ProfileCreate] Generating default config file: u'$HOME/.ipython/profile_spark/ipython_config.py'
        [ProfileCreate] Generating default config file: u'$HOME/.ipython/profile_spark/ipython_notebook_config.py'
        [ProfileCreate] Generating default config file: u'$HOME/.ipython/profile_spark/ipython_nbconvert_config.py'

    Keep note of where the profile has been created, and replace the appropriate paths in the following steps:
    记住配置文件的位置，替换下文各步骤相应的路径：

2.  Create a file in `$HOME/.ipython/profile_spark/startup/00-pyspark-setup.py` and add the following:
2. 创建文件`$HOME/.ipython/profile_spark/startup/00-pyspark-setup.py`，并添加如下代码：
        import os
        import sys

        # Configure the environment
        if 'SPARK_HOME' not in os.environ:
            os.environ['SPARK_HOME'] = '/srv/spark'

        # Create a variable for our root path
        SPARK_HOME = os.environ['SPARK_HOME']

        # Add the PySpark/py4j to the Python Path
        sys.path.insert(0, os.path.join(SPARK_HOME, "python", "build"))
        sys.path.insert(0, os.path.join(SPARK_HOME, "python"))

3.  Start up an IPython notebook with the profile we just created.
3.  使用我们刚刚创建的配置来启动IPython notebook。
        ~$ ipython notebook --profile spark
4.  In your notebook, you should see the variables we just created.
4.  在notebook中，你应该能看到我们刚刚创建的变量。
        print SPARK_HOME
5.  At the top of your IPython notebook, make sure you add the Spark context.
5.  在IPython notebook最上面，确保你添加了Spark context。
        from pyspark import  SparkContext
        sc = SparkContext( 'local', 'pyspark')
6.  Test the Spark context by doing a simple computation using IPython.
6.  使用IPython做个简单的计算来测试Spark context。
        def isprime(n):
        """
        check if integer n is a prime
        """
        # make sure n is a positive integer
        n = abs(int(n))
        # 0 and 1 are not primes
        if n < 2:
            return False
        # 2 is the only even prime number
        if n == 2:
            return True
        # all other even numbers are not primes
        if not n &amp; 1:
            return False
        # range starts with 3 and only needs to go up the square root of n
        # for all odd numbers
        for x in range(3, int(n**0.5)+1, 2):
            if n % x == 0:
                return False
        return True

        # Create an RDD of numbers from 0 to 1,000,000
        nums = sc.parallelize(xrange(1000000))

        # Compute the number of primes in the RDD
        print nums.filter(isprime).count()

    If you get a number without errors, then your context is working correctly!
    如果你能得到一个数字而且没有错误发生，那么你的context正确工作了！

**Editor's Note**: The above configures an IPython context for directly invoking IPython notebook with PySpark. However, you can also launch a notebook using PySpark directly as follows:
**编辑提示**：上面配置了一个使用PySpark直接调用IPython notebook的IPython context。但是，你也可以使用PySpark按以下方式直接启动一个notebook：
    $ IPYTHON_OPTS="notebook --pylab inline" pyspark

Either methodology works similarly depending on your use case for PySpark and IPython. The former allows you to more easily connect to a cluster with IPython notebook, and thus, it is the method I prefer.
哪个方法好用取决于你使用PySpark和IPython的具体情景。前一个允许你更容易地使用IPython notebook连接到一个集群，因此是我喜欢的方法。

### Using Spark on EC2
### 在EC2上使用Spark

In my time teaching distributed computing with Hadoop, I've discovered that a lot can be taught locally on a [pseudo-distributed node](https://districtdatalabs.silvrback.com/creating-a-hadoop-pseudo-distributed-environment) or in single-node mode. However, in order to really get what's happening, a cluster is necessary. There is often a disconnect between learning these skills and the actual computing requirements when data just gets too large. If you have a little bit of money to spend learning how to use Spark in detail, I would recommend setting up a quick cluster for experimentation. Note that a cluster of 5 slaves (and 1 master) used at a rate of approximately 10 hours per week will cost you approximately $45.18 per month.
在讲授使用Hadoop进行分布式计算时，我发现很多可以通过在本地[伪分布式节点](https://districtdatalabs.silvrback.com/creating-a-hadoop-pseudo-distributed-environment)（pseudo-distributed node）或以单节点模式（single-node mode）讲授。但是为了了解真正发生了什么，就需要一个集群。当数据变得庞大，这些书面讲授的技能和真实计算需求间经常出现隔膜。如果你肯在学习详细使用Spark上花钱，我建议你设置一个快速Spark集群做做实验。 包含5个slave（和1个master）每周大概使用10小时的集群每月大概需要$45.18。

A full discussion can be found at the Spark documentation: [Running Spark on EC2](https://spark.apache.org/docs/latest/ec2-scripts.html). Be sure to read this documentation thoroughly as you'll end up sending money on an EC2 cluster if you start these steps! I've highlighted a few key points here:
完整的讨论可以在Spark文档中找到：[在EC2上运行Spark](https://spark.apache.org/docs/latest/ec2-scripts.html)在你决定购买EC2集群前一定要通读这篇文档！我列出了一些关键点：

1.  Obtain a set of AWS EC2 key pairs (access key and secret key) via the [AWS Console](http://aws.amazon.com/console/).
1. 通过[AWS Console](http://aws.amazon.com/console/)获取AWS EC2 key对（访问key和密钥key）。

2.  Export your key pairs to your environment. Either issue these commands in your shell, or add them to your profile. 
2. 将key对导出到你的环境中。在shell中敲出以下命令，或者将它们添加到配置中。
        export AWS_ACCESS_KEY_ID=myaccesskeyid
        export AWS_SECRET_ACCESS_KEY=mysecretaccesskey

    Note that different utilities use different environment names, so make sure to use these for the Spark scripts.
    注意不同的工具使用不同的环境名称，确保你用的是Spark脚本所使用的名称。

3.  Launch a cluster as follows:
3. 启动集群：
        ~$ cd $SPARK_HOME/ec2
        ec2$ ./spark-ec2 -k <keypair> -i <key-file> -s <num-slaves> launch <cluster-name>

4.  SSH into a cluster to run Spark jobs.
4. SSH到集群来运行Spark作业。
        ec2$ ./spark-ec2 -k <keypair> -i <key-file> login <cluster-name>

5.  Destroy a cluster as follows.
5. 销毁集群
        ec2$ ./spark-ec2 destroy <cluster-name>.

These scripts will automatically create a local HDFS cluster for you to add data to, and there is a `copy-dir` command that will allow you to sync code and data to the cluster. However, your best bet is to simply use S3 for data storage and create RDDs that load data using the `s3://` URI.
这些脚本会自动创建一个本地的HDFS集群来添加数据，`copy-dir`命令可以同步代码和数据到该集群。但是你最好使用S3来存储数据，创建使用`s3://`URI来加载数据的RDDs。

## What is Spark?
## Spark是什么？

Now that we have Spark set up, let's have a bit of a discussion about what Spark is. Spark is a general purpose cluster computing framework that provides efficient in-memory computations for large data sets by distributing computation across multiple computers. If you're familiar with Hadoop, then you know that any distributed computing framework needs to solve two problems: how to distribute data and how to distribute computation. Hadoop uses HDFS to solve the distributed data problem and MapReduce as the programming paradigm that provides effective distributed computation. Similarly, Spark has a functional programming API in multiple languages that provides more operators than map and reduce, and does this via a distributed data framework called _resilient distributed datasets_ or RDDs.

既然设置好了Spark，现在我们讨论下Spark是什么。Spark是个通用的集群计算框架，通过将大量数据集计算任务分配到多台计算机上，提供高效内存计算。如果你熟悉Hadoop，那么你知道分布式计算框架要解决两个问题：如何分发数据和如何分发计算。Hadoop使用HDFS来解决分布式数据问题，MapReduce计算范式提供有效的分布式计算。类似的，Spark提供了多语言的函数式编程API，可以进行比map和reduce更多的操作，这些操作是通过一个称作_弹性分布式数据集(resilient distributed datasets, RDDs)_的分布式数据框架进行的。

RDDs are essentially a programming abstraction that represents a read-only collection of objects that are partitioned across machines. RDDs can be rebuilt from a lineage (and are therefore fault tolerant), are accessed via parallel operations, can be read from and written to distributed storages like HDFS or S3, and most importantly, can be cached in the memory of worker nodes for immediate reuse. Because RDDs can be cached in memory, Spark is extremely effective at _iterative_ applications, where the data is being reused throughout the course of an algorithm. Most machine learning and optimization algorithms are iterative, making Spark an extremely effective tool for data science. Additionally, because Spark is so fast, it can be accessed in an _interactive_ fashion via a command line prompt similar to the Python REPL.
本质上，RDD是种编程抽象，代表可以跨机器进行分区的只读对象集合。RDD可以从一个继承结构（lineage）重建（因此可以容错），通过并行操作访问，可以读写HDFS或S3这样的分布式存储，更重要的是，可以缓存到worker节点的内存中进行立即重用。由于RDD可以被缓存在内存中，Spark对_迭代_应用特别有效，因为这些应用中，数据是在整个算法运算过程中都可以被重用。大多数机器学习和最优化算法都是迭代的，使得Spark对数据科学来说是个非常有效的工具。另外，由于Spark非常快，可以通过类似Python REPL的命令行提示符_交互式_访问。

The Spark library itself contains a lot of the application elements that have found their way into most Big Data applications including support for SQL-like querying of big data, machine learning and graph algorithms, and even support for live streaming data.
Spark库本身包含很多应用元素，这些元素可以用到大部分大数据应用中，其中包括对大数据进行类似SQL查询的支持，机器学习和图形算法，甚至对实时流数据的支持。

The core components are:
核心组件如下：

*   **Spark Core**: Contains the basic functionality of Spark; in particular the APIs that define RDDs and the operations and actions that can be undertaken upon them. The rest of Spark's libraries are built on top of the RDD and Spark Core.
*   __Spark Core__：包含Spark的基本功能；尤其是定义RDD的API、操作以及这两者上的动作。其他Spark的库都是构建在RDD和Spark Core之上的。
*   **Spark SQL**: Provides APIs for interacting with Spark via the Apache Hive variant of SQL called Hive Query Language (HiveQL). Every database table is represented as an RDD and Spark SQL queries are transformed into Spark operations. For those that are familiar with Hive and HiveQL, Spark can act as a drop-in replacement.
*   __Spark SQL__：提供通过Apache Hive的SQL变体Hive查询语言（HiveQL）与Spark进行交互的API。每个数据库表被当做一个RDD，Spark SQL查询被转换为Spark操作。对熟悉Hive和HiveQL的人，Spark可以拿来就用。
*   **Spark Streaming**: Enables the processing and manipulation of live streams of data in real time. Many streaming data libraries (such as Apache Storm) exist for handling real-time data. Spark Streaming enables programs to leverage this data similar to how you would interact with a normal RDD as data is flowing in.
*   __Spark Streaming__：允许对实时数据流进行处理和控制。很多实时数据库（如Apache Store）可以处理实时数据。Spark Streaming允许程序能够像普通RDD一样处理实时数据。
*   **MLlib**: A library of common machine learning algorithms implemented as Spark operations on RDDs. This library contains scalable learning algorithms like classifications, regressions, etc. that require iterative operations across large data sets. The Mahout library, formerly the Big Data machine learning library of choice, will move to Spark for its implementations in the future.
*   __MLlib__：一个常用机器学习算法库，算法被实现为对RDD的Spark操作。这个库包含可伸缩的学习算法，比如分类、回归等需要对大量数据集进行迭代的操作。之前可选的大数据机器学习库Mahout，将会转到Spark，并在未来实现。
*   **GraphX**: A collection of algorithms and tools for manipulating graphs and performing parallel graph operations and computations. GraphX extends the RDD API to include operations for manipulating graphs, creating subgraphs, or accessing all vertices in a path.
*   __GraphX__：控制图形、并行图形操作和计算的一组算法和工具的集合。GraphX扩展了RDD API，包含控制图形、创建子图形、访问路径上所有顶点的操作。

Because these components meet many Big Data requirements as well as the algorithmic and computational requirements of many data science tasks, Spark has been growing rapidly in popularity. Not only that, but Spark provides APIs in _Scala_, _Java_, and _Python_; meeting the needs for many different groups and allowing more data scientists to easily adopt Spark as their Big Data solution.
由于这些组件满足了很多大数据需求，也满足了很多数据科学任务的算法和计算上的需要，Spark快速流行起来。不仅如此，Spark也提供了使用_Scala_、_Java_和_Python_编写的API；满足了不同团体的需求，允许更多数据科学家简便地采用Spark作为他们的大数据解决方案。

### Programming Spark
### 对Spark编程

Programming Spark applications is similar to other data flow languages that had previously been implemented on Hadoop. Code is written in a _driver program_ which is lazily evaluated, and upon an action, the driver code is distributed across the cluster to be executed by workers on their partitions of the RDD. Results are then sent back to the driver for aggregation or compilation. Essentially the driver program creates one or more RDDs, applies operations to transform the RDD, then invokes some action on the transformed RDD.
编写Spark应用与之前实现在Hadoop上的其他数据流语言类似。代码是个延迟执行的驱动程序（driver program），通过一个动作，驱动代码将分发到集群上，由各个RDD分区上的worker来执行。然后结果会被发送回驱动程序进行聚合或编译。本质上，驱动程序创建一个或多个RDD，调用操作来转换RDD，然后调用动作处理被转换后的RDD。

These steps are outlined as follows:
这些步骤大体如下：

1.  Define one or more RDDs either through accessing data stored on disk (HDFS, Cassandra, HBase, Local Disk), parallelizing some collection in memory,_transforming_ an existing RDD, or by _caching_ or _saving_.
1. 定义一个或多个RDD，可以通过获取存储在磁盘上的数据（HDFS，Cassandra，HBase，Local Disk），并行化内存中的某些集合，_转换（transform）_一个已存在的RDD，或者，_缓存_或_保存_。
2.  Invoke operations on the RDD by passing _closures_ (functions) to each element of the RDD. Spark offers over 80 high level operators beyond Map and Reduce.
2. 通过传递一个_闭包_（函数）给RDD上的每个元素来调用RDD上的操作。Spark提供了除了Map和Reduce的80多种高级操作。
3.  Use the resulting RDDs with _actions_ (e.g. count, collect, save, etc.). Actions kick off the computing on the cluster.
3. 使用结果RDD的_动作（action）_（如count、collect、save等）。动作将会启动集群上的计算。

When Spark runs a closure on a worker, any variables used in the closure are copied to that node, but are maintained within the local scope of that closure. Spark provides two types of _shared_ variables that can be interacted with by all workers in a restricted fashion._Broadcast variables_ are distributed to all workers, but are read-only. Broadcast variables can be used as lookup tables or stopword lists. _Accumulators_ are variables that workers can "add" to using associative operations and are typically used as counters.
当Spark在一个worker上运行闭包时，闭包中用到的所有变量都会被拷贝到节点上，但是由闭包的局部作用域来维护。Spark提供了两种类型的_共享_变量，这些变量可以按照限定的方式被所有worker访问。_广播变量_会被分发给所有worker，但是是只读的。_累加器_这种变量，worker可以使用关联操作来“加”，通常用作计数器。

Spark applications are essentially the manipulation of RDDs through _transformations_ and_actions_. Future posts will go into this in greater detail, but this understanding should be enough to execute the example programs below.
Spark应用本质上通过_转换_和_动作_来控制RDD。后续文章将会深入讨论，但是理解了这个就足以执行下面的例子了。

### Spark Execution
### Spark扩展

A brief note on the execution of Spark. Essentially, Spark applications are run as independent sets of processes, coordinated by a `SparkContext` in a _driver_ program. The context will connect to some cluster manager (e.g. YARN) which allocates system resources. Each worker in the cluster is managed by an _executor_, which is in turn managed by the `SparkContext`. The executor manages computation as well as storage and caching on each machine.

简略描述下Spark的执行。本质上，Spark应用作为独立的进程运行，由_驱动_程序中的`SparkContext`管理。这个context将会连接到一些集群管理者（如YARN），这些管理者分配系统资源。集群上的每个worker由_执行者（executor）_管理，执行者反过来由`SparkContext`管理。执行者管理计算、存储，还有每台机器上的缓存。

What is important to note is that application code is sent from the driver to the executors, and the executors specify the context and the various _tasks_ to be run. The executors communicate back and forth with the driver for data sharing or for interaction. Drivers are key participants in Spark jobs, and therefore, they should be on the same network as the cluster. This is different from Hadoop code, where you might submit a job from anywhere to the JobTracker, which then handles the execution on the cluster.
重点要记住的是应用代码由驱动程序发送给执行者，执行者指定context和要运行的_任务_。执行者与驱动程序通信进行数据分享或者交互。驱动程序是Spark作业的主要参与者，因此需要与集群处于相同的网络。这与Hadoop代码不同，Hadoop中你可以在任意位置提交作业给JobTracker，JobTracker处理集群上的执行。

## Interacting with Spark
## 与Spark交互

The easiest way to start working with Spark is via the interactive command prompt. To open the PySpark terminal, simply type in `pyspark` on the command line.
使用Spark最简单的方式就是使用交互式命令行提示符。打开PySpark终端，在命令行中打出`pyspark`。

        ~$ pyspark
        [… snip …]
        >>>

PySpark will automatically create a `SparkContext` for you to work with, using the local Spark configuration. It is exposed to the terminal via the `sc` variable. Let's create our first RDD.
PySpark将会自动使用本地Spark配置创建一个`SparkContext`。你可以通过`sc`变量来访问它。我们来创建第一个RDD。

        >>> text = sc.textFile("shakespeare.txt")
        >>> print text
        shakespeare.txt MappedRDD[1] at textFile at NativeMethodAccessorImpl.java:-2

The `textFile` method loads the [complete works of Shakespeare](http://bit.ly/16c7kPV) into an RDD named text. If you inspect the RDD you can see that it is a MappedRDD and that the path to the file is a relative path from the current working directory (pass in a correct path to the shakespeare.txt file on your system). Let's start to transform this RDD in order to compute the "hello world" of distributed computing: "word count."
`textFile`方法将[莎士比亚全部作品](http://bit.ly/16c7kPV)加载到一个RDD命名文本。如果查看了RDD，你就可以看出它是个MappedRDD，文件路径是相对于当前工作目录的一个相对路径（记得传递磁盘上正确的shakespear.txt文件路径）。我们转换下这个RDD，来进行分布式计算的“hello world”：“字数统计”。

        >>> from operator import add
        >>> def tokenize(text):
        ...     return text.split()
        ...
        >>> words = text.flatMap(tokenize)
        >>> print words
        PythonRDD[2] at RDD at PythonRDD.scala:43

We first imported the operator `add`, which is a named function that can be used as a closure for addition. We'll use this function later. The first thing we have to do is split our text into words. We created a function called `tokenize` whose argument is some piece of text and who returns a list of the tokens (words) in that text by simply splitting on whitespace. We then created a new RDD called `words` by transforming the `text` RDD through the application of the `flatMap` operator, and passed it the closure `tokenize`. As you can see, `words` is a `PythonRDD`, but the execution should have happened instantaneously. Clearly, we haven't split the entire Shakespeare data set into a list of words yet.
我们首先导入了`add`操作符，它是个命名函数，可以作为加法的闭包来使用。我们稍后再使用这个函数。首先我们要做的是把文本拆分为单词。我们创建了一个`tokenize`函数，参数是文本片段，返回根据空格拆分的单词列表。然后我们通过给`flatMap`操作符传递`tokenize`闭包对`text`RDD进行变换创建了一个`words`RDD。你会发现，`words`是个`PythonRDD`，但是执行应该立即进行。明显，我们不应该把整个莎士比亚数据集拆分为单词列表。

If you've done the Hadoop "word count" using MapReduce, you'll know that the next steps are to map each word to a key value pair, where the key is the word and the value is a 1, and then use a reducer to sum the 1s for each key.
如果你曾使用MapReduce做过Hadoop版的“字数统计”，你应该知道下一步是将每个单词映射到一个键值对，其中键是单词，值是1，然后使用reducer计算每个键的1总数。


First, let's apply our map.
首先，我们map一下。

        >>> wc = words.map(lambda x: (x,1))
        >>> print wc.toDebugString()
        (2) PythonRDD[3] at RDD at PythonRDD.scala:43
        |  shakespeare.txt MappedRDD[1] at textFile at NativeMethodAccessorImpl.java:-2
        |  shakespeare.txt HadoopRDD[0] at textFile at NativeMethodAccessorImpl.java:-2

Instead of using a named function, we will use an anonymous function (with the `lambda` keyword in Python). This line of code will map the lambda to each element of words. Therefore, each `x` is a word, and the word will be transformed into a tuple (word, 1) by the anonymous closure. In order to inspect the lineage so far, we can use the`toDebugString` method to see how our `PipelinedRDD` is being transformed. We can then apply the `reduceByKey` action to get our word counts and then write those word counts to disk.
我使用了一个匿名函数（用了Python中的`lambda`关键字）而不是命名函数。这行代码将会把lambda映射到每个单词。因此，每个`x`都是一个单词，每个单词都会被匿名闭包转换为元组(word, 1)。为了查看转换关系，我们使用`toDebugString`方法来查看`PipelinedRDD`是怎么被转换的。可以使用`reduceByKey`动作进行字数统计，然后把统计结果写到磁盘。

        >>> counts = wc.reduceByKey(add)
        >>> counts.saveAsTextFile("wc")

Once we finally invoke the action `saveAsTextFile`, the distributed job kicks off and you should see a lot of `INFO` statements as the job runs "across the cluster" (or simply as multiple processes on your local machine). If you exit the interpreter, you should see a directory called "wc" in your current working directory.
一旦我们最终调用了`saveAsTextFile`动作，这个分布式作业就开始执行了，在作业“跨集群地”（或者你本机的很多进程）运行时，你应该可以看到很多`INFO`语句。如果退出解释器，你可以看到当前工作目录下有个“wc”目录。

        $ ls wc/
        _SUCCESS   part-00000 part-00001

Each part file represents a partition of the final RDD that was computed by various processes on your computer and saved to disk. If you use the `head` command on one of the part files, you should see tuples of word count pairs.
每个文件片段都代表你本机上的进程计算得到的被保持到磁盘上的最终RDD。如果对一个文件片段进行`head`命令，你应该能看到字数统计元组。

        $ head wc/part-00000
        (u'fawn', 14)
        (u'Fame.', 1)
        (u'Fame,', 2)
        (u'kinghenryviii@7731', 1)
        (u'othello@36737', 1)
        (u'loveslabourslost@51678', 1)
        (u'1kinghenryiv@54228', 1)
        (u'troilusandcressida@83747', 1)
        (u'fleeces', 1)
        (u'midsummersnightsdream@71681', 1)

Note that none of the keys are sorted as they would be in Hadoop (due to a necessary shuffle and sort phase between the Map and Reduce tasks). However, you are guaranteed that each key appears only once across all part files as you used the `reduceByKey`operator on the counts RDD. If you want, you could use the `sort` operator to ensure that all the keys are sorted before writing them to disk.
注意这些键没有像Hadoop一样被排序（因为Hadoop中Map和Reduce任务中有个必要的打乱和排序阶段）。但是，能保证每个单词在所有文件中只出现一次，因为你使用了`reduceByKey`操作符。你还可以使用`sort`操作符确保在写入到磁盘之前所有的键都被排过序。

## Writing a Spark Application
## 编写一个Spark应用

Writing Spark applications is similar to working with Spark in the interactive console. The API is the same. First, you need to get access to the `SparkContext`, which was automatically loaded for you by the `pyspark` application.
编写Spark应用与通过交互式控制台使用Spark类似。API是相同的。首先，你需要访问`SparkContext`，它已经由`pyspark`自动加载好了。

A basic template for writing a Spark application in Python is as follows:
使用Spark编写Spark应用的一个基本模板如下：

        ## Spark Application - execute with spark-submit

        ## Imports
        from pyspark import SparkConf, SparkContext

        ## Module Constants
        APP_NAME = "My Spark Application"

        ## Closure Functions

        ## Main functionality

        def main(sc):
            pass

        if __name__ == "__main__":
            # Configure Spark
            conf = SparkConf().setAppName(APP_NAME)
            conf = conf.setMaster("local[*]")
            sc   = SparkContext(conf=conf)

            # Execute Main functionality
            main(sc)

This template gives you a sense of what is needed in a Spark application: imports for various Python libraries, module constants, an identifying application name for debugging and for the Spark UI, closures or other custom operation functions, and finally, some main analytical methodology that is run as the driver. In our `ifmain`, we create the `SparkContext` and execute main with the context as configured. This will allow us to easily import driver code into the `pyspark` context without execution. Note that here a Spark configuration is hard coded into the `SparkConf` via the `setMaster`method, but typically you would just allow this value to be configured from the command line, so you will see this line commented out.
这个模板列出了一个Spark应用所需的东西：导入Python库，模块常量，用于调试和Spark UI的可识别的应用名称，还有作为驱动程序运行的一些主要分析方法学。在`ifmain`中，我们创建了`SparkContext`，使用了配置好的context执行main。我们可以简单地导入驱动代码到`pyspark`而不用执行。注意这里Spark配置通过`setMaster`方法被硬编码到`SparkConf`，一般你应该允许这个值通过命令行来设置，所以你能看到这行做了占位符注释。

To close or exit the program use `sc.stop()` or `sys.exit(0)`.
使用`sc.stop()`或`sys.exit(0)`来关闭或退出程序。

In order to demonstrate a common use of Spark, let's take a look at a common use case where we read in a CSV file of data and compute some aggregate statistic. In this case, we're looking at the [on-time flight data set](http://bit.ly/1Dz76xB) from the U.S. Department of Transportation, recording all U.S. domestic flight departure and arrival times along with their departure and arrival delays for the month of April, 2014. I typically use this data set because one month is manageable for exploration, but the entire data set needs to be computed upon with a cluster. The entire app is as follows:
为了演示Spark的常规用法，我们来看一个常规的例子，这里我们读取CSV文件中的数据，然后计算一些聚合统计。本例中，我们使用美国交通部的[准时航班数据集](http://bit.ly/1Dz76xB)，这些数据记录了2014年四月间，所有美国国内航班的出发和到达时间，以及出发和到达延误时间。使用这组数据是因为，一个月的数据对探索来说是可以控制的，但是整个数据集需要通过集群来计算。整个应用代码如下：

        ## Spark Application - execute with spark-submit

        ## Imports
        import csv
        import matplotlib.pyplot as plt

        from StringIO import StringIO
        from datetime import datetime
        from collections import namedtuple
        from operator import add, itemgetter
        from pyspark import SparkConf, SparkContext

        ## Module Constants
        APP_NAME = "Flight Delay Analysis"
        DATE_FMT = "%Y-%m-%d"
        TIME_FMT = "%H%M"

        fields   = ('date', 'airline', 'flightnum', 'origin', 'dest', 'dep',
                    'dep_delay', 'arv', 'arv_delay', 'airtime', 'distance')
        Flight   = namedtuple('Flight', fields)

        ## Closure Functions
        def parse(row):
            """
            Parses a row and returns a named tuple.
            """

            row[0]  = datetime.strptime(row[0], DATE_FMT).date()
            row[5]  = datetime.strptime(row[5], TIME_FMT).time()
            row[6]  = float(row[6])
            row[7]  = datetime.strptime(row[7], TIME_FMT).time()
            row[8]  = float(row[8])
            row[9]  = float(row[9])
            row[10] = float(row[10])
            return Flight(*row[:11])

        def split(line):
            """
            Operator function for splitting a line with csv module
            """
            reader = csv.reader(StringIO(line))
            return reader.next()

        def plot(delays):
            """
            Show a bar chart of the total delay per airline
            """
            airlines = [d[0] for d in delays]
            minutes  = [d[1] for d in delays]
            index    = list(xrange(len(airlines)))

            fig, axe = plt.subplots()
            bars = axe.barh(index, minutes)

            # Add the total minutes to the right
            for idx, air, min in zip(index, airlines, minutes):
                if min > 0:
                    bars[idx].set_color('#d9230f')
                    axe.annotate(" %0.0f min" % min, xy=(min+1, idx+0.5), va='center')
                else:
                    bars[idx].set_color('#469408')
                    axe.annotate(" %0.0f min" % min, xy=(10, idx+0.5), va='center')

            # Set the ticks
            ticks = plt.yticks([idx+ 0.5 for idx in index], airlines)
            xt = plt.xticks()[0]
            plt.xticks(xt, [' '] * len(xt))

            # minimize chart junk
            plt.grid(axis = 'x', color ='white', linestyle='-')

            plt.title('Total Minutes Delayed per Airline')
            plt.show()

        ## Main functionality
        def main(sc):

            # Load the airlines lookup dictionary
            airlines = dict(sc.textFile("ontime/airlines.csv").map(split).collect())

            # Broadcast the lookup dictionary to the cluster
            airline_lookup = sc.broadcast(airlines)

            # Read the CSV Data into an RDD
            flights = sc.textFile("ontime/flights.csv").map(split).map(parse)

            # Map the total delay to the airline (joined using the broadcast value)
            delays  = flights.map(lambda f: (airline_lookup.value[f.airline],
                                             add(f.dep_delay, f.arv_delay)))

            # Reduce the total delay for the month to the airline
            delays  = delays.reduceByKey(add).collect()
            delays  = sorted(delays, key=itemgetter(1))

            # Provide output from the driver
            for d in delays:
                print "%0.0f minutes delayed\t%s" % (d[1], d[0])

            # Show a bar chart of the delays
            plot(delays)

        if __name__ == "__main__":
            # Configure Spark
            conf = SparkConf().setMaster("local[*]")
            conf = conf.setAppName(APP_NAME)
            sc   = SparkContext(conf=conf)

            # Execute Main functionality
            main(sc)

To run this code (presuming that you have a directory called ontime with the two CSV files in the same directory), use the `spark-submit` command as follows:
使用`spark-submit`命令来运行这段代码（假设你已有ontime目录，目录中有两个CSV文件）：

        ~$ spark-submit app.py

This will create a Spark job using the localhost as the master, and look for the two CSV files in an ontime directory that is in the same directory as `app.py`. The final result shows that the total delays (in minutes) for the month of April go from arriving early if you're flying out of the continental U.S. to Hawaii or Alaska to an aggregate total delay for most big airlines. Note especially that we can visualize the result using `matplotlib`directly on the driver program, `app.py`:
这个Spark作业使用本机作为master，并搜索`app.py`同目录下的ontime目录下的2个CSV文件。最终结果显示，4月的总延误时间（单位分钟），既有早点的（如果你从美国大陆飞往夏威夷或者阿拉斯加），但对大部分大型航空公司都是延误的。注意，我们在`app.py`中使用`matplotlib`直接将结果可视化出来了：

![Airline delays](https://silvrback.s3.amazonaws.com/uploads/ae516a51-06ae-400d-a93d-5c2ba3d3590f/delays_large.png)

So what is this code doing? Let's look particularly at the `main` function which does the work most directly related to Spark. First, we load up a CSV file into an RDD, then map the `split` function to it. The `split` function parses each line of text using the `csv`module and returns a tuple that represents the row. Finally we pass the `collect` action to the RDD, which brings the data from the RDD back to the driver as a Python list. In this case, `airlines.csv` is a small jump table that will allow us to join airline codes with the airline full name. We will store this jump table as a Python dictionary and then broadcast it to every node in the cluster using `sc.broadcast`.
这段代码做了什么呢？我们特别注意下与Spark最直接相关的`main`函数。首先，我们加载CSV文件到RDD，然后把`split`函数映射给它。`split`函数使用`csv`模块解析文本的每一行，并返回代表每行的元组。最后，我们将`collect`动作传给RDD，这个动作把数据以Python列表的形式从RDD传回驱动程序。本例中，`airlines.csv`是个小型的转移表（jump table），可以将航空公司代码与全名对应起来。我们将转移表存储为Python字典，然后使用`sc.broadcast`广播给集群上的每个节点。

Next, the `main` function loads the much larger `fights.csv`. After splitting the CSV rows, we map the `parse` function to the CSV row, which converts dates and times to Python dates and times, and casts floating point numbers appropriately. It also stores the row as a `NamedTuple` called `Flight` for efficient ease of use.
接着，`main`函数加载了数据量更大的`flights.csv`（[译者注]作者笔误写成`fights.csv`，此处更正）。拆分CSV行完成之后，我们将`parse`函数映射给CSV行，此函数会把日期和时间转成Python的日期和时间，并对浮点数进行合适的类型转换。每行被存储为称作`Flight`的`NamedTuple`以进行高效简便的使用。

With an RDD of `Flight` objects in hand, we map an anonymous function that transforms the RDD to a series of key-value pairs where the key is the name of the airline and the value is the sum of the arrival and departure delays. Each airline has its delay summed together using the `reduceByKey` action and the `add` operator, and this RDD is collected back to the driver (again the number airlines in the data is relatively small). Finally the delays are sorted in ascending order, then the output is printed to the console as well as visualized using `matplotlib`.
手头上有了`Flight`对象的RDD，我们映射一个匿名函数，这个函数将RDD转换为一些列的键值对，其中键是航空公司的名字，值是到达和出发的延误时间总和。使用`reduceByKey`动作和`add`操作符可以得到每个航空公司的延误时间总和，然后RDD被传递给驱动程序（数据中航空公司的数目相对较少）。最终延误时间按照升序排列，输出打印到了控制台，并且使用`matplotlib`进行了可视化。

This example is kind of long, but hopefully it illustrates the interplay of the cluster and the driver program (sending out for analytics, then bringing results back to the driver) as well as the role of Python code in a Spark application.
这个例子稍长，但是希望能演示出集群和驱动程序之间的相互作用（发送数据进行分析，结果取回给驱动程序），以及Python代码在Spark应用中的角色。

## Conclusion
## 结论

Although far from a complete introduction to Spark, we hope that you have a better feel for what Spark is, and how to conduct fast, in-memory distributed computing with Python. At the very least, you should be able to get Spark up and running and start exploring data either on your local machine in stand alone mode or via Amazon EC2. You should even be able to get iPython notebook set up and configured to run Spark!
尽管算不上一个完整的Spark入门，我们希望你能更好地了解Spark是什么，如何使用进行快速、内存分布式计算。至少，你应该能运行起来Spark，并开始在本机或Amazon EC2上探索数据。你应该可以配置好iPython notebook来运行Spark。

Spark doesn't solve the distributed storage problem (usually Spark gets its data from HDFS), but it does provide a rich functional programming API for distributed computation. This framework is built upon the idea of _resilient distributed datasets_ or "RDDs" for short. RDDs are a programming abstraction that represents a partitioned collection of objects, allowing for distributed operations to be performed upon them. RDDs are fault-tolerant (the resilient part) and, most importantly, can be stored in memory on worker nodes for immediate reuse. In memory storage provides for faster and more easily expressed iterative algorithms as well as enabling real-time interactive analyses.
Spark不能解决分布式存储问题（通常Spark从HDFS中获取数据），但是它为分布式计算提供了丰富的函数式编程API。这个框架建立在伸缩分布式数据集（RDD）之上。RDD是种编程抽象，代表被分区的对象集合，允许进行分布式操作。RDD有容错能力（可伸缩的部分），更重要的时，可以存储到节点上的worker内存里进行立即重用。内存存储提供了快速和简单表示的迭代算法，以及实时交互分析。

Because the Spark library has an API available in Python, Scala, and Java, as well as built-in modules for machine learning, streaming data, graph algorithms, and SQL-like queries; it has rapidly become one of the most important distributed computation frameworks that exists today. When coupled with YARN, Spark serves to _augment_ not replace existing Hadoop clusters and will be an important part of Big Data in the future, opening up new avenues of data science exploration.
由于Spark库提供了Python、Scale、Java编写的API，以及内建的机器学习、流数据、图形算法、类SQL查询等模块；Spark迅速成为当今最重要的分布式计算框架之一。与YARN结合，Spark提供了_增量_，而不是替代已存在的Hadoop集群，它将成为未来大数据重要的一部分，为数据科学探索铺设了一条康庄大道。

## Helpful Links
## 有用的链接

Hopefully you've enjoyed this post! Writing never happens in a vacuum, so here are a few helpful links that helped me write the post; ones that you might want to review to explore Spark further. Note that some of the book links are affiliate links, meaning that if you click on them and purchase, you're helping to support District Data Labs!
希望你喜欢这篇博文！写作并不是凭空而来的，以下是一些曾帮助我写作的有用链接；查看这些链接，可能对进一步探索Spark有帮助。注意，有些图书链接是推广链接，意味着如果你点击并购买了这些图书，你将会支持District Data Labs！

This was more of an introductory post than is typical for District Data Labs articles , but there are some data and code associated with the introduction that you can find here:
这篇更多是篇入门文章，而不是District Data Labs的典型文章，有些与此入门相关的数据和代码你可以在这里找到：

*   [Code on Github](http://bit.ly/1vpC9wV)
*   [Github上的代码](http://bit.ly/1vpC9wV)
*   [Shakespeare Dataset](http://bit.ly/16c7kPV)
*   [莎士比亚数据集](http://bit.ly/1vpC9wV)
*   [Airline On Time Dataset](http://bit.ly/1Dz76xB) is munged from [The Bureau of Transportation Statistics (US DOT)](http://www.transtats.bts.gov/DL_SelectFields.asp?Table_ID=236&amp;DB_Short_Name=On-Time)
*   [航空公司时间数据集](http://bit.ly/1Dz76xB)改编自[美国交通统计局（US DOT）](http://www.transtats.bts.gov/DL_SelectFields.asp?Table_ID=236&amp;DB_Short_Name=On-Time)

### Spark Papers
### Spark论文

Like Hadoop, Spark has some fundamental papers that I believe should be required reading for serious data scientists that need to do distributed computing on large data sets. The first is a workshop paper from HotOS (hot topics in operating systems) that describes Spark in an easily understandable fashion. The second is a more theoretical paper that describes RDDs in detail.
Spark与Hadoop一样，有一些基础论文，我认为那些需要对大数据集进行分布式计算的严谨数据科学家一定要读。首先是HotOS（“操作系统热门话题”的简写）的一篇研讨会论文，简单易懂地描述了Spark。第二个是偏理论的论文，具体描述了RDD。

1.  M. Zaharia, M. Chowdhury, M. J. Franklin, S. Shenker, and I. Stoica, “[Spark: cluster computing with working sets](http://www.cs.berkeley.edu/~matei/papers/2010/hotcloud_spark.pdf),” in Proceedings of the 2nd USENIX conference on Hot topics in cloud computing, 2010, pp. 10–10.
2.  M. Zaharia, M. Chowdhury, T. Das, A. Dave, J. Ma, M. McCauley, M. J. Franklin, S. Shenker, and I. Stoica, “[Resilient distributed datasets: A fault-tolerant abstraction for in-memory cluster computing](https://www.cs.berkeley.edu/~matei/papers/2012/nsdi_spark.pdf),” in Proceedings of the 9th USENIX conference on Networked Systems Design and Implementation, 2012, pp. 2–2.

### Books on Spark
### Spark图书

1.  [Learning Spark](http://amzn.to/15NRz1X)
1. [学习Spark](http://amzn.to/15NRz1X)
2.  [Advanced Analytics with Spark](http://amzn.to/1zMiUKG)
2. [使用Spark进行高级分析](http://amzn.to/1zMiUKG)

### Helpful Blog Posts
### 有用的博文

1.  [Setting up IPython with PySpark](http://nbviewer.ipython.org/gist/fperez/6384491/00-Setup-IPython-PySpark.ipynb)
1. [设置IPython以使用PySpark](http://nbviewer.ipython.org/gist/fperez/6384491/00-Setup-IPython-PySpark.ipynb)
2.  [Databricks Spark Reference Applications](http://databricks.gitbooks.io/databricks-spark-reference-applications/)
2. [Databricks的Spark参考应用程序](http://databricks.gitbooks.io/databricks-spark-reference-applications/)
3.  [Running Spark on EC2](https://spark.apache.org/docs/latest/ec2-scripts.html)
3. [在EC2上运行Spark](https://spark.apache.org/docs/latest/ec2-scripts.html)
4.  [Run Spark and SparkSQL on Amazon Elastic MapReduce](https://aws.amazon.com/articles/Elastic-MapReduce/4926593393724923)
4. [在Amazon Elastic MapReduce上运行Spark和SparkSQL](https://aws.amazon.com/articles/Elastic-MapReduce/4926593393724923)
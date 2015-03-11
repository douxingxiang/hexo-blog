title: Spark概览
date: 2015-03-10 09:02:00
tags: Spark
---

## 概览

Spark应用包括一个驱动程序（driver program），驱动程序运行`main`函数，并执行集群上的并行操作(parallel operations)。

Spark中有两个重要的抽象：RDD和共享变量。

Spark提供了弹性分布式数据集（resilient distributed dataset, RDD）,RDD是一组可以跨并发集群节点分区的元素集合。RDD可以从Hadoop文件系统、驱动程序中已有Scala集合从创建或转换。用户可以要求Spark在内存中_持久化_RDD，这样并行操作时可以高效重用。RDD还可以自动从节点的错误中恢复。

共享变量（shared variables）可以用于并行操作。Spark在多个节点并发地以任务集方式运行函数时，它会把函数中用到的所有变量拷贝到每个任务中去。有时，一个变量需要跨任务，或者在任务和驱动程序之间共享。Spark支持两种类型的共享变量：广播变量（broadcast variables)，可以在所有节点的内存中缓存值；累加器（accumulators)，只能用于加操作的变量。
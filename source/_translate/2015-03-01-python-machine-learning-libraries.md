Python is one of the best programming languages out there, with an extensive coverage in scientific computing: computer vision, artificial intelligence, mathematics, astronomy to name a few. Unsurprisingly, this holds true for machine learning as well.

Python是最好的编程语言之一，在科学计算中用途广泛：计算机视觉、人工智能、数学、天文等。同样，对机器学习也是正确的。

Of course, it has some disadvantages too; one of which is that the tools and libraries for Python are scattered. If you are a unix-minded person, this works quite conveniently as every tool does one thing and does it well. However, this also requires you to know different libraries and tools, including their advantages and disadvantages, to be able to make a sound decision for the systems that you are building. Tools by themselves do not make a system or product better, but with the right tools we can work much more efficiently and be more productive. Therefore, knowing the right tools for your work domain is crucially important.

当让，它也有些缺点；其中一个是工具和库太少。如果你是unix思维（unix-minded）的人，你可能觉得非常方便，因为每个工具只做一件事并且做得很好。但是你也需要知道不同库和工具的优缺点，这样在构建系统时才能做出合理的决策。工具本身不能改善系统或产品，但是使用正确的工具，我们可以工作得更高效，生产率更高。因此了解正确的工具，对你的工作领域是非常重要的。

This post aims to list and describe the most useful machine learning tools and libraries that are available for Python. To make this list, we did not require the library to be written in Python; it was sufficient for it to have a Python interface. We also have a small section on Deep Learning at the end as it has received a fair amount of attention recently.

这篇文章的目的就是列举并描述Python可用的最有用的机器学习工具和库。这个列表中，我们不要求这些库是用Python写的，只要有Python接口就够了。我们在最后也有一小节关于深度学习（Deep Learning）的内容，因为它最近也吸引了相当多的关注。

We do not aim to list **all** the machine learning libraries available in Python (the Python package index returns 139 results for “machine learning”) but rather the ones that we found useful and well-maintained to the best of our knowledge. Moreover, although some of modules could be used for various machine learning tasks, we included libraries whose main focus is machine learning. For example, although [Scipy](http://docs.scipy.org/doc/scipy/reference/index.html) has some [clustering algorithms](http://docs.scipy.org/doc/scipy/reference/cluster.vq.html#module-scipy.cluster.vq), the main focus of this module is not machine learning but rather in being a comprehensive set of tools for scientific computing. Therefore, we excluded libraries like Scipy from our list (though we use it too!).

我们的目的不是列出Python中__所有__机器学习库（搜索“机器学些”时Python包索引(PyPI)返回了139个结果），而是列出我们所知的有用并且维护良好的那些。另外，尽管有些模块可以用于多种机器学习任务，我们只列出主要焦点在机器学习的库。比如，虽然[Scipy](http://docs.scipy.org/doc/scipy/reference/index.html)包含一些[聚类算法](http://docs.scipy.org/doc/scipy/reference/cluster.vq.html#module-scipy.cluster.vq)，但是它的主焦点不是机器学习而是全面的科学计算工具集。因此我们排除了Scipy（尽管我们也使用它！）。

Another thing worth mentioning is that we also evaluated the library based on how it integrates with other scientific computing libraries because machine learning (either supervised or unsupervised) is part of a data processing system. If the library that you are using does not fit with your rest of data processing system, then you may find yourself spending a tremendous amount of time to creating intermediate layers between different libraries. It is important to have a great library in your toolset but it is also important for that library to integrate well with other libraries.

另一个需要提到的是，我们同时也根据与其他科学计算库的集成来评估，因为机器学习（有监督的或者无监督的）也是数据处理系统的一部分。如果你使用的库不符合数据处理系统的其他部分，你就要花大量时间创建不同库之间的中间层。在工具集中有个很棒的库很重要，但这个库能与其他库良好集成也同样重要。

If you are great in another language but want to use Python packages, we also briefly go into how you could integrate with Python to use the libraries listed in the post.

如果你擅长其他语言，但也想使用Python包，我们也简单地描述如何与Python进行集成来使用这篇文章列出的库。

## [Scikit-Learn](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#scikit-learn)

[Scikit Learn](http://scikit-learn.org/stable/) is our machine learning tool of choice at CB Insights. We use it for classification, feature selection, feature extraction and clustering. What we like most about it is that it has a consistent API which is easy to use while also providing **a lot of** evaluation, diagnostic and cross-validation methods out of the box (sound familiar? Python has batteries-included approach as well). The icing on the cake is that it uses Scipy data structures under the hood and fits quite well with the rest of scientific computing in Python with Scipy, Numpy, Pandas and Matplotlib packages. Therefore, if you want to visualize the performance of your classifiers (say, using a precision-recall graph or Receiver Operating Characteristics (ROC) curve) those could be quickly visualized with help of Matplotlib. Considering how much time is spent on cleaning and structuring the data, this makes it very convenient to use the library as it tightly integrates to other scientific computing packages.

[Scikit Learn](http://scikit-learn.org/stable/)是我们在CB Insights选用的机器学习工具。我们用它进行分类、特征选择、特征提取和聚集。我们最爱的一点是它易用的一致性API提供了__很多__开箱可用的求值、诊断和交叉验证方法。锦上添花的是它底层使用Scipy数据结构，与其余Python中使用Scipy、Numpy、Pandas和Matplotlib进行科学计算的部分适应地很好。

Moreover, it has also limited Natural Language Processing feature extraction capabilities as well such as bag of words, tfidf, preprocessing (stop-words, custom preprocessing, analyzer). Moreover, if you want to quickly perform different benchmarks on toy datasets, it has a datasets module which provides common and useful datasets. You could also build toy datasets from these datasets for your own purposes to see if your model performs well before applying the model to the real-world dataset. For parameter optimization and tuning, it also provides grid search and random search. These features could not be accomplished if it did not have great community support or if it was not well-maintained. We look forward to its first stable release.

另外，它还包含有限的自然语言处理特征提取能力，以及词袋（bag of words）、tfidf（Term Frequency Inverse Document Frequency算法）、预处理（停用词/stop-words，自定义预处理，分析器）。此外，如果你想快速对测试用数据集进行不同基准测试的话，它自带的数据集模块提供了常见和有用的数据集。你还可以根据这些数据集创建自己的测试用数据集，这样在将模型应用到真实世界中之前，你可以按照自己的目的来检验模型是否符合期望。对参数最优化和参数调整，它也提供了网格搜索和随机搜索。如果没有强大的社区支持，或者维护得不好，这些特性都不可能实现。我们期盼它的第一个稳定发布版。

## [Statsmodels](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#statsmodels)

[Statsmodels](http://statsmodels.sourceforge.net/) is another great library which focuses on statistical models and is used mainly for predictive and exploratory analysis. If you want to fit linear models, do statistical analysis, maybe a bit of predictive modeling, then Statsmodels is a great fit. The statistical tests it provides are quite comprehensive and cover validation tasks for most of the cases. If you are R or S user, it also accepts R syntax for some of its statistical models. It also accepts Numpy arrays as well as Pandas data-frames for its models making creating intermediate data structures a thing of the past!

[Statsmodels](http://statsmodels.sourceforge.net/)是另一个聚焦在统计模型上的强大的库，主要用于预测性和探索性分析。如果你想拟合线性模型、进行统计分析，或者预测性建模，那么Statsmodels非常适合。它提供的统计测试相当全面，覆盖了大部分情况的验证任务。如果你是R或者S的用户，它也提供了某些统计模型的R语法。它的模型同时也接受Numpy数组和Pandas数据帧，让中间数据结构成为过去！

## [PyMC](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#pymc)

[PyMC](http://pymc-devs.github.io/pymc/) is the tool of choice for **Bayesians**. It includes Bayesian models, statistical distributions and diagnostic tools for the convergence of models. It includes some hierarchical models as well. If you want to do Bayesian Analysis, you should check it out.

[PyMC](http://pymc-devs.github.io/pymc/)是做__贝叶斯曲线__的工具。它包含贝叶斯模型、统计分布和模型收敛的诊断工具，也包含一些层次模型。如果想进行贝叶斯分析，你应该看看。

## [Shogun](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#shogun)

[Shogun](http://www.shogun-toolbox.org/page/home/) is a machine learning toolbox with a focus on Support Vector Machines (SVM) that is written in C++. It is actively developed and maintained, provides a Python interface and the Python interface is mostly documented well. However, we’ve found its API hard to use compared to Scikit-learn. Also, it does not provide many diagnostics or evaluation algorithms out of the box. However, its speed is a great advantage.

[Shogun](http://www.shogun-toolbox.org/page/home/)是个聚焦在支持向量机（Support Vector Machines, SVM）上的机器学习工具箱，用C++编写。它正处于积极开发和维护中，提供了Python接口，也是文档化最好的接口。但是，相对于Scikit-learn，我们发现它的API比较难用。而且，也没提供很多开箱可用的诊断和求值算法。但是，速度是个很大的优势。

## [Gensim](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#gensim)

[Gensim](http://radimrehurek.com/gensim/) is defined as “topic modeling for humans”. As its homepage describes, its main focus is Latent Dirichlet Allocation (LDA) and its variants. Different from other packages, it has support for Natural Language Processing which makes it easier to combine NLP pipeline with other machine learning algorithms. If your domain is in NLP and you want to do clustering and basic classification, you may want to check it out. Recently, they introduced Recurrent Neural Network based text representation called word2vec from Google to their API as well. This library is written purely in Python.

[Gensim](http://radimrehurek.com/gensim/)被定义为“人们的主题建模工具（topic modeling for humans）”。它的主页上描述，其焦点是狄利克雷划分（Latent Dirichlet Allocation， LDA）及变体。不同于其他包，它支持自然语言处理，能将NLP和其他机器学习算法更容易组合在一起。如果你的领域在NLP，并想进行聚集和基本的分类，你可以看看。目前，它们引入了Google的基于递归神经网络（Recurrent Neural Network）的文本表示法word2vec。这个库只使用Python编写。

## [Orange](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#orange)

[Orange](http://orange.biolab.si/) is the only library that has a Graphical User Interface (GUI) among the libraries listed in this post. It is also quite comprehensive in terms of classification, clustering and feature selection methods and has some cross-validation methods. It is better than Scikit-learn in some aspects (classification methods, some preprocessing capabilities) as well, but it does not fit well with the rest of the scientific computing ecosystem (Numpy, Scipy, Matplotlib, Pandas) as nicely as Scikit-learn.

[Orange](http://orange.biolab.si/)是这篇文章列举的所有库中唯一带有图形用户界面（Graphical User Interface，GUI）的。对分类、聚集和特征选择方法而言，它是相当全面的，还有些交叉验证的方法。在某些方面比Scikit-learn还要好（分类方法、一些预处理能力），但与其他科学计算系统（Numpy, Scipy, Matplotlib, Pandas）的适配上比不上Scikit-learn。

Having a GUI is an important advantage over other libraries however. You could visualize cross-validation results, models and feature selection methods (you need to install Graphviz for some of the capabilities separately). Orange has its own data structures for most of the algorithms so you need to wrap the data into Orange-compatible data structures which makes the learning curve steeper.

但是，包含GUI是个很重要的优势。你可以可视化交叉验证的结果、模型和特征选择方法（某些功能需要安装Graphviz）。对大多数算法，Orange都有自己的数据结构，所以你需要将数据包装成Orange兼容的数据结构，这使得其学习曲线更陡。

## [PyMVPA](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#pymvpa)

[PyMVPA](http://www.pymvpa.org/index.html) is another statistical learning library which is similar to Scikit-learn in terms of its API. It has cross-validation and diagnostic tools as well, but it is not as comprehensive as Scikit-learn.

[PyMVPA](http://www.pymvpa.org/index.html)是另一个统计学习库，API上与Scikit-learn很像。包含交叉验证和诊断工具，但是没有Scikit-learn全面。

### [Deep Learning](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#deep-learning)
### [深度学习](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#deep-learning)

Even though deep learning is a subsection Machine Learning, we created a separate section for this field as it has received tremendous attention recently with various acqui-hires by Google and Facebook.

尽管深度学习是机器学习的一个子节，我们在这里创建单独一节的原因是，它最新吸引了Google和Facebook人才招聘部门的很多注意。

#### [Theano](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#theano)

[Theano](http://deeplearning.net/software/theano/) is the most mature of deep learning library. It provides nice data structures (tensors) to represent layers of neural networks and they are efficient in terms of linear algebra similar to Numpy arrays. One caution is that, its API may not be very intuitive, which increases learning curve for users. There are a lot of [libraries](https://github.com/Theano/Theano/wiki/Related-projects) which build on top of Theano exploiting its data structures. It has support for GPU programming out of the box as well.

[Theano](http://deeplearning.net/software/theano/)是最成熟的深度学习库。它提供了不错的数据结构（张量，tensor）来表示神经网络的层，对线性代数来说很高效，与Numpy的数组类似。需要注意的是，它的API可能不是很直观，用户的学习曲线会很高。有[很多](https://github.com/Theano/Theano/wiki/Related-projects)基于Theano的库都在利用其数据结构。它同时支持开箱可用的GPU编程。

#### [PyLearn2](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#pylearn2)

There is another library built on top of Theano, called [PyLearn2](http://deeplearning.net/software/pylearn2/) which brings modularity and configurability to Theano where you could create your neural network through different configuration files so that it would be easier to experiment different parameters. Arguably, it provides more modularity by separating the parameters and properties of neural network to the configuration file.

还有另外一个基于Theano的库，[PyLearn2](http://deeplearning.net/software/pylearn2/)，它给Theano引入了模块化和可配置性，你可以通过不同的配置文件来创建神经网络，这样尝试不同的参数会更容易。可以说，如果分离神经网络的参数和属性到配置文件，它的模块化能力更强大。

#### [Decaf](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#decaf)

[Decaf](http://caffe.berkeleyvision.org/) is a recently released deep learning library from UC Berkeley which has state of art neural network implementations which are tested on the Imagenet classification competition.

[Decaf](http://caffe.berkeleyvision.org/)是最近由UC Berkeley发布的深度学习库，在Imagenet分类挑战中测试发现，其神经网络实现是很先进的（state of art）。

#### [Nolearn](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#nolearn)

If you want to use excellent Scikit-learn library api in deep learning as well, [Nolearn](http://packages.python.org/nolearn/) wraps Decaf to make the life easier for you. It is a wrapper on top of Decaf and it is compatible(mostly) with Scikit-learn, which makes Decaf even more awesome.

如果你想在深度学习中也能使用优秀的Scikit-learn库API，封装了Decaf的[Nolearn](http://packages.python.org/nolearn/)会让你感觉生活很美好。它是对Decaf的包装，与Scikit-learn兼容（大部分），使得Decaf更不可思议。

#### [OverFeat](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#overfeat)

[OverFeat](https://github.com/sermanet/OverFeat) is a recent winner of [Dogs vs Cats (kaggle competition)](https://plus.google.com/+PierreSermanet/posts/GxZHEH9ynoj) which is written in C++ but it comes with a Python wrapper as well(along with Matlab and Lua). It uses GPU through Torch library so it is quite fast. It also won the detection and localization competition in ImageNet classification. If your main domain is in computer vision, you may want to check it out.

[OverFeat](https://github.com/sermanet/OverFeat)是最近[猫vs.狗（kaggle挑战）](https://plus.google.com/+PierreSermanet/posts/GxZHEH9ynoj)的胜利者，它使用C++编写，也包含一个Python包装器（还有Matlab和Lua）。通过Torch库使用GPU，所以速度很快。也赢得了ImageNet分类的检测和本地化挑战。如果你的领域是计算机视觉，你可能需要看看。

#### [Hebel](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#hebel)

[Hebel](https://github.com/hannes-brt/hebel) is another neural network library comes along with GPU support out of the box. You could determine the properties of your neural networks through YAML files(similar to Pylearn2) which provides a nice way to separate your neural network from the code and quickly run your models. Since it has been recently developed, documentation is lacking in terms of depth and breadth. It is also limited in terms of neural network models as it only has one type of neural network model(feed-forward). However, it is written in pure Python and it will be nice library as it has a lot of utility functions such as schedulers and monitors which we did not see any library provides such functionalities.

[Hebel](https://github.com/hannes-brt/hebel)是另一个带有GPU支持的神经网络库，开箱可用。你可以通过YAML文件（与Pylearn2类似）决定神经网络的属性，提供了将神级网络和代码友好分离的方式，可以快速地运行模型。由于开发不久，就深度和广度上说，文档很匮乏。就神经网络模型来说，也是有局限的，因为只支持一种神经网络模型（正向反馈，feed-forward）。但是，它是用纯Python编写，将会是很友好的库，因为包含很多实用函数，比如调度器和监视器，其他库中我们并没有发现这些功能。

#### [Neurolab](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#neurolab)

[NeuroLab](https://code.google.com/p/neurolab/) is another neural network library which has nice api(similar to Matlab’s api if you are familiar) It has different variants of Recurrent Neural Network(RNN) implementation unlike other libraries. If you want to use RNN, this library might be one of the best choice with its simple API.

[NeuroLab](https://code.google.com/p/neurolab/)是另一个API友好（与Matlabapi类似）的神经网络库。与其他库不同，它包含递归神经网络（Recurrent Neural Network，RNN）实现的不同变体。如果你想使用RNN，这个库是同类API中最好的选择之一。

### [Integration with other languages](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#integration-with-other-languages)
### [与其他语言集成](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#integration-with-other-languages)

You do not know any Python but great in another language? Do not despair! One of the strengths of Python (among many other) is that it is a perfect glue language that you could use your tool of choice programming language with these libraries through access from Python. Following packages for respective programming languages could be used to combine Python with other programming languages:

你不了解Python但是很擅长其他语言？不要绝望！Python（还有其他）的一个强项就是它是一个完美的胶水语言，你可以使用自己常用的编程语言，通过Python来访问这些库。以下适合各种编程语言的包可以用于将其他语言与Python组合到一起：

*   R -> [RPython](http://rpython.r-forge.r-project.org/)
*   Matlab -> [matpython](http://algoholic.eu/matpy/)
*   Java -> [Jython](http://www.jython.org/jythonbook/en/1.0/JythonAndJavaIntegration.html)
*   Lua -> [Lunatic Python](http://labix.org/lunatic-python)
*   Julia -> [PyCall.jl](https://github.com/stevengj/PyCall.jl)

### [Inactive Libraries](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#inactive-libraries)
### [不活跃的库](https://github.com/cbinsights/projects/blob/master/bugra/posts/python-tools-for-ml.md#inactive-libraries)

These are the libraries that did not release any updates for more than one year, we are listing them because some may find it useful, but it is unlikely that these libraries will be maintained for bug fixes and especially enhancements in the future:

这些库超过一年没有发布任何更新，我们列出是因为你有可能会有用，但是这些库不太可能会进行BUG修复，特别是未来进行增强。

*   [MDP](https://github.com/mdp-toolkit/mdp-toolkit)
*   [MlPy](http://mlpy.sourceforge.net/docs/3.5/)
*   [FFnet](http://ffnet.sourceforge.net/)
*   [PyBrain](http://pybrain.org/)

If we are missing one of your favorite packages in Python for machine learning, feel free to let us know in the comments. We will gladly add that library to our blog post as well.

如果我们遗漏了你最爱的Python机器学习包，通过评论让我们知道。我们很乐意将其添加到文章中。
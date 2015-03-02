Here at cxpartners we’re interested in examining best practice around common UX patterns and also challenging the conventional wisdom around them. I’ve been looking at the humble email field and how entering an address could be simplified, through auto-suggesting the domain (e.g. gmail.com).

在cxpartners，我们对检测常规UX模式的最佳实践以及挑战传统思维感兴趣。我最近关注不起眼的email输入控件，在想如何通过自动提示域名（如gmail.com）来简化地址的输入。

Here’s a demo:

下面是演示：

[嵌入网页，无法导入过来，源站演示请点击。](http://www.cxpartners.co.uk/cxblog/towards-an-easier-way-to-enter-email-addresses/)

And a GIF in case you missed it:
这有个GIF如果你看不到页面：
[![Email auto-suggest pattern](http://www.cxpartners.co.uk/wp-content/uploads/2015/01/email_auto_suggest.gif)](http://www.cxpartners.co.uk/wp-content/uploads/2015/01/email_auto_suggest.gif)

### Marginal gains
### 边际收益

Thinking about such small components and their ‘micro-interactions’ may seem insignificant, but we believe there is a business value behind them.

思考下这些小组件，它们的“微交互”可能不太重要，但是我们相信其中有商业价值。

[Giles](http://www.cxpartners.co.uk/who-we-are/giles-colborne/) has spoken before about the theory of ‘marginal gains’. It’s the same theory behind the success of the British cycling team in the London Olympics. Before a race, they would rub the bike tyres with alcohol. This would remove a thin layer of dust that would cause the tyres to fractionally slip on the starting blocks. A tiny change that would only save 1000ths of a second. But as Tim Harford points out in his fantastic talk[Innovations that matter](http://www.mindtheproduct.com/2014/01/innovations-that-matter/): “By figuring out all the things that you can make work just a little bit better, you can turn all of those improvements into something that really matters”.

[Giles](http://www.cxpartners.co.uk/who-we-are/giles-colborne/)之前曾讲过“边际收益”理论。这也是英国自行车团队在伦敦奥运会上成功的原因。在比赛之前，他们用酒精擦拭自行车轮胎。这将会除掉一薄层的尘土，这些尘土可能导致轮胎在出发台会有一点点的滑动。很小的改变会节省千分之一秒。如同Tom Harford在他了不起的演讲[创新很重要](http://www.mindtheproduct.com/2014/01/innovations-that-matter/)中指出的：“通过找出你能进步一点点的所有事情，你就可以把这些提高转化为确实很重要的事情”。

### Entering your email address
### 输入邮件地址

So, back to email input fields! These must be one of the most common inputs on online forms and I personally get a little frustrated whenever I have to manually type in ‘gmail.com’. Therefore this seemed like a good pattern to look at.

回到邮件输入框！它们一定是在线表单中最普通的输入框了，每次当我不得不手动输入“gmail.com”时，我都有点失望。因此，这看上去是个值得关注的模式。

Luke Wroblewski’s video ‘[How to reduce E-mail Input Errors](http://youtu.be/xAKnPtbfNfY?list=PLg-UKERBljNy2Yem3RJkYL1V70dpzkysC)’ was an excellent starting point. He firstly recommends certain html attributes to reduce errors (type=email, autocapitalize=off, autocorrect=off). On mobile, this brings up a keyboard with the @ symbol and stops any unforeseen ‘corrections’, as shown below:

Luke Wroblewski[如何减少邮件输入错误](http://youtu.be/xAKnPtbfNfY?list=PLg-UKERBljNy2Yem3RJkYL1V70dpzkysC)视频是个不错的开始。他首先提议用一些html属性来减少错误（type=email, autocapitalize=off, autocorrect=off）。在手机上，这将会触发一个包含@字符的小键盘，并避免某些不可预料的“更正”，如下所示：

[![Email optimised keyboard](http://www.cxpartners.co.uk/wp-content/uploads/2015/01/01-Keyboard.jpg)](http://www.cxpartners.co.uk/wp-content/uploads/2015/01/01-Keyboard.jpg)

He also has a couple of ideas for preventing errors. One involves inline validation to check for spelling mistakes of popular email domains (e.g. gmail.com):

他还提出了一些避免错误的想法。其中一个涉及到了行内验证来检测流行email域名（如gmail.com）的拼写错误：

[![Spelling correction](http://www.cxpartners.co.uk/wp-content/uploads/2015/01/02-Luke-auto-correct.jpg)](http://www.cxpartners.co.uk/wp-content/uploads/2015/01/02-Luke-auto-correct.jpg)

Another solution for the same issue involves error alerts, along with the ability to correct:

这个问题的另一个方案涉及到包含更正能力的错误提示：

[![Spelling correction alert](http://www.cxpartners.co.uk/wp-content/uploads/2015/01/03-Luke-correct-alert1.jpg)](http://www.cxpartners.co.uk/wp-content/uploads/2015/01/03-Luke-correct-alert1.jpg)

The first idea apparently reduced email hard bounces by 50% – pretty significant for a relatively small change! However, watching this made me think – can’t we do something before a user makes the mistake, rather than after?

第一个观点就明显减少了50%左右的错误，非常重大的小改进！但是，这促使我思考，我们难道不能在用户犯错之前做点事情吗，而不是事后？

### Auto-complete and the ‘hotmail’ issue
### 自动完成和“hotmail”问题

My first idea was an auto-complete email address field. This would fill in the form field with common email domains as you type. I did a quick google search and there’s actually quite a few jQuery plugins for doing just this. I took some code from Chris Yuska’s [plugin](https://github.com/chrisyuska/auto-email), a [list of popular emails](https://github.com/mailcheck/mailcheck/wiki/list-of-popular-domains) from Mailcheck’s[plugin](https://github.com/mailcheck/mailcheck) and started playing around with it.

我的第一个想法是自动完成email地址。当你打字时它将自动输入常用的email域名。我快速谷歌了一下，确实已经有很多jQuery插件可以完成这些事情。我选取了Chris Yuska的[插件](https://github.com/chrisyuska/auto-email)，Mailcheck的[插件](https://github.com/mailcheck/mailcheck)中[流行email列表](https://github.com/mailcheck/mailcheck/wiki/list-of-popular-domains)，然后玩了起来。

It felt quite efficient and natural. At this point I spoke to our in-house form-guru [Joe](http://www.cxpartners.co.uk/who-we-are/joe-leech/). He in-formed me of the ‘hotmail’ problem. Emails sent to an address ending in hotmail.com do not go to the same mailbox as the address ending in hotmail.co.uk. This meant that auto-completing to either hotmail.com or hotmail.co.uk could actually increase errors. Also, the design didn’t really accommodate spelling mistakes if the user carried on typing.

看起来相当高效、自然。然后我告诉给我们团队的前大师[Joe](http://www.cxpartners.co.uk/who-we-are/joe-leech/)。他告诉我了“hotmail”问题。hotmail.com结尾与hotmail.co.uk结尾的email地址不是同一个邮箱。这意味着hotmail.com或hotmail.co.uk的自动完成将会导致错误。而且，如果用户继续打字，这个设计也没考虑调整拼写错误。

### Auto-suggest
### 自动提示

So the next iteration used an auto-suggest rather than auto-complete. This allowed for the display of both ‘hotmail.com’ and ‘hotmail.co.uk’. It also felt less intrusive if you were entering a work email address (like cxpartners.co.uk). The nice by-product was that as soon as you typed ‘@‘ you had a list of common email domains to select from. The original list was quite overwhelming, so I reduced it down to the more popular ones.

所以下一个迭代版本使用自动提示而不是自动完成。这会显示“hotmail.com”和“hotmail.co.uk”两者。而且如果输入工作email地址（如cxpartners.co.uk）也不会太烦人。副作用是，当你敲入“@”字符时，会有一个常用email域名列表待选。原始列表太长了，所以我只保留了更流行的项。

[![Default email list](http://www.cxpartners.co.uk/wp-content/uploads/2015/01/05-Auto-suggest.jpg)](http://www.cxpartners.co.uk/wp-content/uploads/2015/01/05-Auto-suggest.jpg)

I also added a spelling-correct feature (using a [crazy algorithm](http://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance)) with the assumption that this would help mop up any additional errors.

我还添加了拼写更正特性（使用了[疯狂算法](http://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance)），并假设它会除去其他错误。

[![Spelling correct suggestion](http://www.cxpartners.co.uk/wp-content/uploads/2015/01/06-Auto-correct.jpg)](http://www.cxpartners.co.uk/wp-content/uploads/2015/01/06-Auto-correct.jpg)

### Further work
### 进一步工作

The prototype doubtless needs further work and could be further optimised. The list of emails would probably need to be customised for different countries; the initial list of most popular emails could be populated based on real statistics. Also, the mobile view could be more space-efficient by displaying suggestions horizontally:

这个原型无疑需要进一步工作和优化。email列表可能需要根据国家来自定义；最流行的初始email列表可以根据真实统计结果来弹出。另外，手机视图可以水平显示，这样看起来更节省空间：

[![Horizontal auto-suggest](http://www.cxpartners.co.uk/wp-content/uploads/2015/01/07-Mobile-auto-suggest.jpg)](http://www.cxpartners.co.uk/wp-content/uploads/2015/01/07-Mobile-auto-suggest.jpg)

This auto-suggest idea has similarities with Chrome’s auto-fill feature. However, when I use this I always end up having to delete an address from five years ago. It also doesn’t work if you aren’t signed in to Google.

自动提示与Chrome的自动填充特性有些共同点。但是，我经常要删除5年前的地址。而且，如果登陆Google时也不工作。

But I guess the point isn’t about being an original idea – it’s about sharing thoughts and questioning best practice. Making these small changes can then make us all feel a bit more like Chris Hoy!
但是我想，这不是关于原创观点 - 而是分享和对最佳实践的挑战。这些小改动可以让我们像Chris Hoy一样高兴！（Chris Hoy是100年来首位在同届奥运会上赢得三面金牌的英国人。）
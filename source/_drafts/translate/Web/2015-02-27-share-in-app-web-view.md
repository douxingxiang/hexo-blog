The mobile web is weird in a myriad of ways, but one of the weirdest things about it is that if you have a lot of social traffic, your users aren’t actually viewing your mobile web site in a browser. Well, not quite. On iOS (and sometimes Android) they are in a web _view_, housed inside the Facebook or Twitter apps. After looking at this chart from Flurry you could be forgiven for assuming that the web is entirely dead:

无数情况下，手机web都很诡异，但其中最诡异的是，如果你拥有很多社交化流量，你的用户其实并没有通过浏览器浏览你的手机网站。好吧，不全对。在iOS（有时Android）中使用Facebook或Twitter应用的web _视图_组件。看了Flurry下面的一张图你可能会认为web几乎死掉了：

<figure id="18b4"><div><div> </div>![](https://d262ilb51hltx0.cloudfront.net/max/1600/1*Dg_lXjVXOz8M1IhYkfXF7Q.jpeg)</div><figcaption>via Flurry:[http://www.flurry.com/bid/109749/Apps-Solidify-Leadership-Six-Years-into-the-Mobile-Revolution](http://www.flurry.com/bid/109749/Apps-Solidify-Leadership-Six-Years-into-the-Mobile-Revolution#.VON_dGbwPdE)</figcaption></figure>

when in reality, people’s web usage is shifting from Safari to Facebook. (Unfortunately, only Facebook knows how much time is spent inside app views vs. web views, so we can’t draw any conclusions about the death of the web… yet.)

但事实上，人们的web使用正从Safari转到Facebook。（不幸的是，只有Facebook知道用户在应用和web视图上所花费的时间，我们完全没办法知道web是否死掉了。）

#### So what?
#### 那又如何？

I’ve [written before](https://medium.com/@_alastair/optimising-for-web-views-a577f89789ed) about the steps you can do to better serve users inside web views, but wanted to expand further on one point. These app web views are an island — they share no data or user information with each other, nor with Safari itself. That means that a user inside a Facebook web view is not logged into Twitter, and vice versa. It won’t surprise you to learn that many users give up on the idea of sharing your link when they are confronted with a login screen, so why not tailor their experience to only show relevant share buttons?

我[曾写过](https://medium.com/@_alastair/optimising-for-web-views-a577f89789ed)如何给web视图的用户提供更好的服务，但想补充一点。这些应用内的web视图是个孤岛 - 它们相互之间不分享数据或用户信息，也不跟Safari本身分享。这意味着Facebook web视图内的用户不会登陆到Twitter，反之亦然。你不会太惊讶，当很多用户面对登陆屏幕页时，他们就不再会分享链接，那么为什么不只展示相关的分享按钮呢？

This is especially important as many of these apps will hook into the share buttons on your site and show the native interface, not the web version. Just compare Twitter to Tumblr:

这是非常重要的，因为很多应用都会挂钩到网站上的分享按钮，然后显示本地界面而不是web版本的界面。比较下面Twitter和Tumblr：

<figure id="63db"><div><div> </div>![](https://d262ilb51hltx0.cloudfront.net/max/1600/1*dzAybXR5aR2Ryi6TP8o3_w.gif)</div></figure>

### User agent to the rescue
### 拯救user agent

All web browsers send a “user agent” when they request a web site — it’s a small identifier indicating what software you are using. Most of these app web views have customised their user agent, allowing us to detect them. Let’s compare the user agent of normal, vanilla Safari:

请求网页时，所有web浏览器都会发送“user agent” - 它是一小串标识符表明你所使用的软件。大部分应用的web视图都自定义了它们的user agent供我们检测。我们比较一下普通的Safari：

> Mozilla/5.0 (iPod touch; CPU iPhone OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B411 Safari/600.1.4

to that of Facebook:

和Facebook的：

> Mozilla/5.0 (iPod touch; CPU iPhone OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12B411**[FBAN/FBIOS;FBAV/24.0.0.12.7;FBBV/6890242;FBDV/iPod5,1;FBMD/iPod touch;FBSN/iPhone OS;FBSV/8.1;FBSS/2; FBCR/;FBID/phone;FBLC/en_US;FBOP/5]**

and Pinterest:

还有Pinterest：

> Mozilla/5.0 (iPod touch; CPU iPhone OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B411**[Pinterest/iOS]**

的user agent。

In amongst all that insanity, you’ll see that both networks have added some custom text of their own that we can detect.

在所有这些疯狂的标识符之中，我们可以看到两种网络都添加了我们可以检测的自定义文本。

#### Even when they don’t
#### 即使他们不知道

Some apps don’t alter their user agent — Twitter and Tumblr being two examples that immediately come to mind. But it’s not all bad news: all web views omit the “Safari/xxx.x.x” string at the end. If we combine that with referral data — another small piece of data indicating where the user came from — we can still get a _likely_ match.

有些应用不会改变它们的user agent - Twitter和Tumblr是两个例子。但也不全是坏消息：全部web视图都忽略了最后的“Safari/xxx.x.x”字符串。如果我们把这些跟参考数据（其他少量数据表明用户来自哪里）组合起来，我们仍然可以得到一个_可能的_匹配。

### Put it all together
### 总结一下

So, we can create a JS snippet that looks something like this:

所以我们创建了一个JS片段：

        var webviewProvider = (function() {
          if (/\/FBIOS/i.test(navigator.userAgent) === true) {
            return 'facebook';
          }
          if (/Twitter for/i.test(navigator.userAgent) === true) {
            return 'twitter';
          }
          if (/Pinterest\//.test(navigator.userAgent) === true) {
            return 'pinterest';
          }
          if (/\/\/t.co\//i.test(document.referrer) === true && /Safari\//.test(navigator.userAgent) === false) {
            return 'twitter';
          }
          if (/tumblr.com\//i.test(document.referrer) === true && /Safari\//.test(navigator.userAgent) === false) {
            return 'tumblr';
          }
          return null;
        })();

        if (webviewProvider !== null) {
          document.body.classList.add(webviewProvider);
        }

and then use CSS classes on the &lt;body&gt; tag to change which share buttons we show.

然后将CSS类用在<body>标签上来改变分享按钮。

### In conclusion
### 结论

Working inside web views like this is still extremely difficult, but there are small moments where you can use it to your advantage. So, do. That is, until Facebook [kills us all](http://www.niemanlab.org/2014/12/the-beginning-of-the-end-of-facebook-as-a-traffic-engine/).

处理类似这种web视图内部的工作依然非常困难，但是有些时候你可以加以利用。所以，这样做吧。直到Facebook[杀掉我们所有人](http://www.niemanlab.org/2014/12/the-beginning-of-the-end-of-facebook-as-a-traffic-engine/)。
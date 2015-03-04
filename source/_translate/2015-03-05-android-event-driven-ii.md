(This is the second article in a three-part series)
（真是三篇文章系列中的第二篇）

In the previous article we had a short introduction into Event-Driven programming. Now let’s see some actual code and how to perform the basics with EventBus.

前篇文章我们简短地介绍了事件驱动编程。现在我们看下EventBus中进行这些基本操作的实例代码。

First I will present the entities that play a central role in Event-Driven programming. Refer to the following image taken from the EventBus repository.

首先，我将展示事件驱动编程中扮演中心角色的实体。参考下面从EventBus仓库中取得的图片。

![event bus](https://d262ilb51hltx0.cloudfront.net/max/2000/1*h9fw9-AbGIqjEskbK-Rf6A.png)

An** Event Bus**. This is the central communication channel that connects all the other entities.

An **Event**. This is the action that will take place and can be literally anything (the application starting, some data being received, a user interaction…)

A **Subscriber**. The **Subscribers** are listening at the **Event Bus**. If they see an event circulating, they will be triggered.

A **Publisher**, which sends **Events** to the **Event Bus**.

Everything is clear with a practical view, so let’s see how this fits a basic example:

*   An application that loads two fragments.
*   The second fragment contains a **TextView** that will be updated when a button is clicked.
*   The **ActionBar** title will change when a new Fragment comes into scene.

#### The hosting Activity

The hosting Activity will need to register in its method onCreate the EventBus.
<pre>EventBus.getDefault().register(this);</pre>

The hosting Activity will be now ready to read data from the bus. We also need to unregister the bus in the method onDestroy
<pre>EventBus.getDefault().unregister(this);</pre>

The Activity will be capturing two different events: one to update the ActionBar title and another one to load the first fragment. We will write two methods onEvent that will handle the events:
<pre>public void onEvent(ShowFragmentEvent event) {
    getFragmentManager().beginTransaction().replace(R.id.container, event.getFragment()).addToBackStack(null).commit();
 }</pre><pre>public void onEvent(UpdateActionBarTitleEvent e) {
    getActionBar().setTitle(e.getTitle()); 
}</pre>

#### The Events

Each event needs to be declared in its class. The events can contain variables within them.
<pre>public final class ShowFragmentEvent {
 private Fragment fragment;</pre><pre>  public ShowFragmentEvent(Fragment fragment) {
    this.fragment = fragment;
  }</pre><pre>  public Fragment getFragment() {
    return fragment;
  }
}</pre>

#### The Fragments

We need now to create the fragments. The first Fragment will contain a button that opens the second, and the latest will contain a button that, when pressed, updates a TextView. The fragments also need to register and de-register the EventBus, so to achieve a cleaner structure everything will be encapsulated in a BaseFragment.

Now let’s create some more action. The first Fragment will open the second one with the following function:
<pre>&lt;a title="Twitter profile for @OnClick" href="http://twitter.com/OnClick" target="_blank" rel="nofollow" data-href="http://twitter.com/OnClick"&gt;@OnClick&lt;/a&gt;(R.id.first_button)
 public void firstButtonClick() {
    EventBus.getDefault().post(new ShowFragmentEvent(new SecondFragment()));
 }</pre>

Note that here I am using annotations from [ButterKnife](https://github.com/JakeWharton/butterknife). It produces a much cleaner and neater code. If you haven’t used it yet, you should start now.

The button of the second Fragment will send an event to the EventBus to change the TextView.
<pre>EventBus.getDefault().post(new UpdateTextEvent(getString(R.string.text_updated)));</pre>

The second Fragment also needs to listen to this event, so when it is received it can change the text accordingly.
<pre>public void onEvent(UpdateTextEvent event) {
    textView.setText(event.getTitle()); 
}</pre>

We have a basic application with two Fragments that communicate between them with Events, and a Fragment that gets updated through Events. I have uploaded the code to [GitHub](https://github.com/kikoso/eventbus-sample), so you can check it out and take a look.

A key question is how to escalate an Event-Driven architecture. In the next article I will propose a clean and understandable architecture to support Event-Driven programming in Android.
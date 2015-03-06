(This is the second article in a three-part series)
（这篇是三篇文章系列中的第二篇）

In the previous article we had a short introduction into Event-Driven programming. Now let’s see some actual code and how to perform the basics with EventBus.

前篇文章我们简短地介绍了事件驱动编程。现在我们看下EventBus中进行这些基本操作的实例代码。

First I will present the entities that play a central role in Event-Driven programming. Refer to the following image taken from the EventBus repository.

首先，我将展示事件驱动编程中扮演中心角色的实体。参考下面从EventBus仓库中取得的图片。

![event bus](https://d262ilb51hltx0.cloudfront.net/max/2000/1*h9fw9-AbGIqjEskbK-Rf6A.png)

An** Event Bus**. This is the central communication channel that connects all the other entities.

一个__事件总线__（Event Bus）。这是连接其他实体的中心通信通道。

An **Event**. This is the action that will take place and can be literally anything (the application starting, some data being received, a user interaction…)

一个__事件__（Event）。这是发生的动作，字面上可以是任何东西（应用启动，收到数据，用户交互...）。

A **Subscriber**. The **Subscribers** are listening at the **Event Bus**. If they see an event circulating, they will be triggered.

一个__订阅者__。__订阅者__监听__事件总线__。如果检测到事件发生，它将会触发。

A **Publisher**, which sends **Events** to the **Event Bus**.

一个__发布者__，将__事件__发送到__事件总线__。

Everything is clear with a practical view, so let’s see how this fits a basic example:

有代码有真相，下面看下一个简单例子：

*   An application that loads two fragments.
*   应用加载两个片段（fragment）。
*   The second fragment contains a **TextView** that will be updated when a button is clicked.
*   第二个片段包含一个__TextView__，按钮点击时将会更新。
*   The **ActionBar** title will change when a new Fragment comes into scene.
*   新的Fragment加到场景中时，__ActionBar__标题会变化。

#### The hosting Activity
#### 宿主Activity

The hosting Activity will need to register in its method onCreate the EventBus.

宿主Activity需要在onCreate方法中注册EventBus。

        EventBus.getDefault().register(this);

The hosting Activity will be now ready to read data from the bus. We also need to unregister the bus in the method onDestroy

宿主Activity现在准备好从总线中读取数据了。我们也可以在onDestroy中取消注册总线。

        EventBus.getDefault().unregister(this);

The Activity will be capturing two different events: one to update the ActionBar title and another one to load the first fragment. We will write two methods onEvent that will handle the events:

Activity可以捕获两种不同事件：一个更新ActionBar标题，另一个加载第一个片段。我们写两个onEvent来处理事件：

        public void onEvent(ShowFragmentEvent event) {
            getFragmentManager().beginTransaction().replace(R.id.container, event.getFragment()).addToBackStack(null).commit();
        }
        public void onEvent(UpdateActionBarTitleEvent e) {
            getActionBar().setTitle(e.getTitle()); 
        }

#### The Events
#### 事件

Each event needs to be declared in its class. The events can contain variables within them.

每个事件都需要在类中声明。事件中可以包含变量。

        public final class ShowFragmentEvent {
        private Fragment fragment;
        public ShowFragmentEvent(Fragment fragment) {
            this.fragment = fragment;
          }
        public Fragment getFragment() {
            return fragment;
          }
        }

#### The Fragments
#### 片段

We need now to create the fragments. The first Fragment will contain a button that opens the second, and the latest will contain a button that, when pressed, updates a TextView. The fragments also need to register and de-register the EventBus, so to achieve a cleaner structure everything will be encapsulated in a BaseFragment.

现在我们需要创建片段。第一个片段包含一个按钮，可以打开第二个；第二个包含一个按钮，点击会更新TextView。片段也需要注册和取消注册EventBus，为了结构更简洁，所有的东西将会封装在一个BaseFragment中。

Now let’s create some more action. The first Fragment will open the second one with the following function:

现在我们来创建更多动作。第一个Fragment将会打开第二个，函数如下：

        @OnClick(R.id.first_button)
        public void firstButtonClick() {
            EventBus.getDefault().post(new ShowFragmentEvent(new SecondFragment()));
        }

Note that here I am using annotations from [ButterKnife](https://github.com/JakeWharton/butterknife). It produces a much cleaner and neater code. If you haven’t used it yet, you should start now.

注意，这里我使用了[ButterKnife](https://github.com/JakeWharton/butterknife)表示法。它可以生成更简洁的代码，如果你还没用过，现在开始用吧。

The button of the second Fragment will send an event to the EventBus to change the TextView.

第二个Fragment中的按钮将会向EventBus发送一个事件来改变TextView。

        EventBus.getDefault().post(new UpdateTextEvent(getString(R.string.text_updated)));

The second Fragment also needs to listen to this event, so when it is received it can change the text accordingly.

第二个Fragment也需要监听这个事件，这样它收到事件时，可以相应改变文本。

        public void onEvent(UpdateTextEvent event) {
            textView.setText(event.getTitle()); 
        }

We have a basic application with two Fragments that communicate between them with Events, and a Fragment that gets updated through Events. I have uploaded the code to [GitHub](https://github.com/kikoso/eventbus-sample), so you can check it out and take a look.

我们创建了一个包含两个Fragment的基本应用，它们通过事件通信，其中一个通过事件来更新。我已经把代码提交到[GitHub](https://github.com/kikoso/eventbus-sample)上，你可以检出看看。

A key question is how to escalate an Event-Driven architecture. In the next article I will propose a clean and understandable architecture to support Event-Driven programming in Android.

关键问题是怎么提升一个事件驱动架构。下篇文章我将提出一个简洁易懂的架构，来支持Anroid中的事件驱动编程。
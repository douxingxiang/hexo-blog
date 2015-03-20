title: 同时跳地图和打开面板的BUG
date: 2015-03-20 13:11
tags: ActionScript
---

## 描述

如果跳转地图的同时打开面板，或者两个动作时间相近的话，可能会卡星空。因为跳地图会清空app层，打开面板会清除地图层和工具层，这样地图层、工具层、app层的元件都没有，只有背景层（星空）可见。

## 分析

跳地图`MapManager.changeMap`的大概过程：

1. 加载地图
        
        new MapModel(_newMapID, !_isLogin, _isShowLoading)

2. 初始化地图功能`MapManager.initMapFunction`，地图切换

        var mte:MapTransEffect=new MapTransEffect(_mapModel, _dir);
        mte.addEventListener(MapEvent.MAP_EFFECT_COMPLETE, function(e:MapEvent):void
        {
            mte.removeEventListener(MapEvent.MAP_EFFECT_COMPLETE, arguments.callee);
            DisplayUtil.removeAllChild(LevelManager.appLevel);
            //ModuleManager.hideAllModule();
            DisplayUtil.removeAllChild(LevelManager.mapLevel);
            LevelManager.mapLevel.addChild(_mapModel.root);
        });
        mte.star();

    `DisplayUtil.removeAllChild(LevelManager.appLevel)`会把app层的所有面板清除掉，`LevelManager.mapLevel.addChild(_mapModel.root)`会把新地图层显示出来

打开面板`ModuleManager.showModule`的流程：

1. 加载面板
        
        app = new AppModel(url,title);

2. 面板`show`
        
        app.show();

    面板的`show`或者`setup`里面一般会有
        
        LevelManager.showOrRemoveMapLevelandToolslevel(false);

    会把地图层、工具层、图标层隐掉

如果同时切地图和打开面板，即在地图未切换完成之前开面板，地图切换效果完成后会清除app层，面板打开之后会隐藏地图层，导致大家都不在显示列表。

## 解决

要解决的问题

> 跳地图之前要清除的应该是当时的app层上的面板，不应该清除正在加载中的面板

__第一种：__
在`LevelManager.showOrRemoveMapLevelandToolslevel`中添加：
        
        if(MapManager.currentMap && !DisplayUtil.hasParent(MapManager.currentMap.root))
        {//如果新地图还在切换动画过程中，没有添加到显示列表，先不要清除地图层，不然可能会卡星空
            return;
        }

这样同时操作会显示出来地图，面板是不能打开的。

__第二种：__
把`DisplayUtil.removeAllChild(LevelManager.appLevel); `放到外面去。

        DisplayUtil.removeAllChild(LevelManager.appLevel);
            //地图切换效果
            var mte:MapTransEffect=new MapTransEffect(_mapModel, _dir);
            mte.addEventListener(MapEvent.MAP_EFFECT_COMPLETE, function(e:MapEvent):void
            {
                mte.removeEventListener(MapEvent.MAP_EFFECT_COMPLETE, arguments.callee);
                //ModuleManager.hideAllModule();
                DisplayUtil.removeAllChild(LevelManager.mapLevel);
                LevelManager.mapLevel.addChild(_mapModel.root);
            });
            mte.star();

可以解决地图切换效果产生的异步问题，但是不能解决地图加载过程产生的异步问题。

__第三种：__
    
        DisplayUtil.removeAllChild(LevelManager.appLevel);
        _mapModel=new MapModel(_newMapID, !_isLogin, _isShowLoading);       
在加载地图之前就清理app层，防止产生这种异步问题。
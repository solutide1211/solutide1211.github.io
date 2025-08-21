---
title: 使用 Swiper 实现 Flutter 轮播图
description: 详解如何使用 flutter_swiper_view 插件在 Flutter 中实现自动轮播图，包含自动播放、分页指示器、常见错误解决方案。
author: solutide
category: Flutter
tags:
  - Flutter
  - 轮播图
  - Swiper
  - flutter_swiper_view
  - UI
  - PageView
date: 2025-08-21
hiddenCover: true
---
# 使用`Swiper`实现轮播图

## 核心依赖库

```yaml
# pubspec.yaml
dependencies:
  flutter_swiper_view: ^1.1.8
```

>安装后执行`flutter pub get`

## 二、基本结构

使用`Swiper`组件实现横向轮播图，通常嵌套在`Scaffold` ->` SafeArea`  -> `Column`

```dart
Scaffold(
  body: SafeArea(
    child: Column(
      children: [
        // 轮播图区域
        SizedBox(
          height: 180,
          child: Swiper(...),
        ),
      ],
    ),
  ),
)
```

## 三、关键代码解析

### 1.外层容器：`SizedBox`限制高度

```dart
SizedBox(
  height: 180,
  child: Swiper(...),
)
```

- 必须设置高度，否则报错：`Horizontal viewport was given unbounded height`
- 原因：`Swiper`底层使用`PageView`，在`Column`中无法自适应高度
- 高度建议：略大于轮播项内容高度 + margin

### 2. `Swiper` 核心参数

|                  |                                        |
| ---------------- | -------------------------------------- |
| `itemCount: 3`   | 轮播图总页数（3 张图片/页面）          |
| `itemBuilder`    | 构建每一页的回调函数，返回一个`Widget` |
| `autoplay: true` | 开启自动轮播（可选）                   |
| `pagination`     | 显示页码指示器（圆点）                 |

### 3. `itemBuilder`：构建每一页

```dart
itemBuilder: (context, index) {
  return Container(
    margin: EdgeInsets.all(15),
    height: 150,
    color: Colors.lightBlue,
    child: Center(
      child: Text(
        'Slide $index',
        style: TextStyle(fontSize: 20, color: Colors.white),
      ),
    ),
  );
},
```

- ✅ `index`：当前页索引（0, 1, 2）
- ✅ 必须返回一个 `Widget`，否则编译报错
- ✅ `margin`：让轮播项与边缘留白
- ✅ `height`：设置内容高度（需与 `SizedBox` 高度配合）

四、完整代码示例

```dart
import 'package:flutter/material.dart';
import 'package:flutter_swiper_view/flutter_swiper_view.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            // 轮播图区域
            SizedBox(
              height: 180,
              child: Swiper(
                itemCount: 3,
                itemBuilder: (context, index) {
                  return Container(
                    margin: EdgeInsets.all(15),
                    height: 150,
                    color: Colors.lightBlue,
                    child: Center(
                      child: Text(
                        'Slide $index',
                        style: TextStyle(fontSize: 20, color: Colors.white),
                      ),
                    ),
                  );
                },
                autoplay: true,
                pagination: SwiperPagination(
                  builder: DotSwiperPaginationBuilder(
                    activeSize: 10,
                    space: 6,
                  ),
                ),
              ),
            ),
            // 其他内容...
          ],
        ),
      ),
    );
  }
}
```

## 五、常见问题与解决方案

| 问题                   | 原因                           | 解决方案                                    |
| ---------------------- | ------------------------------ | ------------------------------------------- |
| `unbounded height`错误 | `Swiper`在`Column`中无高度限制 | 用`SizedBox`或`Container`包裹并设置`height` |
| 页面不显示             | `itemBuilder`未返回`Widget`    | 确保`return`一个`Widget`                    |
| 指示器不显示           | 未配置`pagination`             | 添加`SwiperPagination()`                    |
| 自动轮播不工作         | 未开启`autoplay`               | 设置                                        |
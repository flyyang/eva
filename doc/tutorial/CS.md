# 使用 code spliting 优化性能

### 代码拆分是什么？

* webpack 最重要的功能之一。
* 目的是将你的代码拆分成小块，并且可以控制加载。
* 性能优化的重要手段。

### 代码拆分如何做

通常代码拆分可以分为以下下三种：

1. 通过 entry 拆分。
2. 通过 SplitChunksPlugin 抽取公共部分。
3. 通过 dynamic import 拆分。

前两种与 sdk 开发流程不相关，这里只说 第三种。

以主站右侧活动挂件为例。每一个按钮需要点击才能显示具体活动内容。

那么理想情况下，首次加载只需要加载按钮本身即可。这种功能就可以使用动态加载来实现。

```
// 目录结构
src/module/hd-a.js
src/module/hd-b.js
```

```

const getHdByName = ( name) => import(`src/module/${name}`)

$('hd').click(() => {
  // 获取当前活动，对应文件名 hd-a
  const name = getCurrentHd()
  getHdByName(name)
})
```

通过以上代码就实现了将隐藏功能拆分到了额外的 bundle 里。这些bundle 不会随着 sdk
初始化打进去。

```
webpack 如何实现的呢？我们知道动态加载也需要静态分析。import 内不能传递变量。

观察`src/module/${name}`, 这时候 webpack 会将 src/module 下的所有文件变成 bundle。

eva 默认会将这些 bundle 传递到CDN。然后在 click 的时候加载到页面来。

```

### 更进一步

由上面的例子可以看出，代码是在 click 时加载进来的。此时相关的 css 才会引入进来。
会有一种白屏的感觉。

可以有两种解决方案：

- 使用 eva 的 extractCss 选项，将 css 单独维护。

抽离 css 的好处是，直接解决了白屏问题。

缺点是:

1. 需要维护多个 url, 以前只需要一个 sdk url。
2. 代码变大了，css 没有`拆出去`。

并不是最佳方案。

- 使用 prefetch

prefetch 的作用是，在浏览器不忙的间隙，加载你的文件。

以活动挂件为例，用户进来通常不会直接点击活动。这个时候，可以让浏览器预先将我们
拆分出去的 bundle 拉到本地缓存，加快渲染速度。

缺点是无法解决当页面进来时就需要展示活动的场景，会有一个白的过程。但是我们的页
面同时也在加载, 在变化的过程，似乎也是可以接受的。

由此可见，做一个项目，要权衡很多方面。

```
// prefetch 的用法示例

const getHdByName = ( name) => import(/* webpackPrefetch: true */ `src/module/${name}`)

```

- 不使用代码拆分

不使用代码拆分,除了享受不到以上的好处外，还会带来一些维护的问题：

1. 活动越来越多，打出的 sdk 越来越大。
2. 旧的代码需要迁走，过期的活动需要下线。

对于代码拆分来说，由于业务都在 bundle 里，或者说在 cdn 内，不需要移除旧代码。

### 总结

代码拆分是 webpack 的功能，所以 eva 也好，muse 也好，上面的思想都适用。

这种技术通常用于非首屏使用的功能，可以延迟加载的功能点。找好拆分点，可以大大优化
你的页面性能。


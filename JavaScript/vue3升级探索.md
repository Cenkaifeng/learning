<!-- TOC -->

- [前言](#前言)
- [Vue 3.0 vs Vue 2.x](#vue-30-vs-vue-2x)
  - [开发体验](#开发体验)
    - [可阅读性](#可阅读性)
    - [逻辑复用](#逻辑复用)
    - [可维护性](#可维护性)
    - [速度更快的构建工具](#速度更快的构建工具)
- [渲染性能](#渲染性能)
- [源码体积](#源码体积)
- [周边生态](#周边生态)
- [兼容性](#兼容性)
- [总结](#总结)

<!-- /TOC -->

# 前言
近期 Vue 发布 3.0 版本，在发布前后，我们藤蔓技术部前端组通过官方声明、官方文档、作者解说、社区等不同渠道了解 Vue 3 的新特性，以及 Vue 当前整个生态的动态。

首先，我们肯定 Vue 3.0 是做了很不错的优化，尤其是在渲染速度、包体积的减少、TypeScript 的支持等等。

其次，我们分析了 Vue 3.0 的整个新的开发方式和它的周边插件体系，结合我们当前项目的技术栈和未来将要展开开发的项目进行更深层次的探索。

最后，我们会根据探索的内容，得出关于“当前是否会升级 Vue 3.0 技术栈”、“如果升级，什么时候升级”、”哪些项目会升级“等等的问题进行总结。

# Vue 3.0 vs Vue 2.x
这一段落，我们分别从开发体验、渲染性能、源码体积、周边生态、兼容性，这 5 个方面去分析新旧 Vue 版本。

## 开发体验
开发体验，我们从更快捷的工具、代码可维护性、代码可读性以及代码复用去分析。

### 可阅读性
Vue 2.x 的时候，除了使用 Class 写法，编写组件本质就是在编写一个“包含了描述组件选项的对象”。Options API 的设计是基于选项（`data`、`computed`、`methods`、`watch`）形式组织逻辑，而组件在变得更大时，**逻辑关注点**的列表会变成导致组件难以阅读和理解，尤其是对于那些没有参与编写这些组件的人来说。

<p align=center><img src="http://ww1.sinaimg.cn/large/68307314gy1gjqhwzq1wmj207a0s8777.jpg"></p>


这种碎片化使得理解和维护复杂组件变得困难。选项的分离掩盖了潜在的逻辑问题。此外，在处理单个逻辑关注点时，我们必须不断地“跳转”相关代码的选项块


Vue 3.0 提供了一种新的 API，Composition API 使我们能够更好做到将同一个逻辑关注点相关的代码配置在一起。

此模式可用于该组件的所有其它逻辑关注点，最终成为一些良好解耦的函数:

<p align=center><img src="http://ww1.sinaimg.cn/large/68307314gy1gjqi77pb6jj20xc0xd79l.jpg"></p>

每个逻辑关注点的代码现在都被组合进了一个组合函数。这大大减少了在处理大型组件时不断“跳转”的需要。

### 逻辑复用
当我们开发项目变得复杂的时候，免不了需要抽象出一些复用的逻辑。
在 Vue 2.x 中，我们常用`mixins`去复用逻辑，举一个监听鼠标位置的例子，我们会编写如下函数 mousePositionMixin
```js
// mouse.js
const mousePositionMixin = {
  data() {
    return {
      x: 0,
      y: 0
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.update)
  },
  destroyed() {
    window.removeEventListener('mousemove', this.update)
  },
  methods: {
    update(e) {
      this.x = e.pageX
      this.y = e.pageY
    }
  }
}
export default mousePositionMixin

// 组件使用时
<template>
  <div>
    Mouse position: x {{ x }} / y {{ y }}
  </div>
</template>
<script>
import mousePositionMixin from './mouse'
export default {
  mixins: [mousePositionMixin]
}
</script>
```
使用单个 mixin 似乎问题不大，但是当我们一个组件混入大量不同的`mixins`的时候，会存在两个非常明显的问题：命名冲突和数据来源不清晰。

首先每个 mixin 都可以定义自己的`props`、`data`，它们之间是无感的，所以很容易定义相同的变量，导致命名冲突。另外对组件而言，如果模板中使用不在当前组件中定义的变量，那么就会不太容易知道这些变量在哪里定义的，这就是数据来源不清晰。但是 Vue 3.0 设计的 Composition API，就很好地帮助我们解决了 mixins 的这两个问题。

我们来看一下在 Vue 3.0 中如何书写这个示例：
```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'
export default function useMousePosition() {
  const x = ref(0)
  const y = ref(0)
  const update = e => {
    x.value = e.pageX
    y.value = e.pageY
  }
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })
  return { x, y }
}

// 组件使用时
<template>
  <div>
    Mouse position: x {{ x }} / y {{ y }}
  </div>
</template>
<script>
import useMousePosition from './mouse'
export default {
  setup() {
    const { x, y } = useMousePosition()
    return { x, y }
  }
}
</script>
```
可以看到，整个数据来源清晰了，即使去编写更多的组合函数，也不会出现命名冲突的问题。

### 可维护性
Vue 3.0 从 Flow 迁移到 TypeScript。而 TypeScript 是 JavaScript 的超集，在 JavaScript 基础上引入类型检测、自动补全，不仅减少 bug 的产生，还可以规范一些借口的定义。


### 速度更快的构建工具
在 Vue 3.0 发布之前，Vue 作者在一些分享会上面提及到新的构建工具 Vite。

> 面向现代浏览器的一个更轻、更快的 Web 应用开发工具，基于 ECMAScript 标准原生模块系统（ES Modules）实现。

也就是说，Vite 之所以快，是因为不需要经过原来 webpack 所需要的编译、构建过程，直接利用浏览器原生的 module 解析能力进行拓展。尤其是配合 TypeScript 代码时，使用 [esbuild](https://docs.breword.com/evanw-esbuild/) 对比 TypeScript 官方编译工具 tsc 的编译速度差距更为明显。

更多详情参考成员 Jervis 的文章《[Vite 原理与 webpack 比较 & 优势分析](https://app.yinxiang.com/fx/3f921042-ef11-449d-b457-aab28abc782c)》

# 渲染性能
在 Vue 3.0 正式进入 alpha 版本前夕，作者尤雨溪曾在视频分享上讲述到 Vue 3.0 和 Vue 2.x 在渲染性能上面的优势：

![performance](http://ww1.sinaimg.cn/large/68307314gy1gjra7gd357j20su0g83zs.jpg)

而我们通过一些社区水友编写的 [demo](https://github.com/shengxinjing/vue3-vs-vue2) 进行实测，主要是初次渲染（挂载 mount）和更新（update）两个点：
- 挂载
![vue2-mount-performance](http://ww1.sinaimg.cn/large/68307314gy1gjrasr458uj20su06874v.jpg)
![vue3-mount-performance](http://ww1.sinaimg.cn/large/68307314gy1gjrasymh7aj20su07dwf6.jpg)

- 更新
点击 shuffle 重排数据
![vue2-update-performance](http://ww1.sinaimg.cn/large/68307314gy1gjrau5drxpg20dw07cdg4.gif)
![vue3-update-performance](http://ww1.sinaimg.cn/large/68307314gy1gjrau9wf0xg20dw07cmxf.gif)

从动态图看到大概有 50% 稍微波动，而且统计的时机是在 DOM 更新之后的时间。

所以，不论 DOM 操作耗时，Vue 3.0 较之 Vue 2.x 大约有 100% 的性能提升。

社区还有更直观、更系统的 benchmark 提供参考：
https://krausest.github.io/js-framework-benchmark/current.html

# 源码体积
Vue 3.0 在源码体积的减少方面做了哪些工作呢？

- 首先，移除一些冷门的 feature（比如 filter、inline-template 等）；
- 其次，引入 tree-shaking 的技术，减少打包体积。

我们从更新迭代、兼容性的角度出发，结合我们项目都是使用运行时 runtime，官方提供的完整包 v3.0 对比 v2.6.12。
结果显示，v2.6.12 比 v3.0 要稍大一些：
![v2.png](http://ww1.sinaimg.cn/large/68307314gy1gjrbu8sdlyj20tp0jyjsl.jpg)
![v3.png](http://ww1.sinaimg.cn/large/68307314gy1gjrbtotxazj20te0iogmn.jpg)

但是，正如刚才所说，我们可以利用 tree-shaking 技术，如果在项目中没有引入一些原生组件、`provide/inject` 等等方法将会被 tree-shaking 优化掉，这样就间接达到减少项目引入的 Vue 包体积的目的。

# 周边生态
周边生态，指的是我们常说的“Vue 全家桶”，包括 Vue Router、Vuex、Vue devtools、Vue Cli。

而目前的情况是：
Vue Router 处在 Beta 阶段，部分 API 有所变动，提供了迁移文档（英）。
Vuex 也处在 Beta 阶段，API 基本不会变动，提供了迁移文档（英）
Vue devtools 配合 Vue 3.0，更新到 Beta 版本，并且上线到插件市场。
Vue Cli 提供了 Vue 3.0 的支持，或者可以使用 Vite 替代。

总体来说，周边生态同步更新迅速，且都已经进入 Beta 阶段，很快就会发布正式版本，我们可以持续留意更新状况。

# 兼容性
当前 Vue 3.0 版本不兼容 IE 11，包括我们项目常碰到的安卓浏览器版本 4.3 也不被兼容。 

是因为利用了新的 ES 语法 Proxy 作为核心响应式系统的基础，而暂时放弃一些兼容性支持。

我们了解到的是，后续 Vue 3.x 会把 IE 11 作向下兼容，所以 Vue 并不会为了突破性的新技术而抛弃广泛的用户群体。

所以，很可惜 WIC、Mobile 向的项目，我们暂时无法立刻迁移到 Vue 3.0。
而目前，能迁移到 Vue 3.0 的项目只有 PC 端的内容站以及后续 PC 相关的项目。


# 总结
我们对上面提到的一些分析做了对比：

| 对比项 | Vue 3 | Vue 2 |
| :---: | :---: | :---: |
| 开发体验 | 优秀 | 良好 |
| 渲染性能 | 优秀 | 良好 |
| 源码体积 | 优秀 | 优秀 |
| 周边生态  | 良好 | 优秀 |
| 兼容性 | 一般 | 优秀 |


Vue 2.x 的发展经历比较长的时间，用户众多，周边生态已经非常完善。

无论从开发体验、渲染性能方面，我们无法否认 Vue 3.0 这样的新技术革新是非常吸引。

但是，基于当前版本的兼容性、稳定性考虑下升级 Vue 3.0 是重大的突破，需要组员共同学习、需要改代码、需要升级周边生态，可能还需要承担一定的风险。

最后，我们针对文章开头提到的几个问题进行回答：
- **当前是否会升级 Vue 3.0 技术栈？**
  当前可以考虑小范围升级。
  
- **如果升级，什么时候升级？**
  最好的需要等待 Vue 3.x 发布兼容性版本，以及周边生态发布正式版，且逐步趋于稳定之后再迁移更新。

- **哪些项目会升级？**
  优先升级小型的 PC 方向的项目 ，如内容站。后续会对资源中心、社区、个人中心等项目再作升级的考虑。

<!-- TOC -->

- [1. 行内元素和块级元素](#1-行内元素和块级元素)
- [2. 什么是语义化](#2-什么是语义化)
- [3. 为什么要语义化](#3-为什么要语义化)
- [4. `<strong>` 和 `<b>` 有什么区别](#4-strong-和-b-有什么区别)
- [5. `<em>` 和 `<i>` 有什么区别](#5-em-和-i-有什么区别)
- [6. H5 有什么新增的语义元素](#6-h5-有什么新增的语义元素)
- [7. HTML5 的新特性](#7-html5-的新特性)
- [8. href 和 src 有什么区别](#8-href-和-src-有什么区别)
- [9. meta 标签有哪些属性，作用是什么](#9-meta-标签有哪些属性作用是什么)
- [10. meta 的属性](#10-meta-的属性)
- [11. viewport 有哪些参数，分别是什么作用](#11-viewport-有哪些参数分别是什么作用)
- [12. http-equive 属性的作用和参数](#12-http-equive-属性的作用和参数)

<!-- /TOC -->
# 1. 行内元素和块级元素
行内元素：a、span、input、strong、img、select、b、i、u、em
块级元素：div、h1-h6、p、ul、ol、table、header、aside、footer、main、section、nav、article

区别：
  1. 块级元素独占一行，其宽度自动填满其父元素宽度
   行内元素不会独占一行，相邻的行内元素会排列在一行里，宽度随内容而变化
  2. 块级元素可以设置 width、heigth
     行内元素设置 width、height 无效
  3. 块级元素可以设置 margin 和 padding
     行内元素设置水平方向的 margin padding 有效，而垂直方向的 margin、padding 无效
  4. 块级元素可以包含行内元素和块级元素，块级元素可以直接嵌套块级元素，但 p 标签不能嵌套 div 标签
     行内元素不能嵌套行内元素

# 2. 什么是语义化
是指根据内容结构化，选择合适的标签，便于开发者阅读和写出更加优雅的代码，同时让浏览器的爬虫和机器很好地解析。

# 3. 为什么要语义化
- 便于修改和维护
- 搜索引擎友好，利于 SEO
- 无障碍阅读支持

# 4. `<strong>` 和 `<b>` 有什么区别
两者在表现上都以加粗形式展示。
`<strong>`：表示文本的重要性，特别强调
`<b>`：仅为了使文本加粗展示，没有表达任何特殊的重要性和相关性

# 5. `<em>` 和 `<i>` 有什么区别
两者都显示为斜体的效果，但是含义不同。
`<em>`：表示强调的文本。以强调加钟的语气来读词句
`<i>`：表示因为某种原因和正常文本不同，如专业术语或排版用的问题

# 6. H5 有什么新增的语义元素
`<header>`：网页的页眉。
`<nav>`：导航栏。
`<aside>`：侧边栏或附注。
`<section>`：页面主体的区块，或者文章的“节”或“段”。
`<main>`：表示页面的主体内容。
`<article>`：完整的文章或者一个完整的内容块。
`<footer>`：网页的页脚。

# 7. HTML5 的新特性
- 标签：新增语义化标签，增加多媒体标签`<video>`和`audio`，以及绘图标签`<svg>`和`<canvas>`
- 属性：表单增强，为`<input>`添加了更多 type 属性。
- 存储：增加 `localStorage`、`sessionStorage`和`IndexedDB`
- 其他：增加`拖放 API`、`地理定位`、`Web Worker`、`WebSocket`

# 8. href 和 src 有什么区别
`href`：超文本引用。当浏览器遇到`href`时，会并行下载资源，不会阻塞页面解析，比如使用`<link>`标签引入 CSS。
`src`：资源。当浏览器遇到 `src` 时，会暂停页面解析，直到资源下载或执行完毕。因此，性能优化时会建议`<script>`放在 body 底部。

# 9. meta 标签有哪些属性，作用是什么
`<meta>`标签用于描述网页的元信息，如作者、描述、关键词。它不会显示在网页上，但是会被浏览器、搜索引擎或者其他 web 服务读取到。

# 10. meta 的属性
- content（必要属性）
    当有 http-equiv 或 name 属性的时候，一定要有 content 属性对其进行说明。例如：
    ```html
    <meta name="keywords" content="HTML,ASP,PHP,SQL">
    ```
- name（可选属性）
    常用属性，供浏览器进行解析，表明 content 对应的需要解析的属性是什么。
    ```html
    <meta name="viewport" content="width=device-width, initial-scale=1.0.">
    ```

- charset（可选属性）
    定义 HTML 文档的字符集。
    ```html
    <meta charset="UTF-8">
    ```

- http-equiv（可选属性）
    用于添加 HTTP 头部内容，对于一些自定义的，或者需要额外添加 HTTP 头部内容，需要发送到浏览器中，就可以使用这个属性。
    可以设置过期时间、缓存、刷新、cookie 等。

其他不同的 name 值，参考 《[meta标签的作用及整理](https://juejin.cn/post/6844904083296370702#heading-7)》

# 11. viewport 有哪些参数，分别是什么作用
- width/height：宽高，默认宽度 980px
- initial-scale：定义设备宽度，0.0 ~ 10.0 之间取值
- maximum-scale/minimum-scale：允许用户缩放的最大/小比例
- user-scalable：用户是否可以缩放（yes/no）
- viewport-fit：网页在可视窗口的布局方式，三个值分别为：
  - contain：可视窗口完全包含网页内容（左图）
  - cover：网页内容完全覆盖可是窗口（右图）
  - auto：默认值，跟 contain 表现一直
  ![viewport-fit.png](http://ww1.sinaimg.cn/large/68307314gy1gnhcq6uynzj20rq0f2dgb.jpg)

# 12. http-equive 属性的作用和参数
- Expires：指定过期时间
  ```html
  <meta http-equive="Expires" content="Wed, 20 Jun 2007 22:33:00 GMT">
  <!-- 设置每次访问都需要请求最新的 HTML 代码 --> 
  <meta http-equive="Expires" content="0">
  ```
- Pragma：设置 no-cache 可以禁止缓存
  ```html
  <meta http-equive="Pragma" content="no-cache">
  ```
- Refresh：定时刷新
  ```html
  <!-- 数字 2 是指 2 秒钟后自动刷新到新 的URL 地址 -->
  <meta http-equive="Refresh" content="2; URL=http://github.com/">
  ```
- Set-Cookie：如果网页过期，那么 cookie 将被清除
  ```html
  <meta http-equive="Set-Cookie" content="cookie=value; expires=Wed, 20 Jun 2007 22:33:00 GMT; path=/">
  ```
  
- Window-target：强制页面在当前窗口以某种形式显示
  取值：
  - _blank：在新窗口显示
  - _top：当前整个窗口显示
  - _self：当前容器显示
  - _parent：父容器显示
  ```html
  <meta http-equiv="Window-target" content="_top">
  ```

- Content-Type：设置页面使用的字符集
  ```html
  <meta http-equiv="Content-Type" content="text/html; charset=gb2312">
  ```

- [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)：定义页面的内容策略，防止跨站点脚本攻击
  ```html
  <meta http-equiv="Content-Security-Policy" content="default-src https:">
  ```

- X-UA-Compatible：指定浏览器版本
  ```html
  <meta http-equive="X-UA-Compatible" content="IE=edge">
  ```


# 1. 盒模型
## 1.1 概念
盒模型（Box Model），包含了内容（content）、内边距（padding）、边框（border）、外边距（margin），而盒模型有标准盒模型和怪异（IE）盒模型。

## 1.2 标准盒模型和 IE 盒模型
- 标准盒模型：width = 内容宽度（content） + border + padding
- IE 盒模型：width = 内容宽度（content + padding + border）

## 1.3 CSS 设置两种模型
通过`box-sizing: content-box | border-box`分别设置盒模型为标准盒模型`content-box`和 IE 盒模型 `border-box`


# 2. BFC
## 2.1 概念
块格式化上下文（Block Formatting Context，BFC）是页面仲的一块渲染区域，并且有一套渲染规则，它决定子元素将如何定位，以及和其他元素的关系。

**具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。**

## 2.2 触发 BFC
只要元素满足以下任一条件即可触发 BFC 特性：
- 根元素（`<html>`）
- 浮动元素（元素的`float` 不是`none`）
- 绝对定位元素（元素的`position`为`absolute`或` fixed`）
- 元素的`display`不是`block`
- 元素的`overflow`不是`visible`

# 3. flex 布局
## 3.1 什么是 flex
flex 是 flexible Box 的缩写，意思是“弹性布局”，用来为盒状模型提供最大的灵活性。
```css
.box {
    display: flex;
    display: inline-flex;
    display: -webkit-flex; /* Safari */
}
```
注意，设置 flex 布局后，子元素的`float`、`clear`和`verticle-align`属性将会失效

## 3.2 基本概念
采用 flex 布局的元素，称为“容器”。所有子元素自动成为容器成员，称为“项目”。
容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做 main start，结束位置叫做 main end；交叉轴的开始位置叫做 cross start，结束位置叫做 cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做 main size，占据的交叉轴空间叫做 cross size。

## 3.3 容器的属性
以下 6 个属性设置在容器上：
> - `flex-direction`
> - `flex-wrap`
> - `flex-flow`
> - `justify-content`
> - `align-items`
> - `align-content`

### 3.3.1 flex-direction
`flex-direction`决定主轴的额方向（即项目的排列方向）。
```css
.box {
    flex-direction: row | row-reverse | column | column-reverse
}
```
四个值分别代表：
> - row（默认）：主轴水平方向，起点在左
> - row-reverse：主轴水平方向，起点在右
> - column：主轴垂直方向，起点在上
> - column：主轴垂直方向，起点在下

### 3.3.2 flex-wrap
默认情况下，项目都排在一条线上。`flex-wrap`定义了如果一条轴线排不下，项目该如何换行。
```css
.box {
    flex-wrap: nowrap | wrap | wrap-reverse
}
```
三个值分别代表：
> - nowrap（默认）：不换行
> - wrap：换行，第一行在上方
> - wrap-reverse：黄航，第一行在下方

### 3.3.3 flex-flow
`flex-flow`是`flex-direction`和`flex-wrap`的简写形式，默认值是`row nowrap`。
```css
.box {
    flex-flow: <flex-direction> || <flex-wrap>
}
```

### 3.3.4 justify-content
`justify-content`定义了项目在主轴（水平方向）上的对齐方式。
```css
.box {
    justify-content: flex-start | flex-end | center | space-between | space-around
}
```
五个取值分别是：
> - flex-start（默认值）：左对齐
> - flex-end：右对齐
> - center：居中
> - space-between：两端对齐，项目之间的间隔都相等
> - space-around：每个项目两侧之间的像个都相等。所以，项目之间的间隔比项目与边框的间隔大一倍

### 3.3.5 align-items
`align-items`定义项目在交叉轴上如何对齐。
```css
.box {
    align-items: flex-start | flex-end | center | baseline | stretch
}
```
五个取值分别是：
> - flex-start：交叉轴的起点对齐
> - flex-end：交叉轴的终点对齐
> - center：交叉轴的中点对齐
> - baseline：项目的第一行文字的基线对齐
> - stretch（默认）：如果项目未设置高度或设置为 auto，将占满整个容器高度

### 3.3.6 align-content
`aligin-content`定义多根轴线的对齐方式。
```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch
}
```
六个取值分别是：
> - flex-start：与交叉轴的起点对齐
> - flex-end：与交叉轴的终点对齐
> - center：与交叉轴的中点对齐
> - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布
> - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
> - stretch（默认）：轴线占满整个交叉轴

## 3.4 项目的属性
以下 6 个属性设置在容器上：
> - `order`
> - `flex-grow`
> - `flex-shrink`
> - `flex-basis`
> - `flex`
> - `align-self`

### 3.4.1 order
`order`定义项目的排列顺序。数值越小，排列越靠前，默认为 0。
```css
.item {
  order: <integer>;
}
```
### 3.4.2 flex-grow
`flex-grow`定义项目的放大比例，默认为 0。即如果存在剩余空间，也不放大。
```css
.item {
    flex-grow: <number> /* 默认为 0 */
}
```
如果所有项目的`flex-grow`都为 1，则他们将等分剩余空间。如果一个项目的`flex-grow`属性为 2，其他项目为 1，则前者占据的剩余空间都将比其他项目多一倍。

### 3.4.3 flex-shrink
`flex-shrink`定义项目的缩小比例，默认为 1。即如果空间不足，该项目将缩小。
```css
.item {
    flex-shrink: <number> /* 默认为 1 */
}
```
如果所有项目的`flex-shrink`都为 1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为 0，其他项目都为 1，则空间不足时，前者不缩小。
负值对该属性无效。

### 3.4.4 flex-basis
`flex-basis`定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。塔的默认值为 `auto`，即项目本来大小。
```css
.item {
    flex-basis: <length> | auto /* 默认为 auto */
}
```
它可以设置具体的值（比如 350px），则项目将占据固定空间。

### 3.4.5 flex
`flex`属性是`flex-grow`、`flex-shrink`和`flex-basis`的简写，默认值为`0 1 auto`，后两个属性可选。

该属性有两个快捷值：`auto`（`1 1 auto`）和`none`（`0 0 auto`）。
建议优先使用这个属性，而不是单独编写三个分离属性，因为浏览器会推算相关值。

### 3.4.6 align-self
`align-self`允许单个项目与其他项目有不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。
```css
.item {
    align-self: auto | flex-start | flex-end | center | baseline | stretch
}
```

# 4. position 定位
`position`定位允许我们基于文档流行为，改变一些合资的位置。
常见取值有以下这些：
> - static（默认值）： 按照正常文档流进行排列
> - relative： 相对定位，相对于其原本的位置进行定位
> - absolute：绝对定位，元素脱离正常文档流，相对于最近的非`static`的祖先元素进行定位
> - fixed：固定定位，元素脱离正常文档流，相对于浏览器视口（viewport）的位置进行定位。
> - sticky：粘性定位，元素相对于最近的拥有滚动机制的祖先元素（祖先元素的`overflow`是`hidden`、`scroll`、`auto`和`overlay`时）进行定位。
> - inherit：继承父元素的`position`属性值

# 5. 层叠上下文
## 5.1 规则
- 层叠上下文的层叠水平比普通元素要高
- 层叠上下文可以嵌套，内部层叠上下文及其子元素的层叠上下文受限于外层的层叠上下文
- 层叠上下文和其兄弟元素相互独立，即在不同的层叠上下文中，元素的层叠顺序没有可比性
- 不同的层叠上下文元素发生层叠时，元素的层叠水平由父级上下文的层叠顺序决定

## 5.2 顺序
![层叠上下文顺序](https://static001.infoq.cn/resource/image/d7/ce/d7d00bfdd5198a3f1c34f0001d2defce.png)

## 5.3 形成条件
- 根元素（<html>）
- `position`值为`absolute`或`relative`且`z-index`不为`auto`
- `position`值为`fixed`或`sticky`
- flex 容器的子元素，且`z-index`不为`auto`
- grid 容器的子元素，且`z-index`不为`auto`
- `opacity`属性值小于 1
- `mix-blend-mode`值不为`normal`
- 以下任意属性值不为`none`：
  - `transform`
  - `filter`
  - `perspective`
  - `clip-path`
  - `mask`/`mask-image`/`mask-border`
- `isolation`值为`isolate`
- `-webkit-overflow-scrolling`值为`touch`
- `will-change` 设置任意属性

# 6. 性能优化
1. 避免使用`@import`，外部的 css 文件使用`@import`会是的页面在加载时增加额外的延迟，所以使用`<link>`即可。
2. 避免重排
   - 浏览器为了重新渲染部分或整个页面，重新计算页面元素位置和结构的过程叫做重排（reflow）。
   - 页面上任何一个节点触发重排，会导致他的子节点和祖先节点重新渲染。
   - 导致重排的情况：
     > - 改变窗口大小
     > - 改变文字大小
     > - 添加、删除样式表
     > - 内容改变
     > - 伪类的激活
     > - 操作 class 属性
     > - 操作 dom，js 改变 css 类
     > - 计算 `offsetWidth` 和 `offsetHeight`
     > - 设置 style 属性
     > - 改变元素的内外边距
   - 常见导致重排的属性
     > - 大小相关：width、height、padding、margin、border-width、border、min-height
     > - 布局相关：display、float、position、top、left、right、bottom、
     > - 字体相关：font-size、text-align、font-weight、font-family、line-height、white-space、verticle-align
     > - 显示相关：overflow、overflow-x、overflow-y
3. 避免重绘
   - 当元素外观被改变，但是布局没有改变时发生重绘（repaint）。
   - 常见导致重排的属性
     > - 颜色：color、background-color
     > - 边框相关：outline、outline-width、outline-color、outline-style、border-style、border-radius、box-shadow
     > - 背景相关：background、background-image、background-position、background-repeat、background-size
4. 有选择地使用选择器
   CSS选择器的匹配规则是从右到左进行。
   以下几点建议：
    > - 保持简单，不要使用嵌套多、过于复杂的选择器
    > - 通配符和属性选择器效率最低，匹配元素最多，尽量避免使用
    > - 不要使用类选择器和ID选择器修饰元素标签，如：h3
    > - 不要为了追求速度而放弃可读性和维护性
5. 文件压缩
6. 去除无用 CSS

# 7. 常见布局
常见的布局有圣杯布局、双飞翼布局，两种布局出现是为了解决“中间栏内容不被遮挡”，而两者解决方案都是三栏全部 float 浮动，但左右两栏加上负 margin 让中间栏 div 并排，形成三栏布局。

不同点在于，圣杯布局，左右两边使用`position: relative`、`left`和`right`配合`margin-left`、`margin-right`使得左右栏不遮挡中间栏。
而双飞翼布局，则在中间栏元素创建子元素放置内容，并且子元素使用`margin-left`和`margin-right`让左右两栏留出位置。

## 7.1 圣杯布局
```css
.container {
    margin-left: 200px;
    margin-right: 200px;
}
.main {
    float: left;
    width: 100%;
    height: 200px;
    background: green;
}
.left {
    position: relative;
    left: -200px;
    float: left;
    height: 200px;
    width: 200px;
    margin-left: -100%;
    background: red;
}
.right {
    position: relative;
    right: -200px;
    float: left;
    height: 200px;
    width: 200px;
    margin-left: -200px;
    background: blue;
}
```
```html
<div class="container">
	<div class="main"></div>
	<div class="left"></div>
	<div class="right"></div>
</div>
```
## 7.2 双飞翼布局
```css
.container {
    margin-left: 200px;
    margin-right: 200px;
}
.content, .left, .right {
    float: left;
    height: 200px;
}
.content {
    width: 100%;
    background: yellow;
}
.main: {
    margin-left: 200px;
    margin-right: 200px;
    height: 100%;
    background: green;
}
.left {
    margin-left: -100%;
    width: 200px;
    background: red;
}
.right {
    margin-left: -200px;
    width: 200px;
    background: blue;
}
```
```html
<div class="container">
    <div class="content">
        <div class="main"></div>
    </div>
    <div class="left"></div>
    <div class="right"></div>
</div>
```

# 8. 水平居中和垂直居中
## 8.1 水平居中
行内元素：
- `text-align: center`

块级元素：
  - 确定宽度：
    - `margin: 0 auto`
    - 元素`position: absolute`和`margin-left: -width/2`，其父元素`position: relative`
  - 未知宽度：
    - `display: table`和`margin: 0 auto`
    - `display: inline-block`和`text-align: center`
    - `display: flex`和`justify-content: center`
    - 元素`position: absolute`和`transform: translateX(-50%)`，其父元素`position: relative`

## 8.2 垂直居中
- `line-height`：适合纯文字
- 元素`position: absolute`和`margin: auto`，其父元素`position: relative`
- 元素`margin: auto`，其父元素`display: flex`
- 元素`align-items: center`，其父元素`display: flex`
- 元素`position: absolute`和`transform: translateY(-50%)`或已知高度可以设置`margin-top: -width/2`，其父元素`position: relative`
- 行内元素`display: table-cell`和`verticle-align`，其父元素`display: table`
  

# 9. 预处理器
预处理器的出现解决了以下几个问题：
- 模块化
- 文件切分
- 选择器嵌套
- 变量
- 运算
- 函数

## 9.1 Less VS Sass
两者相同点：
1. 混合（Mixins）：class 中的 class
2. 参数混合（Parametric）：像函数一样传递参数的 class
3. 嵌套规则（Nested Rules）：class 中嵌套 class，减少重复代码
4. 运算（Operations）：CSS 中使用数学运算
5. 颜色功能（Color function）：使用颜色函数生成颜色
6. 命名空间（Namespaces）：样式分组，从而方便被调用
7. 作用域（Scope）：局部修改样式
8. JavaScript 表达式（JavaScript evaluation）：在 CSS 样式中使用 JavaScript 表达式赋值

不同点：
1. 环境
    Sass 基于 Ruby，Less 基于 JavaScript
2. 编译机制
    Sass 运行在服务器端，Less 运行在 Node 或浏览器环境，相较之下 Sass 会优于 Less
3. 上手难易度
    Less 只需要了解 CSS 基础就能迅速上手


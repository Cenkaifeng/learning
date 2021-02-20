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

# 4. position 定位
# 5. 层叠上下文
# 6. 性能优化
# 7. 常见布局
# 8. 水平垂直居中
# 9. 预处理器

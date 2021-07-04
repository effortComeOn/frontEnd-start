# BFC

常见的元素布局方案。

- 普通流；根据元素在文档中的位置确定
- 浮动；脱离普通流，父元素高度塌陷，若不对其为元素清除浮动，兄弟组件也会跟着一个浮动
- 绝对定位；脱离普通流，自身位置发生改变，不影响兄弟组件，父元素会高度塌陷。

## 什么是 BFC？

块级格式化上下文。也就是会形成一个区域，不管内部如何变化，都不会影响到外部。

## 触发 BFC

- body 根元素
- 浮动元素，除 float:none 之外
- 绝对定位 position (absolute, fixed)
- display 为 inline-block，table-cells，flex
- overflow 除了 visible 以外的值(hidden, auto, scroll)

## BFC 特性

1. 同一个 BFC 会发生外边距折叠，若不想发生折叠，可以通过别的元素包裹
2. 包含浮动元素，可清除浮动
3. 可阻止元素被浮动元素覆盖。比如添加 overflow:hidden，还可以实现自适应布局。

<code src="./Bfc/bfc.tsx" />

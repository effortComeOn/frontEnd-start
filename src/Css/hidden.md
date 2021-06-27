# 有关元素隐藏的集中方式

参考了别人的回答，总结下。

1. 【DOM 结构】
2. 【事件监听】
3. 【性能】
4. 【继承】
5. 【transition】

## display:none

1. 浏览器直接不渲染该元素，不占据空间
2. 无法进行 DOM 事件监听
3. 改变该属性，会引起重排，性能较差
4. 不会被子元素继承，因为子元素不会渲染
5. transition 不支持 display

## visibility:hidden

1. 元素被隐藏，会渲染，但不显示，占据空间
2. 无法进行 DOM 事件监听
3. 改变该属性，只会引起重绘，性能较高
4. 会被子元素继承，子元素可设置 visibility: visible 取消隐藏
5. transition 支持 visibility

## opacity:0

1. 会渲染并占据空间
2. 可进行 DOM 监听
3. 提升为合成层，不触发重绘，性能较高
4. 会被子元素继承，子元素无法通过改变 opacity 值来取消隐藏，只会跟随父元素的取消隐藏而展示
5. transition 支持 opacity

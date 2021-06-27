## 浮动布局的优缺点？清除浮动有哪些方式？

浮动布局就是让元素脱离普通流，普通流中的元素就会当 float 元素不存在一样。

### 优点：

- 图文混排时，可以让文字环绕在图片周围
- 浮动元素，可设置宽高
- 可设置浮动的方向，right 或者 left

### 缺点

脱离普通流，该元素会在父元素中失去高度，造成父元素高度塌陷。

## 清除浮动的方式

- 添加额外标签，并添加 clear:both 的样式
- 父级添加 overflow 属性，或者设置高度
- 建立伪类选择器清除浮动

```
div:after{
    /* 设置添加子元素的内容是空 */
      content: '';
      display: block;
      height: 0;
      /* 设置添加子元素看不见 */
      visibility: hidden;
      /* 设置clear：both */
      clear: both;
}
```

## demo

```tsx
import React from 'react';
import CSSFloat from './index.tsx';

export default () => <CSSFloat />;
```

## Canvas

Demo:

```tsx
import React from 'react';
import { Html5CanvasDemo } from 'frontEnd-start';

export default () => <Html5CanvasDemo />;
```

## canvas 和 svg 的区别

- svg 是一种 shiyongXML 描述的 2D 图形语言
- canvas 通过 javascript 来绘制 2D 图形

SVG 基于 XML，意味着 SVGDOM 中的每个元素都可用，每个绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形，也就是重绘

Canvas 是逐像素进行渲染的，在 canvas 中，一旦图形被绘制完成，他就不能继续得到浏览器的关注，如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已经被图形覆盖的对象。

### Canvas

- 依赖分辨率
- 不支持事件处理器
- 弱的文本渲染能力
- 能够以 .png 或 .jpg 格式保存结果图像
- 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

### SVG

- 不依赖分辨率
- 支持事件处理器
- 最适合带有大型渲染区域的应用程序（比如谷歌地图）
- 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
- 不适合游戏应用

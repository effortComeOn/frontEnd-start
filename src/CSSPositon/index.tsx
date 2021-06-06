import React from 'react';
import './index.less';

const arr = [
  {
    title: '行内元素：第二个元素，有高度，默认的会和父级元素的基线对齐',
    desc: '该属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐',
    content: (
      <>
        <span className="inline-span">1234</span>
        <span className="inline-span2">1234</span>
      </>
    ),
  },
  {
    title: '块级元素：绝对定位',
    desc: '',
    content: (
      <>
        <div className="block block1"></div>
      </>
    ),
  },
  {
    title: '块级元素：flex布局',
    desc: '',
    itemCls: 'item-wrapper-flex',
    content: (
      <>
        <div className="block block2"></div>
      </>
    ),
  },
];

export default () => {
  return (
    <div>
      {arr.map((item) => {
        return (
          <>
            <p>{item.title}</p>
            <p>{item.desc}</p>
            <div className={`item-wrapper ${item.itemCls ? item.itemCls : ''}`}>
              {item.content}
            </div>
          </>
        );
      })}
      <p>如何实现让 div 垂直居中，左右10px，高度始终为宽度一半？</p>
      <div className="wrapper">
        <div className="box">A</div>
      </div>

      <div className="outer_wrapper">
        <div className="inner_wrapper">
          <div className="box">A</div>
        </div>
      </div>

      <p>品字布局</p>
      <div className="ping-wrapper">
        <div className="block item-top">1</div>
        <div className="block item-bottom1">2</div>
        <div className="block item-bottom2">3</div>
      </div>
    </div>
  );
};

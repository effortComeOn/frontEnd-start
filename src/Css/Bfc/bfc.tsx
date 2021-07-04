import React, { useEffect, useState } from 'react';
import './bfc.less';

const str1 =
  '同一个 BFC 会发生外边距折叠，若不想发生折叠，可以通过别的元素包裹包含浮动元素，可清除浮动 可阻止元素被浮动元素覆盖。比如添加overflow:hidden，还可以实现自适应布局。';
const str2 = '同一个 BFC 会发生外边距折叠';

// 防抖函数
const debounce = (fn: any, time: any, immediate: boolean) => {
  let timer: any = null;
  return function () {
    let args = arguments;
    let context = this;
    if (!timer && immediate) {
      fn.apply(context, args);
    }
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, time);
  };
};

export default () => {
  const [isShort, setShort] = useState(false);
  const [str, setStr] = useState(str2);

  const onInputChange = (e: any) => {
    e.persist();
    let val = e.target.value;
    debounce(() => setStr(val), 100, true)();
    // setStr(val);
  };

  useEffect(() => {
    let dom = document.getElementById('text_content1');
    console.log(dom?.offsetHeight);
    dom && dom.classList.remove('text');
    if (dom && dom.offsetHeight > 50) dom && dom.classList.add('text');
  }, [str]);

  //   固定字符串函数操作
  useEffect(() => {
    let dom = document.getElementById('text_content2');
    if (!isShort) dom?.classList.add('text');
    else dom?.classList.remove('text');
  }, [isShort]);

  return (
    <>
      <p>使用动态的字符串</p>
      <input type="text" onChange={onInputChange} />
      <div className="inline-wrapper">
        <div className="left">left</div>

        <span id="text_content1">{str}</span>
        <span className="star"></span>
        <span className="star"></span>
      </div>
      <br />

      <p>使用固定的字符串</p>
      <div className="inline-wrapper">
        <div className="left" onClick={() => setShort(!isShort)}>
          left
        </div>

        <span id="text_content2">{isShort ? str2 : str1}</span>
        <span className="star"></span>
        <span className="star"></span>
      </div>
    </>
  );
};

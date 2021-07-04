import React, { useEffect } from 'react';
import './index.less';

export default () => {
  const childFun = () => {
    let num = 20;
    let left = 0;
    let arr = [];
    for (let i = 1; i < num; i++) {
      let top = Math.floor(Math.random() * 5 + 2);
      left += top;

      let style = {
        left: `${left}%`,
        top: `${top}%`,
      };
      // console.log(style);

      arr.push(<div style={style} className={`item item-${i}`}></div>);
    }
    return arr;
  };
  // useEffect(() => {}, []);

  return (
    <>
      <div className="content">{childFun()}</div>
    </>
  );
};

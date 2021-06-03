import React, { useEffect, useState } from 'react';
import './index.less';

export default () => {
  const onChange = () => {
    let dom = document.getElementById('textarea_test');
    console.log(dom?.innerHTML);
  };

  return (
    <>
      textarea:
      <textarea name="area" id="" cols={30} rows={10}></textarea>
      <p>divtextarea:</p>
      <div
        id="textarea_test"
        className="textarea"
        contentEditable={true}
        placeholder="请输入内容"
        onClick={onChange}
      ></div>
      <button onClick={onChange}>get divtextarea content</button>
    </>
  );
};

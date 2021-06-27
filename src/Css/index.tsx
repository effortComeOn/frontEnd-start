import React from 'react';
import './index.less';

const displayArr = [
  {
    name: 'display',
    style: 'hidden-display',
  },
  {
    name: 'visiblity',
    style: 'hidden-visibility',
  },
  {
    name: 'opacity',
    style: 'hidden-opacity',
  },
];
export default () => {
  return (
    <>
      <div className="hidden-wrapper">
        {displayArr.map((item) => (
          <div className={item.style}>{item.name}</div>
        ))}
      </div>
    </>
  );
};

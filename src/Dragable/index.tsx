import React, { useState } from 'react';
import './index.less';

const dargArr = [
  {
    id: '123',
    text: '1233',
    bgColor: '#8c3150',
  },
  {
    id: '124',
    text: '1235',
    bgColor: '#b38b99',
  },
  {
    id: '125',
    text: '1236',
    bgColor: '#f1bacd',
  },
  {
    id: '126',
    text: '1237',
    bgColor: '#baccf1',
  },
  {
    id: '126',
    text: '1238',
    bgColor: '#7fc167',
  },
];

export default () => {
  const [activeId, setActiveId] = useState('');
  const onDragStart = (id: any) => {
    setActiveId(id);
  };
  const onDrop = (ev) => {
    ev.persist();
    ev.target.appendChild(document.getElementById(activeId));
  };
  const onDragOver = (e) => {
    // 注意这里只使用这个函数，不用执行e.persist(); 否则无法执行后续的onDrop
    e.preventDefault();
  };

  return (
    <div className="task">
      <div
        className="drag-list"
        onDrop={(ev) => onDrop(ev)}
        onDragOver={onDragOver}
      >
        {dargArr.map((item) => {
          return (
            <div
              key={item.id}
              className="drag"
              style={{ backgroundColor: item.bgColor }}
              id={item.id}
              draggable={true}
              onDragStart={() => onDragStart(item.id)}
              onDragEnd={() => setActiveId('')}
            >
              {item.text}
            </div>
          );
        })}
      </div>

      <div
        className="drop"
        id="drop"
        onDrop={(ev) => onDrop(ev)}
        onDragOver={onDragOver}
      >
        放在我这里
      </div>
    </div>
  );
};

import React from 'react';
import './index.less';

const arr = [
  {
    type: 'color',
    name: 'favcolor',
    title: '从拾色器中选择一个颜色',
    support: ['chrome', 'Safari'],
  },
  {
    type: 'date',
    name: 'bday',
    title: 'date 类型允许你从一个日期选择器选择一个日期',
    support: ['chrome', 'Safari'],
  },
  {
    type: 'datetime',
    name: 'bdaytime',
    title: '定义一个日期和时间控制器（本地时间）',
    support: ['chrome'],
  },
  {
    type: 'datetime-local',
    name: 'bdaytime',
    title: '定义一个日期和时间 (无时区):',
    support: ['chrome'],
  },
  {
    type: 'email',
    name: 'email',
    title: '在提交表单时，会自动验证 email 域的值是否合法有效',
    support: ['chrome'],
  },
  {
    type: 'month',
    name: 'bdaymonth',
    title: '定义月与年 (无时区)',
    support: ['chrome'],
  },
  {
    type: 'number',
    name: 'quantity',
    others: {
      min: 1,
      max: 5,
    },
    title: '定义一个数值输入域(限定)',
    support: ['chrome'],
  },
  {
    type: 'range',
    name: 'points',
    others: {
      min: 1,
      max: 10,
    },
    title: '定义一个不需要非常精确的数值（类似于滑块控制）',
    support: ['chrome'],
  },
  {
    type: 'search',
    name: 'googlesearch',
    title: '定义一个搜索字段 (类似站点搜索或者Google搜索)',
    support: ['chrome'],
  },
  {
    type: 'time',
    name: 'usr_time',
    title: '定义可输入时间控制器（无时区）',
    support: ['chrome'],
  },
  {
    type: 'url',
    name: 'homepage',
    title: '定义输入URL字段',
    support: ['IE', 'firefox', 'chrome'],
  },
  {
    type: 'week',
    name: 'week_year',
    title: '定义周和年 (无时区)',
    support: ['chrome'],
  },
];

const InputItem = (item: any) => {
  const onChange = (e: any, type: string) => {
    e.persist();
    console.log(`【${type}】：`, e.target.value);
  };
  return (
    <div className="item" key={item.type}>
      <div className="item-title">{`【${item.type}】${item.title}`}</div>
      <input
        onChange={(e) => onChange(e, item.name)}
        type={item.type}
        name={item.name}
        {...item.others}
      />
      <div className="item-support">support: {item.support.join(',')}</div>
    </div>
  );
};

export default () => {
  return (
    <>
      <span>HTML5 新的 Input 类型</span>
      {arr.map((item) => {
        return InputItem(item);
      })}
    </>
  );
};

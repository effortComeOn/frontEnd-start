import React, { useState } from 'react';
import './index.less';

interface optionProps {
  key: string; // filterKey有值时 模糊搜索时，搜索对应的字段
  value: string;
  label?: string; // 需要展示的字段，默认展示 value 字段
}

interface SearchComProps {
  options: optionProps[];
  isSearch?: boolean; // 默认不展示搜索框
  onOptionClick: (val: optionProps) => void;
  filterKey?: string; // 模糊搜索时，查询的字段，默认为 optionProps的value字段
  filterFun?: (val: string) => void; // 模糊搜索函数
  defaultValue?: string; // 默认选中项
}

const optionItem = (
  options: optionProps[],
  onChange: (val: optionProps) => void,
  defaultValue?: string,
) => {
  const [curSelect, setCurSelect] = useState(defaultValue);
  const prefix = 'option-h5-item';
  const selectCls = `${prefix}-select`;

  const onSelect = (item: optionProps) => {
    setCurSelect(item.value);
    onChange(item); // 调用，最外层传入的 onOptionClick 方法，这里起了别名。
  };

  return options.map((item: optionProps) => {
    return (
      <div
        key={item.value}
        // 添加选中样式
        className={`${prefix} ${item.value == curSelect ? selectCls : ''}`}
        onClick={() => onSelect(item)}
      >
        <span>{item.label || item.value}</span>

        {/* 选中时展示 icon */}
        <span className={'option-item-icon'}>√</span>
      </div>
    );
  });
};

export default (props: SearchComProps) => {
  const {
    options,
    isSearch,
    onOptionClick: onChange,
    filterKey,
    filterFun,
    defaultValue,
  } = props;
  const [optionArr, setOptionArr] = useState(options);
  const [searchVal, setSearchVal] = useState('');
  const prefix = 'openui-h5-modal-search';

  //   搜索框
  const onInputChange = (e: any) => {
    e.persist();
    setSearchVal(e.target.value); // 和搜索结果展示相关，需存储
    let val = e.target.value;
    let arr: any = [];
    if (filterFun) {
      // 外部如果传入搜索函数，就执行
      arr = filterFun(val);
      setOptionArr(arr);
      return;
    }
    options.forEach((item: optionProps) => {
      // 模糊搜索函数
      if (filterKey) {
        if (item['key']?.indexOf(val) > -1) arr.push(item);
      } else {
        if (item.value.indexOf(val) > -1) arr.push(item);
      }
    });
    setOptionArr(arr); // 搜索结果存储，更新组件
  };

  // 搜索结果展示
  const searchRes = () => {
    return (
      <>
        {optionArr.length ? (
          optionItem(optionArr, onChange, defaultValue)
        ) : (
          <span>搜索无结果</span>
        )}
      </>
    );
  };

  return (
    <div className={`${prefix}`}>
      {isSearch ? (
        <input className={`${prefix}-input`} onChange={onInputChange} />
      ) : null}
      {searchVal ? searchRes() : optionItem(options, onChange, defaultValue)}
    </div>
  );
};

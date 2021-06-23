import React, {
  useState,
  useEffect,
  Fragment,
  useImperativeHandle,
} from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.min.css';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {
  initConfig,
  initData,
  configProps,
  selectListProps,
  dealConfig,
  dealSelect,
} from './utils';
import './index.less';
const { Option } = Select;

// 排序
const SortPanel = React.forwardRef((props: any, ref) => {
  const iconStyle = {
    color: '#1658dc',
    height: 11,
    width: 11,
  };
  // 需要展示的 selectConfigList
  const [selectConfigList, setselectConfigList] = useState<configProps[]>([]);
  // 下拉列表框数据源 selectList
  const [selectList, setselectList] = useState<selectListProps[]>([]);
  // 下拉列表框 没一个优先级对应的数据源 selectListObj
  const [selectListObj, setselectListObj] = useState<any>({});

  // 添加按钮的 展示隐藏
  const [visible, setIsVisible] = useState(true);

  // 排序的回调，当弹窗点击确定时。当弹窗点击确定时需要发送请求
  useImperativeHandle(ref, () => ({
    submit: () => {
      // console.log('====submit selectConfigList===', selectConfigList);
      return selectConfigList;
    },
  }));
  // 联动，更改 下拉选择列表的数据源
  const changeselectConfig = (
    selectConfig: any,
    selectList: any,
    level?: number,
  ) => {
    let selectObj = dealConfig(selectConfig, selectList, selectListObj, level);
    // console.log('changeselectConfig setselectListObj', selectObj);
    setselectListObj(selectObj);
  };

  useEffect(() => {
    // 设置selectConfigList
    setselectConfigList(initConfig);
    // 设置selectList
    setselectList(initData);
    // 初始化下拉选择数据 处理
    changeselectConfig(initConfig, initData);
  }, []);

  // select 下拉列表触发事件，实现多级联动，即前面选中的项目后面不可以再选择
  function selectListChange(value: string, level: number) {
    let newselectConfigList = dealSelect(value, level, selectConfigList);
    // 设置configList select后，值需要更新
    setselectConfigList(newselectConfigList);
    // 修改configList
    changeselectConfig(newselectConfigList, selectList, level);
  }

  // 添加优先级
  function addlevel() {
    let newselectConfigList: any = [...selectConfigList];
    let num: number = newselectConfigList.length - 1;
    if (newselectConfigList.length >= 5) {
      setIsVisible(false);
    }
    if (newselectConfigList.length >= 6) {
      return;
    }
    let newObj: any = { ...newselectConfigList[num] };
    newObj.level += 1;
    newObj.code = '';
    newselectConfigList.push(newObj);
    setselectConfigList(newselectConfigList);
    // 联动，下拉选择列表的数据源
    changeselectConfig(newselectConfigList, selectList, newObj.level);
  }

  // 抽离select 组件，附上对应的数据源。
  const SelectCom = (code: any, level: any) => {
    const selectListArr = selectListObj[level];
    return (
      <Select
        // defaultValue={code}
        value={code}
        placeholder="请选择优先级"
        onChange={(val: string) => selectListChange(val, level)}
        className="select-component"
      >
        {selectListArr?.map((item: any, index: number) => {
          return (
            <Option value={item.code} key={`${item.code}-${index}`}>
              {item.codeCn}
            </Option>
          );
        })}
      </Select>
    );
  };

  // 删除 list
  function deleteList(index: number) {
    let newselectConfigList: any = [...selectConfigList];
    // 删除操作
    newselectConfigList.splice(index, 1);
    // 更新selectConfigList
    setselectConfigList(newselectConfigList);
    // 展示添加优先级按钮
    if (newselectConfigList.length <= 5) {
      setIsVisible(true);
    }
  }

  return (
    <Fragment>
      <div className="warning">
        <i style={iconStyle}>
          <ExclamationCircleFilled />
        </i>
        &nbsp; 至多添加6个优先级
      </div>
      {selectConfigList.map((selectConfigListItem: any, idx: number) => {
        return (
          <div className="selectList" key={selectConfigListItem.level}>
            <span className="level">第{selectConfigListItem.level}优先级</span>
            {SelectCom(selectConfigListItem.code, selectConfigListItem.level)}
            {selectConfigListItem.level != 1 ? (
              <span className="delete" onClick={() => deleteList(idx)}>
                删除
              </span>
            ) : (
              ''
            )}
          </div>
        );
      })}
      {visible ? (
        <p className="addlevel" onClick={() => addlevel()}>
          +添加优先级
        </p>
      ) : (
        ''
      )}
    </Fragment>
  );
});

export default SortPanel;

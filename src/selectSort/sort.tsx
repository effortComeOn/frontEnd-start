import React, {
  useState,
  useEffect,
  Fragment,
  useImperativeHandle,
} from 'react';
import { Select } from 'antd';
import { useRequest } from 'ahooks';
import { ExclamationCircleFilled } from '@ant-design/icons';

interface configProps {
  level: number;
  code: string;
}
interface selectListProps {
  // 这里替换下字段哈，和昨天的题目有些许差异，但问题不大
  code: string;
  codeCn: string;
}
const dealConfig = (
  selectConfigList: configProps[],
  selectList: selectListProps[],
) => {
  const selectObj: any = {};
  const fieldNameArr: any = [];
  selectConfigList.forEach((config: any) => {
    let level = config.level;
    // 把前面优先级的 选择项保存下来
    if (level == 1) selectObj[level] = selectList;
    else selectObj[level] = addlevel(fieldNameArr, selectList);
    fieldNameArr.push(config.fieldName);
  });
  return selectObj;
};

// 过滤已选则的filedList
function addlevel(fieldNameArr: any, selectList: any) {
  let newselectList = [...selectList];
  newselectList = newselectList.filter((item: any, index: number) => {
    return fieldNameArr.indexOf(item.fieldName) == -1;
  });
  return newselectList;
}

const { Option } = Select;

// 排序
const SortPanel = React.forwardRef((props: any, ref) => {
  const iconStyle = {
    color: '#1658dc',
    height: 11,
    width: 11,
  };
  // 需要展示的 selectConfigList
  const [selectConfigList, setselectConfigList] = useState([]);
  // 下拉列表框数据源 selectList
  const [selectList, setselectList] = useState([]);
  // 下拉列表框 没一个优先级对应的数据源 selectListObj
  const [selectListObj, setselectListObj] = useState<any>({});

  // 添加按钮的 展示隐藏
  const [visible, setIsVisible] = useState(true);

  // 排序的回调，当弹窗点击确定时。当弹窗点击确定时需要发送请求
  useImperativeHandle(ref, () => ({
    submit: () => {
      console.log('====submit selectConfigList===', selectConfigList);
      return true;
    },
  }));
  // 联动，更改 下拉选择列表的数据源
  const changeselectConfig = (selectConfig: any, selectList: any) => {
    let obj = dealConfig(selectConfig, selectList);
    // console.log('changeselectConfig setselectListObj', obj);
    setselectListObj(obj);
  };

  const queryManualReportFieldsConfig: any = useRequest(
    {
      url: '/Front/Cbooking/API/Cbooking/querySortConfig',
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    },
    {
      manual: true,
      throwOnError: true,
      onSuccess: (data: any, params: any) => {
        if (data.responseCode == 20000) {
          // 设置selectConfigList
          setselectConfigList(data.selectConfigList);
          // 设置selectList
          setselectList(data.selectList);
          // 初始化下拉选择数据 处理
          changeselectConfig(data.selectConfigList, data.selectList);
        }
      },
    },
  );
  useEffect(() => {
    queryManualReportFieldsConfig.run();
  }, []);

  // select 下拉列表触发事件，实现多级联动，即前面选中的项目后面不可以再选择
  function selectListChange(value: string, level: any) {
    let newselectConfigList = [...selectConfigList];
    newselectConfigList.forEach((item: any, index: number) => {
      if (level == item.level) item.fieldName = value;
    });
    // 设置configList select后，值需要更新
    setselectConfigList(newselectConfigList);
    // 修改configList
    changeselectConfig(newselectConfigList, selectList);
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
    newObj.fieldName = '';
    newselectConfigList.push(newObj);
    setselectConfigList(newselectConfigList);
    // 联动，下拉选择列表的数据源
    changeselectConfig(newselectConfigList, selectList);
  }

  // 抽离select 组件，附上对应的数据源。
  const SelectCom = (fieldName: any, level: any) => {
    const selectListArr = selectListObj[level];
    return (
      <Select
        defaultValue={fieldName}
        onChange={(val: string) => selectListChange(val, level)}
        className="selectComponent"
      >
        {selectListArr?.map((item: any, index: number) => {
          return (
            <Option value={item.fieldName} key={`${item.fieldName}-${index}`}>
              {item.fieldNameCn}
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
            {SelectCom(
              selectConfigListItem.fieldName,
              selectConfigListItem.level,
            )}
            {idx == selectConfigList.length - 1 ? (
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

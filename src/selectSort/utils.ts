import React from 'react';
export const initConfig: configProps[] = [
  {
    level: 1,
    code: 'Dept1',
  },
];
export const initData: selectListProps[] = [
  {
    code: 'Dept1',
    codeCn: '部门1',
  },
  {
    code: 'Dept2',
    codeCn: '部门2',
  },
  {
    code: 'Dept3',
    codeCn: '部门3',
  },
  {
    code: 'Dept4',
    codeCn: '部门4',
  },
  {
    code: 'Dept5',
    codeCn: '部门5',
  },
  {
    code: 'Dept6',
    codeCn: '部门6',
  },
];

export interface configProps {
  level: number;
  code: string;
}
export interface selectListProps {
  // 这里替换下字段哈，和昨天的题目有些许差异，但问题不大
  code: string;
  codeCn: string;
}
export const dealConfig = (
  selectConfigList: configProps[],
  selectList: selectListProps[],
  curselectObj?: any,
  curlevel?: number,
) => {
  const selectObj: any = curselectObj ? { ...curselectObj } : {};
  const codeArr: any = [];
  selectConfigList.forEach((config: any) => {
    let level = config.level;
    if (level == 1) {
      // 把前面优先级的 选择项保存下来
      selectObj[level] = selectList;
    } else {
      // 只更改比当前优先级低的选择列表数据源
      if (!curlevel || (curlevel && level > curlevel)) {
        selectObj[level] = addlevel(codeArr, selectList);
      }
    }
    codeArr.push(config.code);
  });
  // 添加新的优先级时的操作
  let len = codeArr.length;
  if (curlevel && curlevel == len && codeArr[len - 1] == '') {
    selectObj[curlevel] = addlevel(codeArr, selectList);
  }
  return selectObj;
};

// 过滤已选则的filedList
export function addlevel(codeArr: any, selectList: any) {
  let newselectList = [...selectList];
  newselectList = newselectList.filter((item: any, index: number) => {
    return codeArr.indexOf(item.code) == -1;
  });
  return newselectList;
}

// 处理下拉别表选择联动后的configList 也就是在选择时，
// 优先级高的select 选择的code值与优先级低的code值重复后的操作
export const dealSelect = (
  value: string,
  level: number,
  selectConfigList: any,
) => {
  if (selectConfigList && selectConfigList.length == 0) return [];
  let newselectConfigList = [...selectConfigList];
  newselectConfigList.forEach((item: any, index: number) => {
    if (level == item.level) item.code = value;
  });
  // 若前面优先级选择了后面的code，那么后面优先级的code置为空
  let len = newselectConfigList.length;
  for (let i = 0; i < len; i++) {
    // 从左到右
    for (let j = len - 1; j < len && j > i; j--) {
      // 从右到左
      if (newselectConfigList[i].code == newselectConfigList[j].code) {
        // todo list 这里虽然code置为空了，但是select上还有默认显示的原始值
        newselectConfigList[j].code = '';
      }
    }
  }
  //   console.log('newselectConfigList', newselectConfigList);
  return newselectConfigList;
};

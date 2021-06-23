import React, { useState, useContext } from 'react';
import SortPanel from '../selectSort/sort';
import { DemoContext } from './context';
import './index.less';

export default () => {
  const [count, setCount] = useState(0);
  const sortRef = React.useRef<any>();
  // 父组件调用子组件的方法
  const getSortData = (str: string) => {
    let data = sortRef?.current?.submit();
    console.log(str, data);
  };

  return (
    <>
      {/* 初始化赋值 */}
      <DemoContext.Provider value={{ count, getSortData }}>
        <p>父组件parent</p>
        <button onClick={() => setCount(count + 1)}>add count</button>
        <button onClick={() => getSortData('父组件parent getSortData')}>
          父组件 getSortData
        </button>

        <div className="context-item">
          <p>子组件child</p>
          <Child></Child>
        </div>
        <div className="context-item">
          <p>子组件SortPanel</p>
          <SortPanel ref={sortRef}></SortPanel>
        </div>
      </DemoContext.Provider>
    </>
  );
};

const Child = (props: any) => {
  const { count, getSortData } = useContext<any>(DemoContext);
  return (
    <div>
      {/* 子组件使用父组件传入的context */}
      <div>count: {count}</div>
      {/* 子组件中调用兄弟组件的函数，通过父组件包了一层 */}
      <button onClick={() => getSortData('子组件child getSortData')}>
        child getSortData
      </button>

      <ChildChild></ChildChild>
    </div>
  );
};
const ChildChild = React.forwardRef((props: any, ref: any) => {
  const { count } = useContext<any>(DemoContext);
  return (
    <div>
      <div className="context-item">
        {/* 孙子组件使用context */}
        <div>ChildChild count: {count}</div>
      </div>
    </div>
  );
});

// const ChildChild = React.forwardRef((props: any, ref: any) => {
//   const { count } = useContext<any>(DemoContext);
//   const sortRef = React.useRef<any>();
//   const getSortData = () => {
//     sortRef?.current?.submit();
//   };
//   return (
//     <div>
//       <div className="context-item">
//         <p>子组件SortPanel</p>
//         <SortPanel ref={sortRef}></SortPanel>
//       </div>
//     </div>
//   );
// });

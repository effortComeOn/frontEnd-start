import React, { useImperativeHandle } from 'react';

export interface LoginProps {
  name?: string;
  age?: number;
  sex?: string;
  phone?: string;
}

const initData = ['name', 'age', 'sex', 'phone'];

// 子组件
const Login = React.forwardRef((props: LoginProps, ref) => {
  const objData: any = props;
  const onChange = (e: any, type: string) => {
    e.persist();
    objData[type] = e.target.value;
    console.log(objData);
  };

  // 绑定ref 返回的内容 current对象的内容
  // 注意，()=>() 这里需要直接返回这个对象，用括号包起来，否则，外层调用的current为undefined
  useImperativeHandle(ref, () => ({
    submit: () => {
      return objData;
    },
  }));

  return (
    <div>
      {initData.map((item) => {
        return (
          <div key={item}>
            <span>{item}</span>
            <input
              onChange={(e) => onChange(e, item)}
              defaultValue={props[item]}
            />
          </div>
        );
      })}
    </div>
  );
});

// 父组件调用
const UseLogin = () => {
  const childRef = React.useRef<any>();
  const data = {
    name: 'chenguang',
    age: 18,
    sex: '女',
    phone: '1688',
  };
  const click = () => {
    console.log(childRef);
    // 这里会调用子组件内部返回的 submit方法
    let data = childRef?.current?.submit();
    console.log('data', data);
    return data;
  };
  return (
    <>
      <Login ref={childRef} {...data} />
      <button onClick={click}>submit</button>
    </>
  );
};

export default UseLogin;

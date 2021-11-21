import React, { useState, useEffect } from 'react';
import { PageContext, initData, IPassenger } from './context';
import { cnNamerule, enNamerule } from './validate';
import { isHasOneENPassenger } from './manager';
import { ENName } from './enName';
import { CNName } from './cnName';
import './index.less';

const PageCom = () => {
  const [guestCount, setGuestCount] = useState(2);
  const [checkCount, setCheckCount] = useState(0);
  const [roomCount, setRoomCountNum] = useState(1);
  const [cnPassengers, setCnPassengers] = useState<IPassenger[]>([]);
  const [enPassengers, setENPassengers] = useState<IPassenger[][]>([]);
  // const { cnNameValidate } = useContext(PageContext);
  const [isChecked, setIsChecked] = useState(false);
  // 中文姓名校验
  const cnNameValidate = () => {
    const warnArr: boolean[] = [];
    cnPassengers.forEach((p, i) => {
      const isCheckPass =
        cnNamerule.getWarning({ value: p.CNName }).length === 0;
      // 保存每个房间的校验态
      cnPassengers[i].isWarning = !isCheckPass;
      warnArr.push(isCheckPass);
    });
    setCnPassengers(cnPassengers);
    return warnArr.every((p) => !!p) && cnPassengers.length === roomCount;
  };

  // 英文姓名校验
  const enNameValidate = () => {
    const enpassengers = [...enPassengers];
    const enWarnArr = enPassengers.map((p, i) => {
      const hasOnePerson = isHasOneENPassenger(p);
      const enRoomWarnArr: boolean[] = p.map((pItem, index) => {
        const firstNameWarn = enNamerule.getWarning({
          value: pItem.ENFirstName || '',
          canEmpty: hasOnePerson && !pItem?.ENLastName,
        });
        const lastNameWarn = enNamerule.getWarning({
          value: pItem.ENLastName || '',
          canEmpty: hasOnePerson && !pItem?.ENFirstName,
        });
        const isCheckPass =
          lastNameWarn.length === 0 && firstNameWarn.length === 0;
        enpassengers[i][index].warnText = [lastNameWarn, firstNameWarn];
        enpassengers[i][index].isWarning = !isCheckPass;
        return isCheckPass;
      });
      console.log(enpassengers);
      setENPassengers(enpassengers);
      return enRoomWarnArr.every((item) => item);
    });
    return enWarnArr.every((item) => item) && enPassengers.length === roomCount;
  };
  // 点击check button 时
  const onCheck = () => {
    const isCnNameValidate = cnNameValidate() || true;
    const isEnNameValidate = enNameValidate();
    setIsChecked(!isEnNameValidate);
    setCheckCount(checkCount + 1);
  };
  // 修改房间数
  const changeRoomCount = (count: number) => {
    // setIsChecked(false);
    setRoomCountNum(count < 1 ? 1 : count);
  };

  const getPassengerId = (roonIndex: number, personIndex = 0) => {
    return (10000 + roonIndex * 100 + personIndex * 10 + 1) * -1;
  };
  // 房间数发生变化时，更改 passengers
  useEffect(() => {
    const passengerId = getPassengerId(roomCount);
    setCnPassengers(
      cnPassengers.length >= roomCount
        ? cnPassengers.slice(0, roomCount)
        : [
            ...cnPassengers,
            {
              isWarning: false,
            } as IPassenger,
          ],
    );
    setENPassengers(
      enPassengers.length >= roomCount
        ? enPassengers.slice(0, roomCount)
        : [...enPassengers, enChangeRoomCount()],
    );
  }, [roomCount]);
  // 英文姓名的情况
  const enChangeRoomCount = () => {
    const newRoom = [];
    for (let i = 0; i < guestCount; i++) {
      newRoom.push({
        // PassengerID: getPassengerId(roomCount, i),
        isWarning: false,
      } as IPassenger);
    }
    return newRoom;
  };

  // 中文姓名修改
  const onChangeCNName = (text: string, i: number) => {
    const passengers = [...cnPassengers];
    const passengerId = -1000 + i * 10 + i;
    if (passengers[i]) {
      passengers.splice(i, 1, {
        PassengerID: passengerId,
        CNName: text,
        isWarning: false,
      } as IPassenger);
    } else {
      passengers.push({
        PassengerID: passengerId,
        CNName: text,
      } as IPassenger);
    }
    setCnPassengers(passengers);
  };
  // 修改英文姓名
  const onChangeENName = (
    passengerName: string,
    index: number,
    line: number,
    isLastName: boolean,
  ) => {
    let newEnPassengers = [...enPassengers];
    const passenger = newEnPassengers[index];
    // 根据 isLastName 判断iput变化的是 firstName 还是 lastName
    const enFirstName = isLastName
      ? (passenger && passenger[line]?.ENFirstName) || ''
      : passengerName;
    const enLastName = isLastName
      ? passengerName
      : (passenger && passenger[line]?.ENLastName) || '';
    // 英文姓名发生变化时，更改 input框的校验态
    const newEnPassneger = {
      ENFirstName: enFirstName,
      ENLastName: enLastName,
      PassengerID: getPassengerId(index, line),
      isWarning: false,
    } as IPassenger;
    // 修改
    if (passenger && passenger[line]) {
      // 修改 enPassengers
      newEnPassengers[index].splice(line, 1, newEnPassneger);
    }
    // 新增 该房间已存在一人 再添加一人
    else if (passenger) {
      newEnPassengers[index][line] = newEnPassneger;
    }
    // 新增 第 index 房间 的 第 line 个人
    else {
      newEnPassengers = newEnPassengers || [];
      newEnPassengers[index] = newEnPassengers[index] || [];
      newEnPassengers[index][line] = newEnPassneger;
    }

    setENPassengers(newEnPassengers);
  };

  // focus 时，修改中文姓名该房间的校验状态
  const changeCNRoomCheck = (i: number) => {
    const passengers = [...cnPassengers];
    passengers[i] = !passengers[i]
      ? ({
          isWarning: false,
        } as IPassenger)
      : { ...passengers[i], isWarning: false };
    setCnPassengers(passengers);
  };

  const changeENNameCheck = (i: number) => {
    const enpassengers = [...enPassengers];
    enpassengers[i] = !enpassengers[i]
      ? enChangeRoomCount()
      : enPassengers[i].map((p) => {
          p.isWarning = false;
          return p;
        });
    setENPassengers(enpassengers);
  };

  return (
    <>
      <div className="room-count">
        <span onClick={() => changeRoomCount(roomCount - 1)}>-</span>
        <span>{roomCount}</span>
        <span onClick={() => changeRoomCount(roomCount + 1)}>+</span>
      </div>

      <CNName
        isChecked={isChecked}
        roomCount={roomCount}
        cnPassengers={cnPassengers}
        onChangeCNName={onChangeCNName}
        changeRoomCheck={changeCNRoomCheck}
        checkCount={checkCount}
      />

      <ENName
        isChecked={isChecked}
        roomCount={roomCount}
        guestCount={guestCount}
        enPassengers={enPassengers}
        onChangeENName={onChangeENName}
        changeRoomCheck={changeENNameCheck}
        checkCount={checkCount}
      />

      <button onClick={onCheck}>check</button>
    </>
  );
};

export default () => {
  return (
    <>
      <PageContext.Provider value={{ ...initData }}>
        <PageCom />
      </PageContext.Provider>
    </>
  );
};

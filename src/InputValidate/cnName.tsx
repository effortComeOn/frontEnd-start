import React, { useState, useEffect } from 'react';
import { InputItem, IInputItemProps } from './InputItem';
import { cnNamerule } from './validate';
import { PageContext, IPassenger } from './context';

interface ICNNameProps {
  isChecked: boolean;
  roomCount: number;
  cnPassengers: IPassenger[];
  checkCount: number;
  onChangeCNName: (text: string, i: number) => void;
  changeRoomCheck: (i: number) => void;
}

export const CNName = (props: ICNNameProps) => {
  const {
    roomCount,
    isChecked,
    onChangeCNName,
    cnPassengers,
    checkCount,
    changeRoomCheck,
  } = props;

  const onFocus = (i: number) => {
    changeRoomCheck(i);
  };

  const onBlur = () => {
    console.log('onBlur');
  };

  const passengerInput = () => {
    const arr = [];
    for (let i = 0; i < cnPassengers.length; i++) {
      const isWarn =
        isChecked && (!!cnPassengers[i]?.isWarning || !cnPassengers[i]);
      arr.push(
        <InputItem
          placeholder="请输入姓名"
          key={`${i}cnName`}
          labelText={`房间${i + 1}`}
          isChecked={isWarn}
          checkCount={checkCount}
          rule={cnNamerule}
          value={cnPassengers[i]?.CNName || ''}
          onFocus={() => onFocus(i)}
          onBlur={onBlur}
          onChangeText={(text) => onChangeCNName(text, i)}
        />,
      );
    }
    return arr;
  };

  return (
    <>
      <div>中文姓名</div>
      {passengerInput()}
    </>
  );
};

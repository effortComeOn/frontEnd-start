import React from 'react';
import { IPassenger } from './context';
import { ENNameItem } from './ENNameItem';

interface IENNameProps {
  isChecked: boolean;
  roomCount: number;
  enPassengers: IPassenger[][];
  guestCount: number;
  checkCount: number;
  onChangeENName: (
    text: string,
    i: number,
    line: number,
    isLastName: boolean,
  ) => void;
  changeRoomCheck: (i: number) => void;
}

export const ENName = (props: IENNameProps) => {
  const {
    roomCount,
    isChecked,
    onChangeENName,
    enPassengers,
    guestCount,
    checkCount,
    changeRoomCheck,
  } = props;

  const onFocus = (i: number) => {
    changeRoomCheck(i);
  };

  const onBlur = () => {
    // console.log('onBlur');
  };

  const passengerInput = () => {
    const arr = [];
    for (let i = 0; i < roomCount; i++) {
      arr.push(
        <div key={`${i}enRoom`}>
          <ENNameItem
            roomIndex={i}
            checkCount={checkCount}
            passengers={enPassengers[i]}
            key={`${i}cnName`}
            isChecked={isChecked}
            guestCount={guestCount}
            onFocus={() => onFocus(i)}
            onBlur={onBlur}
            onChangeENName={(text, line, isLastName) =>
              onChangeENName(text, i, line, isLastName)
            }
          />
        </div>,
      );
    }
    return arr;
  };

  return (
    <>
      <div>英文姓名</div>
      {passengerInput()}
    </>
  );
};

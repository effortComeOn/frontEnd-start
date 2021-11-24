import React, { useState } from 'react';
import { IPassenger } from './context';

const enPassengers: IPassenger[] = [
  {
    CNName: '',
    ENFirstName: 'a',
    ENLastName: 'b',
    PassengerID: 1,
  },
  {
    CNName: '',
    ENFirstName: 'aa',
    ENLastName: 'bb',
    PassengerID: 2,
  },
];

interface IProps {
  onSelect: (item: IPassenger) => void;
}

export const ENPassengerSelect = (props: IProps) => {
  const [curIndex, setCurIndex] = useState(-1);
  return (
    <div className="select-wapper">
      英文姓名选择框
      {enPassengers.map((item, index) => {
        return (
          <div
            key={`${index}`}
            className={`select-item ${
              curIndex == index ? 'select-active' : ''
            }`}
            onClick={() => {
              props.onSelect(item);
              setCurIndex(index);
            }}
          >
            {`${item.ENLastName}/${item.ENFirstName}`}{' '}
          </div>
        );
      })}
    </div>
  );
};

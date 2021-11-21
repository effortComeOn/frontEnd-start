import React from 'react';
import { InputItem } from './InputItem';
import { enNamerule, IInputProps } from './validate';
import { IPassenger } from './context';
import { isHasOneENPassenger } from './manager';

interface IENNameItemProps {
  onFocus: (color: string) => void;
  onBlur: (color: string) => void;
  checkCount: number;
  isChecked: boolean;
  guestCount: number;
  roomIndex: number;
  passengers: IPassenger[];
  onChangeENName: (text: string, line: number, isLastName: boolean) => void;
}

export const ENNameItem = (props: IENNameItemProps) => {
  const {
    isChecked,
    onChangeENName,
    onFocus,
    onBlur,
    guestCount,
    checkCount,
    roomIndex,
    passengers = [],
  } = props;

  // 当前房间的校验状态
  const isRoomChecked = (): boolean => {
    if (!passengers) {
      return isChecked;
    }
    const checkArr = passengers?.map((p) => {
      return isChecked && (!!p?.isWarning || !p);
    });
    return checkArr.some((p) => p);
  };

  const enNameItemArr = () => {
    const arr = [];
    const hasOneEnPerson = isHasOneENPassenger(passengers);
    for (let i = 0; i < guestCount; i++) {
      const check = isRoomChecked();
      arr.push(
        <div className="enname-item" key={`${i}enName`}>
          <InputItem
            placeholder="请输入 LastName"
            isChecked={isRoomChecked()}
            checkCount={0}
            rule={{
              ...enNamerule,
              getWarning: (input: IInputProps) =>
                enNamerule.getWarning({
                  ...input,
                  canEmpty: hasOneEnPerson && !passengers[i]?.ENFirstName,
                }),
            }}
            value={passengers[i]?.ENLastName || ''}
            onFocus={onFocus}
            onBlur={onBlur}
            canEmpty={hasOneEnPerson && !passengers[i]?.ENFirstName}
            onChangeText={(text) => onChangeENName(text, i, true)}
          />
          <div style={{ padding: '0 4px' }}>|</div>
          <InputItem
            isChecked={check}
            checkCount={0}
            placeholder="请输入 FirstName"
            value={passengers[i]?.ENFirstName || ''}
            rule={{
              ...enNamerule,
              getWarning: (input: IInputProps) =>
                enNamerule.getWarning({
                  ...input,
                  canEmpty: hasOneEnPerson && !passengers[i]?.ENLastName,
                }),
            }}
            canEmpty={hasOneEnPerson && !passengers[i]?.ENLastName}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={(text) => onChangeENName(text, i, false)}
          />
        </div>,
      );
    }
    return arr;
  };
  return (
    <div className="enname-item">
      {checkCount && isRoomChecked() ? (
        <div className={'is-check-false'} />
      ) : null}

      <span
        className="label"
        style={{
          color: '#333',
          marginRight: '10px',
        }}
      >
        {`房间${roomIndex + 1}`}
      </span>
      <div>{enNameItemArr()}</div>
    </div>
  );
};

import React, { useState, useEffect, useMemo } from 'react';
import { InputItem } from './InputItem';
import { enNamerule, IInputProps } from './validate';
import { IPassenger } from './context';
import { isHasOneENPassenger } from './manager';

interface IENNameItemProps {
  onFocus: () => void;
  onBlur: () => void;
  checkCount: number;
  isChecked: boolean;
  guestCount: number;
  roomIndex: number;
  passengers: IPassenger[];
  onChangeENName: (text: string, line: number, isLastName: boolean) => void;
}

export const ENNameItem = (props: IENNameItemProps) => {
  const [focused, setFocused] = useState(false);
  const [warnTextArr, setWarnTextArr] = useState<string[][]>([]);
  const [labelColor, setLabelColor] = useState('#333');
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

  const hasOneEnPerson = useMemo(
    () => isHasOneENPassenger(passengers),
    [passengers],
  );

  useEffect(() => {
    if (isChecked || hasOneEnPerson) {
      let warnArr: any = passengers.map((p) => p.warnText);
      warnArr = warnArr.map((warn: string[], i: number) => {
        if (warn && hasOneEnPerson) {
          warnArr[i][0] = passengers[i]?.ENFirstName ? warn[0] : '';
          warnArr[i][1] = passengers[i]?.ENLastName ? warn[1] : '';
        }
        return warn;
      });
      console.log('warnArr', warnArr, passengers);
      setWarnTextArr(warnArr);
    }
  }, [isChecked, passengers]);

  const changeWarnText = (i: number, k: number, text: string) => {
    let warntextArr = [...warnTextArr];
    warntextArr[i] = warntextArr[i] ? warntextArr[i] : [];
    warntextArr[i][k] = text;
    setWarnTextArr(warntextArr);
  };

  // 当前房间的校验状态
  const isRoomChecked = (): boolean => {
    if (!passengers) {
      return isChecked;
    }
    const checkArr = passengers?.map((p) => {
      return !!p?.isWarning || !p;
    });
    return checkArr.some((p) => p);
  };

  const enNameItemArr = () => {
    const arr = [];
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
            onFocus={() => {
              setFocused(true);
              onFocus();
            }}
            onBlur={(warnText: string) => {
              onBlur();
              setFocused(false);
              changeWarnText(i, 0, warnText);
            }}
            canEmpty={hasOneEnPerson && !passengers[i]?.ENFirstName}
            onChangeText={(text) => {
              setFocused(true);
              onChangeENName(text, i, true);
            }}
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
            onFocus={() => {
              setFocused(true);
              onFocus();
            }}
            onBlur={(warnText: string) => {
              setFocused(false);
              onBlur();
              changeWarnText(i, 1, warnText);
            }}
            onChangeText={(text) => {
              setFocused(true);
              onChangeENName(text, i, false);
            }}
          />
        </div>,
      );
    }
    return arr;
  };
  const labelcolor = () => {
    if (focused) {
      return 'blue';
    } else if (isRoomChecked()) {
      return 'red';
    } else if (warnTextArr.some((t) => t?.some((warn) => warn.length !== 0))) {
      return 'red';
    } else {
      return labelColor;
    }
  };
  return (
    <div className="enname-item">
      {checkCount && isRoomChecked() ? (
        <div className={'is-check-false'} />
      ) : null}

      <span
        className="label"
        style={{
          color: labelcolor(),
          marginRight: '10px',
        }}
      >
        {`房间${roomIndex + 1}`}
      </span>
      <div>{enNameItemArr()}</div>
    </div>
  );
};

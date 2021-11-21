import { createContext } from 'react';
import { cnNamerule } from './validate';

export interface IPassenger {
  CNName: string;
  ENFirstName: string;
  ENLastName: string;
  PassengerID: number;
  isWarning?: boolean;
}

interface IInitData {
  roomCount: number;
  setRoomCount: (count: number) => number;
  cnPassengers: IPassenger[];
  cnNameValidate: (
    roomCount: number,
    cnPassengers: IPassenger[],
  ) => { isOrderWaring: boolean; cnPassengers: IPassenger[] };

  enPassengers: IPassenger[];
  enNameValidate: (roomCount: number, cnPassengers: IPassenger[]) => boolean;
}

export const PageContext = createContext({} as IInitData);

export const initData = {
  roomCount: 1,
  setRoomCount: (count: number) => {
    return count < 1 ? 1 : count;
  },
  cnPassengers: [],
  cnNameValidate: (roomCount: number, cnPassengers: IPassenger[]) => {
    const pArr = [...cnPassengers];
    const warnArr: boolean[] = [];
    cnPassengers.forEach((p, i) => {
      const isCheckPass =
        cnNamerule.getWarning({ value: p.CNName }).length === 0;
      // 保存每个房间的校验态
      pArr[i].isWarning = !isCheckPass;
      warnArr.push(isCheckPass);
    });
    return {
      isOrderWaring:
        warnArr.every((p) => !!p) && cnPassengers.length === roomCount,
      cnPassengers: pArr,
    };
  },

  enPassengers: [],
  enNameValidate: (roomCount: number, cnPassengers: IPassenger[]) => {
    const isCheckPass =
      cnPassengers.every((p) => cnNamerule.getWarning({ value: p.CNName })) &&
      cnPassengers.length === roomCount;
    return !isCheckPass;
  },
};

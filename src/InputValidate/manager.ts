import { PageContext, initData, IPassenger } from './context';
import { cnNamerule } from './validate';

export const colorStr = (focused: boolean, warning: boolean) => {
  return focused ? 'blue' : warning ? 'red' : '#333';
};

/** 英文住客是否已经有一个填写一人 */
export const isHasOneENPassenger = (passengers: IPassenger[]): boolean => {
  let hasOneEnPerson = false;
  if (!passengers) {
    hasOneEnPerson = false;
  } else {
    passengers.forEach((item) => {
      if (!hasOneEnPerson) {
        hasOneEnPerson = !!(item?.ENLastName && item?.ENFirstName);
      }
    });
  }
  return hasOneEnPerson;
};

export interface IInputProps {
  value: string;
  canEmpty?: boolean;
}

export const cnNamerule = {
  getWarning: (input: IInputProps): string => {
    if (input.value) return '';
    return '请输入姓名';
  },
};
export const enNamerule = {
  getWarning: (input: IInputProps): string => {
    if (input.canEmpty) return '';
    if (input.value) return '';
    return '请输入姓名';
  },
};

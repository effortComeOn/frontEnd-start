import React, { useState, useEffect } from 'react';
import { colorStr } from './manager';

export interface IInputItemProps {
  onFocus: () => void;
  onBlur: (warnText: string) => void;
  isChecked: boolean;
  rule: any;
  value: string;
  onChangeText: (text: string) => void;
  labelText?: string;
  checkCount: number;
  canEmpty?: boolean;
  placeholder: string;
}

export const InputItem = (props: IInputItemProps) => {
  const [warningText, setWarningText] = useState('');
  const [focused, setFocused] = useState(false);
  const {
    isChecked = false,
    rule,
    value,
    labelText,
    checkCount,
    canEmpty,
    placeholder,
  } = props;

  const onFocus = () => {
    setFocused(true);
    props.onFocus();
  };

  const onBlur = () => {
    setFocused(false);
    const warningText = rule.getWarning({ value });
    setWarningText(warningText);
    props.onBlur(warningText);
  };

  const onChangeText = (e: any) => {
    props.onChangeText(e.target.value);
  };

  useEffect(() => {
    if (isChecked || canEmpty) {
      setFocused(false);
      const warningText = rule.getWarning({ value });
      setWarningText(warningText);
      props.onBlur(warningText);
    }
  }, [isChecked, canEmpty]);

  return (
    <div style={{ position: 'relative' }}>
      {checkCount && isChecked ? <div className={'is-check-false'} /> : null}
      <div className={`input-item `}>
        {labelText ? (
          <span
            className="label"
            style={{
              color: colorStr(focused, !!warningText),
            }}
          >
            {labelText}
          </span>
        ) : null}
        <div className="input-content">
          <input
            onFocus={onFocus}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
            onChange={onChangeText}
          />
          <div
            className={'line'}
            style={{
              backgroundColor: colorStr(focused, !!warningText),
            }}
          />

          {warningText && !focused ? (
            <div className="warning-text">{warningText}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

import React, { forwardRef } from 'react';
import { InputBase, InputProps } from './InputBase';
import styles from './Input.module.scss';

export interface TextInputProps extends InputProps {
  showCount?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ children, showCount = false, ...props }, ref) => {
    const { value, maxLength } = props;

    const CountEl = <div className={styles.count}>{`${String(value).length} / ${maxLength}`}</div>;

    return (
      <InputBase type="text" {...props} ref={ref}>
        {children}
        {showCount && maxLength && CountEl}
      </InputBase>
    );
  }
);

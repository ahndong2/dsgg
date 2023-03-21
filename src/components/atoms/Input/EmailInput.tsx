import React, { useState, forwardRef, useEffect } from 'react';
import { InputBase, InputProps } from './InputBase';

export type EmailInputProps = InputProps;

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>((props, ref) => {
  const {
    error = false,
    errorMessage = '이메일 형식이 아닙니다. 다시 한 번 확인해 주세요.',
    onChange = () => {},
  } = props;
  const [isError, setIsError] = useState(false);
  const validateEmailType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    setIsError(!pattern.test(value));
    onChange(e, !pattern.test(value));
  };
  useEffect(() => {
    setIsError(error);
  }, [error]);
  return (
    <InputBase
      ref={ref}
      type="email"
      {...props}
      onChange={validateEmailType}
      error={isError}
      errorMessage={errorMessage}
    />
  );
});

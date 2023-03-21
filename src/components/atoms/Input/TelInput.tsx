import { forwardRef } from 'react';
import { InputBase, InputProps } from './InputBase';

export interface TelInputProps extends InputProps {}

export const TelInput = forwardRef<HTMLInputElement, TelInputProps>((props, ref) => {
  return <InputBase ref={ref} type="tel" pattern="[0-9]+" {...props} />;
});

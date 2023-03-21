import { forwardRef } from 'react';
import { InputBase, InputProps } from './InputBase';

export interface NumberInputProps extends InputProps {
  inputMode?: string;
  pattern?: string;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
  return <InputBase ref={ref} type="number" inputMode="numeric" pattern="[0-9]*" {...props} />;
});

import React, { useState, forwardRef } from 'react';
import { Button, Icon } from '@/components';
import { InputBase, InputProps } from './InputBase';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export interface PasswordInputProps extends InputProps {
  useToggle?: boolean;
}
type typeObj = {
  type: string;
  visible: boolean;
  icon: IconProp;
  label: string;
};
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ useToggle = false, ...props }, ref) => {
    const types: typeObj[] = [
      { type: 'password', visible: false, icon: solid('eye'), label: 'Show' },
      { type: 'text', visible: true, icon: solid('eye-slash'), label: 'Hide' },
    ];
    const [passwordType, setPasswordType] = useState(types[0]);
    const handlePasswordType = () => {
      setPasswordType(types.find((type) => type.visible === !passwordType.visible) as typeObj);
    };

    const ToggleBtn = (
      <Button title={passwordType.label} className="button" onClick={handlePasswordType}>
        <Icon icon={passwordType.icon} fixedWidth />
      </Button>
    );
    return (
      <InputBase ref={ref} type={passwordType.type} {...props}>
        {useToggle && ToggleBtn}
      </InputBase>
    );
  }
);

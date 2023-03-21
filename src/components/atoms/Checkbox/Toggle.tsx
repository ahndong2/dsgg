import { useEffect, useState, useRef } from 'react';
import { PropsBase } from '@types';
import styles from './Toggle.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export interface ToggleProps extends PropsBase {
  checked?: boolean;
  label?: [string, string];
  variant?: 'proxy' | 'alarm';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Toggle = ({ label, variant, ...props }: ToggleProps) => {
  const { checked = false, disabled = false, className, onChange = () => {} } = props;

  const toggleRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    checked: checked,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      checked: e.target.checked,
    });
    onChange(e);
  };

  useEffect(() => {
    setData({ checked });
  }, [checked]);
  return (
    <label
      role="switch"
      data-variant={variant}
      data-checked={data.checked}
      className={cx('root', className)}
    >
      <input
        ref={toggleRef}
        type="checkbox"
        {...props}
        checked={data.checked}
        onChange={handleChange}
        className={cx('input')}
        disabled={disabled}
      />
      {label && <span className={cx('label')}>{data.checked ? label[0] : label[1]}</span>}
    </label>
  );
};

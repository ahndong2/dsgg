import { useEffect, useState, useRef } from 'react';
import { PropsBase } from '@types';
import { ReactComponent as IconCheck } from '@/assets/images/icon-check.svg';
import styles from './Checkbox.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export interface CheckboxProps extends PropsBase {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({ children, ...props }: CheckboxProps) => {
  const { checked = false, disabled = false, className, onChange = () => {} } = props;

  const checkboxRef = useRef<HTMLInputElement>(null);

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
    <label data-checked={data.checked} data-disabled={disabled} className={cx('root', className)}>
      <input
        ref={checkboxRef}
        type="checkbox"
        {...props}
        checked={data.checked}
        onChange={handleChange}
        className={cx('input')}
      />
      <i className={cx('icon')}>{data.checked && <IconCheck width={12} height={12} />}</i>
      {children && <span className={cx('label')}>{children}</span>}
    </label>
  );
};

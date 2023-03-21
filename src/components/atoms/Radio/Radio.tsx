import { useEffect, useState, useRef } from 'react';
// import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
// import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './Radio.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

// interface iconType {
//   name: string;
//   checked: IconProp;
//   unchecked: IconProp;
// }
// const iconTypes: iconType[] = [
//   {
//     name: 'circle',
//     checked: solid('circle-dot'),
//     unchecked: regular('circle-dot'),
//   },
// ];

export interface RadioProps {
  children?: React.ReactNode;
  id?: string;
  name?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  variant?: 'circle';
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Radio = ({ children, ...props }: RadioProps) => {
  const {
    checked = false,
    disabled = false,
    // variant = 'circle',
    className,
    onChange = () => {},
  } = props;

  const radioRef = useRef<HTMLInputElement>(null);
  // const icon = iconTypes.find((type) => type.name === variant) as iconType;

  const [data, setData] = useState({
    checked: checked,
  });
  useEffect(() => {
    setData({
      checked: checked,
    });
  }, [checked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      checked: e.target.checked,
    });
    onChange(e);
  };

  return (
    <label data-checked={data.checked} data-disabled={disabled} className={cx('root', className)}>
      <input
        ref={radioRef}
        type="radio"
        {...props}
        checked={data.checked}
        className={cx('input')}
        onChange={handleChange}
      />
      <i className={cx('icon')} />
      {children && <span className={cx('label')}>{children}</span>}
    </label>
  );
};

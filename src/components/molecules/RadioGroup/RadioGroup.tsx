import React from 'react';
import { Radio } from '@/components';
import styles from './RadioGroup.module.scss';
import classNames from 'classnames/bind';
import { CustomEventTarget } from '@types';
const cx = classNames.bind(styles);
interface Options extends CustomEventTarget {
  checked?: boolean;
  disabled?: boolean;
}
export interface RadioGroupProps {
  children?: React.ReactNode;
  value?: string;
  label?: string;
  options: Options[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const RadioGroup = (props: RadioGroupProps) => {
  const { label, options, orientation = 'horizontal', className, onChange = () => {} } = props;

  const RadioGroupLabel = label && <div className={cx('label')}>{label}</div>;

  return (
    <div className={cx('root', className)}>
      {RadioGroupLabel}
      <div className={cx('list', orientation)}>
        {options?.map((ele: Options, idx: number) => {
          return (
            <>
              <Radio
                checked={ele.checked ? true : false}
                key={(ele.label || '') + idx}
                id={idx.toString()}
                onChange={onChange}
              />
              <div dangerouslySetInnerHTML={{ __html: `<pre>${ele.label}</pre>` }}></div>
            </>
          );
        })}
      </div>
    </div>
  );
};

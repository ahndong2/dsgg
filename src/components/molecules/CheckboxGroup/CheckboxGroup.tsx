import React from 'react';
import { Checkbox } from '@/components';
import styles from './CheckboxGroup.module.scss';
import classNames from 'classnames/bind';
import { CustomEventTarget } from '@types';

const cx = classNames.bind(styles);
interface Options extends CustomEventTarget {
  checked?: boolean;
  disabled?: boolean;
}
export interface CheckboxGroupProps {
  children?: React.ReactNode;
  options?: Options[];
  value?: string[];
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { options, label, orientation = 'horizontal', className, onChange = () => {} } = props;

  const CheckboxGroupLabel = label && <div className={cx('label')}>{label}</div>;

  return (
    <div className={cx('root', className)}>
      {CheckboxGroupLabel}
      <div className={cx('list', orientation)}>
        {options?.map((ele: Options, idx: number) => {
          return (
            <>
              <Checkbox
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

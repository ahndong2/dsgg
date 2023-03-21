import React, { useEffect, useState, useRef } from 'react';
import { Button, Checkbox, Empty } from '@/components';
import { CustomEventTarget } from '@types';
import { VALIDATION_MESSAGE } from '@/constants';
import { useStateCallback } from '@/utils';
import styles from './SelectCheckbox.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

interface SelectOptionType {
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
}
interface SelectState {
  selectMenuItem: SelectOptionType[];
  display: boolean;
}
export interface SelectCheckboxProps {
  id?: string;
  name: string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'none' | 'sm' | 'md' | 'lg';
  placement?: 'top' | 'bottom';
  placeholder?: string;
  value?: string[];
  options?: SelectOptionType[];
  className?: string;
  onChange?: (d: CustomEventTarget) => void;
}

export const SelectCheckbox = (props: SelectCheckboxProps) => {
  // console.log('SelectCheckbox : ', props);
  const {
    id,
    name,
    value,
    options = [],
    disabled,
    readOnly,
    placeholder = '선택',
    className,
    size = 'sm',
    placement = 'bottom',
    onChange = () => {},
  } = props;

  const componentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [data, setData] = useState<SelectState>({
    selectMenuItem: [],
    display: false,
  });
  const [checkedData, setCheckedData] = useStateCallback([] as SelectOptionType[]);

  const changeDisplay = () => {
    if (!disabled && !readOnly) {
      setData((data) => {
        return { ...data, display: !data.display };
      });
    }
  };

  const onChangeCheckBox = (checked: boolean, i: number) => {
    const data = { ...options[i], idx: i };
    if (checked) {
      setCheckedData([...checkedData, data], (s) =>
        onChange({ id: id, name: name, checkedList: s })
      );
    } else {
      setCheckedData(
        checkedData.filter((v) => v.value !== data.value),
        (s) => onChange({ id: id, name: name, checkedList: s })
      );
    }
  };

  useEffect(() => {
    const onClickEvent = (e: Event) => {
      const target = e.target as HTMLElement;
      const id = componentRef.current && componentRef.current.id;
      if (!target.closest(`#${id}`)) {
        changeDisplay(); // close
        return;
      }
    };

    if (data.display) {
      document.addEventListener('click', onClickEvent);
    }
    return () => {
      document.removeEventListener('click', onClickEvent);
    };
  }, [data.display]);

  useEffect(() => {
    if (options.length === 0) return;
    let selectMenuItem: SelectOptionType[];
    if (value) {
      selectMenuItem = value.map((m) => ({
        idx: options.findIndex((f) => f.value === m),
        label: String(options.find((f) => f.value === m)?.label),
        value: m,
      }));
      setCheckedData(selectMenuItem);
    }
    setData((d) => {
      return {
        ...d,
        selectMenuItem: selectMenuItem,
      };
    });
  }, [options, value]);
  const EmptyEl = (
    <li>
      <Empty message={VALIDATION_MESSAGE.NO_ITEMS} className={styles.empty} />
    </li>
  );
  return (
    <div
      id={id || name}
      data-size={size}
      data-focus={data.display}
      data-placement={placement}
      className={cx('root', className)}
      ref={componentRef}
    >
      <Button className={cx('select')} onClick={changeDisplay} ref={buttonRef}>
        {/* <span className={styles.text}>{checkedData.map((v) => v.label)}</span> */}
        <span className={styles.text}>
          {checkedData.length > 0 ? checkedData[0].label : placeholder}
        </span>
        {checkedData.length > 1 && <span className={styles.count}>+{checkedData.length - 1}</span>}
      </Button>

      <div className={cx('dropdown')} style={{ display: data.display ? 'block' : 'none' }}>
        <ul className={cx('list')}>
          {options.length === 0 && EmptyEl}
          {options.length > 0 &&
            options.map((option, i) => {
              return (
                <li key={`li_${i}`} className={cx('item')}>
                  <Checkbox
                    className={styles.checkbox}
                    checked={value?.includes(option.value)}
                    onChange={(e) => {
                      const { checked } = e.target;
                      onChangeCheckBox(checked, i);
                    }}
                  >
                    {option.label}
                  </Checkbox>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

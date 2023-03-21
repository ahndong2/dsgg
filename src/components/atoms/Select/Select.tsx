import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Button, Empty } from '@/components';
import { CustomEventTarget } from '@types';
import { VALIDATION_MESSAGE } from '@/constants';
import { ReactComponent as IconError } from '@/assets/images/icon-error.svg';
import { ReactComponent as IconCheck } from '@/assets/images/icon-check.svg';
import { ReactComponent as IconHelpInfo } from '@/assets/images/icon-help-info.svg';
import styles from './Select.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export interface SelectRef {
  focus: () => void;
}
export interface SelectOptionType {
  label: string;
  value: string;
  selected?: boolean;
  disabled?: boolean;
}

interface SelectState {
  selectMenuItem: SelectOptionType;
  display: boolean;
}
export interface SelectProps {
  id?: string;
  name: string;
  title?: string;
  value?: number | string | SelectOptionType;
  readOnly?: boolean;
  disabled?: boolean;
  size?: 'none' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'none';
  placement?: 'top' | 'bottom';
  placeholder?: string;
  className?: string;
  options?: SelectOptionType[];
  error?: boolean;
  errorMessage?: string;
  validMessage?: string;
  infoMessage?: string;
  onChange?: (d: CustomEventTarget) => void;
}

export const Select = forwardRef<SelectRef, SelectProps>(
  ({ readOnly = false, disabled = false, error = false, ...props }, ref) => {
    const {
      id,
      name,
      title,
      value,
      options = [],
      placeholder = '선택',
      className,
      size = 'md',
      variant = 'default',
      placement = 'bottom',
      errorMessage,
      validMessage,
      infoMessage,
      onChange = () => {},
    } = props;

    const [data, setData] = useState<SelectState>({
      selectMenuItem: {
        label: '',
        value: '',
      },
      display: false,
    });

    const [isError, setIsError] = useState(error);
    useEffect(() => {
      setIsError(error);
    }, [error]);

    const componentRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => {
      return {
        focus() {
          buttonRef.current?.focus();
          // changeDisplay();
        },
      };
    });

    const changeMenu = (changeMenuItem: SelectOptionType) => {
      setData({
        selectMenuItem: changeMenuItem,
        display: false,
      });
      const { label, value } = changeMenuItem;
      onChange({ id: id, name: name, label, value });
    };

    const changeDisplay = () => {
      if (disabled || readOnly) return;
      setData((data) => {
        return { ...data, display: !data.display };
      });
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
      let selectMenuItem: SelectOptionType;
      // if (options.length === 0) return;
      if (value) {
        const valueProp = typeof value === 'string' ? value : (value as SelectOptionType)?.value;
        selectMenuItem = options.find((v) => v.value === valueProp) as SelectOptionType;
      } else {
        const selected = options.filter((v) => v.selected);
        if (selected.length > 0) {
          selectMenuItem = options.filter((v) => v.selected)[0];
        } else {
          selectMenuItem = { label: '', value: '' };
        }
      }

      setData((d) => {
        return {
          ...d,
          selectMenuItem: selectMenuItem,
        };
      });
    }, [options, value]);

    const EmptyEl = (
      <li className={cx('item')}>
        <Empty message={VALIDATION_MESSAGE.NO_ITEMS} className={styles.empty} />
      </li>
    );
    const ErrorEl = (
      <div className={cx('message', 'text-red-negative')}>
        <IconError width={16} height={16} className={cx('icon', 'mt-1')} />
        <span className={styles.text}>{errorMessage}</span>
      </div>
    );
    const ValidEl = (
      <div className={cx('message', 'text-blue-positive')}>
        <IconCheck width={16} height={8} className={cx('icon', 'mt-2')} />
        <span className={styles.text}>{validMessage}</span>
      </div>
    );
    const InfoEl = (
      <div className={cx('message', 'text-yellow-positive')}>
        <IconHelpInfo width={16} height={16} className={cx('icon', 'mt-1')} />
        <span className={styles.text}>{infoMessage}</span>
      </div>
    );
    return (
      <div
        id={id || name}
        data-size={size}
        data-variant={variant}
        data-placement={placement}
        data-focus={data.display}
        data-readonly={readOnly}
        data-disabled={disabled}
        data-error={isError}
        className={cx('root', className)}
        ref={componentRef}
      >
        <Button className={cx('select')} onClick={changeDisplay} ref={buttonRef} title={title}>
          <span className={cx('text')}>{data.selectMenuItem?.label || placeholder}</span>
        </Button>
        <div className={cx('dropdown')} style={{ display: data.display ? 'block' : 'none' }}>
          <ul className={cx('list')}>
            {options.length === 0 && EmptyEl}
            {options.length > 0 &&
              options.map((option, i) => {
                return (
                  <li
                    key={`li_${i}`}
                    data-selected={data.selectMenuItem?.value === option.value}
                    className={cx('item')}
                  >
                    <Button
                      className={cx('option')}
                      onClick={() => changeMenu(option)}
                      disabled={option.disabled}
                    >
                      <span className={styles.text}>{option.label}</span>
                    </Button>
                  </li>
                );
              })}
          </ul>
        </div>
        {isError && errorMessage && ErrorEl}
        {validMessage && ValidEl}
        {infoMessage && InfoEl}
      </div>
    );
  }
);

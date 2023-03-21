import React, { forwardRef, useEffect, useState } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { PropsBase } from '@types';
import { ReactComponent as IconError } from '@/assets/images/icon-error.svg';
const cx = classNames.bind(styles);

export interface ButtonProps extends PropsBase {
  title?: string;
  disabled?: boolean;
  className?: string;
  style?: object;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'negative' | 'dashed';
  outline?: boolean;
  error?: boolean;
  errorMessage?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChange?: () => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, outline = false, error = false, errorMessage, onChange = () => {}, ...props },
    ref
  ) => {
    const { className, size, variant, disabled } = props;
    const [isError, setIsError] = useState(error);
    const ErrorEl = (
      <div className={cx('message', 'text-red-negative')}>
        <IconError width={16} height={16} className={cx('icon', 'mt-1')} />
        <span className={styles.text}>{errorMessage}</span>
      </div>
    );
    const handleClick = () => {
      onChange();
    };
    useEffect(() => {
      setIsError(error);
    }, [error]);
    return (
      <>
        <button
          ref={ref}
          type="button"
          {...props}
          data-size={size}
          data-variant={variant}
          data-outline={outline}
          className={cx('root', className)}
          disabled={disabled}
          onMouseDown={handleClick}
        >
          {children}
        </button>
        {isError && errorMessage && ErrorEl}
      </>
    );
  }
);

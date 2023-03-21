/*eslint @typescript-eslint/no-explicit-any: off */
import React, { useEffect, useState, KeyboardEvent, forwardRef } from 'react';
import { PropsBase } from '@types';
import { isMatchText } from '@/utils';
import styles from './Textarea.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import { ReactComponent as IconError } from '@/assets/images/icon-error.svg';
import { ReactComponent as IconCheck } from '@/assets/images/icon-check.svg';
import { ReactComponent as IconHelpInfo } from '@/assets/images/icon-help-info.svg';

export interface TextareaProps extends PropsBase {
  value?: string;
  placeholder?: string;
  autoComplete?: string;
  spellCheck?: boolean;
  showCount?: boolean;
  error?: boolean;
  errorMessage?: string;
  validMessage?: string;
  infoMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  [key: string]: any;
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      children,
      spellCheck = false,
      showCount = false,
      error = false,
      errorMessage,
      validMessage,
      infoMessage,
      ...props
    },
    ref
  ) => {
    const {
      value = '',
      maxLength,
      placeholder = '내용을 입력해 주세요.',
      autoComplete = 'off',
      pattern,
      className,
      onChange = () => {},
    } = props;

    const [isError, setIsError] = useState(error);
    useEffect(() => {
      setIsError(error);
    }, [error]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      if (pattern) {
        if (!isMatchText(pattern, value)) {
          setIsError(true);
          if (value.length > 0) return;
        } else {
          setIsError(false);
        }
      }
      onChange(e);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (pattern) {
        const { key, keyCode } = e;

        if (key === 'ArrowRight' || keyCode === 39) return;
        if (key === 'ArrowLeft' || keyCode === 37) return;
        if (key === 'Backspace' || keyCode === 8) return;
        if (key === 'Enter' || keyCode === 13) return;

        if (!isMatchText(pattern, key)) e.preventDefault();
      }
    };

    const CountEl = (
      <span className={styles.count}>{`${String(value).length} / ${maxLength}`}</span>
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
      <div data-error={isError} className={cx('root', className)}>
        <textarea
          ref={ref}
          {...props}
          placeholder={placeholder}
          autoComplete={autoComplete}
          spellCheck={spellCheck}
          className={cx('textarea')}
          onChange={handleChange}
          onKeyPress={handleKeyDown}
        />
        {children}
        {showCount && maxLength && CountEl}
        {isError && errorMessage && ErrorEl}
        {validMessage && ValidEl}
        {infoMessage && InfoEl}
      </div>
    );
  }
);

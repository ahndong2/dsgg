/*eslint @typescript-eslint/no-explicit-any: off */
import React, { KeyboardEvent, useState, forwardRef, useEffect } from "react";
import { PropsBase } from "@types";
import { isMatchText } from "@/utils";
import { Button } from "@/components";
import { ReactComponent as IconError } from "@/assets/images/icon-error.svg";
import { ReactComponent as IconCheck } from "@/assets/images/icon-check.svg";
import { ReactComponent as IconHelpInfo } from "@/assets/images/icon-help-info.svg";
import { ReactComponent as IconClose } from "@/assets/images/icon-close.svg";
import styles from "./Input.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export interface InputProps extends PropsBase {
  type?: string;
  size?: "none" | "md" | "lg" | "xl";
  variant?: "default" | "none";
  align?: string;
  placeholder?: string;
  autoComplete?: string;
  spellCheck?: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, error?: boolean) => void;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
  pattern?: string;
  error?: boolean;
  errorMessage?: string; // pattern, error, errorMessage 가 한세트로 들어와야함
  valid?: boolean;
  validMessage?: string;
  infoMessage?: string;
  useClear?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
}

// Boolean을 props로 전달할 수 없어서 우회
export const InputBase = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      children,
      size = "md",
      variant = "default",
      align,
      spellCheck = false,
      error = false,
      errorMessage,
      valid = false,
      validMessage,
      infoMessage,
      useClear = false,
      undraggable = false,
      ...props
    },
    ref
  ) => {
    const {
      value = "",
      type = "text",
      disabled = false,
      readOnly = false,
      autoComplete = "off",
      className,
      pattern,
      onChange = () => {},
      onKeyDown = () => {},
      onFocus = () => {},
      onBlur = () => {},
    } = props;

    const [isError, setIsError] = useState(error);
    const [isValid, setIsValid] = useState(valid);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      let errorFlag = isError;
      if (pattern) {
        errorFlag = !isMatchText(pattern, value);
        if (errorFlag && value.length > 0) return;
        setIsError(errorFlag);
      }
      onChange(e, errorFlag);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (pattern) {
        const { key, keyCode } = e;

        if (key === "ArrowRight" || keyCode === 39) return;
        if (key === "ArrowLeft" || keyCode === 37) return;
        if (key === "Backspace" || keyCode === 8) return;
        if (key === "Enter" || keyCode === 13) return;

        if (!isMatchText(pattern, key)) {
          e.preventDefault();
        }
      }
      onKeyDown(e);
    };

    useEffect(() => {
      setIsError(error);
    }, [error]);

    useEffect(() => {
      setIsValid(valid);
    }, [valid]);
    useEffect(() => {
      if (pattern === "exist" && value) setIsError(false);
    }, [value]);

    const ErrorEl = (
      <div className={cx("message", "text-red-negative")}>
        <IconError width={16} height={16} className={cx("icon", "mt-1")} />
        <span className={styles.text}>{errorMessage}</span>
      </div>
    );
    const ValidEl = (
      <div className={cx("message", "text-blue-positive")}>
        <IconCheck width={16} height={8} className={cx("icon", "mt-2")} />
        <span className={styles.text}>{validMessage}</span>
      </div>
    );
    const InfoEl = (
      <div className={cx("message", "text-yellow-positive")}>
        <IconHelpInfo width={16} height={16} className={cx("icon", "mt-1")} />
        <span className={styles.text}>{infoMessage}</span>
      </div>
    );
    const ClearBtn = (
      <Button className={cx("button", "clear")}>
        <span className="sr-only">삭제</span>
        <IconClose width={16} height={16} />
      </Button>
    );
    return (
      <div
        data-size={size}
        data-variant={variant}
        data-align={align}
        data-error={isError}
        className={cx("root", className)}
      >
        <input
          ref={ref}
          type={type}
          value={value}
          {...props}
          readOnly={readOnly}
          autoComplete={autoComplete}
          spellCheck={spellCheck}
          className={cx("input", undraggable && "pointer-events-none")}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {children}
        {useClear && !disabled && ClearBtn}
        {isError && errorMessage && ErrorEl}
        {isValid && validMessage && ValidEl}
        {infoMessage && InfoEl}
      </div>
    );
  }
);

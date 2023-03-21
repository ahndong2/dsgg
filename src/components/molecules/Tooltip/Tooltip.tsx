import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components';
import { PropsBase, divEventType } from '@types';
import { ReactComponent as IconHelpQuestion } from '@/assets/images/icon-help-question.svg';
import styles from './Tooltip.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import tw from 'twin.macro';
export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface TooltipProps extends PropsBase {
  content?: string;
  placement?: Placement;
  width?: string;
  always?: boolean;
}

const ButtonHelpQuestion = tw(Button)`text-gray-5 cursor-help`;

const Tooltip = (props: TooltipProps) => {
  const {
    children,
    id,
    name,
    className,
    content,
    placement = 'top',
    width,
    always = false,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [fix, setFix] = useState(false);

  const componentRef = useRef<HTMLDivElement>(null);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleEnterEvent = (e: divEventType) => {
    e.preventDefault();
    if (fix) {
      return;
    }
    setIsOpen(true);
  };
  const handleLeaveEvent = (e: divEventType) => {
    e.preventDefault();
    if (fix) {
      return;
    }
    setIsOpen(false);
  };
  const handleClickEvent = () => {
    // 클릭 시 오류로 임시 해제
    // e.preventDefault();
    // setFix(true);
    // setIsOpen(true);
  };

  useEffect(() => {
    const onClickEvent = (e: Event) => {
      const target = e.target as HTMLElement;

      const id = componentRef.current && componentRef.current.id;
      if (!target.closest(`#${id}`)) {
        toggleIsOpen();
        setFix(false);
        return;
      }
    };

    if (fix) {
      document.addEventListener('click', onClickEvent);
    }
    return () => {
      document.removeEventListener('click', onClickEvent);
    };
  }, [fix]);

  useEffect(() => {
    if (always) {
      setFix(true);
      setIsOpen(true);
    }
  }, [always]);
  const IconEl = (
    <ButtonHelpQuestion>
      <IconHelpQuestion />
    </ButtonHelpQuestion>
  );
  return (
    <div
      id={id || name}
      ref={componentRef}
      data-placement={placement}
      className={cx('root', className)}
      onMouseEnter={handleEnterEvent}
      onMouseLeave={handleLeaveEvent}
      onClick={handleClickEvent}
    >
      {children ? children : IconEl}
      <div className={cx('container')} style={{ display: isOpen && content ? 'block' : 'none' }}>
        <div className={cx('content')} style={{ width }}>
          {content}
        </div>
      </div>
    </div>
  );
};
export { Tooltip };

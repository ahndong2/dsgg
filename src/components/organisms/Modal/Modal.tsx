import { useEffect, useState, useRef } from 'react';
import { PropsBase } from '@types';
import { Button, ButtonProps, Badge } from '@/components';
import { ReactComponent as IconClose } from '@/assets/images/icon-close.svg';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export interface FooterBtn extends ButtonProps {
  name?: string;
  count?: number;
  callback?: () => void;
}
export interface ModalProps extends PropsBase {
  width?: string;
  height?: string;
  title?: string;
  description?: string;
  open?: boolean;
  size?: 'narrow' | 'wide'; // narrow 560 / wide 840
  closable?: boolean;
  footerBtns?: FooterBtn[];
  onClose?: () => void;
  dialog?: React.ReactNode;
}

export const Modal = ({ children, dialog, ...props }: ModalProps) => {
  // console.log('Modal : ', props);
  const {
    open = false,
    width,
    height,
    title,
    description,
    size = 'narrow',
    className,
    closable = true,
    footerBtns = [],
    onClose = () => {},
  } = props;

  const modalRef = useRef<HTMLElement>(null);

  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const closeModal = () => {
    if (!closable) {
      return false;
    }
    onClose();
  };

  const HeaderEl = (
    <div className={cx('header')}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );

  return isOpen ? (
    <section ref={modalRef} className={cx('root')}>
      <div className={cx('backdrop')} onClick={closeModal} />
      {dialog || (
        <div className={cx('dialog')} data-size={size} style={{ width, height }}>
          <article className={cx('inner')}>
            {closable && (
              <Button className={styles.close} onClick={closeModal}>
                <span className="sr-only">닫기</span>
                <IconClose width={32} height={32} />
              </Button>
            )}
            {title && HeaderEl}
            <div className={cx('body', className)}>{children}</div>
            {footerBtns.length > 0 && (
              <div className={cx('footer')}>
                {footerBtns.map((btn, i) => {
                  const k = `_${String(i)}`;
                  return (
                    <Button
                      key={k}
                      size="lg"
                      variant={btn.variant}
                      disabled={btn.disabled}
                      className={btn.className}
                      onClick={() => btn.callback && btn.callback()}
                    >
                      {btn.name}
                      {'count' in btn && (
                        <Badge variant="count" content={btn.count} className="ml-1" />
                      )}
                    </Button>
                  );
                })}
              </div>
            )}
          </article>
        </div>
      )}
    </section>
  ) : null;
};

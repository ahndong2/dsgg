import { Button } from '@/components';
import { PropsBase } from '@types';
import { ReactComponent as IconClose } from '@/assets/images/icon-close.svg';
import styles from './Tag.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export interface TagProps extends PropsBase {
  // TODO CustomEventTarget 쓰되 sample에서 tagList 에러 잡기
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  closable?: boolean;
  className?: string;
  options?: { value: number; label: string }[];
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Tag = ({ children, ...props }: TagProps) => {
  const {
    id,
    size = 'md',
    closable = false,
    className,
    onClose = () => {},
    onClick = () => {},
  } = props;

  return (
    <div data-size={size} className={cx('root', className)}>
      <span id={id} className={cx('content', props.onClick && 'cursor-pointer')} onClick={onClick}>
        {children}
      </span>
      {closable && (
        <Button className={styles.close} onClick={onClose} id={id}>
          <IconClose width={16} height={16} />
        </Button>
      )}
    </div>
  );
};

import { PropsBase } from '@types';
import styles from './Badge.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export interface BadgeProps extends PropsBase {
  content?: string | number;
  max?: number;
  variant?: 'state' | 'count' | 'dot' | 'alarm';
  theme?: 'positive' | 'negative';
  showZero?: boolean;
  dot?: boolean;
}

export const Badge = ({ children, ...props }: BadgeProps) => {
  // console.log('Badge : ', props);
  const {
    content,
    max = 99,
    variant = 'state',
    theme = '',
    showZero = false,
    dot = false,
    className,
  } = props;

  const contentNode = // 숫자 최대값 처리
    typeof content === 'number' && 'max' in props && content > max ? `${max}+` : content;

  const hiddenCondition = // 0보다 작거나, 0인데 showZero 아닌 경우 뱃지 숨김
    (variant === 'dot' && dot === false) ||
    (typeof content === 'number' && content < 0) ||
    (!showZero && content === 0);

  return (
    <div data-variant={variant} data-theme={theme} className={cx('root')}>
      {children}
      <div className={cx('badge', className)} hidden={hiddenCondition}>
        {'content' in props && (
          <div className={cx('content', { 'sr-only': variant === 'dot' })}>{contentNode}</div>
        )}
      </div>
    </div>
  );
};

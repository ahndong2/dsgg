import { PropsBase } from '@types';
import styles from './Divider.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export interface DividerProps extends PropsBase {
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export const Divider = (props: DividerProps) => {
  // console.log('Divider : ', props);
  const { direction = 'horizontal', className } = props;

  return <div data-direction={direction} className={cx('root', direction, className)} />;
};

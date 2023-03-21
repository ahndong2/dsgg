import { PropsBase } from '@types';
import { VALIDATION_MESSAGE } from '@/constants';
import { ReactComponent as NoData } from '@/assets/images/no-data.svg';
import styles from './Empty.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export interface EmptyProps extends PropsBase {
  message?: string | React.ReactNode;
  className?: string;
  useImg?: boolean;
}

export const Empty = (props: EmptyProps) => {
  const { message = VALIDATION_MESSAGE.NO_RESULTS, useImg = false, className } = props;

  return (
    <div className={cx('root', { useImg: useImg }, className)}>
      {useImg && <NoData className={styles.img} />}
      <p className={styles.text}>{message}</p>
    </div>
  );
};

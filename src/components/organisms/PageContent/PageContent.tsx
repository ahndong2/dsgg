import { PropsBase } from '@types';
import styles from './PageContent.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export interface PageContentProps extends PropsBase {}

const PageContent = ({ children, ...props }: PageContentProps) => {
  const { className } = props;

  return (
    <div className={cx('root')}>
      <div className={cx('inner', className)}>{children}</div>
    </div>
  );
};
export { PageContent };

import { PropsBase } from '@types';
import styles from './PageHeader.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export interface PageHeaderProps extends PropsBase {
  title?: string;
  description?: string | React.ReactNode;
  theme?: boolean | string;
}

const PageHeader = ({ children, ...props }: PageHeaderProps) => {
  const { title, description, theme, className } = props;

  return (
    <div className={cx('root')} data-theme={theme}>
      <div className={cx('inner', className)}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {description && <p className={styles.description}>{description}</p>}
        {children}
      </div>
    </div>
  );
};
export { PageHeader };

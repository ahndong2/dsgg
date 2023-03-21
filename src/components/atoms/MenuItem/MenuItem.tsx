import React from 'react';
import { Button } from '@/components';
import styles from './MenuItem.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export interface MenuItemProps {
  label?: string;
  value?: string;
  className?: string;
  onClick?: (value: MenuItemProps) => void;
}

export const MenuItem = (props: MenuItemProps) => {
  // console.log('MenuItem : ', props);
  const { label, value, className, onClick = () => {} } = props;

  const clickItem = (e: React.MouseEvent<Element>) => {
    e.preventDefault();
    onClick({ label, value });
  };
  return (
    <li className={cx('root', className)} onClick={clickItem}>
      <Button className={styles.button}>{label}</Button>
    </li>
  );
};

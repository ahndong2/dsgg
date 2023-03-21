import styles from './MenuListGroup.module.scss';

export interface MenuListGroupProps {}

export const MenuListGroup = (props: MenuListGroupProps) => {
  console.log('MenuListGroup : ', props);

  return <div className={styles.MenuListGroup}>MenuListGrooup</div>;
};

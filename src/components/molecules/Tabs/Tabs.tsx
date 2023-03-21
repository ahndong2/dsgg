import styles from './Tabs.module.scss';

export interface TabsProps {}

const Tabs = (props: TabsProps) => {
  console.log('Tabs : ', props);

  return <div className={styles.Tabs}>Tabs</div>;
};
export { Tabs };

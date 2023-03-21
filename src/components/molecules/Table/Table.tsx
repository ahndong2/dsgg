import styles from './Table.module.scss';

export interface TableProps {}

const Table = (props: TableProps) => {
  console.log('Table : ', props);

  return <div className={styles.Table}>Table</div>;
};
export { Table };

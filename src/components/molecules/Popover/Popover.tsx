import styles from './Popover.module.scss';

export interface PopoverProps {}

const Popover = (props: PopoverProps) => {
  console.log('Popover : ', props);

  return <div className={styles.Popover}>Popover</div>;
};
export { Popover };

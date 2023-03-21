import styles from './Upload.module.scss';

export interface UploadProps {}

const Upload = (props: UploadProps) => {
  console.log('Upload : ', props);

  return <div className={styles.Upload}>Upload</div>;
};
export { Upload };

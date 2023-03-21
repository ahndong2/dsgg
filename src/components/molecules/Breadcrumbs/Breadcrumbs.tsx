import styles from './Breadcrumbs.module.scss';

export interface BreadcrumbsProps {}

/* 
 const menu = [
  {
    icon: 'coffee',
    title: '배포',
    link: '',
    sub: [
      { title: '배포 현황', link: '/deploy/index', host: 'HOST_DEVOPS' },
      { title: '배포', link: '/deploy/deploy', host: 'HOST_DEVOPS' },
    ],
  }
 ]
*/

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  console.log('Breadcrumbs : ', props);

  return <div className={styles.Breadcrumbs}>Breadcrumbs</div>;
};

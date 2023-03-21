import CI from "@/assets/images/ci.png";
import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export interface FooterProps {
  className?: string;
}

const Footer = (props: FooterProps) => {
  const { className } = props;

  return (
    <>
      <footer className={cx("root", className)}>
        <div className={styles.inner}>
          <p className={styles.ci}>
            <img src={CI} alt="KB데이타시스템" />
          </p>
          <address className={styles.address}>
            Copyright &copy; KB Data Systems. All rights reserved.
          </address>
        </div>
      </footer>
    </>
  );
};
export { Footer };

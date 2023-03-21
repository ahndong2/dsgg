import { useEffect } from "react";
import { Header, Footer } from "@/components";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export interface DefaultLayoutProps {
  children?: React.ReactNode;
  screen?: "default" | "narrow";
  variant?: "create" | "detail";
  title?: string;
  description?: string;
  className?: string;
}

export const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children, screen, variant, className } = props;

  useEffect(() => {
    // document.body.style.overflow = "visible";
  }, []);
  return (
    <div className={cx("wrapper")} data-screen={screen}>
      <Header />
      <div className={cx("container", className)} data-variant={variant}>
        <main className={cx("content")} data-sidebar={false}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

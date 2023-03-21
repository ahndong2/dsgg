import { Header } from "@/components";
import styles from "./MainLayout.module.scss";
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
const cx = classNames.bind(styles);

export interface MainLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <div className={cx("wrapper")}>
      <Header />
      {children}
    </div>
  );
};

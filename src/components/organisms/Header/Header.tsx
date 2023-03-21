/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from './Header.module.scss';

const Header = () => {
  const location = useLocation();
  // navigate
  const navigate = useNavigate();
  const navigateUrl = useCallback(
    (url: string) => navigate(url, { replace: false }),
    [navigate]
  );

  return (
    <header id="header" className={styles.root}>
      <div className={styles.logo}>
        DSGG
      </div>
      <div className={styles.utils}></div>
    </header>
  );
};
export { Header };

/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const navigateUrl = useCallback(
    (url: string) => navigate(url, { replace: false }),
    [navigate]
  );
  useEffect(() => {
    console.log("main");
  }, []);

  return (
    <main>
      <div id="container">main</div>
    </main>
  );
};
export default Main;

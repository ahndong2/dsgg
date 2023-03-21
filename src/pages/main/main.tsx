/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components";

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
    <MainLayout>
      <main>
        <div id="container">main</div>
      </main>
    </MainLayout>
  );
};
export default Main;

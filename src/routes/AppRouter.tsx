import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CLIENT_PAGE } from "@/constants";
import { Loading, NotFound, ServerError } from "@/pages";

const Main = lazy(() => import("@/pages/main/main"));
export const AppRouter = () => {
  return (
    <Suspense fallback={Loading()}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="main" />} />
          <Route path={CLIENT_PAGE.MAIN.url} element={<Main />} />
          <Route path="*" element={<NotFound />} />
          <Route path="500" element={<ServerError />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

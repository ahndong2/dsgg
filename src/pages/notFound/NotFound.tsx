import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CLIENT_PAGE } from "@/constants";
import { Button } from "@mui/material";

export const NotFound = () => {
  // navigate
  const navigate = useNavigate();
  const navigateUrl = useCallback(
    (url: string) => navigate(url, { replace: false }),
    [navigate]
  );

  return (
    <section className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">페이지를 찾을 수 없습니다</h2>
        <p className="mt-4 text-body-2 text-gray-3">
          페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
          <br />
          다시 한번 확인해주시기 바랍니다.
        </p>
        <Button
          size="large"
          className="w-full mt-10"
          onClick={() => navigateUrl(`${CLIENT_PAGE.MAIN.url}`)}
        >
          메인으로 가기
        </Button>
      </div>
    </section>
  );
};

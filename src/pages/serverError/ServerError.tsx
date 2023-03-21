import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const ServerError = () => {
  // navigate
  const navigate = useNavigate();

  return (
    <section className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">[500 Internal Server Error]</h2>
        <p className="mt-4 text-body-2 text-gray-3">
          현재 일시적인 현상으로 서비스에 접속할 수 없습니다.
          <br />
          잠시 후 다시 이용해주시기 바랍니다.
        </p>
        <Button
          size="large"
          className="w-full mt-10"
          onClick={() => navigate(-1)}
        >
          이전
        </Button>
      </div>
    </section>
  );
};

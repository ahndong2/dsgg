import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { AppRouter } from "./routes";
import { useSampleQuery } from "./query/hooks";
import { useMutateSample } from "./query/mutations";

import { Button, Container, Box } from "@mui/material";

function App() {
  const sampleQuery = useSampleQuery({ id: 1 });
  const { mutateAsync: mutateFn } = useMutateSample({
    onSuccess: () => {},
    onError: () => {},
    onMutate: () => {},
  });
  const dateList = ["2023-03-17", "2023-03-16", "2023-03-10", "2023-03-09"];
  const record = [
    {
      team: "blue",
      win: true,
      tp: ["이전도", "블라디미르", [6, 5, 10], 15.6],
      jg: ["이전도", "블라디미르", [6, 5, 10], 15.6],
      md: ["이전도", "블라디미르", [6, 5, 10], 15.6],
      ad: ["이전도", "블라디미르", [6, 5, 10], 15.6],
      sp: ["이전도", "블라디미르", [6, 5, 10], 15.6],
    },
    {
      team: "red",
      win: false,
      tp: ["최종원", "나서스", [4, 4, 4], 12.4],
      jg: ["이전도", "블라디미르", [6, 5, 10], 15.6],
      md: ["이전도", "블라디미르", [6, 5, 10], 15.6],
      ad: ["이전도", "블라디미르", [6, 5, 10], 15.6],
      sp: ["이전도", "블라디미르", [6, 5, 10], 15.6],
    },
  ];
  return (
    <div className="App">
      <div className="wrapper">
        <Container maxWidth="lg">
          <Button variant="contained">전적 입력</Button>
          <div className="score-board-wrapper">
            {dateList.map((m) => (
              <>
                <div className="date" style={{ height: "100%" }}>
                  {m}
                </div>
                <div className="score">
                  {[1, 1].map((m, i) => (
                    <>
                      <div className="each-record">
                        <div>{i + 1}경기</div>
                        <div className="record-content">
                          {record.map((m) => (
                            <>
                              <div className="blue"></div>
                              <div className="red"></div>
                            </>
                          ))}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default App;

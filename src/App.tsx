import "./App.css";
import { AppRouter } from "./routes";
import { useSampleQuery } from "./query/hooks";
import { useMutateSample } from "./query/mutations";

import { Button, Container } from "@mui/material";
import champJson from "./assets/newJson.json";

function App() {
  const {
    data: gameRecords,
    isSuccess,
    isLoading,
    isError,
  } = useSampleQuery({ id: 1 });
  const { mutateAsync: mutateFn } = useMutateSample({
    onSuccess: () => {},
    onError: () => {},
    onMutate: () => {},
  });

  return (
    <div className="App">
      <div className="wrapper">
        <Container maxWidth="lg">
          <Button variant="contained">전적 입력</Button>
          <div className="score-board-wrapper">
            {isLoading ? (
              <div>로딩중..</div>
            ) : isSuccess ? (
              gameRecords.map((m) => (
                <>
                  <div className="date" style={{ height: "100%" }}>
                    {m.date}
                  </div>
                  <div className="score">
                    {m.games.map((game, i) => (
                      <>
                        <div className="each-record">
                          <div>{i + 1}경기</div>
                          <div className="record-content">
                            {["blue", "red"].map((color) => (
                              <div
                                className={`team ${color} ${
                                  game[color].win ? "win" : "loose"
                                }`}
                              >
                                {game[color].members.map((member) => (
                                  <div className={member.mvp ? "mvp" : ""}>
                                    <div>{member.name}</div>
                                    <div>
                                      <img
                                        src={require(`./assets/champImage/${
                                          champJson.find(
                                            (f) => f.name === member.champ
                                          )
                                            ? champJson.find(
                                                (f) => f.name === member.champ
                                              )?.img
                                            : "simba.png" // temporary image
                                        }`)}
                                        alt=""
                                        height="16px"
                                        width="16px"
                                      />
                                      {member.champ}
                                    </div>
                                    <div>{member.kda.join(" / ")}</div>
                                    <div>{member.rating}</div>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </>
              ))
            ) : isError ? (
              <div>에러</div>
            ) : (
              <></>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default App;

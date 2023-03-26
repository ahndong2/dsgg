import "./App.css";
import { useState } from "react";
import { AppRouter } from "./routes";
import { useSampleQuery } from "./query/hooks";
import { useMutateSample } from "./query/mutations";
import { SearchInput, TextInput } from "@/components";
import {
  Container,
  Grid,
  Stack,
  Paper,
  Button,
  IconButton,
  InputBase,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import champJson from "./assets/newJson.json";
import styled from "styled-components";

const Loading = styled.div`
  margin: 10px 0;
`;
const Avatar = styled.img`
  width: 16px;
  height: 16px;
  vertical-align: -4px;
`;

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

  const [data, setData] = useState({ text: "", search: "" });
  const changeInfoData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(value);
    setData({
      ...data,
      [id]: value,
    });
  };
  return (
    <div className="App">
      <div className="wrapper">
        <Container maxWidth="lg" sx={{ paddingY: 5 }}>
          <Grid container spacing={8}>
            <Grid item xs={9}>
              {/*
                <TextInput id="text" value={data.text} onChange={changeInfoData} />
                <SearchInput
                  id="search"
                  value={data.search}
                  onChange={changeInfoData}
                />
              */}
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={1}>
                  <Button variant="contained">전적 입력</Button>
                  <Button variant="contained">팀 꾸려보기</Button>
                </Stack>
                <Paper
                  component="form"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: 300,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1.5, flex: 1, fontSize: 13 }}
                    placeholder="챔피언, 소환사 검색"
                  />
                  <IconButton
                    type="button"
                    aria-label="search"
                    disableRipple={true}
                  >
                    <Search />
                  </IconButton>
                </Paper>
              </Stack>
              <section>
                {isLoading ? (
                  <Loading>로딩중..</Loading>
                ) : isSuccess ? (
                  gameRecords.map((m, i) => (
                    <div className="score-board-wrapper" key={i}>
                      <div className="date" style={{ height: "100%" }}>
                        {m.date}
                      </div>
                      <div className="score">
                        {m.games.map((game, j) => (
                          <div className="each-record" key={j}>
                            <div className="record-label">{j + 1}경기</div>
                            <div className="record-content">
                              {["blue", "red"].map((color, k) => (
                                <div
                                  className={`team ${color} ${
                                    game[color].win ? "win" : "loose"
                                  }`}
                                  key={k}
                                >
                                  {game[color].members.map((member, l) => (
                                    <div
                                      className={member.mvp ? "mvp" : ""}
                                      key={l}
                                    >
                                      <div>{member.name}</div>
                                      <div>
                                        <Avatar
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
                                        />
                                        &nbsp;
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
                        ))}
                      </div>
                    </div>
                  ))
                ) : isError ? (
                  <div>에러</div>
                ) : (
                  <></>
                )}
              </section>
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={1}>
                {[1, 2, 3, 4, 5].map((champion, idx) => (
                  <Paper
                    key={idx}
                    sx={{
                      p: 2,
                      fontSize: 13,
                      bgcolor: "rgb(255 255 255 / 15%)",
                      color: "white",
                    }}
                  >
                    소환사 {idx + 1}
                  </Paper>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default App;

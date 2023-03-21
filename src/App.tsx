import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { AppRouter } from "./routes";
import { useSampleQuery } from "./query/hooks";
import { useMutateSample } from "./query/mutations";

import Container from "@mui/material/Container";
function App() {
  const sampleQuery = useSampleQuery({ id: 1 });
  const { mutateAsync: mutateFn } = useMutateSample({
    onSuccess: () => {},
    onError: () => {},
    onMutate: () => {},
  });
  return (
    <div className="App">
      <Container fixed>
        <AppRouter />
      </Container>
    </div>
  );
}

export default App;

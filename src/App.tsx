import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { useSampleQuery } from "./query/hooks";
import { useMutateSample } from "./query/mutations";

import { Button } from "@mui/material";

function App() {
  const sampleQuery = useSampleQuery({ id: 1 });
  const { mutateAsync: mutateFn } = useMutateSample({
    onSuccess: () => {},
    onError: () => {},
    onMutate: () => {},
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button variant="contained">hi</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

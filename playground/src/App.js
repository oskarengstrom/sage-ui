import React from "react";
import { playgroundTheme } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { Typography } from "sage_2";

const App = () => {
  return (
    <>
      <ThemeProvider theme={playgroundTheme}>
        <Typography variant="h1" color={"red"}>
          h1
        </Typography>
        <Typography color={"red"}>default</Typography>
      </ThemeProvider>
      {/* <ThemeProvider theme={playgroundTheme}> */}
      <Typography color={"red"}>no theme</Typography>
      {/* </ThemeProvider> */}
    </>
  );
};

export default App;

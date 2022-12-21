import React from "react";
import { HelloWorld } from "sage_2";
import { baseTheme } from "./theme";
import { ThemeProvider } from "@emotion/react";

const App = () => {
  return (
    <ThemeProvider theme={baseTheme}>
      <HelloWorld />
    </ThemeProvider>
  );
};

export default App;

import React from "react";
import { playgroundTheme } from "./theme";
import {
  Typography,
  SageProvider,
  Section,
  KeepAspectRatio,
  Spacer,
  Stack,
  Test,
  Grid,
} from "@oskarengstrom/sage-ui";

const App = () => {
  return (
    <>
      <SageProvider theme={playgroundTheme}>
        <Typography color="aqua">asdf</Typography>
      </SageProvider>
    </>
  );
};

export default App;

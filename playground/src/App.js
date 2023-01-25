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
  Box,
} from "@oskarengstrom/sage-ui";

const App = () => {
  return (
    <>
      <SageProvider theme={playgroundTheme}>
        <Typography color="aqua">asdf</Typography>
        <Box dev>asdf</Box>
      </SageProvider>
    </>
  );
};

export default App;

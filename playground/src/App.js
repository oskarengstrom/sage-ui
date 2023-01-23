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
        <Grid base={2} gapy={2}>
          <Grid.Item dev>2</Grid.Item>
          <Grid.Item dev>1</Grid.Item>
        </Grid>
      </SageProvider>
    </>
  );
};

export default App;

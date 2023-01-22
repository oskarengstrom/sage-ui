import React from "react";
import { playgroundTheme } from "./theme";
import {
  Typography,
  SageProvider,
  Section,
  Spacer,
  Stack,
  Test,
} from "@oskarengstrom/sage-ui";

const App = () => {
  return (
    <>
      <SageProvider theme={playgroundTheme}>
        <Section id="asdf">
          <Test backgroundColor={"red"}>asdf</Test>
          <Test backgroundColor={["red", "blue", "green"]}>asdf</Test>
          <Typography variant="h1">asdf</Typography>
        </Section>
      </SageProvider>
    </>
  );
};

export default App;

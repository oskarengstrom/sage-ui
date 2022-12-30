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
      {/* <SageProvider theme={playgroundTheme}> */}
      <Test backgroundColor={"red"}>asdf</Test>
      <Test backgroundColor={["red", "blue", "green"]}>asdf</Test>
      <Test>asdf</Test>
      {/* </SageProvider> */}
    </>
  );
};

export default App;

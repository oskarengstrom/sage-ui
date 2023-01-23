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
        {/* <Section id="asdf">
          <Test>asdf</Test>
          <Test backgroundColor={["red", "blue", "green"]}>asdf</Test>
          <Typography variant="h1">asdf</Typography>
        </Section>
        <Stack>
          <div>asd</div>
          <div>asd</div>
        </Stack>
        <KeepAspectRatio ratio={[1, 16 / 12]}>
          <div style={{ backgroundColor: "red", height: "100%" }}>asdf</div>
        </KeepAspectRatio> */}
        <Grid base={2}>
          <Grid.Item order={2}>2</Grid.Item>
          <Grid.Item order={1}>1</Grid.Item>
        </Grid>
        <Grid base={12}>
          <Grid.Item gridColumn={"4 / 7"}>2</Grid.Item>
          <Grid.Item>1</Grid.Item>
        </Grid>
      </SageProvider>
    </>
  );
};

export default App;

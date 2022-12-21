import React from "react";
import { playgroundTheme } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { Grid, Section } from "sage_2";

const App = () => {
  return (
    <>
      <ThemeProvider theme={playgroundTheme}>
        <Section>
          <Grid base={[4, 4, 12]} dev>
            <Grid.Item span={3}>asdf</Grid.Item>
            <Grid.Item>asdf</Grid.Item>
            <Grid.Item>asdf</Grid.Item>
          </Grid>
        </Section>
      </ThemeProvider>
    </>
  );
};

export default App;

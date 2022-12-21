import React from "react";
import { playgroundTheme } from "./theme";
import { Typography, ThemeProvider, Section } from "sage_2";

const App = () => {
  return (
    <>
      <ThemeProvider theme={playgroundTheme}>
        <Section backgroundColor="red">
          <Typography variant="h1" color="blue">
            asdf
          </Typography>
        </Section>

        <Section>
          <Typography variant="h1">asdf</Typography>
        </Section>
      </ThemeProvider>
      <Typography>asdf</Typography>
      {/* <Typography>asdf</Typography> */}
    </>
  );
};

export default App;

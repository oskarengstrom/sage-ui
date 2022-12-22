import React from "react";
import { playgroundTheme } from "./theme";
import {
  Typography,
  SageProvider,
  Section,
  Spacer,
} from "@oskarengstrom/sage-ui";

const App = () => {
  return (
    <>
      <SageProvider theme={playgroundTheme}>
        <Section>
          <Typography variant="h1" color="blue">
            asdf
          </Typography>
        </Section>
        <Spacer height={4} />
        <Typography>asdf</Typography>
      </SageProvider>
      <Spacer height={4} />
      <Typography>asdf</Typography>
    </>
  );
};

export default App;

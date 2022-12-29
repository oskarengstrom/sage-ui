import React from "react";
import { playgroundTheme } from "./theme";
import {
  Typography,
  SageProvider,
  Section,
  Spacer,
  Stack,
} from "@oskarengstrom/sage-ui";

const App = () => {
  return (
    <>
      {/* <SageProvider theme={playgroundTheme}> */}
      <Section
        backgroundColor="red"
        maxWidth="80rem"
        xPadding={["1rem", "5rem"]}
      >
        <Stack>
          <div>asdf</div>
          <div>asdf</div>
          <div>
            <Typography m={1}>asdf</Typography>
          </div>
        </Stack>
      </Section>
      {/* </SageProvider> */}
    </>
  );
};

export default App;

import React from "react";
import { playgroundTheme } from "./theme";
import {
  Typography,
  SageProvider,
  Section,
  KeepAspectRatio,
  Spacer,
  Stack,
  Grid,
  Box,
  mq,
  backgroundColorMixins,
} from "@oskarengstrom/sage-ui";
import styled from "@emotion/styled";

const App = () => {
  return (
    <>
      <SageProvider theme={playgroundTheme}>
        <Spacer />
        <Box
          // py={[1, 2, 3, 4]}
          css={{
            backgroundColor: "red",
          }}
        >
          asdf
        </Box>
        <Test backgroundColor={["red", "blue"]}>asdfa sdf asd fa</Test>
      </SageProvider>
    </>
  );
};

export default App;

const Test = styled.div`
  /* ${backgroundColorMixins} */
`;

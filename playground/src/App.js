import React from "react";
import { playgroundTheme } from "./theme";
import {
  Typography as T,
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
import { components, props } from "./docs/props";

const Prop = ({ prop }) => {
  return (
    <Grid gap={1} base={6}>
      <T variant="pre" as="pre">
        {prop.name}
      </T>
      <Grid.Item span={2}>
        <T style={{ fontStyle: "italic" }}>"{prop.description}"</T>
      </Grid.Item>
      <Grid.Item span={3}>
        <Stack flexDirection="row">
          {prop.input_types.map((input, i) => (
            <React.Fragment key={i}>
              <T>
                {input.type}
                {input.interpolation && `(${input.interpolation})`}
                {prop.responsive && "[]"}
              </T>
              <T color="palette.text.secondary" as="pre">
                {i < prop.input_types.length - 1 && " || "}
              </T>
            </React.Fragment>
          ))}
        </Stack>
      </Grid.Item>
    </Grid>
  );
};

const PropList = ({ propList }) => {
  return (
    <Stack gap={0.25}>
      <T>Props:</T>
      {propList.map((prop) => (
        <Prop prop={prop} />
      ))}
    </Stack>
  );
};

const App = () => {
  return (
    <>
      <SageProvider theme={playgroundTheme}>
        <Stack gap={1} p={1}>
          {Object.keys(components).map((key, i) => {
            const component = components[key];
            // console.log(component);
            return (
              <Stack key={i} gap={1}>
                <T fontWeight="800">{component.name}</T>
                <T style={{ fontStyle: "italic" }}>{component.description}</T>
                <PropList propList={component.propList} />
              </Stack>
            );
          })}
        </Stack>
      </SageProvider>
    </>
  );
};

export default App;

import React from "react";
import { Grid, SageProvider, Section } from "@oskarengstrom/sage-ui";
import NavBar from "./NavBar";

export default function Layout({ data, children }) {
  return (
    // <Section as="div" py={1}>
    <Grid base={12} gap={0} height={["initial", "100vh"]} placeItems="stretch">
      <Grid.Item
        span={[12, 4, 4, 3]}
        backgroundColor="constants.colors.vulcan.950"
        p={[1, 2, 4]}
      >
        <NavBar data={data} />
      </Grid.Item>
      <Grid.Item span={[12, 8, 8, 9]} p={[1, 2, 4]}>
        {children}
      </Grid.Item>
    </Grid>
    // </Section>
  );
}

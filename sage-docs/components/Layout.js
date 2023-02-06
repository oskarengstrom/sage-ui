import React from "react";
import { Grid, SageProvider, Section } from "@oskarengstrom/sage-ui";
import NavBar from "./NavBar";

export default function Layout({ data, children }) {
  return (
    <Section as="div" py={1}>
      <Grid base={12} gap={2}>
        <Grid.Item span={[3, 3, 3, 2]}>
          <NavBar data={data} />
        </Grid.Item>
        <Grid.Item span={[9, 9, 9, 10]}>{children}</Grid.Item>
      </Grid>
    </Section>
  );
}

import Layout from "@/components/Layout";
import { createClient } from "@/prismic-configuration";
import CustomRichText from "@/utils/CustomRichText";
import { ThemeContext } from "@emotion/react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Stack, Section, Box, Typography, Grid } from "@oskarengstrom/sage-ui";

// const breakpoints = [576, 768, 992, 1200];
// const mq = (bp) => `@media (max-width: 800px)`;

const styles = {
  position: ["absolute"],
  right: [0, 100, 300],
};

export default function Test() {
  const theme = useTheme(ThemeContext);

  return (
    <Section py={2}>
      <Grid base={6} gap={1} dev>
        <Grid.Item span={1}>asda asdasd asd as d</Grid.Item>
        <Grid.Item span={3}>asdf</Grid.Item>
      </Grid>
    </Section>
  );
}

import Layout from "@/components/Layout";
import { createClient } from "@/prismic-configuration";
import CustomRichText from "@/utils/CustomRichText";
import { ThemeContext } from "@emotion/react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Stack, Section } from "@oskarengstrom/sage-ui";

export default function Test() {
  const theme = useTheme(ThemeContext);
  console.log(theme);

  return (
    <Section>
      <Stack gap={1}>asdf</Stack>
    </Section>
  );
}

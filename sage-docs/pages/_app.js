import NavBar from "@/components/NavBar";
import { docsTheme } from "@/docs-theme";
import "@/styles/globals.css";
import { Grid, SageProvider, Section } from "@oskarengstrom/sage-ui";

export default function App({ Component, pageProps }) {
  return (
    <SageProvider theme={docsTheme}>
      <Section as="div" py={2}>
        <Grid base={12} gap={2}>
          <Grid.Item span={[12, 3, 3, 2]}>
            <NavBar />
          </Grid.Item>
          <Grid.Item span={[12, 9, 9, 10]}>
            <Component {...pageProps} />
          </Grid.Item>
        </Grid>
      </Section>
    </SageProvider>
  );
}

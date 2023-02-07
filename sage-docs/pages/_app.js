import { docsTheme } from "@/docs-theme";
import "@/styles/globals.css";
import "@/styles/code-theme.css";
import { SageProvider } from "@oskarengstrom/sage-ui";
import { PrismicProvider } from "@prismicio/react";
import Link from "next/link";
import { Global } from "@emotion/react";
import { css } from "@emotion/react";

import { Inter, Roboto_Mono } from "@next/font/google";
import { linkResolver } from "@/prismic-configuration";
const inter = Inter({ subsets: ["latin"] });
const roboto_mono = Roboto_Mono({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <SageProvider theme={docsTheme}>
      <Global
        styles={css`
          :root {
            --font-family-body: ${inter.style.fontFamily};
            --font-family-mono: ${roboto_mono.style.fontFamily};
          }
        `}
      />
      <PrismicProvider
        linkResolver={linkResolver}
        internalLinkComponent={Link}
        externalLinkComponent={(props) => (
          <a target="_blank" rel="noopener noreferrer" {...props} />
        )}
      >
        <Component {...pageProps} />
      </PrismicProvider>
    </SageProvider>
  );
}

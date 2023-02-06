import { docsTheme } from "@/docs-theme";
import "@/styles/globals.css";
import "@/styles/code-theme.css";
import { SageProvider } from "@oskarengstrom/sage-ui";
import { PrismicProvider } from "@prismicio/react";
import Link from "next/link";

export default function App({ Component, pageProps }) {
  return (
    <SageProvider theme={docsTheme}>
      <PrismicProvider
        // linkResolver={linkResolver}
        internalLinkComponent={Link}
        externalLinkComponent={(props) => (
          <a target="_blank" rel="noopener noreferrer" {...props} />
        )}
        richTextComponents={{
          hyperlink: (props) => (
            <a
              href={props.node.data.url}
              className="inline-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.children}
            </a>
          ),
        }}
      >
        <Component {...pageProps} />
      </PrismicProvider>
    </SageProvider>
  );
}

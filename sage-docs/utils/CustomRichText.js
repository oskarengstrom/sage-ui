import { PrismicRichText } from "@prismicio/react";
import { Typography } from "@oskarengstrom/sage-ui";
import Link from "next/link";
import Highlight from "react-highlight";

const CustomRichText = ({ field, ...rest }) => {
  if (typeof field === "string") {
    console.warn(
      `CustomRichText: field "${field}" is a string, not a Prismic RichText object.`
    );
    return <Typography {...rest}>{field}</Typography>;
  }

  return (
    <PrismicRichText
      field={field}
      internalLinkComponent={Link}
      externalLinkComponent={(props) => (
        <a target="_blank" rel="noopener noreferrer" {...props} />
      )}
      components={{
        heading1: ({ children }) => (
          <Typography variant="h1" as="h1" {...rest}>
            {children}
          </Typography>
        ),
        heading2: ({ children }) => (
          <Typography variant="h2" as="h2" {...rest}>
            {children}
          </Typography>
        ),
        heading3: ({ children }) => (
          <Typography variant="h3" as="h3" {...rest}>
            {children}
          </Typography>
        ),
        heading4: ({ children }) => (
          <Typography variant="h4" as="h4" {...rest}>
            {children}
          </Typography>
        ),
        heading5: ({ children }) => (
          <Typography variant="h5" as="h5" {...rest}>
            {children}
          </Typography>
        ),
        paragraph: ({ children }) => (
          <Typography variant="paragraph" as="p" {...rest}>
            {children}
          </Typography>
        ),
        preformatted: ({ children }) => (
          <Highlight>
            <Typography variant="pre" as="pre" {...rest}>
              {children}
            </Typography>
          </Highlight>
        ),
        hyperlink: (props) =>
          console.log(props) && (
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
    />
  );
};

export default CustomRichText;

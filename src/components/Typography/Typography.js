import React from "react";
import styled from "@emotion/styled";
import { ThemeContext, useTheme } from "@emotion/react";
import isPropValid from "@emotion/is-prop-valid";
import typographyMixins from "../../mixins/responsiveProps/typographyMixins";
import devMixins from "../../mixins/responsiveProps/devMixins";

const Typography = React.forwardRef((props, ref) => {
  const theme = useTheme(ThemeContext);
  let { variant } = props;
  const { variants: variantsFromTheme } = theme.text;

  return (
    <TypographyStyled
      ref={ref}
      {...(variantsFromTheme && variantsFromTheme["default"])}
      {...(variant && variantsFromTheme && variantsFromTheme[variant])}
      {...props}
    >
      {props.children}
    </TypographyStyled>
  );
});

const props = [
  "fontSize",
  "fontWeight",
  "lineHeight",
  "fontFamily",
  "color",
  "textAlign",
  "textDecoration",
  "textTransform",
];

const TypographyStyled = styled("p", {
  shouldForwardProp: (prop) => isPropValid(prop) && !props.includes(prop),
})`
  ${devMixins}
  ${typographyMixins}
`;

export default Typography;

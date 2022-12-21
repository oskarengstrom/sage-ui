import React from "react";
import styled from "@emotion/styled";
import { ThemeContext, useTheme } from "@emotion/react";
import isPropValid from "@emotion/is-prop-valid";
import typographyMixins from "../../mixins/responsiveProps/typographyMixins";
import devMixins from "../../mixins/responsiveProps/devMixins";

const Typography = React.forwardRef(
  ({ variant: variantFromProps, children, ...restProps }, ref) => {
    const theme = useTheme(ThemeContext);

    const varsFrTheme = theme?.text?.variants;

    return (
      <TypographyStyled
        ref={ref}
        {...(varsFrTheme && varsFrTheme.default)}
        {...(variantFromProps && varsFrTheme[variantFromProps])}
        {...restProps}
      >
        {children}
      </TypographyStyled>
    );
  }
);

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

// const TypographyStyled = styled.p`
//   ${devMixins}
//   ${typographyMixins}
// `;

export default Typography;

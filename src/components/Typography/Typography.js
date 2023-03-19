import React from "react";
import styled from "@emotion/styled";
import { ThemeContext, useTheme } from "@emotion/react";
import isPropValid from "@emotion/is-prop-valid";
import typographyMixins from "../../mixins/responsiveProps/typographyMixins";
import devMixins from "../../mixins/responsiveProps/devMixins";
import spaceMixins from "../../mixins/responsiveProps/spaceMixins";
import backgroundColorMixins from "../../mixins/responsiveProps/backgroundColorMixins";
import displayMixins from "../../mixins/responsiveProps/displayMixins";
import containerMixins from "../../mixins/responsiveProps/containerMixins";

const Typography = React.forwardRef(
  ({ variant: variantFromProps, children, color, ...restProps }, ref) => {
    const theme = useTheme(ThemeContext);

    const varsFrTheme = theme?.typography?.variants;

    const colorPriority =
      color || // if color is passed as prop, use it
      (variantFromProps && varsFrTheme[variantFromProps].color) || // if variant is passed as prop, use its color
      (varsFrTheme && varsFrTheme.default?.color) || // if variants exist, use default color
      theme?.palette?.text.primary ||
      theme?.palette?.textPrimary; // if no variants exist, use theme's textPrimary

    return (
      <TypographyStyled
        ref={ref}
        {...(varsFrTheme && varsFrTheme.default)}
        {...(variantFromProps && varsFrTheme[variantFromProps])}
        color={colorPriority}
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

const TypographyStyled = styled("div", {
  shouldForwardProp: (prop) => isPropValid(prop) && !props.includes(prop),
})`
  ${devMixins}
  ${typographyMixins}
  ${spaceMixins}
  ${backgroundColorMixins}
  ${displayMixins}
  ${containerMixins}
`;

export default Typography;

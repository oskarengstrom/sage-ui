import React from "react";
import styled from "@emotion/styled";
import { ThemeContext, useTheme } from "@emotion/react";
import isPropValid from "@emotion/is-prop-valid";
import genericProps from "../../props/genericProps";
import typographyProps from "../../props/typographyProps";

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
})([typographyProps, genericProps]);

export default Typography;

import styled from "@emotion/styled";
import React from "react";
import { ThemeContext, css, useTheme } from "@emotion/react";
import { interpolatedProp, responsiveProp } from "../../utils/responsiveProp";
import genericProps from "../../props/genericProps";
import { arrayProp } from "../../utils/arrayProp";
import { propFilter } from "../../utils/propFilter";

const XPad = React.forwardRef(({ maxWidth, px, children, ...props }, ref) => {
  const theme = useTheme(ThemeContext);

  return (
    <XPadStyled
      ref={ref}
      m={"0 auto"}
      maxWidth={interpolatedProp(maxWidth || theme?.section?.maxWidth, "rem")}
      px={px || theme?.section?.px}
      {...props}
    >
      {children}
    </XPadStyled>
  );
});

export default XPad;

const sectionSpecialProps = ({ theme, px: value, maxWidth }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        max-width: calc(${maxWidth} + ${x} + ${x});
        padding-left: ${x};
        padding-right: ${x};
      `,
    interpolation: "rem",
  });

const XPadStyled = styled("div", {
  shouldForwardProp: propFilter,
})([sectionSpecialProps, genericProps]);

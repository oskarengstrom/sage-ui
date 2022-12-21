import styled from "@emotion/styled";
import React from "react";
import { useResponsive } from "../hooks/useResponsive";
import { ThemeContext, useTheme } from "@emotion/react";
import { arrayifyProp } from "../utils/arrayifyProp";

const Section = React.forwardRef((props, ref) => {
  const { breakpointIndex } = useResponsive();
  const theme = useTheme(ThemeContext);
  const { xPadding } = theme.section;
  const xPadArr = arrayifyProp(xPadding);

  return (
    <SectionStyled ref={ref} xPad={xPadArr[breakpointIndex]}>
      {props.children}
    </SectionStyled>
  );
});

export default Section;

const SectionStyled = styled.section`
  margin: 0 auto;
  max-width: ${({ theme, xPad }) =>
    `calc(${theme.section.maxWidth} + ${xPad} + ${xPad})`};
  padding: ${({ xPad }) => `0 ${xPad}`};

  background-color: ${(props) => props.theme.palette.background};
  color: ${(props) => props.theme.text.primary};
`;
import styled from "@emotion/styled";
import React from "react";
import { useResponsive } from "../../hooks/useResponsive/useResponsive";
import { ThemeContext, useTheme } from "@emotion/react";
import { arrayifyProp } from "../../utils/arrayifyProp";
import devMixins from "../../mixins/responsiveProps/devMixins";
import spaceMixins from "../../mixins/responsiveProps/spaceMixins";
import sizeMixins from "../../mixins/responsiveProps/sizeMixins";

const Section = React.forwardRef(
  (
    {
      maxWidth,
      xPadding,
      backgroundColor,
      children,
      as,
      id,
      className,
      ...restProps
    },
    ref
  ) => {
    const { breakpointIndex } = useResponsive();
    const theme = useTheme(ThemeContext);

    const xPadArr = arrayifyProp(theme?.section?.xPadding || 0);

    return (
      <Outer
        backgroundColor={backgroundColor}
        as={as}
        id={id}
        className={className}
      >
        <Inner
          ref={ref}
          maxWidth={maxWidth || theme?.section?.maxWidth}
          xPadding={
            arrayifyProp(xPadding)[breakpointIndex] || xPadArr[breakpointIndex]
          }
          {...restProps}
        >
          {children}
        </Inner>
      </Outer>
    );
  }
);

export default Section;

const Inner = styled.div`
  margin: 0 auto;
  max-width: ${({ maxWidth, xPadding }) =>
    `calc(${maxWidth} + ${xPadding} + ${xPadding})`};
  padding: ${({ xPadding }) => `0 ${xPadding}`};

  ${devMixins}
  ${sizeMixins}
  ${spaceMixins}
`;

const Outer = styled.section`
  background-color: ${(props) =>
    props.backgroundColor || props.theme?.palette?.background};

  ${devMixins}
`;

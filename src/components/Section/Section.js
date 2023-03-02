import styled from "@emotion/styled";
import React from "react";
// import { useResponsive } from "../../hooks/useResponsive/useResponsive";
import { ThemeContext, css, useTheme } from "@emotion/react";
// import { arrayifyProp } from "../../utils/arrayifyProp";
import devMixins from "../../mixins/responsiveProps/devMixins";
import spaceMixins from "../../mixins/responsiveProps/spaceMixins";
import sizeMixins from "../../mixins/responsiveProps/sizeMixins";
import backgroundColorMixins from "../../mixins/responsiveProps/backgroundColorMixins";
import { interpolatedProp, responsiveProp } from "../../utils/responsiveProp";

const Section = React.forwardRef(
  (
    {
      maxWidth,
      px,
      backgroundColor,
      background,
      children,
      as,
      id,
      className,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme(ThemeContext);

    return (
      <Outer
        id={id}
        backgroundColor={backgroundColor || theme?.palette?.background}
        background={background}
        as={as}
        className={className}
      >
        <Inner
          ref={ref}
          maxWidth={interpolatedProp(
            maxWidth || theme?.section?.maxWidth,
            "rem"
          )}
          px={px || theme?.section?.px}
          {...restProps}
        >
          {children}
        </Inner>
      </Outer>
    );
  }
);

export default Section;

const sectionSpecialProps = ({ px, maxWidth }) =>
  responsiveProp({
    func: (x) =>
      css`
        max-width: calc(${maxWidth} + ${x} + ${x});
        padding: 0 ${x};
      `,
    val: px,
    interpolation: "rem",
  });

const Inner = styled.div`
  margin: 0 auto;

  ${devMixins}
  ${sizeMixins}
  ${spaceMixins}
  ${sectionSpecialProps}
`;

const Outer = styled.section`
  ${devMixins}
  ${backgroundColorMixins}
`;

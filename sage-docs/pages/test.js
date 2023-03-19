import { responsiveProp } from "@/../dist/index.cjs";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Stack, Section, Box, Typography, Grid } from "@oskarengstrom/sage-ui";

// const breakpoints = [576, 768, 992, 1200];
// const mq = (bp) => `@media (max-width: 800px)`;

export default function Test() {
  return (
    <>
      {/* <Comp color="blue">asdf</Comp> */}
      <Comp color={["blue", "red", "green"]}>asdf</Comp>
    </>
  );
}

export function _responsive(
  media, // [360, 600, 900, 1200, 1800, 2400],
  values, // props.$border // [1, 2, 3, 4]
  callback
) {
  const statements = values?.map(callback) || [];

  return statements.map((statement, mediaIndex) => {
    if (mediaIndex === 0) return statement;

    return {
      [`@media screen and (min-width: ${media[mediaIndex - 1]}px)`]: statement,
    };
  });
}

const mixin = ({ theme, color }) => {
  console.log(theme.bp);
  console.log(color);

  return _responsive(theme.bp, color, (value) =>
    value ? { "&&": { color: value } } : { "&&": { color: 0 } }
  );
};

const Comp = styled.div`
  ${mixin}
`;

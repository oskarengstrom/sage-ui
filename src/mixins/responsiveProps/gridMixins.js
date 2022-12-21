import { css } from "@emotion/react";
import { responsiveProp } from "../../utils/responsiveProp";

// grid,
// base,
// gap,
// gapx,
// gapy,
// placeItems,

const grid = css`
  display: grid;
`;

const base = ({ base }) =>
  base &&
  responsiveProp({
    func: (x) =>
      css`
        grid-template-columns: repeat(${x}, 1fr);
      `,
    val: base,
  });

const gap = ({ gap }) =>
  gap &&
  responsiveProp({
    func: (x) =>
      css`
        gap: ${x};
      `,
    val: gap,
    interpolation: "rem",
  });

const gapx = ({ gapx }) =>
  gapx &&
  responsiveProp({
    func: (x) =>
      css`
        column-gap: ${x};
      `,
    val: gapx,
    interpolation: "rem",
  });

const gapy = ({ gapy }) =>
  gapy &&
  responsiveProp({
    func: (x) =>
      css`
        row-gap: ${x};
      `,
    val: gapy,
    interpolation: "rem",
  });

const placeItems = ({ placeItems }) =>
  placeItems &&
  responsiveProp({
    func: (x) =>
      css`
        place-items: ${x};
      `,
    val: placeItems,
  });

export default [grid, base, gap, gapx, gapy, placeItems];

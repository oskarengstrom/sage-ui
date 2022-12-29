import { css } from "@emotion/react";
import { responsiveProp } from "../../utils/responsiveProp";

// grid,
// base,
// gap,
// columnGap,
// rowGap,
// placeItems,
// gridColumn,

const grid = css`
  display: grid;
`;

const base = ({ base }) =>
  responsiveProp({
    func: (x) =>
      css`
        grid-template-columns: repeat(${x}, 1fr);
      `,
    val: base,
  });

const gap = ({ gap }) =>
  responsiveProp({
    func: (x) =>
      css`
        gap: ${x};
      `,
    val: gap,
    interpolation: "rem",
  });

const columnGap = ({ columnGap }) =>
  responsiveProp({
    func: (x) =>
      css`
        column-gap: ${x};
      `,
    val: columnGap,
    interpolation: "rem",
  });

const rowGap = ({ rowGap }) =>
  responsiveProp({
    func: (x) =>
      css`
        row-gap: ${x};
      `,
    val: rowGap,
    interpolation: "rem",
  });

const placeItems = ({ placeItems }) =>
  responsiveProp({
    func: (x) =>
      css`
        place-items: ${x};
      `,
    val: placeItems,
  });

const gridColumn = ({ gridColumn }) =>
  responsiveProp({
    func: (x) =>
      css`
        grid-column: ${x};
      `,
    val: gridColumn,
  });

export default [grid, base, gap, columnGap, rowGap, placeItems, gridColumn];

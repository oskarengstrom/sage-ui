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

const gridTemplateAreas = ({ gridTemplateAreas }) =>
  responsiveProp({
    func: (x) =>
      css`
        grid-template-areas: ${x};
      `,
    val: gridTemplateAreas,
  });

const gridTemplateRows = ({ gridTemplateRows }) =>
  responsiveProp({
    func: (x) =>
      css`
        grid-template-rows: ${x};
      `,
    val: gridTemplateRows,
  });

const gridTemplateColumns = ({ gridTemplateColumns }) =>
  responsiveProp({
    func: (x) =>
      css`
        grid-template-columns: ${x};
      `,
    val: gridTemplateColumns,
  });

const gridTemplate = ({ gridTemplate }) =>
  responsiveProp({
    func: (x) =>
      css`
        grid-template: ${x};
      `,
    val: gridTemplate,
  });

export default [
  grid,
  base,
  gap,
  columnGap,
  rowGap,
  placeItems,
  gridTemplateAreas,
  gridTemplateRows,
  gridTemplateColumns,
  gridTemplate,
];

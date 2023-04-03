import { arrayProp } from "../utils/arrayProp";

const grid = {
  display: "grid",
};

const base = ({ theme, base: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        grid-template-columns: repeat(${x}, 1fr);
      `,
  });

const gap = ({ theme, gap: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        gap: ${x};
      `,
    interpolation: "rem",
  });

const columnGap = ({ theme, columnGap: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        column-gap: ${x};
      `,
    interpolation: "rem",
  });

const rowGap = ({ theme, rowGap: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        row-gap: ${x};
      `,
    interpolation: "rem",
  });

const placeItems = ({ theme, placeItems: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        place-items: ${x};
      `,
  });

const gridTemplateAreas = ({ theme, gridTemplateAreas: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        grid-template-areas: ${x};
      `,
  });

const gridTemplateRows = ({ theme, gridTemplateRows: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        grid-template-rows: ${x};
      `,
  });

const gridTemplateColumns = ({ theme, gridTemplateColumns: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        grid-template-columns: ${x};
      `,
  });

const gridTemplate = ({ theme, gridTemplate: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        grid-template: ${x};
      `,
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

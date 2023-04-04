import { arrayProp } from "../utils/arrayProp";

const displayFlex = {
  display: "flex",
};

const flexDirection = ({ theme, flexDirection: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        flex-direction: ${x};
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

const alignItems = ({ theme, alignItems: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        align-items: ${x};
      `,
  });

const justifyContent = ({ theme, justifyContent: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        justify-content: ${x};
      `,
  });

const flexWrap = ({ theme, flexWrap: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        flex-wrap: ${x};
      `,
  });

const flexFlow = ({ theme, flexFlow: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        flex-flow: ${x};
      `,
  });

const alignContent = ({ theme, alignContent: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        align-content: ${x};
      `,
  });

export default [
  displayFlex,
  flexDirection,
  gap,
  alignItems,
  justifyContent,
  flexWrap,
  flexFlow,
  alignContent,
  rowGap,
  columnGap,
];

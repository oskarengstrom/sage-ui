import { css } from "@emotion/react";
import { responsiveProp } from "../../utils/responsiveProp";

const flexDirection = ({ flexDirection }) =>
  responsiveProp({
    func: (x) =>
      css`
        flex-direction: ${x};
      `,
    val: flexDirection,
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

const rowGap = ({ rowGap }) =>
  responsiveProp({
    func: (x) =>
      css`
        row-gap: ${x};
      `,
    val: rowGap,
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

const alignItems = ({ alignItems }) =>
  responsiveProp({
    func: (x) =>
      css`
        align-items: ${x};
      `,
    val: alignItems,
  });

const justifyContent = ({ justifyContent }) =>
  responsiveProp({
    func: (x) =>
      css`
        justify-content: ${x};
      `,
    val: justifyContent,
  });

const flexWrap = ({ flexWrap }) =>
  responsiveProp({
    func: (x) =>
      css`
        flex-wrap: ${x};
      `,
    val: flexWrap,
  });

const alignContent = ({ alignContent }) =>
  responsiveProp({
    func: (x) =>
      css`
        align-content: ${x};
      `,
    val: alignContent,
  });

export default [
  flexDirection,
  gap,
  alignItems,
  justifyContent,
  flexWrap,
  alignContent,
  rowGap,
  columnGap,
];

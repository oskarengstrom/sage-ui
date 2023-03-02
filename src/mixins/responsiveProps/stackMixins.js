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

const flexShrink = ({ flexShrink }) =>
  responsiveProp({
    func: (x) =>
      css`
        flex-shrink: ${x};
      `,
    val: flexShrink,
  });

export default [
  flexDirection,
  gap,
  alignItems,
  justifyContent,
  flexWrap,
  flexShrink,
];

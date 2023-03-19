import { css } from "@emotion/react";
import { responsiveProp } from "../../utils/responsiveProp";

const transform = ({ transform }) =>
  responsiveProp({
    func: (x) => css`
      transform: ${x};
    `,
    val: transform,
  });

const borderRadius = ({ borderRadius }) =>
  responsiveProp({
    func: (x) => css`
      border-radius: ${x};
    `,
    val: borderRadius,
    interpolation: "rem",
  });

const boxShadow = ({ boxShadow }) =>
  responsiveProp({
    func: (x) => css`
      box-shadow: ${x};
    `,
    val: boxShadow,
  });

const flex = ({ flex }) =>
  responsiveProp({
    func: (x) => css`
      flex: ${x};
    `,
    val: flex,
  });

const flexBasis = ({ flexBasis }) =>
  responsiveProp({
    func: (x) => css`
      flex-basis: ${x};
    `,
    val: flexBasis,
    interpolation: "rem",
  });

const flexShrink = ({ flexShrink }) =>
  responsiveProp({
    func: (x) => css`
      flex-shrink: ${x};
    `,
    val: flexShrink,
  });

const alignSelf = ({ alignSelf }) =>
  responsiveProp({
    func: (x) => css`
      align-self: ${x};
    `,
    val: alignSelf,
  });
const outline = ({ outline }) =>
  responsiveProp({
    func: (x) => css`
      outline: ${x};
    `,
    val: outline,
  });

export default [
  transform,
  borderRadius,
  boxShadow,
  flex,
  flexBasis,
  flexShrink,
  alignSelf,
  outline,
];

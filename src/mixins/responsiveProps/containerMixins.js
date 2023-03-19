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

export default [transform, borderRadius, boxShadow];

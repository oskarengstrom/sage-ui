import { css } from "@emotion/react";
import { responsiveProp } from "../../utils/responsiveProp";

const visibility = ({ visibility }) =>
  responsiveProp({
    func: (x) => css`
      visibility: ${x};
    `,
    val: visibility,
  });

const display = ({ display }) =>
  responsiveProp({
    func: (x) => css`
      display: ${x};
    `,
    val: display,
  });

const position = ({ position }) =>
  responsiveProp({
    func: (x) => css`
      position: ${x};
    `,
    val: position,
  });

const zIndex = ({ zIndex }) =>
  responsiveProp({
    func: (x) => css`
      z-index: ${x};
    `,
    val: zIndex,
  });

const top = ({ top }) =>
  responsiveProp({
    func: (x) => css`
      top: ${x};
    `,
    val: top,
    interpolation: "rem",
  });

const right = ({ right }) =>
  responsiveProp({
    func: (x) => css`
      right: ${x};
    `,
    val: right,
    interpolation: "rem",
  });
const bottom = ({ bottom }) =>
  responsiveProp({
    func: (x) => css`
      bottom: ${x};
    `,
    val: bottom,
    interpolation: "rem",
  });

const left = ({ left }) =>
  responsiveProp({
    func: (x) => css`
      left: ${x};
    `,
    val: left,
    interpolation: "rem",
  });

const inset = ({ inset }) =>
  responsiveProp({
    func: (x) => css`
      inset: ${x};
    `,
    val: inset,
    interpolation: "rem",
  });

const insetX = ({ insetX }) =>
  responsiveProp({
    func: (x) => css`
      left: ${x};
      right: ${x};
    `,
    val: insetX,
    interpolation: "rem",
  });

const insetY = ({ insetY }) =>
  responsiveProp({
    func: (x) => css`
      top: ${x};
      bottom: ${x};
    `,
    val: insetY,
    interpolation: "rem",
  });

export default [
  visibility,
  display,
  position,
  zIndex,
  top,
  right,
  bottom,
  left,
  inset,
  insetX,
  insetY,
];

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

const top = ({ top }) =>
  responsiveProp({
    func: (x) => css`
      top: ${x};
    `,
    val: top,
    interpolation: "px",
  });

const right = ({ right }) =>
  responsiveProp({
    func: (x) => css`
      right: ${x};
    `,
    val: right,
    interpolation: "px",
  });
const bottom = ({ bottom }) =>
  responsiveProp({
    func: (x) => css`
      bottom: ${x};
    `,
    val: bottom,
    interpolation: "px",
  });
const left = ({ left }) =>
  responsiveProp({
    func: (x) => css`
      left: ${x};
    `,
    val: left,
    interpolation: "px",
  });

export default [visibility, display, position, top, right, bottom, left];

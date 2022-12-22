import { css } from "@emotion/react";
import { responsiveProp } from "../../utils/responsiveProp";

const width = ({ width }) =>
  width &&
  responsiveProp({
    func: (x) =>
      css`
        width: ${x};
      `,
    val: width,
    interpolation: "rem",
  });

const maxWidth = ({ maxWidth }) =>
  maxWidth &&
  responsiveProp({
    func: (x) =>
      css`
        max-width: ${x};
      `,
    val: maxWidth,
    interpolation: "rem",
  });

const minWidth = ({ minWidth }) =>
  minWidth &&
  responsiveProp({
    func: (x) =>
      css`
        min-width: ${x};
      `,
    val: minWidth,
    interpolation: "rem",
  });

const height = ({ height }) =>
  height &&
  responsiveProp({
    func: (x) =>
      css`
        height: ${x};
      `,
    val: height,
    interpolation: "rem",
  });

const maxHeight = ({ maxHeight }) =>
  maxHeight &&
  responsiveProp({
    func: (x) =>
      css`
        max-height: ${x};
      `,
    val: maxHeight,
    interpolation: "rem",
  });

const minHeight = ({ minHeight }) =>
  minHeight &&
  responsiveProp({
    func: (x) =>
      css`
        min-height: ${x};
      `,
    val: minHeight,
    interpolation: "rem",
  });

export default [width, maxWidth, minWidth, height, maxHeight, minHeight];

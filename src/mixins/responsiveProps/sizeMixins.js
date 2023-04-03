import { css } from "@emotion/react";
import { responsiveProp } from "../../utils/responsiveProp";

const width = ({ width }) =>
  responsiveProp({
    func: (x) =>
      css`
        width: ${x};
      `,
    val: width,
    interpolation: "rem",
  });

const maxWidth = ({ maxWidth }) =>
  responsiveProp({
    func: (x) =>
      css`
        max-width: ${x};
      `,
    val: maxWidth,
    interpolation: "rem",
  });

const minWidth = ({ minWidth }) =>
  responsiveProp({
    func: (x) =>
      css`
        min-width: ${x};
      `,
    val: minWidth,
    interpolation: "rem",
  });

const height = ({ height }) =>
  responsiveProp({
    func: (x) =>
      css`
        height: ${x};
      `,
    val: height,
    interpolation: "rem",
  });

const maxHeight = ({ maxHeight }) =>
  responsiveProp({
    func: (x) =>
      css`
        max-height: ${x};
      `,
    val: maxHeight,
    interpolation: "rem",
  });

const minHeight = ({ minHeight }) =>
  responsiveProp({
    func: (x) =>
      css`
        min-height: ${x};
      `,
    val: minHeight,
    interpolation: "rem",
  });

const aspectRatio = ({ aspectRatio }) =>
  responsiveProp({
    func: (x) =>
      css`
        aspect-ratio: ${x};
      `,
    val: aspectRatio,
    interpolation: "rem",
  });

export default [
  width,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
  aspectRatio,
];

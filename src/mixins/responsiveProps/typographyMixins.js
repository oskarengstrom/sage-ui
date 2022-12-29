import { css } from "@emotion/react";
import { responsiveProp } from "../../utils/responsiveProp";

const color = ({ color }) =>
  responsiveProp({
    func: (x) =>
      css`
        color: ${x};
      `,
    val: color,
  });

const fontFamily = ({ fontFamily }) =>
  responsiveProp({
    func: (x) =>
      css`
        font-family: ${x};
      `,
    val: fontFamily,
  });

const fontSize = ({ fontSize }) =>
  responsiveProp({
    func: (x) =>
      css`
        font-size: ${x};
      `,
    val: fontSize,
    interpolation: "rem",
  });

const fontWeight = ({ fontWeight }) =>
  responsiveProp({
    func: (x) =>
      css`
        font-weight: ${x};
      `,
    val: fontWeight,
  });

const lineHeight = ({ lineHeight }) =>
  responsiveProp({
    func: (x) =>
      css`
        line-height: ${x};
      `,
    val: lineHeight,
    interpolation: "rem",
  });

const textAlign = ({ textAlign }) =>
  responsiveProp({
    func: (x) =>
      css`
        text-align: ${x};
      `,
    val: textAlign,
  });

const textDecoration = ({ textDecoration }) =>
  responsiveProp({
    func: (x) =>
      css`
        text-decoration: ${x};
      `,
    val: textDecoration,
  });

const textTransform = ({ textTransform }) =>
  responsiveProp({
    func: (x) =>
      css`
        text-transform: ${x};
      `,
    val: textTransform,
  });

export default [
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  color,
  textAlign,
  textDecoration,
  textTransform,
];

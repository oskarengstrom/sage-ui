import { css } from "@emotion/react";
import { responsiveProp } from "../../utils/responsiveProp";

const color = ({ color }) =>
  color &&
  responsiveProp({
    func: (x) =>
      css`
        color: ${x};
      `,
    val: color,
  });

const fontFamily = ({ fontFamily }) =>
  fontFamily &&
  responsiveProp({
    func: (x) =>
      css`
        font-family: ${x};
      `,
    val: fontFamily,
  });

const fontSize = ({ fontSize }) =>
  fontSize &&
  responsiveProp({
    func: (x) =>
      css`
        font-size: ${x};
      `,
    val: fontSize,
    interpolation: "rem",
  });

const fontWeight = ({ fontWeight }) =>
  fontWeight &&
  responsiveProp({
    func: (x) =>
      css`
        font-weight: ${x};
      `,
    val: fontWeight,
  });

const lineHeight = ({ lineHeight }) =>
  lineHeight &&
  responsiveProp({
    func: (x) =>
      css`
        line-height: ${x};
      `,
    val: lineHeight,
    interpolation: "rem",
  });

const textAlign = ({ textAlign }) =>
  textAlign &&
  responsiveProp({
    func: (x) =>
      css`
        text-align: ${x};
      `,
    val: textAlign,
  });

const textDecoration = ({ textDecoration }) =>
  textDecoration &&
  responsiveProp({
    func: (x) =>
      css`
        text-decoration: ${x};
      `,
    val: textDecoration,
  });

const textTransform = ({ textTransform }) =>
  textTransform &&
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

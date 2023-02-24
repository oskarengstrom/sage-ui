import { css } from "@emotion/react";
import { responsiveProp } from "../../utils/responsiveProp";
import { isValidColor } from "../../utils/isValidColor";
import { findValueInObject } from "../../utils/findValueInObject";

const color = ({ color, theme }) => {
  return responsiveProp({
    func: (x) =>
      css`
        color: ${isValidColor(x) ? x : findValueInObject(x, theme)};
      `,
    val: color,
  });
};

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

const letterSpacing = ({ letterSpacing }) =>
  responsiveProp({
    func: (x) =>
      css`
        letter-spacing: ${x};
      `,
    val: letterSpacing,
    interpolation: "em",
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

const whiteSpace = ({ whiteSpace }) =>
  responsiveProp({
    func: (x) =>
      css`
        white-space: ${x};
      `,
    val: whiteSpace,
  });

const userSelect = ({ userSelect }) =>
  responsiveProp({
    func: (x) =>
      css`
        user-select: ${x};
      `,
    val: userSelect,
  });

export default [
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  color,
  textAlign,
  textDecoration,
  textTransform,
  whiteSpace,
  userSelect,
];

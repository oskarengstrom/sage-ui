import { arrayProp } from "../utils/arrayProp";
import { findValueInObject } from "../utils/findValueInObject";
import { isValidColor } from "../utils/isValidColor";

const color = ({ theme, color: value }) => {
  return arrayProp({
    theme,
    value,
    func: (x) =>
      `
          color: ${isValidColor(x) ? x : findValueInObject(x, theme)};
        `,
  });
};

const fontFamily = ({ theme, fontFamily: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
          font-family: ${x};
        `,
  });

const fontSize = ({ theme, fontSize: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
          font-size: ${x};
        `,
    interpolation: "rem",
  });

const fontStyle = ({ theme, fontStyle: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
          font-style: ${x};
        `,
  });

const fontWeight = ({ theme, fontWeight: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
          font-weight: ${x};
        `,
  });

const fontVariant = ({ theme, fontVariant: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
          font-weight: ${x};
        `,
  });

const lineHeight = ({ theme, lineHeight: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
          line-height: ${x};
        `,
    interpolation: "rem",
  });

const letterSpacing = ({ theme, letterSpacing: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
          letter-spacing: ${x};
        `,
    interpolation: "em",
  });

const textAlign = ({ theme, textAlign: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
          text-align: ${x};
        `,
  });

const textDecoration = ({ theme, textDecoration: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
          text-decoration: ${x};
        `,
  });

const textTransform = ({ theme, textTransform: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
          text-transform: ${x};
        `,
  });

const textIndent = ({ theme, textIndent: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
          text-indent: ${x};
        `,
  });

const textOverflow = ({ theme, textOverflow: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
          text-overflow: ${x};
        `,
  });

const textShadow = ({ theme, textShadow: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
          text-shadow: ${x};
        `,
  });

const whiteSpace = ({ theme, whiteSpace: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
          white-space: ${x};
        `,
  });

const wordBreak = ({ theme, wordBreak: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
      word-break: ${x};
        `,
  });

const wordSpacing = ({ theme, wordSpacing: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
      word-spacing: ${x};
        `,
  });

const userSelect = ({ theme, userSelect: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
          user-select: ${x};
        `,
  });

export default [
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  fontVariant,
  lineHeight,
  letterSpacing,
  color,
  textAlign,
  textDecoration,
  textTransform,
  textIndent,
  textOverflow,
  textShadow,
  whiteSpace,
  wordBreak,
  wordSpacing,
  userSelect,
];

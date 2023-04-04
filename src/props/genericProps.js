import { arrayProp } from "../utils/arrayProp";
import { findValueInObject } from "../utils/findValueInObject";
import { isValidColor } from "../utils/isValidColor";

const dev = ({ theme, dev: value }) =>
  arrayProp({
    theme,
    value,
    func: () =>
      `
        box-sizing: border-box;
        background-color: rgba(255, 0, 0, 0.1);
        box-shadow: inset 0px 0px 0px 1px rgba(255, 0, 0, 0.2);
      `,
  });

const background = ({ theme, background: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `background: ${isValidColor(x) ? x : findValueInObject(x, theme)};`,
  });

const backgroundColor = ({ theme, backgroundColor: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `background-color: ${isValidColor(x) ? x : findValueInObject(x, theme)};`,
  });

const objectFit = ({ theme, objectFit: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `object-fit: ${x};`,
  });

const transform = ({ theme, transform: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      transform: ${x};
    `,
  });

const transformOrigin = ({ theme, transformOrigin: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      transform-origin: ${x};
    `,
  });

const borderRadius = ({ theme, borderRadius: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      border-radius: ${x};
    `,
    interpolation: "rem",
  });

const boxShadow = ({ theme, boxShadow: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      box-shadow: ${x};
    `,
  });

const flex = ({ theme, flex: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      flex: ${x};
    `,
  });

const flexBasis = ({ theme, flexBasis: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      flex-basis: ${x};
    `,
    interpolation: "rem",
  });

const flexShrink = ({ theme, flexShrink: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      flex-shrink: ${x};
    `,
  });

const flexGrow = ({ theme, flexGrow: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      flex-grow: ${x};
    `,
  });

const alignSelf = ({ theme, alignSelf: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      align-self: ${x};
    `,
  });
const outline = ({ theme, outline: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      outline: ${x};
    `,
  });

const visibility = ({ theme, visibility: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      visibility: ${x};
    `,
  });

const display = ({ theme, display: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      display: ${x};
    `,
  });

const position = ({ theme, position: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      position: ${x};
    `,
  });

const zIndex = ({ theme, zIndex: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      z-index: ${x};
    `,
  });

const top = ({ theme, top: value }) =>
  arrayProp(theme, value, {
    func: (x) => `
      top: ${x};
    `,
    interpolation: "rem",
  });

const right = ({ theme, right: value }) =>
  arrayProp(theme, value, {
    func: (x) => `
      right: ${x};
    `,
    interpolation: "rem",
  });

const bottom = ({ theme, bottom: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      bottom: ${x};
    `,
    interpolation: "rem",
  });

const left = ({ theme, left: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      left: ${x};
    `,
    interpolation: "rem",
  });

const inset = ({ theme, inset: value }) =>
  arrayProp(theme, value, {
    func: (x) => `
      inset: ${x};
    `,
    interpolation: "rem",
  });

const insetX = ({ theme, insetX: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      left: ${x};
      right: ${x};
    `,
    interpolation: "rem",
  });

const insetY = ({ theme, insetY: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      top: ${x};
      bottom: ${x};
    `,
    interpolation: "rem",
  });

const pointerEvents = ({ theme, pointerEvents: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      pointer-events: ${x};
    `,
  });

const cursor = ({ theme, cursor: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      cursor: ${x};
    `,
  });

const opacity = ({ theme, opacity: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      opacity: ${x};
    `,
  });

const transition = ({ theme, transition: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) => `
      transition: ${x};
    `,
  });

const span = ({ theme, span: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        grid-column: span ${x};
      `,
  });

const placeSelf = ({ theme, placeSelf: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        place-self: ${x};
      `,
  });

const order = ({ theme, order: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        order: ${x};
      `,
  });

const gridColumn = ({ theme, gridColumn: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        grid-column: ${x};
      `,
  });

const gridRow = ({ theme, gridRow: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        grid-row: ${x};
      `,
  });

const gridArea = ({ theme, gridArea: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        grid-area: ${x};
      `,
  });

const width = ({ theme, width: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        width: ${x};
      `,
    width,
    interpolation: "rem",
  });

const maxWidth = ({ theme, maxWidth: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        max-width: ${x};
      `,
    interpolation: "rem",
  });

const minWidth = ({ theme, minWidth: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        min-width: ${x};
      `,
    interpolation: "rem",
  });

const height = ({ theme, height: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        height: ${x};
      `,
    interpolation: "rem",
  });

const maxHeight = ({ theme, maxHeight: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        max-height: ${x};
      `,
    interpolation: "rem",
  });

const minHeight = ({ theme, minHeight: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        min-height: ${x};
      `,
    interpolation: "rem",
  });

const aspectRatio = ({ theme, aspectRatio: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        aspect-ratio: ${x};
      `,
    interpolation: "rem",
  });

const m = ({ theme, m: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        margin: ${x};
      `,
    interpolation: "rem",
  });

const mx = ({ theme, mx: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        margin-left: ${x};
        margin-right: ${x};
      `,
    interpolation: "rem",
  });

const my = ({ theme, my: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        margin-top: ${x};
        margin-bottom: ${x};
      `,
    interpolation: "rem",
  });

const mt = ({ theme, mt: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        margin-top: ${x};
      `,
    interpolation: "rem",
  });

const mr = ({ theme, mr: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        margin-right: ${x};
      `,
    interpolation: "rem",
  });

const mb = ({ theme, mb: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        margin-bottom: ${x};
      `,
    interpolation: "rem",
  });

const ml = ({ theme, ml: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        margin-left: ${x};
      `,
    interpolation: "rem",
  });

const p = ({ theme, p: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        padding: ${x};
      `,
    interpolation: "rem",
  });

const px = ({ theme, px: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        padding-left: ${x};
        padding-right: ${x};
      `,
    interpolation: "rem",
  });

const py = ({ theme, py: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        padding-top: ${x};
        padding-bottom: ${x};
      `,
    interpolation: "rem",
  });

const pt = ({ theme, pt: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        padding-top: ${x};
      `,
    interpolation: "rem",
  });

const pr = ({ theme, pr: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        padding-right: ${x};
      `,
    interpolation: "rem",
  });

const pb = ({ theme, pb: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        padding-bottom: ${x};
      `,
    interpolation: "rem",
  });

const pl = ({ theme, pl: value }) =>
  arrayProp({
    theme,
    value,
    func: (x) =>
      `
        padding-left: ${x};
      `,
    interpolation: "rem",
  });

export default [
  dev,

  // background color
  background,
  backgroundColor,

  // Container
  objectFit,
  transform,
  transformOrigin,
  borderRadius,
  boxShadow,
  flex,
  flexBasis,
  flexShrink,
  flexGrow,
  alignSelf,
  outline,

  // display
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
  pointerEvents,
  cursor,
  opacity,
  transition,

  // Grid Item
  span,
  placeSelf,
  order,
  gridColumn,
  gridRow,
  gridArea,

  // size
  width,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
  aspectRatio,

  // space
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
];

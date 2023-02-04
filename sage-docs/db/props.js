const inputTypes = {
  number: "number",
  css_unit: "unit",
  html_element: "elment",
  string: "string",
  boolean: "boolean",
  color: "color",
  themeObject: "object",
};

export const props = {
  as: {
    name: "as",
    description: "as",
    input_types: [
      {
        type: inputTypes.html_element,
      },
    ],
  },
  dev: {
    name: "dev",
    description: "development mode",
    input_types: [
      {
        type: inputTypes.boolean,
      },
    ],
  },
  height: {
    name: "height",
    description: "height",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  minHeight: {
    name: "minHeight",
    description: "min height",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  maxHeight: {
    name: "maxHeight",
    description: "max height",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  width: {
    name: "width",
    description: "width",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  minWidth: {
    name: "minWidth",
    description: "min-width",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  maxWidth: {
    name: "maxWidth",
    description: "max-width",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  m: {
    name: "m",
    description: "margin",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  mx: {
    name: "mx",
    description: "margin-x",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  my: {
    name: "my",
    description: "margin-y",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  mt: {
    name: "mt",
    description: "margin-top",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  mr: {
    name: "mr",
    description: "margin-right",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  mb: {
    name: "mb",
    description: "margin-bottom",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  ml: {
    name: "ml",
    description: "margin-left",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  p: {
    name: "p",
    description: "padding",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  px: {
    name: "px",
    description: "padding-x",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  py: {
    name: "py",
    description: "padding-y",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  pt: {
    name: "pt",
    description: "padding-top",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  pr: {
    name: "pr",
    description: "padding-right",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  pb: {
    name: "pb",
    description: "padding-bottom",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  pl: {
    name: "pl",
    description: "padding-left",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  base: {
    name: "base",
    description: "grid-template-columns",
    input_types: [
      {
        type: inputTypes.number,
      },
    ],
    responsive: true,
  },
  gap: {
    name: "gap",
    description: "grid-gap",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  rowGap: {
    name: "rowGap",
    description: "grid-row-gap",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  columnGap: {
    name: "columnGap",
    description: "grid-column-gap",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  placeItems: {
    name: "placeItems",
    description: "place-items",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  span: {
    name: "span",
    description: "grid-column",
    input_types: [
      {
        type: inputTypes.number,
      },
    ],
    responsive: true,
  },
  gridColumn: {
    name: "gridColumn",
    description: "grid-column",
    input_types: [
      {
        type: inputTypes.string,
      },
    ],
    responsive: true,
  },
  order: {
    name: "order",
    description: "order",
    input_types: [
      {
        type: inputTypes.number,
      },
    ],
    responsive: true,
  },
  placeSelf: {
    name: "placeSelf",
    description: "place-self",
    input_types: [
      {
        type: inputTypes.string,
      },
    ],
    responsive: true,
  },
  backgroundColor: {
    name: "backgroundColor",
    description: "background-color",
    input_types: [
      {
        type: inputTypes.color,
      },
      {
        type: inputTypes.string,
        interpolation: "theme key",
      },
    ],
    responsive: true,
  },
  background: {
    name: "background",
    description: "background",
    input_types: [
      {
        type: inputTypes.color,
      },
      {
        type: inputTypes.string,
        interpolation: "theme key",
      },
    ],
    responsive: true,
  },
  ratio: {
    name: "ratio",
    description: "aspect ratio",
    input_types: [
      {
        type: inputTypes.number,
      },
    ],
    responsive: true,
  },
  theme: {
    name: "theme",
    description: "theme object",
    input_types: [
      {
        type: inputTypes.themeObject,
      },
    ],
    responsive: true,
  },
  xPadding: {
    name: "xPadding",
    description: "left/right padding",
    input_types: [
      // {
      //   type: inputTypes.number,
      //   interpolation: "rem",
      // },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  flexDirection: {
    name: "flexDirection",
    description: "flex-direction",
    input_types: [
      {
        type: inputTypes.string,
      },
    ],
    responsive: true,
  },
  gap: {
    name: "gap",
    description: "gap",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  alignItems: {
    name: "alignItems",
    description: "align-items",
    input_types: [
      {
        type: inputTypes.string,
      },
    ],
    responsive: true,
  },
  justifyContent: {
    name: "justifyContent",
    description: "justify-content",

    input_types: [
      {
        type: inputTypes.string,
      },
    ],
    responsive: true,
  },
  variant: {
    name: "variant",
    description: "variant",
    input_types: [
      {
        type: inputTypes.string,
      },
    ],
  },

  fontFamily: {
    name: "fontFamily",
    description: "font-family",
    input_types: [
      {
        type: inputTypes.string,
      },
    ],
    responsive: true,
  },
  fontSize: {
    name: "fontSize",
    description: "font-size",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  fontWeight: {
    name: "fontWeight",
    description: "font-weight",
    input_types: [
      {
        type: inputTypes.number,
      },
      {
        type: inputTypes.string,
      },
    ],
    responsive: true,
  },
  lineHeight: {
    name: "lineHeight",
    description: "line-height",
    input_types: [
      {
        type: inputTypes.number,
        interpolation: "rem",
      },
      {
        type: inputTypes.css_unit,
      },
    ],
    responsive: true,
  },
  color: {
    name: "color",
    description: "color",
    input_types: [
      {
        type: inputTypes.color,
      },
      {
        type: inputTypes.themeObject,
      },
    ],
    responsive: true,
  },
  textAlign: {
    name: "textAlign",
    description: "text-align",
    input_types: [
      {
        type: inputTypes.string,
      },
    ],
    responsive: true,
  },
  textDecoration: {
    name: "textDecoration",
    description: "text-decoration",
    input_types: [
      {
        type: inputTypes.string,
      },
    ],
    responsive: true,
  },
  textTransform: {
    name: "textTransform",
    description: "text-transform",
    input_types: [
      {
        type: inputTypes.string,
      },
    ],
    responsive: true,
  },
};

export const mixins = {
  space: [
    props.m,
    props.mx,
    props.my,
    props.mt,
    props.mr,
    props.mb,
    props.ml,
    props.p,
    props.px,
    props.py, // ?
    props.pt,
    props.pr,
    props.pb,
    props.pl,
  ],
  size: [
    props.height,
    props.minHeight,
    props.maxHeight,
    props.minWidth,
    props.maxWidth,
  ],
  grid: [
    props.base,
    props.gap,
    props.rowGap,
    props.columnGap,
    props.placeItems,
  ],
  gridItem: [props.span, props.gridColumn, props.order, props.placeSelf],
  backgroundColor: [props.backgroundColor, props.background],
  stack: [
    props.flexDirection,
    props.gap,
    props.alignItems,
    props.justifyContent,
  ],
  typography: [
    props.variant,
    props.fontFamily,
    props.fontSize,
    props.fontWeight,
    props.lineHeight,
    props.color,
    props.textAlign,
    props.textDecoration,
    props.textTransform,
  ],
};

export const components = {
  Box: {
    name: "Box",
    description: "Simple base component with responsive props",
    propList: [
      ...mixins.size,
      ...mixins.space,
      ...mixins.backgroundColor,
      props.as,
      props.dev,
    ],
  },
  Grid: {
    name: "Grid",
    description: "Parent container to create grids",
    propList: [
      ...mixins.grid,
      ...mixins.size,
      ...mixins.space,
      ...mixins.backgroundColor,
      props.as,
      props.dev,
    ],
  },
  "Grid.Item": {
    name: "Grid.Item",
    description: "Child component to create grid items",
    propList: [
      ...mixins.gridItem,
      ...mixins.size,
      ...mixins.space,
      ...mixins.backgroundColor,
      props.as,
      props.dev,
    ],
  },
  KeepAspectRatio: {
    name: "KeepAspectRatio",
    description: "Keeping aspect ratio of child content",
    propList: [props.ratio],
  },
  SageProvider: {
    name: "SageProvider",
    description: "Theme provider",
    propList: [props.theme],
  },
  Section: {
    name: "Section",
    description: "Section with custom padding and max-width features",
    propList: [
      props.xPadding,
      ...mixins.size,
      ...mixins.space,
      ...mixins.backgroundColor,
      props.dev,
    ],
  },
  Spacer: {
    name: "Spacer",
    description: "Simple spacer component",
    propList: [...mixins.size, props.dev],
  },
  Stack: {
    name: "Stack",
    description: "Flexbox-based component to stack elements",
    propList: [
      ...mixins.stack,
      ...mixins.size,
      ...mixins.space,
      ...mixins.backgroundColor,
      props.dev,
    ],
  },
  Typography: {
    name: "Typography",
    description:
      "Typography component with responsive props and variant-support via theme",
    propList: [...mixins.typography, props.as, props.dev],
  },
};

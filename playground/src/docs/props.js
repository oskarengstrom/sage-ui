const inputTypes = {
  number: "number",
  css_unit: "CSS unit",
  html_element: "HTML elment",
  string: "string",
  boolean: "boolean",
  color: "CSS color",
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
    props.py,
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
};

export const components = {
  Box: {
    name: "Box",
    description: "Box component description",
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
    description: "Grid component description",
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
    description: "Grid.Item component description",
    propList: [
      ...mixins.gridItem,
      ...mixins.size,
      ...mixins.space,
      ...mixins.backgroundColor,
      props.as,
      props.dev,
    ],
  },
};

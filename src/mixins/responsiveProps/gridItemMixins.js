import { css } from "@emotion/react";
import { responsiveProp } from "../../utils/responsiveProp";

// span (num: span, string: col start/end )
// placeSelf,

// TODO:
// grid-column: ${x};

const span = ({ span }) =>
  responsiveProp({
    func: (x) =>
      css`
        grid-column: span ${x};
      `,
    val: span,
  });

const placeSelf = ({ placeSelf }) =>
  responsiveProp({
    func: (x) =>
      css`
        place-self: ${x};
      `,
    val: placeSelf,
  });

const order = ({ order }) =>
  responsiveProp({
    func: (x) =>
      css`
        order: ${x};
      `,
    val: order,
  });

const gridColumn = ({ gridColumn }) =>
  responsiveProp({
    func: (x) =>
      css`
        grid-column: ${x};
      `,
    val: gridColumn,
  });

const gridRow = ({ gridRow }) =>
  responsiveProp({
    func: (x) =>
      css`
        grid-row: ${x};
      `,
    val: gridRow,
  });

const gridArea = ({ gridArea }) =>
  responsiveProp({
    func: (x) =>
      css`
        grid-area: ${x};
      `,
    val: gridArea,
  });

export default [span, placeSelf, order, gridColumn, gridRow, gridArea];

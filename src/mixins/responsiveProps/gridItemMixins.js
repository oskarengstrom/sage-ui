import { css } from "@emotion/react";
import { responsiveProp } from "../../utils/responsiveProp";

// span (num: span, string: col start/end )
// placeSelf,

// TODO:
// grid-column: ${x};

const span = ({ span }) =>
  span &&
  responsiveProp({
    func: (x) =>
      css`
        grid-column: span ${x};
      `,
    val: span,
  });

const placeSelf = ({ placeSelf }) =>
  placeSelf &&
  responsiveProp({
    func: (x) =>
      css`
        place-self: ${x};
      `,
    val: placeSelf,
  });

export default [span, placeSelf];

import { css } from "@emotion/react";
import { responsiveProp } from "../../utils/responsiveProp";

const show = ({ show }) =>
  responsiveProp({
    func: (x) =>
      css`
        visibility: ${x ? "visible" : "hidden"};
      `,
    val: show,
  });

export default [show];

import { css } from "@emotion/react";
import { responsiveProp } from "../../utils/responsiveProp";

const devMixins = ({ dev }) =>
  responsiveProp({
    func: () =>
      css`
        box-sizing: border-box;
        background-color: rgba(255, 0, 0, 0.1);
        box-shadow: inset 0px 0px 0px 1px rgba(255, 0, 0, 0.2);
      `,
    val: dev,
  });

export default devMixins;

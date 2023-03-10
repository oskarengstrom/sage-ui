import { css } from "@emotion/react";
import { responsiveProp } from "../../utils/responsiveProp";
import { isValidColor } from "../../utils/isValidColor";
import { findValueInObject } from "../../utils/findValueInObject";

const background = ({ background, theme }) => {
  return responsiveProp({
    func: (x) =>
      css`
        background: ${isValidColor(x) ? x : findValueInObject(x, theme)};
      `,
    val: background,
  });
};
const backgroundColor = ({ backgroundColor, theme }) => {
  return responsiveProp({
    func: (x) =>
      css`
        background-color: ${isValidColor(x) ? x : findValueInObject(x, theme)};
      `,
    val: backgroundColor,
  });
};

export default [backgroundColor, background];

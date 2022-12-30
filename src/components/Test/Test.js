import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { arrayifyProp } from "../../utils/arrayifyProp";
import { responsiveProp } from "../../utils/responsiveProp";

const backgroundColor = ({ backgroundColor }) =>
  responsiveProp({
    func: (x) =>
      css`
        background-color: ${x};
      `,
    val: backgroundColor,
  });

const Test = styled.div`
  ${[backgroundColor]};
`;

export default Test;

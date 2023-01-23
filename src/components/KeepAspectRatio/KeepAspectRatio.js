import styled from "@emotion/styled";
import React from "react";
import { responsiveProp } from "../../utils/responsiveProp";
import { css } from "@emotion/react";

const KeepAspectRatio = React.forwardRef(
  ({ ratio = 1, children, ...restProps }, ref) => {
    return (
      <Outer ratio={ratio}>
        <Inner ref={ref}>{children}</Inner>
      </Outer>
    );
  }
);

export default KeepAspectRatio;

const ratio = ({ ratio }) =>
  responsiveProp({
    func: (x) =>
      css`
        padding-bottom: ${(1 / x) * 100}%;
      `,
    val: ratio,
  });

const Outer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  ${ratio}
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
`;

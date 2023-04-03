import styled from "@emotion/styled";
import genericProps from "../../props/genericProps";
import flexProps from "../../props/flexProps";

const Stack = styled.div`
  ${flexProps}
  ${genericProps}
`;

Stack.defaultProps = {
  flexDirection: "column",
};

export default Stack;

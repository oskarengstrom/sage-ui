import styled from "@emotion/styled";
import genericProps from "../../props/genericProps";
import flexProps from "../../props/flexProps";
import { propFilter } from "../../utils/propFilter";

const Stack = styled("div", {
  shouldForwardProp: propFilter,
})([flexProps, genericProps]);

Stack.defaultProps = {
  flexDirection: "column",
};

export default Stack;

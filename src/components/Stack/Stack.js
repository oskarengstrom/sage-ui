import styled from "@emotion/styled";
import genericProps from "../../props/genericProps";
import flexProps from "../../props/flexProps";
import isPropValid from "@emotion/is-prop-valid";
import { propFilter } from "../../utils/propFilter";

const Stack = styled("div", {
  shouldForwardProp: propFilter,
})([flexProps, genericProps]);

Stack.defaultProps = {
  flexDirection: "column",
};

export default Stack;

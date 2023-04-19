import styled from "@emotion/styled";
import genericProps from "../../props/genericProps";
import { propFilter } from "../../utils/propFilter";

const Box = styled("div", {
  shouldForwardProp: propFilter,
})(genericProps);

export default Box;

import styled from "@emotion/styled";
import genericProps from "../../props/genericProps";
import { propFilter } from "../../utils/propFilter";

const Spacer = styled("div", {
  shouldForwardProp: propFilter,
})(genericProps);

Spacer.defaultProps = {
  height: 1,
};

export default Spacer;

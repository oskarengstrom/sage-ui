import styled from "@emotion/styled";
import genericProps from "../../props/genericProps";
import flexProps from "../../props/flexProps";
import { propFilter } from "../../utils/propFilter";

const Row = styled("div", {
  shouldForwardProp: propFilter,
})([flexProps, genericProps]);

Row.defaultProps = {
  flexDirection: "row",
};

export default Row;

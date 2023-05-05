import styled from "@emotion/styled";
import genericProps from "../../props/genericProps";
import flexProps from "../../props/flexProps";
import { propFilter } from "../../utils/propFilter";

const Column = styled("div", {
  shouldForwardProp: propFilter,
})([flexProps, genericProps]);

Column.defaultProps = {
  flexDirection: "column",
};

export default Column;

import styled from "@emotion/styled";
import stackMixins from "./stackMixins";
import devMixins from "../../mixins/responsiveProps/devMixins";
import sizeMixins from "../../mixins/responsiveProps/sizeMixins";
import spaceMixins from "../../mixins/responsiveProps/spaceMixins";

const Stack = styled.div`
  display: flex;
  ${devMixins}
  ${sizeMixins}
  ${spaceMixins}
  ${stackMixins}
`;

// Stack.defaultProps = {
//   justifyContent: "center",
// };

export default Stack;

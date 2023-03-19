import styled from "@emotion/styled";
import stackMixins from "../../mixins/responsiveProps/stackMixins";
import devMixins from "../../mixins/responsiveProps/devMixins";
import sizeMixins from "../../mixins/responsiveProps/sizeMixins";
import spaceMixins from "../../mixins/responsiveProps/spaceMixins";
import backgroundColorMixins from "../../mixins/responsiveProps/backgroundColorMixins";
import displayMixins from "../../mixins/responsiveProps/displayMixins";
import containerMixins from "../../mixins/responsiveProps/containerMixins";

const Stack = styled.div`
  display: flex;
  ${devMixins}
  ${sizeMixins}
  ${spaceMixins}
  ${stackMixins}
  ${backgroundColorMixins}
  ${displayMixins}
  ${containerMixins}
`;

Stack.defaultProps = {
  flexDirection: "column",
};

export default Stack;

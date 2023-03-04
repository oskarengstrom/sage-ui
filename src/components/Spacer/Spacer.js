import styled from "@emotion/styled";
import sizeMixins from "../../mixins/responsiveProps/sizeMixins";
import devMixins from "../../mixins/responsiveProps/devMixins";
import backgroundColorMixins from "../../mixins/responsiveProps/backgroundColorMixins";
import displayMixins from "../../mixins/responsiveProps/displayMixins";

const Spacer = styled.div`
  ${devMixins}

  ${backgroundColorMixins}

  ${sizeMixins}
  ${displayMixins}
`;

Spacer.defaultProps = {
  height: 1,
};

export default Spacer;

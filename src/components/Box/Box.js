import styled from "@emotion/styled";
import gridItemMixins from "../../mixins/responsiveProps/gridItemMixins";
import devMixins from "../../mixins/responsiveProps/devMixins";
import sizeMixins from "../../mixins/responsiveProps/sizeMixins";
import spaceMixins from "../../mixins/responsiveProps/spaceMixins";
import backgroundColorMixins from "../../mixins/responsiveProps/backgroundColorMixins";

const Box = styled.div`
  ${devMixins}
  ${gridItemMixins}
  ${sizeMixins}
  ${spaceMixins}
  ${backgroundColorMixins}
`;

export default Box;

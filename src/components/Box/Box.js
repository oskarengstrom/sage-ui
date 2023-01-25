import styled from "@emotion/styled";
import gridItemMixins from "../../mixins/responsiveProps/gridItemMixins";
import devMixins from "../../mixins/responsiveProps/devMixins";
import sizeMixins from "../../mixins/responsiveProps/sizeMixins";
import spaceMixins from "../../mixins/responsiveProps/spaceMixins";

const Box = styled.div`
  ${devMixins}
  ${gridItemMixins}
  ${sizeMixins}
  ${spaceMixins}
`;

export default Box;

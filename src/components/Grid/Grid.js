import styled from "@emotion/styled";
import gridMixins from "../../mixins/responsiveProps/gridMixins";
import gridItemMixins from "../../mixins/responsiveProps/gridItemMixins";
import devMixins from "../../mixins/responsiveProps/devMixins";
import sizeMixins from "../../mixins/responsiveProps/sizeMixins";
import spaceMixins from "../../mixins/responsiveProps/spaceMixins";

const Grid = styled.div`
  ${devMixins}
  ${gridMixins}
  ${sizeMixins}
  ${spaceMixins}
`;

const Item = styled.div`
  ${devMixins}
  ${gridItemMixins}
  ${sizeMixins}
  ${spaceMixins}
`;

Grid.Item = Item;
export default Grid;

import styled from "@emotion/styled";
import gridMixins from "../mixins/responsiveProps/gridMixins";
import gridItemMixins from "../mixins/responsiveProps/gridItemMixins";
import devMixins from "../mixins/responsiveProps/devMixins";

const Grid = styled.div`
  ${devMixins}
  ${gridMixins}
`;

const Item = styled.div`
  ${devMixins}
  ${gridItemMixins}
`;

Grid.Item = Item;
export default Grid;

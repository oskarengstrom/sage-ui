import styled from "@emotion/styled";
import gridMixins from "../../mixins/responsiveProps/gridMixins";
import gridItemMixins from "../../mixins/responsiveProps/gridItemMixins";
import devMixins from "../../mixins/responsiveProps/devMixins";
import sizeMixins from "../../mixins/responsiveProps/sizeMixins";
import spaceMixins from "../../mixins/responsiveProps/spaceMixins";
import backgroundColorMixins from "../../mixins/responsiveProps/backgroundColorMixins";
import displayMixins from "../../mixins/responsiveProps/displayMixins";
import { useResponsive } from "../../hooks/useResponsive/useResponsive";
import { useEffect } from "react";
import { arrayifyProp } from "../../utils/arrayifyProp";
import containerMixins from "../../mixins/responsiveProps/containerMixins";

const PsuedoGrid = (props) => {
  const { base, gap, ...rest } = props;
  const { breakpointIndex } = useResponsive();

  return (
    <StyledGrid
      {...props}
      css={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {[...Array(arrayifyProp(base)[breakpointIndex])].map((_, i) => (
        <Item
          key={i}
          span={1}
          css={{
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            boxShadow: "inset 0px 0px 0px 1px rgba(255, 0, 0, 0.2),",
          }}
        />
      ))}
    </StyledGrid>
  );
};

const Grid = ({ children, ...props }) => {
  const { dev } = props;
  return (
    <StyledGrid {...props}>
      {dev && <PsuedoGrid {...props} />}
      {children}
    </StyledGrid>
  );
};

const StyledGrid = styled.div`
  ${({ dev }) => dev && `position: relative;`}
  ${gridMixins}
  ${sizeMixins}
  ${spaceMixins}
  ${backgroundColorMixins}
  ${displayMixins}
  ${containerMixins}
`;

const Item = styled.div`
  ${devMixins}
  ${gridItemMixins}
  ${sizeMixins}
  ${spaceMixins}
  ${backgroundColorMixins}
  ${displayMixins}
  ${containerMixins}
`;

Grid.Item = Item;
export default Grid;

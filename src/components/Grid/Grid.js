import styled from "@emotion/styled";
import { useResponsive } from "../../hooks/useResponsive/useResponsive";
import { arrayifyProp } from "../../utils/arrayifyProp";
import genericProps from "../../props/genericProps";
import gridProps from "../../props/gridProps";

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
  ${gridProps}
  ${genericProps}
`;

const Item = styled.div(genericProps);

Grid.Item = Item;
export default Grid;

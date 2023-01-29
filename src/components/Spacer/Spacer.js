import styled from "@emotion/styled";
import sizeMixins from "../../mixins/responsiveProps/sizeMixins";
import devMixins from "../../mixins/responsiveProps/devMixins";
import backgroundColorMixins from "../../mixins/responsiveProps/backgroundColorMixins";
import { responsiveProp } from "../../utils/responsiveProp";
import { css } from "@emotion/react";

// const backgroundColor = ({ backgroundColor }) =>
//   backgroundColor &&
//   responsiveProp({
//     func: (x) =>
//       css`
//         background-color: ${x};
//       `,
//     val: backgroundColor,
//   });

const Spacer = styled.div`
  ${devMixins}

  // overrides background color from props
  ${backgroundColorMixins}

  ${sizeMixins}
`;

Spacer.defaultProps = {
  height: 1,
  //   backgroundColor: (props) => props.theme.palette.background,
};

export default Spacer;

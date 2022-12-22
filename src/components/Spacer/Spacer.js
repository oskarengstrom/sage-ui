import styled from "@emotion/styled";
import sizeMixins from "../../mixins/responsiveProps/sizeMixins";
import devMixins from "../../mixins/responsiveProps/devMixins";
import { responsiveProp } from "../../utils/responsiveProp";
import { css } from "@emotion/react";

const backgroundColor = ({ backgroundColor }) =>
  backgroundColor &&
  responsiveProp({
    func: (x) =>
      css`
        background-color: ${x};
      `,
    val: backgroundColor,
  });

const Spacer = styled.div`
  ${devMixins}

  // adds a default background color from theme
${(props) =>
    props.theme?.palette?.background &&
    `background-color: ${props.theme.palette.background}`}

// overrides background color from props
${backgroundColor}

  ${sizeMixins}
`;

Spacer.defaultProps = {
  height: 1,
  //   backgroundColor: (props) => props.theme.palette.background,
};

export default Spacer;

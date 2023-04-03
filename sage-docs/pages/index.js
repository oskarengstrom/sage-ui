import styled from "@emotion/styled";
import {
  Box,
  Section,
  Stack,
  arrayProp,
  genericProps,
} from "@oskarengstrom/sage-ui";

export default function Home() {
  return (
    <Section>
      <Stack flexDirection="row">
        <Box>asdf</Box>
        <Box>asdf</Box>
        <Box>asdf</Box>
      </Stack>
    </Section>
  );
}

// const color = ({ theme, color: value }) => {
//   return arrayProp({
//     theme,
//     value,
//     func: (x) => `color: ${x};`,
//   });
// };

// const fontSize = ({ theme, fontSize: value }) => {
//   return arrayProp({
//     theme,
//     value,
//     func: (x) => `font-size: ${x};`,
//     interpolation: "rem",
//   });
// };

const Wrapper = styled.div`
  ${genericProps}
`;

import styled from "@emotion/styled";
import {
  Box,
  Section,
  Stack,
  Typography,
  genericProps,
  XPad,
} from "@oskarengstrom/sage-ui";

export default function Home() {
  return (
    <Box as="section">
      <XPad>
        <Stack flexDirection="row" gap={2} dev>
          <Box backgroundColor="red">
            <Typography fontSize={2} lineHeight={2}>
              asdf
            </Typography>
          </Box>
          <Box backgroundColor="red">asdf</Box>
          <Box backgroundColor="red">asdf</Box>
        </Stack>
      </XPad>
    </Box>
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

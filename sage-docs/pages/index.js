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
        <Stack
          flexDirection="row"
          backgroundColor={["red", null, "blue"]}
          display={["none", null, "flex"]}
          zIndex={[1, 2, 3]}
          dev
        >
          <Box backgroundColor="red" zIndex={[1, 2, 3]}>
            asdf
          </Box>
        </Stack>
      </XPad>
    </Box>
  );
}

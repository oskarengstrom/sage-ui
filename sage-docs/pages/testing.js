import {
  Stack,
  Section,
  Box,
  Typography,
  Grid,
  Theme,
} from "@oskarengstrom/sage-ui";

export default function Test2() {
  return (
    <>
      <Stack>asdf</Stack>
      <Theme>
        {(theme) => <div>Current Primary is: {theme.palette.primary.main}</div>}
      </Theme>
    </>
  );
}

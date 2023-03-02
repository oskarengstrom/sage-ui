import React from "react";
import { Stack, Typography as T } from "@oskarengstrom/sage-ui";
import Link from "next/link";
import PropItem from "./PropItem";
import { useTheme } from "@emotion/react";
import { ThemeContext } from "@emotion/react";
import IconArrowReturnRight from "./icons/IconArrowReturnRight";

export default function MixinItem({ mixin, allProps, ...restProps }) {
  const theme = useTheme(ThemeContext);

  return (
    <React.Fragment key={mixin.uid} {...restProps}>
      <T key={mixin.data.name} color="palette.text.primary">
        <Link href={`/mixins/${mixin.uid}`}>[{mixin.data.name}]</Link>
      </T>
      {mixin.data.props.map((prop) => {
        const thisProp = allProps.find((p) => p.uid === prop.prop.uid);

        return (
          thisProp && (
            <Stack
              key={thisProp.uid}
              flexDirection="row"
              alignItems="center"
              gap={0.5}
              ml={0.5}
            >
              <IconArrowReturnRight color={theme.palette.icon.primary} />

              <PropItem prop={thisProp} />
            </Stack>
          )
        );
      })}
    </React.Fragment>
  );
}

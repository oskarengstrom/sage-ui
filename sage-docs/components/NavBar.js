import Link from "next/link";
import React from "react";
import { Stack, Typography as T } from "@oskarengstrom/sage-ui";
import sortArrayByName from "@/utils/sortArrayByName";

export default function NavBar({ data }) {
  return (
    <Stack gap={2} as="nav">
      <Link href={`/`}>
        <T fontWeight="800">SAGE-UI 🎨</T>
      </Link>
      <Stack>
        <T variant="caption">Components</T>
        {sortArrayByName(data.components).map((component) => (
          <T variant="component" key={component.data.name}>
            <Link href={`/components/${component.uid}`}>
              {component.data.name}
            </Link>
          </T>
        ))}
      </Stack>
      <Stack>
        <T variant="caption">Mixin groups</T>
        {sortArrayByName(data.mixinGroups).map((prop) => (
          <T variant="mixin" key={prop.data.name}>
            <Link href={`/mixins/${prop.uid}`}>{prop.data.name}</Link>
          </T>
        ))}
      </Stack>
      <Stack>
        <T variant="caption">Utilities</T>
        {sortArrayByName(data.utilities).map((util) => (
          <T variant="mixin" key={util.data.name}>
            <Link href={`/utilities/${util.uid}`}>{util.data.name}</Link>
          </T>
        ))}
      </Stack>
      <T variant="caption">All props</T>
      <T variant="caption">All inputs</T>
    </Stack>
  );
}

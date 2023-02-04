import Link from "next/link";
import React from "react";
import { Stack, Typography as T } from "@oskarengstrom/sage-ui";

export default function NavBar({ data }) {
  return (
    <Stack gap={2} as="nav">
      <T fontWeight="800">SAGE-UI 🎨</T>
      <Stack>
        <T variant="caption">Components</T>
        {data.components.map((component) => (
          <T key={component.data.name}>
            <Link href={`/components/${component.uid}`}>
              {component.data.name}
            </Link>
          </T>
        ))}
      </Stack>
      <Stack>
        <T variant="caption">Prop groups</T>
        {data.mixinGroups.map((prop) => (
          <T key={prop.data.name}>
            <Link href={`/mixins/${prop.uid}`}>{prop.data.name}</Link>
          </T>
        ))}
      </Stack>
      <T variant="caption">All props</T>
      <T variant="caption">All inputs</T>
    </Stack>
  );
}

import { components, mixins, props } from "@/db/props";
import Link from "next/link";
import React from "react";
import { Stack, Typography as T } from "@oskarengstrom/sage-ui";

export default function NavBar() {
  return (
    <Stack gap={2} as="nav">
      <T fontWeight="800">SAGE-UI 🎨</T>
      <Stack gap={0.25}>
        <T variant="caption">Components:</T>
        {Object.keys(components).map((key) => (
          <T key={components[key].name}>
            <Link href={`/components/${components[key].name}`}>
              {components[key].name}
            </Link>
          </T>
        ))}
      </Stack>
      <Stack gap={0.25}>
        <T variant="caption">Mixins:</T>
        {Object.keys(mixins).map((key) => (
          <T key={key}>
            <Link href={`/mixins/${key}`}>{key}</Link>
          </T>
        ))}
      </Stack>
      <Stack gap={0.25}>
        <T variant="caption">Props:</T>
        {Object.keys(props).map((key) => (
          <T key={key}>
            <Link href={`/props/${key}`}>{key}</Link>
          </T>
        ))}
      </Stack>
    </Stack>
  );
}

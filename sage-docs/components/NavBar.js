import { components, mixins, props } from "@/db/props";
import Link from "next/link";
import React from "react";
import { Stack, Typography as T } from "@oskarengstrom/sage-ui";

export default function NavBar({ data }) {
  return (
    <Stack gap={2} as="nav">
      <T fontWeight="800">SAGE-UI 🎨</T>
      <Stack gap={0.25}>
        <T variant="caption">Components:</T>
        {data.components.map((component) => (
          <T key={component.data.name}>
            <Link href={`/components/${component.uid}`}>
              {component.data.name}
            </Link>
          </T>
        ))}
      </Stack>
      <Stack gap={0.25}>
        <T variant="caption">Prop groups:</T>
        {data.mixinGroups.map((prop) => (
          <T key={prop.data.name}>
            <Link href={`/mixins/${prop.uid}`}>{prop.data.name}</Link>
          </T>
        ))}
      </Stack>
      <Stack gap={0.25}>
        <T variant="caption">Props:</T>
        {data.props.map((prop) => (
          <T key={prop.data.name}>
            <Link href={`/props/${prop.uid}`}>{prop.data.name}</Link>
          </T>
        ))}
      </Stack>
      <Stack gap={0.25}>
        <T variant="caption">Inputs:</T>
        {data.inputs.map((input) => (
          <T key={input.data.name}>
            <Link href={`/inputs/${input.uid}`}>{input.data.name}</Link>
          </T>
        ))}
      </Stack>
    </Stack>
  );
}

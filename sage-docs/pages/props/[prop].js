import { props } from "@/db/props";
import React from "react";
import { Stack, Typography as T } from "@oskarengstrom/sage-ui";

export default function Prop({ data }) {
  return (
    <Stack gap={2}>
      <Stack>
        <T variant="h1">{data.name}</T>
        <T color="palette.text.secondary">Prop</T>
      </Stack>
      <T>Description: {data.description}</T>
      <Stack gap={0.25}>
        <T variant="caption">Input types:</T>
        {data.input_types.map((input) => (
          <T>{input.type}</T>
        ))}
      </Stack>
    </Stack>
  );
}

export async function getServerSideProps({ query }) {
  const { prop } = query;

  return {
    props: { data: props[prop] }, // will be passed to the page component as props
  };
}

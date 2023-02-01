import { components, mixins } from "@/db/props";
import Link from "next/link";
import React from "react";
import { Stack, Typography as T } from "@oskarengstrom/sage-ui";

export default function Mixin({ data, name }) {
  return (
    <Stack gap={2}>
      <Stack>
        <T variant="h1">{name}</T>
        <T color="palette.text.secondary">Mixin group</T>
      </Stack>
      <Stack gap={0.25}>
        <T variant="caption">Props:</T>
        {data.map((mixin) => (
          <T key={mixin.name}>
            <Link href={`/props/${mixin.name}`}>{mixin.name}</Link>
          </T>
        ))}
      </Stack>
    </Stack>
  );
}

export async function getServerSideProps({ query }) {
  const { mixin } = query;

  return {
    props: { data: mixins[mixin], name: mixin }, // will be passed to the page component as props
  };
}

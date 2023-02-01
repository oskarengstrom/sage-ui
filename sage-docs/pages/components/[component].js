import { components } from "@/db/props";
import Link from "next/link";
import React from "react";
import { Stack, Typography as T } from "@oskarengstrom/sage-ui";

export default function Component({ data }) {
  //   console.log(data);
  return (
    <Stack gap={2}>
      <Stack>
        <T variant="h1">{data.name}</T>
        <T color="palette.text.secondary">Component</T>
      </Stack>
      <T>{data.description}</T>
      <Stack gap={0.25}>
        <T variant="caption">Props:</T>
        {data.propList.map((prop) => (
          <T key={prop.name}>
            <Link href={`/props/${prop.name}`}>{prop.name}</Link>
          </T>
        ))}
      </Stack>
    </Stack>
  );
}

export async function getServerSideProps({ query }) {
  const { component } = query;

  return {
    props: { data: components[component] }, // will be passed to the page component as props
  };
}

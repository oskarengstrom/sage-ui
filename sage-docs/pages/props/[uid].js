import React from "react";
import { Stack, Typography as T } from "@oskarengstrom/sage-ui";
import { createClient } from "@/prismic-configuration";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function Prop({ data, inputs, navBarData }) {
  return (
    <Layout data={navBarData}>
      <Stack gap={2}>
        <Stack>
          <T variant="h1">{data.name}</T>
          <T color="palette.text.secondary">Prop</T>
        </Stack>
        <T>Description: {data.description}</T>

        <Stack>
          <T variant="caption">Input types</T>
          {inputs.map((input) => (
            <T>
              <Link href={`/inputs/${input.uid}`}>
                {input.data.name}
                {data.responsive && "[]"}
              </Link>
            </T>
          ))}
        </Stack>
      </Stack>
    </Layout>
  );
}

export async function getStaticPaths() {
  const client = createClient();
  const result = await client.getAllByType("prop");
  const paths = result.map((item) => ({
    params: { uid: item.uid },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const client = createClient();
  const prop = await client.getByUID("prop", params.uid);
  const inputs = [];
  prop.data.inputs.map(async ({ input }) => {
    if (input.uid) {
      const result = await client.getByUID("input", input.uid);
      inputs.push(result);
    }
  });
  const allComponents = await client.getAllByType("component");
  const allMixinGroups = await client.getAllByType("mixin_group");
  const navBarData = {
    components: allComponents,
    mixinGroups: allMixinGroups,
  };
  return {
    props: { data: prop.data, inputs, navBarData }, // will be passed to the page component as props
  };
}

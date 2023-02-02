import React from "react";
import { Stack, Typography as T } from "@oskarengstrom/sage-ui";
import { createClient } from "@/prismic-configuration";
import Layout from "@/components/Layout";

export default function Prop({ data, inputs, navBarData }) {
  console.log(inputs);
  return (
    <Layout data={navBarData}>
      <Stack gap={2}>
        <Stack>
          <T variant="h1">{data.name}</T>
          <T color="palette.text.secondary">Prop</T>
        </Stack>
        <T>Description: {data.description}</T>
        <Stack gap={0.25}>
          <T variant="caption">Input types:</T>
          {inputs.map((input) => (
            <T>{input.data.name}</T>
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
  const allProps = await client.getAllByType("prop");
  const allMixinGroups = await client.getAllByType("mixin_group");
  const allInputs = await client.getAllByType("input");
  const navBarData = {
    components: allComponents,
    props: allProps,
    mixinGroups: allMixinGroups,
    inputs: allInputs,
  };
  return {
    props: { data: prop.data, inputs, navBarData }, // will be passed to the page component as props
  };
}

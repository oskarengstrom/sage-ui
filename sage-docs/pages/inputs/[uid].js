import React from "react";
import { Stack, Typography as T } from "@oskarengstrom/sage-ui";
import { createClient } from "@/prismic-configuration";
import Layout from "@/components/Layout";

export default function Input({ data, navBarData }) {
  //   console.log(inputs);
  return (
    <Layout data={navBarData}>
      <Stack gap={2}>
        <Stack>
          <T variant="h1">{data.name}</T>
          <T color="palette.text.secondary">Input</T>
        </Stack>
        <T>Description: {data.description}</T>
      </Stack>
    </Layout>
  );
}

export async function getStaticPaths() {
  const client = createClient();
  const result = await client.getAllByType("input");
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
  const input = await client.getByUID("input", params.uid);

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
    props: { data: input.data, navBarData }, // will be passed to the page component as props
  };
}

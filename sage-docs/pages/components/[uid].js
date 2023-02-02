import React from "react";
import Link from "next/link";
import { Stack, Typography as T } from "@oskarengstrom/sage-ui";
import { createClient } from "@/prismic-configuration";
import Layout from "@/components/Layout";

export default function Component({ data, props, navBarData }) {
  return (
    <Layout data={navBarData}>
      <Stack gap={2}>
        <Stack>
          <T variant="h1">{data.name}</T>
          <T color="palette.text.secondary">Component</T>
        </Stack>
        <T>{data.description}</T>
        <Stack gap={0.25}>
          <T variant="caption">Props:</T>
          {props.map((prop) => (
            <T key={prop.data.name}>
              <Link href={`/props/${prop.uid}`}>{prop.data.name}</Link>
            </T>
          ))}
        </Stack>
      </Stack>
    </Layout>
  );
}

export async function getStaticPaths() {
  const client = createClient();
  const result = await client.getAllByType("component");
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
  const component = await client.getByUID("component", params.uid);
  const props = await Promise.all(
    component.data.props.map(async ({ prop }) => {
      const propData = await client.getByUID("prop", prop.uid);
      return propData;
    })
  );
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
    props: { data: component.data, props, navBarData }, // will be passed to the page component as props
  };
}

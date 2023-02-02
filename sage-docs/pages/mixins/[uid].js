import { components, mixins } from "@/db/props";
import Link from "next/link";
import React from "react";
import { Stack, Typography as T } from "@oskarengstrom/sage-ui";
import { createClient } from "@/prismic-configuration";
import Layout from "@/components/Layout";

export default function Mixin({ data, props, navBarData }) {
  return (
    <Layout data={navBarData}>
      <Stack gap={2}>
        <Stack>
          <T variant="h1">{data.name}</T>
          <T color="palette.text.secondary">Mixin group</T>
        </Stack>
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
  const result = await client.getAllByType("mixin_group");
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
  const mixin = await client.getByUID("mixin_group", params.uid);
  const props = [];
  mixin.data.props.map(async ({ prop }) => {
    if (prop.uid) {
      const result = await client.getByUID("prop", prop.uid);
      props.push(result);
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
    props: { data: mixin.data, props, navBarData }, // will be passed to the page component as props
  };
}

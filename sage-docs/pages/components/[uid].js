import React from "react";
import Link from "next/link";
import { Stack, Typography as T } from "@oskarengstrom/sage-ui";
import { createClient } from "@/prismic-configuration";
import Layout from "@/components/Layout";
import CustomRichText from "@/utils/CustomRichText";
import IconArrowReturnRight from "@/components/icons/IconArrowReturnRight";
import { useTheme } from "@emotion/react";
import { ThemeContext } from "@emotion/react";
import { PrismicLink } from "@prismicio/react";
import PropItem from "@/components/PropItem";
import MixinItem from "@/components/MixinItem";

export default function Component({
  data,
  props,
  allProps,
  mixinGroups,
  navBarData,
}) {
  const theme = useTheme(ThemeContext);
  return (
    <Layout data={navBarData}>
      <Stack gap={2}>
        <Stack>
          <T variant="h1">{data.name}</T>
          <T color="palette.text.secondary">Component</T>
        </Stack>

        <Stack gap={1}>
          <CustomRichText
            field={data.description_rt}
            color="palette.text.primary"
          />
        </Stack>

        <Stack>
          <T variant="caption">Props</T>
          {mixinGroups.map((mixin) => (
            <MixinItem mixin={mixin} allProps={allProps} />
          ))}
          {props.map((prop) => (
            <PropItem prop={prop} />
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

  const props = [];
  const mixinGroups = [];
  component.data.props.map(async ({ prop }) => {
    if (prop.type === "prop") {
      const result = await client.getByUID("prop", prop.uid);
      props.push(result);
    } else if (prop.type === "mixin_group") {
      const mixinGroupData = await client.getByUID("mixin_group", prop.uid);
      mixinGroups.push(mixinGroupData);
    }
  });

  const allComponents = await client.getAllByType("component");
  const allMixinGroups = await client.getAllByType("mixin_group");
  const allProps = await client.getAllByType("prop");
  const allUtilities = await client.getAllByType("utility");
  const navBarData = {
    components: allComponents,
    mixinGroups: allMixinGroups,
    utilities: allUtilities,
  };
  return {
    props: { data: component.data, allProps, props, mixinGroups, navBarData }, // will be passed to the page component as props
  };
}

import React from "react";
import Link from "next/link";
import { Stack, Typography as T } from "@oskarengstrom/sage-ui";
import { createClient } from "@/prismic-configuration";
import Layout from "@/components/Layout";
import CustomRichText from "@/utils/CustomRichText";
import IconArrowReturnRight from "@/components/icons/IconArrowReturnRight";

export default function Component({
  data,
  props,
  allProps,
  mixinGroups,
  navBarData,
}) {
  return (
    <Layout data={navBarData}>
      <Stack gap={2}>
        <Stack>
          <T variant="h1">{data.name}</T>
          <T color="palette.text.secondary">Component</T>
        </Stack>

        <Stack gap={1}>
          <CustomRichText field={data.description_rt} />
        </Stack>

        <Stack>
          <T variant="caption">Props</T>
          {mixinGroups.map((mixin) => (
            <React.Fragment key={mixin.uid}>
              <T key={mixin.data.name} color="palette.text.secondary">
                <Link href={`/mixins/${mixin.uid}`}>[{mixin.data.name}]</Link>
              </T>
              {mixin.data.props.map((prop) => {
                const thisProp = allProps.find((p) => p.uid === prop.prop.uid);

                return (
                  thisProp && (
                    <Stack
                      key={thisProp.uid}
                      flexDirection="row"
                      alignItems="center"
                      gap={0.5}
                    >
                      <IconArrowReturnRight />

                      <T>
                        <Link href={`/props/${thisProp.uid}`}>
                          {thisProp.data.name}
                        </Link>
                      </T>
                    </Stack>
                  )
                );
              })}
            </React.Fragment>
          ))}
          {props.map(
            (prop) =>
              prop && (
                <T key={prop.uid}>
                  <Link href={`/props/${prop.uid}`}>{prop.data.name}</Link>
                </T>
              )
          )}
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
  const navBarData = {
    components: allComponents,
    mixinGroups: allMixinGroups,
  };
  return {
    props: { data: component.data, allProps, props, mixinGroups, navBarData }, // will be passed to the page component as props
  };
}

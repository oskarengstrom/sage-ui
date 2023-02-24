import Layout from "@/components/Layout";
import { createClient } from "@/prismic-configuration";
import CustomRichText from "@/utils/CustomRichText";
import styled from "@emotion/styled";
import { Stack, Typography, Test } from "@oskarengstrom/sage-ui";

export default function Home({ navBarData, homepage }) {
  // console.log(homepage);
  return (
    <Layout data={navBarData}>
      <Stack gap={1}>
        <CustomRichText field={homepage.data.text_rt} />

        <Test>asdf</Test>
      </Stack>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const client = createClient();
  const homepage = await client.getSingle("homepage");
  const allComponents = await client.getAllByType("component");
  const allMixinGroups = await client.getAllByType("mixin_group");
  const allUtilities = await client.getAllByType("utility");
  const navBarData = {
    components: allComponents,
    mixinGroups: allMixinGroups,
    utilities: allUtilities,
  };
  return {
    props: { navBarData, homepage }, // will be passed to the page component as props
  };
}

import Layout from "@/components/Layout";
import { createClient } from "@/prismic-configuration";
import { Typography, Grid } from "@oskarengstrom/sage-ui";

export default function Home({ navBarData }) {
  return (
    <Layout data={navBarData}>
      <Typography>Home</Typography>
      <Grid
        gridTemplateAreas={[
          "'. . a a' 'b b a a' 'b b . .' ",
          "'a a a a' 'b b b b' '. . . .' ",
        ]}
        gridTemplateRows="50px 50px 50px"
        gridTemplateColumns="1fr 1fr 1fr"
      >
        <Grid.Item gridArea={"a"} backgroundColor="palette.primary.main">
          asdf
        </Grid.Item>
        <Grid.Item gridArea={"b"} backgroundColor="palette.text.primary">
          asdf
        </Grid.Item>
        {/* <Grid.Item>asdf</Grid.Item> */}
      </Grid>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const client = createClient();
  const allComponents = await client.getAllByType("component");
  const allMixinGroups = await client.getAllByType("mixin_group");
  const allUtilities = await client.getAllByType("utility");
  const navBarData = {
    components: allComponents,
    mixinGroups: allMixinGroups,
    utilities: allUtilities,
  };
  return {
    props: { navBarData }, // will be passed to the page component as props
  };
}

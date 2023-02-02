import Layout from "@/components/Layout";
import { createClient } from "@/prismic-configuration";
import { Typography } from "@oskarengstrom/sage-ui";

// import { Inter } from "@next/font/google";
// const inter = Inter({ subsets: ["latin"] });

export default function Home({ navBarData }) {
  return (
    <Layout data={navBarData}>
      <Typography>Home</Typography>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const client = createClient();
//   const result = await client.getAllByType("component");
//   const paths = result.map((item) => ({
//     params: { uid: item.uid },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// }

export async function getStaticProps({ params }) {
  const client = createClient();
  const allComponents = await client.getAllByType("component");
  const allProps = await client.getAllByType("prop");
  const allMixinGroups = await client.getAllByType("mixin_group");
  const navBarData = {
    components: allComponents,
    props: allProps,
    mixinGroups: allMixinGroups,
  };
  return {
    props: { navBarData }, // will be passed to the page component as props
  };
}

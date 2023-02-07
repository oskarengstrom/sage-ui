import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import sm from "./sm.json";

export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

export const linkResolver = (doc) => {
  if (doc.link_type !== "Media" && doc.link_type !== "Any") {
    switch (doc.type) {
      case "homepage":
        return `/`;
      case "component":
        return `/components/${doc.uid}`;
      case "input":
        return `/inputs/${doc.uid}`;
      case "mixin_group":
        return `/mixins/${doc.uid}`;
      case "prop":
        return `/props/${doc.uid}`;
      case "utility":
        return `/utilities/${doc.uid}`;
      default:
        return `/${doc.uid}`;
    }
  }

  return null;
};

export const createClient = (config = {}) => {
  const client = prismic.createClient(sm.apiEndpoint, {
    ...config,
  });

  // prismicNext.enableAutoPreviews({
  //   client,
  //   previewData: config.previewData,
  //   req: config.req,
  // });

  return client;
};

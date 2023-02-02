import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import sm from "./sm.json";

export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

// export const linkResolver = (doc) => {

//   if (doc.link_type === 'Document') {
//     switch (doc.type) {
//       case 'page': {
//         return `/${doc.uid}`
//       }
//       case 'homepage': {
//         return `/`
//       }

//       default: {
//         return `/${doc.uid}`
//       }
//     }
//   }

//   else if (doc.link_type === 'Web') {
//     return doc.url
//   }

//   else if (doc.link_type === 'Media') {
//     return '/MEDIA'
//   }

//   else if (doc.link_type === 'Any') {
//     return null;
//   }

//   return '';
// }

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

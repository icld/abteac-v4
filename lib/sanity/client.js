const sanityClient = require('@sanity/client');
export const client = sanityClient({
  // projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  projectId: '5w8z38n9',
  dataset: 'production',
  apiVersion: '2021-08-29',
  //   token: 'sanity-auth-token', // or leave commented out to be anonymous user
  useCdn: true, // `false` if you want to ensure fresh data
});

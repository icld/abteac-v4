// web/lib/sanity/merchQuery.js

//protip: we install sanity's groq package
//for syntax highlighting and the ability to run
//groq queries within VScode
//read more at https://www.npmjs.com/package/groq
import groq from 'groq';

export const merchItemQuery = groq`
*[_type=="merch"&& slug.current == $slug][0] {
    name,
    description,
    price,
    "slug": slug.current,
    "id": _id,
    "image": image.asset->url,
    images[]{
      asset->{url}
    },
    currency
  }`;

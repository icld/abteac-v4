import groq from 'groq';

export const homeQuery = groq`
  *[_type == "post"] {
    _id,
    title,
    description,
    "authName": author->name,
    "authImg": author->image,
    publishedAt,
    "slug": slug.current,
    "categories": category[]->{title, slug},
    "images": images[],
    mainImage,
    readingTime,
    body,
  }
`;

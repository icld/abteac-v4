import { client } from '../../lib/sanity/client';
import { merchQuery } from '../../lib/sanity/merchQuery';
import { merchItemQuery } from '../../lib/sanity/merchItemQuery';
import groq from 'groq';
import Product from '../../components/Product';

export default function Item({ post }) {
  console.log(post);
  return (
    <div>
      <Product post={post} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  let slug;
  const post = await client.fetch(merchItemQuery, {
    slug: params.slug,
  });

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "merch" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

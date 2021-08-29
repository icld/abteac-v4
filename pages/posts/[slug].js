import Link from 'next/link';
import groq from 'groq';
import BlockContent from '@sanity/block-content-to-react';
import { client } from '../../lib/sanity/client';
import urlFor from '../../lib/sanity/urlFor';
import { postQuery } from '../../lib/sanity/postQuery';
import SimpleNav from '../../components/SimpleNav';

export default function Post({ post }) {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* <SimpleNav /> */}
      <div className='relative bg-white '>
        <div className='lg:absolute lg:inset-0'>
          <div className='lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2'>
            <img
              className='h-56 w-full object-cover lg:absolute lg:h-full'
              src={urlFor(post?.mainImage)}
              alt=''
            />
          </div>
        </div>
        <div className='relative pt-12 pb-16 px-4 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2'>
          <div className='lg:col-start-2 lg:pl-8'>
            <div className='text-base max-w-prose mx-auto lg:max-w-lg lg:ml-auto lg:mr-0'>
              <h2 className='leading-6 text-red-800 font-semibold tracking-wide uppercase'>
                Article
              </h2>
              <h3 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
                {post?.title}
              </h3>
              <p>{post?.publishedAt}</p>
              <p className='mt-8 text-lg text-gray-500'>{post.description}</p>
              <div className='mt-5 prose prose-indigo text-gray-500'>
                <p>
                  <BlockContent blocks={post?.body} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  let slug;
  const post = await client.fetch(postQuery, {
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
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

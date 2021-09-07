import Link from 'next/link';
import groq from 'groq';
import BlockContent from '@sanity/block-content-to-react';
import { client } from '../../lib/sanity/client';
import urlFor from '../../lib/sanity/urlFor';
import { postQuery } from '../../lib/sanity/postQuery';
import SimpleNav from '../../components/SimpleNav';
import Image from 'next/image';

export default function Post({ post }) {
  return (
    <div className='px-4 pt-6 mx-auto md:pt-8 lg:pt-16 max-w-7xl sm:px-6 lg:px-8'>
      {/* <SimpleNav /> */}
      <div className='relative bg-white '>
        <div className=' lg:absolute lg:inset-0'>
          <div className=' aspect-w-16 aspect-h-4 md:aspect-h-2 lg:aspect-none lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2'>
            <Image
              className='object-cover lg:absolute lg:h-full'
              src={`${urlFor(post?.mainImage).url()}`}
              layout='fill'
              alt=''
            />
          </div>
        </div>
        <div className='relative px-4 pt-6 lg:pt-0 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2'>
          <div className='lg:col-start-2 lg:pl-8'>
            <div className='mx-auto text-base max-w-prose lg:max-w-lg lg:ml-auto lg:mr-0'>
              <h2 className='font-semibold leading-6 tracking-wide text-red-800 uppercase'>
                Article
              </h2>
              <h3 className='mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
                {post?.title}
              </h3>
              <p>{post?.publishedAt}</p>
              <p className='mt-8 text-lg text-gray-500'>{post.description}</p>
              <div className='mt-5 prose text-gray-500 prose-indigo'>
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

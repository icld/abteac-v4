import Link from 'next/link';
import { client } from '../lib/sanity/client';
import { homeQuery } from '../lib/sanity/homeQuery';
import groq from 'groq';

import urlFor from '../lib/sanity/urlFor';

export default function Example({ posts }) {
  return (
    <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <div className='relative top-0 h-full px-4 pt-16 pb-20 bg-gray-50 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8'>
        <div className='absolute inset-0'>
          <div className='bg-white h-1/3 sm:h-2/3' />
        </div>
        <div className='relative mx-auto max-w-7xl'>
          <div className='text-center'>
            <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
              A Blog to End All Confusion
            </h2>
            <p className='max-w-2xl mx-auto mt-3 text-xl text-gray-500 sm:mt-4'>
              Gibberish for your achey bones
            </p>
          </div>
          <div className='grid max-w-lg gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none'>
            {posts.map((post) => (
              <div
                key={post.title}
                className='flex flex-col overflow-hidden rounded-lg shadow-lg'
              >
                <div className='flex-shrink-0'>
                  <img
                    className='object-cover w-full h-48'
                    src={urlFor(post.mainImage)}
                    alt={post.title}
                  />
                </div>
                <div className='flex flex-col justify-between flex-1 p-6 bg-white'>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-indigo-600'>
                      <a href='' className='hover:underline'>
                        {post.categories}
                      </a>
                    </p>
                    <a href={`/posts/${post.slug}`} className='block mt-2'>
                      <p className='text-xl font-semibold text-gray-900'>
                        {post.title}
                      </p>
                      <p className='mt-3 text-base text-gray-500'>
                        {post.description}
                      </p>
                    </a>
                  </div>
                  <div className='flex items-center mt-6'>
                    <div className='flex-shrink-0'>
                      <a href=''>
                        <span className='sr-only'>{post.author}</span>
                        <img
                          className='w-10 h-10 rounded-full'
                          src={urlFor(post.authImg)}
                          alt=''
                        />
                      </a>
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-gray-900'>
                        <a href='' className='hover:underline'>
                          {post.authName}
                        </a>
                      </p>
                      <div className='flex space-x-1 text-sm text-gray-500'>
                        <time dateTime={post.datetime}>{post.date}</time>
                        <span aria-hidden='true'>&middot;</span>
                        <span>{post.readingTime} read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const posts = await client.fetch(homeQuery);

  return {
    props: {
      posts,
    },
  };
}

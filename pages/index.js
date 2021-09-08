import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { client } from '../lib/sanity/client';
import { homeQuery } from '../lib/sanity/homeQuery';
import Image from 'next/image';

import urlFor from '../lib/sanity/urlFor';

const Home = ({ posts }) => {
  const [mappedPosts, setMappedPosts] = useState([]);

  return (
    <>
      <Head>
        <title>abteac</title>
        <meta
          name='description'
          content='An amazing blog to end all of your confusion'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
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

            {/* posts */}

            <div className='grid max-w-lg gap-6 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none'>
              {posts.map((post, i) => {
                return (
                  <div
                    key={i}
                    className='flex flex-col overflow-hidden rounded-lg shadow-lg '
                  >
                    <div className=''>
                      <div className='flex-shrink-0 aspect-h-2 aspect-w-3'>
                        <Image
                          src={`${urlFor(post.mainImage)
                            .width(500)
                            .height(650)}`}
                          layout='fill'
                          quality={100}
                          priority='true'
                          objectFit='cover'
                          alt={post.title}
                        />
                      </div>
                    </div>

                    <Link href={`/posts/${post.slug}`} className='group'>
                      <a className='flex items-center justify-center h-full group'>
                        <div className='flex flex-col justify-between flex-1 min-h-full px-5 py-4 m-auto transition-colors duration-500 bg-white group-hover:bg-gray-300'>
                          <div className='flex-1'>
                            {/* title and description */}

                            <p className='text-lg font-semibold text-gray-900 transition-colors duration-500 group-hover:text-white'>
                              {post.title}
                            </p>
                            <p className='mt-1 text-base text-gray-500'>
                              {post.description}
                            </p>
                          </div>

                          {/* author */}
                          <div className='flex items-center mt-6'>
                            <div className='flex-shrink-0'>
                              <span className='sr-only'>{post.author}</span>
                              <div className='w-10'>
                                <Image
                                  className='rounded-full'
                                  src={`${urlFor(post.authImg)
                                    .width(40)
                                    .height(40)
                                    .url()}`}
                                  layout='responsive'
                                  width={40}
                                  height={40}
                                  objectFit='cover'
                                  alt='Author headshots'
                                />
                              </div>
                            </div>
                            <div className='ml-3'>
                              <div className='text-sm font-medium text-gray-900'>
                                <div className='hover:underline'>
                                  {post.authName}
                                </div>
                              </div>
                              <div className='flex space-x-1 text-sm text-gray-500'>
                                <time dateTime={post.datetime}>
                                  {post.date}
                                </time>
                                <span aria-hidden='true'>&middot;</span>
                                <span>{post.readingTime} read</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ params }) {
  const posts = await client.fetch(homeQuery);

  return {
    props: {
      posts,
    },
  };
}

export default Home;

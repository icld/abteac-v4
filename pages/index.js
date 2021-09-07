import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { client } from '../lib/sanity/client';
import { homeQuery } from '../lib/sanity/homeQuery';
import groq from 'groq';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';

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
            <div className='grid max-w-lg gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none'>
              {posts.map((post) => {
                return (
                  <div
                    key={post.title}
                    className='flex flex-col overflow-hidden rounded-lg shadow-lg'
                  >
                    <div className=''>
                      <div className='flex-shrink-0 aspect-h-1 aspect-w-2'>
                        <Image
                          src={`${urlFor(post.mainImage)
                            .width(700)
                            .height(500)
                            .url()}`}
                          layout='fill'
                          // quality={10}
                          objectFit='cover'
                          alt={post.title}
                        />
                      </div>
                    </div>
                    <div className='flex flex-col justify-between flex-1 p-6 bg-white'>
                      <div className='flex-1'>
                        <p className='text-sm font-medium text-indigo-600'>
                          <a href='' className='hover:underline'>
                            {post.categories}
                          </a>
                        </p>
                        <Link href={`/posts/${post.slug}`}>
                          <a className='block mt-2'>
                            <p className='text-xl font-semibold text-gray-900'>
                              {post.title}
                            </p>
                            <p className='mt-3 text-base text-gray-500'>
                              {post.description}
                            </p>
                          </a>
                        </Link>
                      </div>
                      <div className='flex items-center mt-6'>
                        <div className='flex-shrink-0'>
                          <a href=''>
                            <span className='sr-only'>{post.author}</span>
                            <Image
                              className='rounded-full'
                              src={`${urlFor(post.authImg)
                                .width(40)
                                .height(40)
                                .url()}`}
                              width={40}
                              height={40}
                              layout='responsive'
                              alt='Author headshots'
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

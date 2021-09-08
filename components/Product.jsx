import { useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import { RadioGroup } from '@headlessui/react';
import { CurrencyDollarIcon, GlobeIcon } from '@heroicons/react/outline';
import BlockContent from '@sanity/block-content-to-react';
import urlFor from '../lib/sanity/urlFor';
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';
import Image from 'next/image';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example(post) {
  const { addItem, removeItem } = useShoppingCart();

  const product = post.post;
  console.log(product);
  return (
    <div className='bg-white'>
      <div className='pt-6 pb-16 sm:pb-24'>
        <div className='max-w-2xl px-4 mx-auto mt-8 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8'>
            <div className='lg:col-start-8 lg:col-span-5'>
              <div className='flex justify-between'>
                <h1 className='text-xl font-medium text-gray-900'>
                  {product.name}
                </h1>
                <p className='text-xl font-medium text-gray-900'>
                  {formatCurrencyString({
                    value: product.price,
                    currency: 'usd',
                  })}
                </p>
              </div>
            </div>

            {/* Image gallery */}
            <div className='mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3'>
              <h2 className='sr-only'>Images</h2>

              <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-8'>
                <div className='aspect-h-2 aspect-w-2 lg:col-span-2 lg:row-span-2 '>
                  <Image
                    src={`${urlFor(product.image).width(700).height(900)}`}
                    key={product.id}
                    alt={product.id}
                    layout='fill'
                    objectFit='cover'
                    className={classNames('', 'rounded-lg ')}
                  />
                </div>
                {/* {product.images
                  ? product.images.map((image, i) => (
                      <img
                        key={i}
                        alt=''
                        src={urlFor(image.asset.url)}
                        layout='fill'
                        className={classNames('hidden lg:block', 'rounded-lg')}
                      />
                    ))
                  : null}
                {product.images
                  ? product.images.map((image) => (
                      <img
                        key={image.id}
                        src={urlFor(image.image)}
                        alt=''
                        className={classNames(
                          image.primary
                            ? 'lg:col-span-2 lg:row-span-2'
                            : 'hidden lg:block',
                          'rounded-lg'
                        )}
                      />
                    ))
                  : null} */}
              </div>
            </div>

            <div className='mt-8 lg:col-span-5'>
              <div>
                <button
                  onClick={() => {
                    addItem(product);
                  }}
                  // type='submit'
                  className='flex items-center justify-center w-full px-8 py-3 mt-8 text-base font-medium text-white bg-gray-900 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Add to cart
                </button>
              </div>

              {/* Product details */}
              <div className='mt-10'>
                <h2 className='text-sm font-medium text-gray-900'>
                  {product.description}
                </h2>

                <div
                  className='mt-4 prose-sm prose text-gray-500'
                  dangerouslySetInnerHTML={{
                    __html: '',
                  }}
                />
                <BlockContent blocks={product.body}> </BlockContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

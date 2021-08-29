import { useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import { RadioGroup } from '@headlessui/react';
import { CurrencyDollarIcon, GlobeIcon } from '@heroicons/react/outline';
import BlockContent from '@sanity/block-content-to-react';
import urlFor from '../lib/sanity/urlFor';
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';

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
        <nav
          aria-label='Breadcrumb'
          className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'
        >
          <button onClick={() => addItem(product)}>try this</button>
          {/* <ol role='list' className='flex items-center space-x-4'>
            {post.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className='flex items-center'>
                  <a
                    href={breadcrumb.href}
                    className='mr-4 text-sm font-medium text-gray-900'
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    viewBox='0 0 6 20'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                    className='w-auto h-5 text-gray-300'
                  >
                    <path
                      d='M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z'
                      fill='currentColor'
                    />
                  </svg>
                </div>
              </li>
            ))}
            <li className='text-sm'>
              <a
                href={product.href}
                aria-current='page'
                className='font-medium text-gray-500 hover:text-gray-600'
              >
                {post.title}
              </a>
            </li>
          </ol> */}
        </nav>
        <div className='max-w-2xl px-4 mx-auto mt-8 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8'>
            <div className='lg:col-start-8 lg:col-span-5'>
              <div className='flex justify-between'>
                <h1 className='text-xl font-medium text-gray-900'>
                  {/* {product.post.name} */}
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

              <div className='grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8'>
                <img
                key={product.id}
                  alt={product.id}
                  className={classNames(
                    'lg:col-span-2 lg:row-span-2',
                    'rounded-lg'
                  )}
                  src={urlFor(product.image)}
                />
                {product.images.map((image) => (
                  <img
                    src={urlFor(image.asset.url)}
                    className={classNames('hidden lg:block', 'rounded-lg')}
                  />
                ))}
                {/* <img>{urlFor(post.mainImage)}</img> */}
                {/* {post.images.map((image) => (
                  <img
                    key={image.id}
                    src={post.image}
                    alt={image.imageAlt}
                    className={classNames(
                      image.primary
                        ? 'lg:col-span-2 lg:row-span-2'
                        : 'hidden lg:block',
                      'rounded-lg'
                    )}
                  />
                ))} */}
              </div>
            </div>

            <div className='mt-8 lg:col-span-5'>
              <div>
                {/* Color picker
                <div>
                  <h2 className="text-sm font-medium text-gray-900">Color</h2>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-2"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {product.colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedColor,
                              active && checked ? 'ring ring-offset-1' : '',
                              !active && checked ? 'ring-2' : '',
                              '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                            )
                          }
                        >
                          <RadioGroup.Label as="p" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.bgColor,
                              'h-8 w-8 border border-black border-opacity-10 rounded-full'
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div> */}
                {/* Size picker */}
                {/* <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">Size</h2>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      See sizing chart
                    </a>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-2"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {product.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          className={({ active, checked }) =>
                            classNames(
                              size.inStock
                                ? 'cursor-pointer focus:outline-none'
                                : 'opacity-25 cursor-not-allowed',
                              active
                                ? 'ring-2 ring-offset-2 ring-indigo-500'
                                : '',
                              checked
                                ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                                : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                              'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                            )
                          }
                          disabled={!size.inStock}
                        >
                          <RadioGroup.Label as="p">
                            {size.name}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div> */}
                <button
                  onClick={() => {
                    addItem(product);
                  }}
                  // type='submit'
                  className='flex items-center justify-center w-full px-8 py-3 mt-8 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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

              <div className='pt-8 mt-8 border-t border-gray-200'>
                <h2 className='text-sm font-medium text-gray-900'>
                  Ingredients
                </h2>

                {/* <div className='mt-4 prose-sm prose text-gray-500'>
                  <ul role='list'>
                    {product.details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div> */}
              </div>

              {/* Policies */}
              {/* <section aria-labelledby='policies-heading' className='mt-10'>
                <h2 id='policies-heading' className='sr-only'>
                  Our Policies
                </h2>

                <dl className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
                  {policies.map((policy) => (
                    <div
                      key={policy.name}
                      className='p-6 text-center border border-gray-200 rounded-lg bg-gray-50'
                    >
                      <dt>
                        <policy.icon
                          className='flex-shrink-0 w-6 h-6 mx-auto text-gray-400'
                          aria-hidden='true'
                        />
                        <span className='mt-4 text-sm font-medium text-gray-900'>
                          {policy.name}
                        </span>
                      </dt>
                      <dd className='mt-1 text-sm text-gray-500'>
                        {policy.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

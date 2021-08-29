// web/components/Products.js

import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';
import urlFor from '../lib/sanity/urlFor';
import Link from 'next/dist/client/link';

const Products = ({ products }) => {
  const { addItem, removeItem } = useShoppingCart();
  // console.log(
  //   products.map((prod) => {
  //     console.log(prod);
  //   })
  // );
  return (
    <section>
      {/* {products.map((product) => (
        <div key={product.id}>
          <img src={urlFor(product.image).width(200)} alt={product.name} />
          <h2>{product.name}</h2>
          <p>
            {formatCurrencyString({
              value: product.price,
              currency: 'usd',
            })}
          </p>
          <button onClick={() => addItem(product)}>Add to cart</button>
          <button onClick={() => removeItem(product.id)}>Remove</button>
        </div>
      ))} */}
      <div className='bg-white'>
        <div className='max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
            Aint it Beautiful?
          </h2>

          <div className='grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
            {products.map((product) => (
              <div key={product.id} className='relative group'>
                <div className='w-full overflow-hidden bg-gray-200 rounded-md min-h-80 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:h-80 lg:aspect-none'>
                  <img
                    src={urlFor(product.image)}
                    alt={product.imageAlt}
                    className='object-cover object-center w-full h-full lg:w-full lg:h-full'
                  />
                </div>
                <div className='flex justify-between mt-4'>
                  <div>
                    <h3 className='text-sm text-gray-700'>
                      <Link href={`/shop/${product.slug}`}>
                        <a>
                          <span
                            aria-hidden='true'
                            className='absolute inset-0'
                          />
                          {product.name}
                        </a>
                      </Link>
                    </h3>
                    <p className='mt-1 text-sm text-gray-500'>
                      {product.color}
                    </p>
                  </div>
                  <p className='text-sm font-medium text-gray-900'>
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;

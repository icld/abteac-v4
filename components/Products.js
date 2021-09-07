import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';
import urlFor from '../lib/sanity/urlFor';
import Link from 'next/dist/client/link';
import Image from 'next/image';

const Products = ({ products }) => {
  const { addItem, removeItem } = useShoppingCart();
  // console.log(
  //   products.map((prod) => {
  //     console.log(prod);
  //   })
  // );
  return (
    <section>
      <div className='bg-white'>
        <div className='max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
            Aint it Beautiful?
          </h2>

          <div className='grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
            {products.map((product) => (
              <div key={product.id} className='relative group'>
                <div className='overflow-hidden bg-gray-200 rounded-md aspect-w-1 aspect-h-1 group-hover:opacity-75'>
                  <Image
                    src={`${urlFor(product.image).url()}`}
                    layout='fill'
                    quality={20}
                    objectFit='cover'
                    alt={product.imageAlt}
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

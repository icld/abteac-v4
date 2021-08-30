import { Fragment } from 'react';
import { SearchIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import { Popover, Transition } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { fetchPostJSON } from '../utils/apiHelpers';
import urlFor from '../lib/sanity/urlFor';
import { useRouter } from 'next/router';

export default function CartPopDown() {
  const router = useRouter();
  const { addItem, removeItem, incrementItem } = useShoppingCart();
  //setting up some React states for our cart
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const [products, setProducts] = useState([]);
  // destructuring all the building blocks we get from use-shopping-cart
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
  } = useShoppingCart();

  console.log(cartCount);

  let prods = [cartDetails];
  //   console.log(prods);

  //sets our cartEmpty state with cart data
  useEffect(() => setCartEmpty(!cartCount), [cartCount]);
  useEffect(() => setProducts(Object.entries(cartDetails)), [cartDetails]);

  const handleCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);
    //send the cart data to our serverless API
    const response = await fetchPostJSON(
      '/api/checkout_sessions/cart',
      cartDetails
    );

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }
    //if nothing went wrong, sends user to Stripe checkout
    redirectToCheckout({ sessionId: response.id });
  };

  return (
    <div>
      <Popover className='flow-root ml-4 text-sm lg:relative lg:ml-8'>
        <Popover.Button className='flex items-center p-2 -m-2 group'>
          <ShoppingBagIcon
            className='flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500'
            aria-hidden='true'
          />
          <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
            {cartCount}
          </span>
          <span className='sr-only'>items in cart, view bag</span>
        </Popover.Button>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Popover.Panel className='absolute top-16 inset-x-0 mt-px pb-6 bg-white shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5 z-10'>
            <h2 className='sr-only'>Shopping Cart</h2>

            <div className='max-w-2xl px-4 mx-auto'>
              <ul role='list' className='divide-y divide-gray-200'>
                {/* { (
                  {prods[0][`3db27898-64a5-4c56-a763-7360721fa0db`] ? <li> itsreal </li> :}
                  <li>
                   
                    {.name}
                  </li>
                ) : null} */}

                {console.log(Object.entries(prods[0]))}
                {cartEmpty === false
                  ? products.map((p, i) => (
                      <li
                        key={i}
                        className='flex items-center py-6 cursor-pointer'
                        onClick={() => router.push(`/shop/${p[1].slug}`)}
                      >
                        {' '}
                        <img
                          src={urlFor(p[1].image)}
                          alt=''
                          className='flex-none w-16 h-16 border border-gray-200 rounded-md'
                        />{' '}
                        <div className='flex-auto ml-4'>
                          <h3 className='font-medium text-gray-900'>
                            {p[1].name}
                          </h3>
                          <p className='text-gray-500'>x{p[1].quantity}</p>
                          <p className='text-gray-700'>{p[1].formattedValue}</p>

                          <button
                            onClick={() => incrementItem(p[0], { count: -1 })}
                          >
                            -
                          </button>
                          {'             '}
                          <button
                            onClick={() => incrementItem(p[0], { count: 1 })}
                          >
                            +
                          </button>
                          <button onClick={() => removeItem(p[0])}>x</button>
                        </div>
                      </li>
                    ))
                  : null}

                {/* {cartCount > 0
                  ? cartDetails.keys.map((product) => (
                      <li key={product.id} className='flex items-center py-6'>
                        <img
                          src={urlFor(product.image)}
                          alt=''
                          className='flex-none w-16 h-16 border border-gray-200 rounded-md'
                        />
                        <div className='flex-auto ml-4'>
                          <h3 className='font-medium text-gray-900'>
                            <a href=''>{product.name}</a>
                          </h3>
                          <p className='text-gray-500'></p>
                        </div>
                      </li>
                    ))
                  : null} */}
              </ul>

              <button
                type='submit'
                className='w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500'
              >
                Checkout
              </button>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}

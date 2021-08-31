import { Fragment } from 'react';
import { SearchIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import { Popover, Transition } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { fetchPostJSON } from '../utils/apiHelpers';
import urlFor from '../lib/sanity/urlFor';
import { useRouter } from 'next/router';
import { HiOutlinePlus, HiOutlineMinus, HiOutlineX } from 'react-icons/hi';

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

  let prods = [cartDetails];

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

                {cartEmpty === false ? (
                  products.map((p, i) => (
                    <li key={i} className='flex flex-row py-6 cursor-pointer '>
                      <div
                        className='flex items-center flex-auto w-1/2 group'
                        onClick={() => router.push(`/shop/${p[1].slug}`)}
                      >
                        <img
                          src={urlFor(p[1].image)}
                          alt=''
                          className='flex-none w-16 h-16 border border-gray-200 rounded-md group:hover:w-20'
                        />{' '}
                        <div className='flex ml-4'>
                          <div className='w-4/5'>
                            <h3 className='font-medium text-gray-900'>
                              {p[1].name}
                            </h3>
                            {/* <p className='text-gray-500'>x{p[1].quantity}</p> */}
                            <p className='text-gray-700'>
                              {p[1].formattedValue}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col items-center justify-center w-2/6'>
                        <div div className='flex flex-row w-full mb-1'>
                          <button
                            className='flex items-center justify-center w-1/2 border-2 border-gray-700 rounded-md shadow-sm hover:bg-red-100 group text-md'
                            onClick={() => removeItem(p[0])}
                          >
                            {' '}
                            <HiOutlineX className='text-2xl group-hover:text-red-700' />
                          </button>
                          <div className='w-1/2 ml-1 text-lg text-center text-pink-700 align-middle border-2 border-gray-700 rounded-md shadow-sm text-md'>
                            {p[1].quantity}
                          </div>
                        </div>
                        <div className='flex flex-row w-full'>
                          <button
                            className='flex items-center justify-center w-1/2 text-center border-2 border-gray-700 rounded-md shadow-sm text-md'
                            onClick={() => incrementItem(p[0], { count: -1 })}
                          >
                            <HiOutlineMinus className='text-2xl hover:text-red-700' />
                          </button>
                          <button
                            className='flex items-center justify-center w-1/2 ml-1 border-2 border-gray-700 rounded-md shadow-sm text-md'
                            onClick={() => incrementItem(p[0], { count: 1 })}
                          >
                            <HiOutlinePlus className='text-2xl hover:text-red-700' />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <h1
                    onClick={() => router.push('/shop')}
                    className='w-full m-1 text-2xl text-center cursor-pointer hover:text-red-800'
                  >
                    No Items In Your Cart
                  </h1>
                )}
              </ul>

              <div className='flex '>
                <button
                  disabled={cartEmpty}
                  onClick={(e) => handleCheckout(e)}
                  className='w-4/6 px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm disabled:cursor-not-allowed disabled:opacity-60 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-800'
                >
                  Checkout
                </button>
                <div className='flex flex-col items-center flex-auto w-2/6 p-1 ml-1 border-2 border-gray-700 rounded-md shadow-sm text-md'>
                  Total: <b />
                  {formattedTotalPrice}{' '}
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}

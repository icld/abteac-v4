/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { GiForearm } from 'react-icons/gi';
import { useRouter } from 'next/router';
import CartPopDown from './CartDropDown';

import Link from 'next/link';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const SimpleNav = () => {
  const router = useRouter();
  return (
    <Disclosure as='nav' className='bg-white shadow'>
      {({ open }) => (
        <>
          <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div className='flex justify-between h-16'>
              <div className='flex'>
                <div className='flex items-center flex-shrink-0'>
                  <Link href='/'>
                    <a>
                      <GiForearm className='block w-auto h-8 lg:hidden hover:text-red-800' />
                    </a>
                  </Link>
                  <Link href='/'>
                    <a>
                      <GiForearm
                        className='hidden w-auto h-8 lg:block hover:text-red-800'
                        onClick={() => router.push('/')}
                      />
                    </a>
                  </Link>
                </div>
                <div className='flex ml-4 space-x-4 md:space-x-8'>
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <Link href='/'>
                    <a
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900  active:text-yellow-300 ${
                        router.pathname == '/'
                          ? `text-yellow-600 border-b-2`
                          : `hover:border-gray-300 hover:text-gray-700`
                      } `}
                    >
                      Blog
                    </a>
                  </Link>
                  <Link href='/shop'>
                    <a
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900  active:text-yellow-300 ${
                        router.pathname == '/shop'
                          ? `text-yellow-600 border-b-2`
                          : `hover:border-gray-300 hover:text-gray-700`
                      } `}
                    >
                      Shop
                    </a>
                  </Link>
                </div>
              </div>
              <div className='flex items-center ml-6'>
                {/* Cart Pop Down */}
                <CartPopDown />
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default SimpleNav;

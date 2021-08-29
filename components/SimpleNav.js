/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { GiForearm } from 'react-icons/gi';
import { useRouter } from 'next/router';
import Link from 'next/link';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const router = useRouter();
  return (
    <Disclosure as='nav' className='bg-white shadow'>
      {({ open }) => (
        <>
          <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div className='flex justify-between h-16'>
              <div className='flex'>
                <div className='flex items-center flex-shrink-0'>
                  <GiForearm
                    className='block w-auto h-8 lg:hidden hover:text-red-800'
                    onClick={() => router.push('/')}
                  />
                  <GiForearm
                    className='hidden w-auto h-8 lg:block hover:text-red-800'
                    onClick={() => router.push('/')}
                  />
                </div>
                <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <Link href='/'>
                    <a className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 active:text-yellow-300'>
                      Blog
                    </a>
                  </Link>
                  <Link href='/shop'>
                    <a
                      // href='/shop'
                      className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700 active:text-gray-700'
                    >
                      Shop
                    </a>
                  </Link>
                </div>
              </div>
              <div className='hidden sm:ml-6 sm:flex sm:items-center'>
                <button
                  type='button'
                  className='p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  <span className='sr-only'>View notifications</span>
                </button>

                {/* Profile dropdown */}
                {/* <Menu as='div' className='relative ml-3'>
                  <div>
                    <Menu.Button className='flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='w-8 h-8 rounded-full'
                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt=''
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu> */}
              </div>
              <div className='flex items-center -mr-2 sm:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-800'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block w-6 h-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block w-6 h-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='pt-2 pb-3 space-y-1'>
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Link href='/'>
                <a className='block py-2 pl-3 pr-4 text-base font-medium text-red-700 border-l-4 border-red-500 bg-indigo-50'>
                  Blog
                </a>
              </Link>
              <Link href='/shop'>
                <a className='block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'>
                  Shop
                </a>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

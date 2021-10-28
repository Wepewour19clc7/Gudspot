import React, { Fragment } from 'react'
import SearchBar from '../SearchBar'
import { BellIcon, MenuAlt2Icon } from '@heroicons/react/outline'
import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

const HeaderApp = () => {
  return (
    <div className='relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex'>
      <button
        type='button'
        className='border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
        onClick={() => {
          //  @TODO: Set sidebar open and close action in this icon
        }}
      >
        <span className='sr-only'>Open sidebar</span>
        <MenuAlt2Icon className='h-6 w-6' aria-hidden='true' />
      </button>
      <div className='flex-1 flex justify-between px-4 md:px-0'>
        <div className='flex-1 flex'>
          <SearchBar/>
        </div>
        <div className='ml-4 flex items-center md:ml-6'>
          <button
            type='button'
            className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            <span className='sr-only'>View notifications</span>
            <BellIcon className='h-6 w-6' aria-hidden='true' />
          </button>

          {/* Profile dropdown */}
          <Menu as='div' className='ml-3 relative'>
            <div>
              <Menu.Button
                className='max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                <span className='sr-only'>Open user menu</span>
                <img
                  className='h-8 w-8 rounded-full'
                  src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  alt=''
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items
                className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none'>
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={clsx(active ? 'bg-gray-100' : '', 'block py-2 px-4 text-sm text-gray-700')}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default HeaderApp
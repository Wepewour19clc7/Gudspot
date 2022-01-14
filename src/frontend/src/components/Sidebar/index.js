import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { HomeIcon, UserGroupIcon, XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { BiStoreAlt } from 'react-icons/all'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { getFullToken, getToken } from '../../auth'

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: true },
  { name: 'My Store', href: '/store', icon: BiStoreAlt, current: false, auth: true, owner: true},
  { name: 'My Profile', href: '/profile', icon: UserGroupIcon, current: false, auth: true },
  { name: 'About Us', href: '/about-us', icon: UserGroupIcon, current: false },
]

const Sidebar = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const getToken = getFullToken()
  console.log(isLoggedIn)
  console.log('side bar')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as='div' className='fixed inset-0 z-40 flex md:hidden' onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 -mr-12 pt-2'>
                  <button
                    type='button'
                    className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex-shrink-0 px-4 flex items-center'>
                <Link to={'/'}>
                  <img
                    className='h-8 w-auto'
                    src='/assets/Logo.svg'
                    alt='Workflow'
                  />
                </Link>
              </div>
              <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                <nav className='px-2 space-y-1'>
                  {navigation.filter((el) => {
                    if(el.auth || el.owner) {
                      return isLoggedIn || el.type === 1
                    } else {
                      return true
                    }
                  }).map((item) => (
                    <Link
                      key={uuidv4()}
                      to={item.href}
                      className={clsx(
                        'block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out',
                        {
                          'bg-gray-50': item.current,
                          'text-gray-900 bg-gray-100': item.current,
                        },
                      )}
                    >
                      <HomeIcon className='mr-2' />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14' />
        </Dialog>
      </Transition.Root>

      <div className='hidden md:flex md:flex-shrink-0'>
        <div className='w-64 flex flex-col'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='border-r border-gray-200 pt-5 pb-4 flex flex-col flex-grow overflow-y-auto'>
            <div className='flex-shrink-0 px-4 flex items-center'>
              <Link to={'/'}>
                <img
                  className='h-8 w-auto'
                  src='/assets/Logo.svg'
                  alt='Workflow'
                />
              </Link>
            </div>
            <div className='flex-grow mt-5 flex flex-col'>
              <nav className='flex-1 bg-white px-2 space-y-1'>
                {navigation.filter((el) => {
                  if(el.auth) {
                    return isLoggedIn
                  } else {
                    return true
                  }
                }).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={clsx(
                      item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group rounded-md py-2 px-2 flex items-center text-sm font-medium',
                    )}
                  >
                    <item.icon
                      className={clsx(
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6',
                      )}
                      aria-hidden='true'
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
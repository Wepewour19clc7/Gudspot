import React, { Fragment, useEffect, useState } from 'react'
import SearchBar from '../SearchBar'
import { BellIcon, MenuAlt2Icon } from '@heroicons/react/outline'
import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Link, useHistory } from 'react-router-dom'
import { deleteToken, getFullToken } from '../../auth'
import { toast } from 'react-toastify'
import { ProfileModel } from '../../pages/Profile/Profile.model'

const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Settings', href: '#' },
]

const HeaderApp = ({ isLogged }) => {
  const [isLoggedState, setIsLoggedState] = React.useState(isLogged)
  const userId = getFullToken().id
  const profileModel = new ProfileModel()
  const [profile, setProfile] = useState({})

  const history = useHistory()
  useEffect(() => {
    profileModel.getUser(userId ).then((res) => {
      console.log('res data profile', res.data)
      setProfile(res.data)
    })
  }, [])
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
          <SearchBar />
        </div>
        {isLoggedState ?
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
                    src={profile.avatar ? profile.avatar : 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'}
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
                        <Link
                          to={item.href}
                          className={clsx(active ? 'bg-gray-100' : '', 'block py-2 px-4 text-sm text-gray-700')}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                  <Menu.Item>
                    {({ active }) => (
                      <div className={'block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 w-full cursor-pointer hover:text-blue-400'} onClick={() => {
                        deleteToken()
                        toast('Logout Successfully')
                        history.push('/login')
                      }}>
                        Sign out
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div> :
          <>
            <div className='ml-2 flex items-center'>
              <Link to={'/login'}>
                <button
                  type='button'
                  className='font-bold inline-flex items-center px-4 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'>
                  Login
                </button>
              </Link>
            </div>
            <div className='ml-2 flex items-center'>
              <Link to={'/register'}>
                <button
                  type='button'
                  className='font-bold inline-flex items-center px-4 py-1.5 border border-transparent text-sm font-medium
                rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'>
                  Signup
                </button>
              </Link>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default HeaderApp
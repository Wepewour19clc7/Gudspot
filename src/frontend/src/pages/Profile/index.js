import { ChevronLeftIcon, LibraryIcon, StarIcon } from '@heroicons/react/solid'
import { Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { getFullToken } from '../../auth'
import { ProfileModel } from './Profile.model'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import Gallery from '../../components/Gallery'

const { TabPane } = Tabs

function callback (key) {
  console.log(key)
}

const profile = {
  name: 'The Pizza Company',
  imageUrl:
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=781&q=80',
  coverImageUrl:
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  about: `
    <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
    <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
  `,
  fields: {
    Phone: '(555) 123-4567',
    Location: 'San Francisco',
    Sits: 'Oasis, 4th floor',
  },
}

const stores = [
  {
    id: 1,
    name: 'NÀNG CUA - NGUYỄN VĂN THỦ',
    rating: 4,
    reviewCount: 38,
    imageSrc: 'https://images.foody.vn/res/g99/987905/prof/s576x330/file_restaurant_photo_5fuf_16017-d6994564-201004101333.jpeg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 1,
    name: 'NÀNG CUA - NGUYỄN VĂN THỦ',
    rating: 4,
    reviewCount: 38,
    imageSrc: 'https://images.foody.vn/res/g99/987905/prof/s576x330/file_restaurant_photo_5fuf_16017-d6994564-201004101333.jpeg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 1,
    name: 'NÀNG CUA - NGUYỄN VĂN THỦ',
    rating: 2,
    reviewCount: 38,
    imageSrc: 'https://images.foody.vn/res/g99/987905/prof/s576x330/file_restaurant_photo_5fuf_16017-d6994564-201004101333.jpeg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 1,
    name: 'NÀNG CUA - NGUYỄN VĂN THỦ',
    rating: 4,
    reviewCount: 100,
    imageSrc: 'https://images.foody.vn/res/g99/987905/prof/s576x330/file_restaurant_photo_5fuf_16017-d6994564-201004101333.jpeg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 1,
    name: 'NÀNG CUA - NGUYỄN VĂN THỦ',
    rating: 3,
    reviewCount: 38,
    imageSrc: 'https://images.foody.vn/res/g99/987905/prof/s576x330/file_restaurant_photo_5fuf_16017-d6994564-201004101333.jpeg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 1,
    name: 'NÀNG CUA - NGUYỄN VĂN THỦ',
    rating: 5,
    reviewCount: 38,
    imageSrc: 'https://images.foody.vn/res/g99/987905/prof/s576x330/file_restaurant_photo_5fuf_16017-d6994564-201004101333.jpeg',
    imageAlt: 'TODO',
    href: '#',
  },
]

export default function Profile () {
  const profileModel = new ProfileModel()
  const [profile, setProfile] = useState({})
  const userId = getFullToken().id

  useEffect(() => {
    profileModel.getUser({ userId }).then((res) => {
      console.log('res data profile', res.data)
      setProfile(res.data)
    })
  }, [])
  return (
    <div className='relative h-screen flex overflow-hidden bg-white'>
      <div className='flex flex-col min-w-0 flex-1 overflow-hidden'>
        <div className='flex-1 relative z-0 flex overflow-hidden'>
          <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last'>
            {/* Breadcrumb */}
            <nav className='flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden' aria-label='Breadcrumb'>
              <a href='#' className='inline-flex items-center space-x-3 text-sm font-medium text-gray-900'>
                <ChevronLeftIcon className='-ml-2 h-5 w-5 text-gray-400' aria-hidden='true' />
                <span>Directory</span>
              </a>
            </nav>

            <article>
              <div>
                <div>
                  <img className='h-32 w-full object-cover lg:h-60'
                       src={'https://images.unsplash.com/photo-1520564816385-4f9d711941aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'}
                       alt='' />
                </div>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <div className='-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
                    <div className='flex'>
                      <img
                        className='h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32'
                        src={'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'}
                        alt=''
                      />
                    </div>
                    <div
                      className='mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
                      <div className='sm:hidden 2xl:block mt-6 min-w-0 flex-1'>
                        <h1 className='text-2xl font-bold text-gray-900 truncate'>hello world</h1>
                      </div>
                      <div
                        className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                        <button
                          type='button'
                          className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                        >
                          <LibraryIcon className='-ml-1 mr-2 h-5 w-5 text-gray-400' aria-hidden='true' />
                          <span>John's Store</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1'>
                    <h1 className='text-2xl font-bold text-gray-900 truncate'>hello world</h1>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className='mt-6 sm:mt-2 2xl:mt-5'>
                <div className='border-b border-gray-200'>
                  <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <nav className='' aria-label='Tabs'>
                      <Tabs defaultActiveKey='1' onChange={callback}>
                        <TabPane tab='About' key='1'>
                          <div className={'w-full'}>
                            {/* Description list */}
                            <div className='mt-6 max-w-7xl'>
                              <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
                                <div className='sm:col-span-1'>
                                  <dt className='text-sm font-medium text-gray-500'>Full name</dt>
                                  <dd className='mt-1 text-sm text-gray-900'>Hello Name</dd>
                                </div>
                                <div className='sm:col-span-1'>
                                  <dt className='text-sm font-medium text-gray-500'>Username</dt>
                                  <dd className='mt-1 text-sm text-gray-900'>datkira</dd>
                                </div>
                                <div className='sm:col-span-1'>
                                  <dt className='text-sm font-medium text-gray-500'>Address</dt>
                                  <dd className='mt-1 text-sm text-gray-900'>227 Nguyen Van Cu</dd>
                                </div>
                                <div className='sm:col-span-1'>
                                  <dt className='text-sm font-medium text-gray-500'>Type</dt>
                                  <dd className='mt-1 text-sm text-gray-900'>Owner</dd>
                                </div>
                                <div className='w-full'>
                                  <dt className='text-sm font-medium text-gray-500'>Description</dt>
                                  <dd
                                    className='mt-1 text-sm text-gray-900 space-y-5'
                                    dangerouslySetInnerHTML={{ __html: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec ante id sem consequat auctor. Suspendisse pellentesque lacus nibh, ac aliquet magna convallis nec. Aliquam vel justo viverra, eleifend dui elementum, venenatis nisi. Vivamus tristique sodales nisl. Aenean porttitor a quam sit amet dignissim. Vivamus egestas libero a venenatis pharetra. Maecenas in nulla dignissim, interdum lectus et, rutrum odio. Donec a suscipit neque. Integer efficitur consequat vulputate. Donec ullamcorper venenatis nunc vitae tristique. Cras viverra congue efficitur. Praesent cursus vestibulum tortor, quis ultrices magna tempus eget.' }}
                                  />
                                </div>
                              </dl>
                            </div>
                          </div>
                        </TabPane>
                        <TabPane tab='Following Stores' key='2'>
                          <div className='max-w-7xl overflow-hidden'>
                            <h2 className='sr-only'>Products</h2>
                            <div
                              className='-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4'>
                              {stores.map((store) => (
                                <div key={uuidv4()}
                                     className='group relative p-4 border-r border-b border-gray-200 sm:p-6'>
                                  <div
                                    className='rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75'>
                                    <img
                                      src={store.imageSrc}
                                      alt={store.imageAlt}
                                      className='w-full h-full object-center object-cover'
                                    />
                                  </div>
                                  <div className='pt-10 pb-4 text-center'>
                                    <h3 className='text-sm font-medium text-gray-900'>
                                      <Link to={`store/${store.id}`}>
                                        <span aria-hidden='true' className='absolute inset-0' />
                                        {store.name}
                                      </Link>
                                    </h3>
                                    <div className='mt-3 flex flex-col items-center'>
                                      <p className='sr-only'>{store.rating} out of 5 stars</p>
                                      <div className='flex items-center'>
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                          <StarIcon
                                            key={rating}
                                            className={clsx(
                                              store.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                              'flex-shrink-0 h-5 w-5',
                                            )}
                                            aria-hidden='true'
                                          />
                                        ))}
                                      </div>
                                      <p className='mt-1 text-sm text-gray-500'>{store.reviewCount} reviews</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabPane>
                        <TabPane tab='Change Information' key='3'>
                          <div className='mt-10 sm:mt-0'>
                            <div className='md:grid md:grid-cols-3 md:gap-6'>
                              <div className='mt-5 md:mt-0 md:col-span-2'>
                                <form action='#' method='POST'>
                                  <div className='shadow overflow-hidden sm:rounded-md'>
                                    <div className='py-5 bg-white'>
                                      <div className='grid grid-cols-6 gap-6'>
                                        <div className='col-span-6 sm:col-span-3'>
                                          <label htmlFor='full-name'
                                                 className='block text-sm font-medium text-gray-700'>
                                            Full name
                                          </label>
                                          <input
                                            type='text'
                                            name='full-name'
                                            id='full-name'
                                            autoComplete='given-name'
                                            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                          />
                                        </div>

                                        <div className='col-span-6 sm:col-span-3'>
                                          <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
                                            Username
                                          </label>
                                          <input
                                            type='text'
                                            name='username'
                                            disabled={true}
                                            id='username'
                                            autoComplete='family-name'
                                            className='bg-gray-200 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                          />
                                        </div>

                                        <div className='col-span-6 sm:col-span-4'>
                                          <label htmlFor='email-address'
                                                 className='block text-sm font-medium text-gray-700'>
                                            Email address
                                          </label>
                                          <input
                                            type='text'
                                            name='email-address'
                                            id='email-address'
                                            autoComplete='email'
                                            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                          />
                                        </div>

                                        <div className='col-span-6'>
                                          <label htmlFor='street-address'
                                                 className='block text-sm font-medium text-gray-700'>
                                            Street address
                                          </label>
                                          <input
                                            type='text'
                                            name='street-address'
                                            id='street-address'
                                            autoComplete='street-address'
                                            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                          />
                                        </div>

                                        <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
                                          <label htmlFor='city' className='block text-sm font-medium text-gray-700'>
                                            City
                                          </label>
                                          <input
                                            type='text'
                                            name='city'
                                            id='city'
                                            autoComplete='address-level2'
                                            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                          />
                                        </div>

                                        <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                                          <label htmlFor='region' className='block text-sm font-medium text-gray-700'>
                                            State / Province
                                          </label>
                                          <input
                                            type='text'
                                            name='region'
                                            id='region'
                                            autoComplete='address-level1'
                                            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                          />
                                        </div>

                                        <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                                          <label htmlFor='postal-code'
                                                 className='block text-sm font-medium text-gray-700'>
                                            ZIP / Postal code
                                          </label>
                                          <input
                                            type='text'
                                            name='postal-code'
                                            id='postal-code'
                                            autoComplete='postal-code'
                                            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                                      <button
                                        type='submit'
                                        className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </TabPane>
                      </Tabs>
                    </nav>
                  </div>
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  )
}
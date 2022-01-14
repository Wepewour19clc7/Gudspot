import { BadgeCheckIcon, HeartIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, StarIcon } from '@heroicons/react/solid'
import Gallery from '../../components/Gallery'
import Blog from '../../components/Blog'
import { Tabs } from 'antd'
import { RegisterFormModel } from '../../containers/RegisterForm/RegisterForm.model'
import { useHistory } from 'react-router-dom'
import { StoreOwnerModel } from './StoreOwner.model'
import { useEffect, useState } from 'react'

const { TabPane } = Tabs

function callback (key) {
  console.log(key)
}

const user = {
  name: 'Tom Cook',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const tabs = [
  { name: 'About store', href: '#', current: true },
  { name: 'Blog', href: '#', current: false },
  { name: 'Reviews', href: '#', current: false },
]
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
const managers = [
  {
    name: 'Leslie Alexander',
    handle: 'lesliealexander',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Michael Foster',
    handle: 'michaelfoster',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Dries Vincent',
    handle: 'driesvincent',
    role: 'Manager, Business Relations',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    handle: 'lindsaywalton',
    role: 'Manager, Business Relations',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function StoreOwner () {
  const storeOwnerModel = new StoreOwnerModel()
  const history = useHistory()
  const store_id = history.location.pathname.split('/')[2]


  const [store, setStore] = useState({})
  useEffect(() => {
    storeOwnerModel.getStore({store_id}).then((res) => {
      console.log('res data', res.data)
      setStore(res.data)
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
                  <img className='h-32 w-full object-cover lg:h-60' src={profile.coverImageUrl} alt='' />
                </div>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <div className='-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
                    <div className='flex'>
                      <img
                        className='h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32'
                        src={profile.imageUrl}
                        alt=''
                      />
                    </div>
                    <div
                      className='mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
                      <div className='sm:hidden 2xl:block mt-6 min-w-0 flex-1'>
                        <h1 className='text-2xl font-bold text-gray-900 truncate'>{profile.name}</h1>
                      </div>
                      <div
                        className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                        <button
                          type='button'
                          className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                        >
                          <BadgeCheckIcon className='-ml-1 mr-2 h-5 w-5 text-gray-400' aria-hidden='true' />
                          <span>Follow</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1'>
                    <h1 className='text-2xl font-bold text-gray-900 truncate'>{profile.name}</h1>
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
                          <div className={"w-full"}>
                            {/* Description list */}
                            <div className='mt-6 max-w-7xl'>
                              <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
                                <div className='sm:col-span-2'>
                                  <dt className='text-sm font-medium text-gray-500'>About</dt>
                                  <dd
                                    className='mt-1 max-w-prose text-sm text-gray-900 space-y-5'
                                    dangerouslySetInnerHTML={{ __html: profile.about }}
                                  />
                                </div>
                                {Object.keys(profile.fields).map((field) => (
                                  <div key={field} className='sm:col-span-1'>
                                    <dt className='text-sm font-medium text-gray-500'>{field}</dt>
                                    <dd className='mt-1 text-sm text-gray-900'>{profile.fields[field]}</dd>
                                  </div>
                                ))}
                              </dl>
                            </div>
                            <div className='mb-3'>
                              <Gallery />
                              <h2 className='text-sm font-medium text-gray-500'>Managers</h2>
                              <div className='mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                {managers.map((person) => (
                                  <div
                                    key={person.handle}
                                    className='relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500'
                                  >
                                    <div className='flex-shrink-0'>
                                      <img className='h-10 w-10 rounded-full' src={person.imageUrl} alt='' />
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                      <a href='#' className='focus:outline-none'>
                                        <span className='absolute inset-0' aria-hidden='true' />
                                        <p className='text-sm font-medium text-gray-900'>{person.name}</p>
                                        <p className='text-sm text-gray-500 truncate'>{person.role}</p>
                                      </a>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TabPane>
                        <TabPane tab='Review' key='2'>
                          {/*REVIEW*/}
                          <div className='mt-8 max-w-7xl mx-auto px-4 pb-12 sm:px-6 lg:px-8'>
                            <section className='bg-white overflow-hidden'>
                              <div className='relative max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8'>
                                <svg
                                  className='absolute top-full left-0 transform translate-x-80 -translate-y-24 lg:hidden'
                                  width={784}
                                  height={404}
                                  fill='none'
                                  viewBox='0 0 784 404'
                                  aria-hidden='true'
                                >
                                  <defs>
                                    <pattern
                                      id='e56e3f81-d9c1-4b83-a3ba-0d0ac8c32f32'
                                      x={0}
                                      y={0}
                                      width={20}
                                      height={20}
                                      patternUnits='userSpaceOnUse'
                                    >
                                      <rect x={0} y={0} width={4} height={4} className='text-gray-200'
                                            fill='currentColor' />
                                    </pattern>
                                  </defs>
                                  <rect width={784} height={404} fill='url(#e56e3f81-d9c1-4b83-a3ba-0d0ac8c32f32)' />
                                </svg>

                                <svg
                                  className='hidden lg:block absolute right-full top-1/2 transform translate-x-1/2 -translate-y-1/2'
                                  width={404}
                                  height={784}
                                  fill='none'
                                  viewBox='0 0 404 784'
                                  aria-hidden='true'
                                >
                                  <defs>
                                    <pattern
                                      id='56409614-3d62-4985-9a10-7ca758a8f4f0'
                                      x={0}
                                      y={0}
                                      width={20}
                                      height={20}
                                      patternUnits='userSpaceOnUse'
                                    >
                                      <rect x={0} y={0} width={4} height={4} className='text-gray-200'
                                            fill='currentColor' />
                                    </pattern>
                                  </defs>
                                  <rect width={404} height={784} fill='url(#56409614-3d62-4985-9a10-7ca758a8f4f0)' />
                                </svg>

                                <div className='relative lg:flex lg:items-center'>
                                  <div className='hidden lg:block lg:flex-shrink-0'>
                                    <img
                                      className='h-64 w-64 rounded-full xl:h-28 xl:w-28'
                                      src='https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                                      alt=''
                                    />
                                  </div>
                                  <div className='relative lg:ml-10'>
                                    <blockquote className='relative'>
                                      <div className='text-xl leading-9 font-medium text-gray-900'>
                                        <p>
                                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita
                                          voluptas culpa
                                          sapiente alias
                                          molestiae. Numquam corrupti in laborum sed rerum et corporis.
                                        </p>
                                        <div className={'flex'}>
                                          {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                              key={rating}
                                              className={classNames(
                                                4 > rating ? 'text-yellow-400' : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0',
                                              )}
                                              aria-hidden='true'
                                            />
                                          ))}
                                        </div>
                                      </div>
                                      <footer className='mt-8'>
                                        <div className='flex'>
                                          <div className='flex-shrink-0 lg:hidden'>
                                            <img
                                              className='h-12 w-12 rounded-full'
                                              src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                              alt=''
                                            />
                                          </div>
                                          <div className='ml-4 lg:ml-0'>
                                            <div className='text-base font-medium text-gray-900'>Judith Black</div>
                                            <div className='text-base font-medium text-indigo-600'>227 Nguyen Van Cu
                                            </div>
                                          </div>
                                        </div>
                                      </footer>
                                    </blockquote>
                                  </div>
                                </div>
                              </div>
                            </section>
                            <section className='bg-white overflow-hidden'>
                              <div className='relative max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8'>
                                <svg
                                  className='absolute top-full left-0 transform translate-x-80 -translate-y-24 lg:hidden'
                                  width={784}
                                  height={404}
                                  fill='none'
                                  viewBox='0 0 784 404'
                                  aria-hidden='true'
                                >
                                  <defs>
                                    <pattern
                                      id='e56e3f81-d9c1-4b83-a3ba-0d0ac8c32f32'
                                      x={0}
                                      y={0}
                                      width={20}
                                      height={20}
                                      patternUnits='userSpaceOnUse'
                                    >
                                      <rect x={0} y={0} width={4} height={4} className='text-gray-200'
                                            fill='currentColor' />
                                    </pattern>
                                  </defs>
                                  <rect width={784} height={404} fill='url(#e56e3f81-d9c1-4b83-a3ba-0d0ac8c32f32)' />
                                </svg>

                                <svg
                                  className='hidden lg:block absolute right-full top-1/2 transform translate-x-1/2 -translate-y-1/2'
                                  width={404}
                                  height={784}
                                  fill='none'
                                  viewBox='0 0 404 784'
                                  aria-hidden='true'
                                >
                                  <defs>
                                    <pattern
                                      id='56409614-3d62-4985-9a10-7ca758a8f4f0'
                                      x={0}
                                      y={0}
                                      width={20}
                                      height={20}
                                      patternUnits='userSpaceOnUse'
                                    >
                                      <rect x={0} y={0} width={4} height={4} className='text-gray-200'
                                            fill='currentColor' />
                                    </pattern>
                                  </defs>
                                  <rect width={404} height={784} fill='url(#56409614-3d62-4985-9a10-7ca758a8f4f0)' />
                                </svg>

                                <div className='relative lg:flex lg:items-center'>
                                  <div className='hidden lg:block lg:flex-shrink-0'>
                                    <img
                                      className='h-64 w-64 rounded-full xl:h-28 xl:w-28'
                                      src='https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                                      alt=''
                                    />
                                  </div>
                                  <div className='relative lg:ml-10'>
                                    <blockquote className='relative'>
                                      <div className='text-xl leading-9 font-medium text-gray-900'>
                                        <p>
                                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita
                                          voluptas culpa
                                          sapiente alias
                                          molestiae. Numquam corrupti in laborum sed rerum et corporis.
                                        </p>
                                        <div className={'flex'}>
                                          {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                              key={rating}
                                              className={classNames(
                                                4 > rating ? 'text-yellow-400' : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0',
                                              )}
                                              aria-hidden='true'
                                            />
                                          ))}
                                        </div>
                                      </div>
                                      <footer className='mt-8'>
                                        <div className='flex'>
                                          <div className='flex-shrink-0 lg:hidden'>
                                            <img
                                              className='h-12 w-12 rounded-full'
                                              src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                              alt=''
                                            />
                                          </div>
                                          <div className='ml-4 lg:ml-0'>
                                            <div className='text-base font-medium text-gray-900'>Judith Black</div>
                                            <div className='text-base font-medium text-indigo-600'>227 Nguyen Van Cu
                                            </div>
                                          </div>
                                        </div>
                                      </footer>
                                    </blockquote>
                                  </div>
                                </div>
                              </div>
                            </section>
                            <section className='bg-white overflow-hidden'>
                              <div className='relative max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8'>
                                <svg
                                  className='absolute top-full left-0 transform translate-x-80 -translate-y-24 lg:hidden'
                                  width={784}
                                  height={404}
                                  fill='none'
                                  viewBox='0 0 784 404'
                                  aria-hidden='true'
                                >
                                  <defs>
                                    <pattern
                                      id='e56e3f81-d9c1-4b83-a3ba-0d0ac8c32f32'
                                      x={0}
                                      y={0}
                                      width={20}
                                      height={20}
                                      patternUnits='userSpaceOnUse'
                                    >
                                      <rect x={0} y={0} width={4} height={4} className='text-gray-200'
                                            fill='currentColor' />
                                    </pattern>
                                  </defs>
                                  <rect width={784} height={404} fill='url(#e56e3f81-d9c1-4b83-a3ba-0d0ac8c32f32)' />
                                </svg>

                                <svg
                                  className='hidden lg:block absolute right-full top-1/2 transform translate-x-1/2 -translate-y-1/2'
                                  width={404}
                                  height={784}
                                  fill='none'
                                  viewBox='0 0 404 784'
                                  aria-hidden='true'
                                >
                                  <defs>
                                    <pattern
                                      id='56409614-3d62-4985-9a10-7ca758a8f4f0'
                                      x={0}
                                      y={0}
                                      width={20}
                                      height={20}
                                      patternUnits='userSpaceOnUse'
                                    >
                                      <rect x={0} y={0} width={4} height={4} className='text-gray-200'
                                            fill='currentColor' />
                                    </pattern>
                                  </defs>
                                  <rect width={404} height={784} fill='url(#56409614-3d62-4985-9a10-7ca758a8f4f0)' />
                                </svg>

                                <div className='relative lg:flex lg:items-center'>
                                  <div className='hidden lg:block lg:flex-shrink-0'>
                                    <img
                                      className='h-64 w-64 rounded-full xl:h-28 xl:w-28'
                                      src='https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                                      alt=''
                                    />
                                  </div>
                                  <div className='relative lg:ml-10'>
                                    <blockquote className='relative'>
                                      <div className='text-xl leading-9 font-medium text-gray-900'>
                                        <p>
                                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita
                                          voluptas culpa
                                          sapiente alias
                                          molestiae. Numquam corrupti in laborum sed rerum et corporis.
                                        </p>
                                        <div className={'flex'}>
                                          {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                              key={rating}
                                              className={classNames(
                                                4 > rating ? 'text-yellow-400' : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0',
                                              )}
                                              aria-hidden='true'
                                            />
                                          ))}
                                        </div>
                                      </div>
                                      <footer className='mt-8'>
                                        <div className='flex'>
                                          <div className='flex-shrink-0 lg:hidden'>
                                            <img
                                              className='h-12 w-12 rounded-full'
                                              src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                              alt=''
                                            />
                                          </div>
                                          <div className='ml-4 lg:ml-0'>
                                            <div className='text-base font-medium text-gray-900'>Judith Black</div>
                                            <div className='text-base font-medium text-indigo-600'>227 Nguyen Van Cu
                                            </div>
                                          </div>
                                        </div>
                                      </footer>
                                    </blockquote>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </TabPane>
                        <TabPane tab='Blog' key='3'>
                          {/*BLOG*/}
                          <div className='mt-8 max-w-7xl mx-auto px-4 pb-12 sm:px-6 lg:px-8'>
                            <Blog />
                          </div>
                        </TabPane>
                      </Tabs>
                      {/*{tabs.map((tab) => (*/}
                      {/*  <a*/}
                      {/*    key={tab.name}*/}
                      {/*    href={tab.href}*/}
                      {/*    className={classNames(*/}
                      {/*      tab.current*/}
                      {/*        ? 'border-pink-500 text-gray-900'*/}
                      {/*        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',*/}
                      {/*      'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',*/}
                      {/*    )}*/}
                      {/*    aria-current={tab.current ? 'page' : undefined}*/}
                      {/*  >*/}
                      {/*    {tab.name}*/}
                      {/*  </a>*/}
                      {/*))}*/}
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
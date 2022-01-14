import { BadgeCheckIcon, UserAddIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, StarIcon } from '@heroicons/react/solid'
import Gallery from '../../components/Gallery'
import Blog from '../../components/Blog'
import { Tabs } from 'antd'
import { useHistory } from 'react-router-dom'
import { StoreOwnerModel } from './StoreOwner.model'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Field, Formik } from 'formik'
import { toast } from 'react-toastify'
import { MasterModel } from '../../model/Master.model'
import { getFullToken } from '../../auth'

const { TabPane } = Tabs

function callback (key) {
  console.log(key)
}

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function StoreOwner () {
  const masterModel = new MasterModel()
  const storeOwnerModel = new StoreOwnerModel()
  const history = useHistory()
  const store_id = history.location.pathname.split('/')[2]

  const [store, setStore] = useState({})
  const [owner, setOwner] = useState({})

  const sendForm = async (values) => {
    values.user_id = getFullToken().id;
    values.store_id = store_id;
    const result = await masterModel.review(values)

    console.log('result ass', result)
    if (result.status === 200 || result.status === 201) {
      toast.success('Review successfully')
    } else {
      toast.error('Review fail')
    }
  }

  useEffect(() => {
    storeOwnerModel.getStore({ store_id }).then((res) => {
      setStore(res.data.store_data)
      console.log('store', res.data.store_data)
      setOwner(res.data.owner_data)
    })
  }, [])

  return (
    store.cover_img ? <div className='relative h-screen flex overflow-hidden bg-white'>
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
                  <img className='h-32 w-full object-cover lg:h-60' src={store.avatar} alt='' />
                </div>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <div className='-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
                    <div className='flex'>
                      <img
                        className='h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32'
                        src={store.avatar}
                        alt=''
                      />
                    </div>
                    <div
                      className='mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
                      <div className='sm:hidden 2xl:block mt-6 min-w-0 flex-1'>
                        <h1 className='text-2xl font-bold text-gray-900 truncate'>{store.store_name}</h1>
                      </div>
                      <div
                        className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                        <div className='pl-2 flex items-center'>
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={clsx(
                                4 > rating ? 'text-yellow-400' : 'text-gray-200',
                                'flex-shrink-0 h-5 w-5',
                              )}
                              aria-hidden='true'
                            />
                          ))}
                        </div>
                        <button
                          type='button'
                          className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                        >
                          <UserAddIcon className='-ml-1 mr-2 h-5 w-5 text-gray-400' aria-hidden='true' />
                          <span>Follow</span>
                        </button>
                        <button
                          type='button'
                          disabled={true}
                          className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                        >
                          <BadgeCheckIcon className='-ml-1 mr-2 h-5 w-5 text-gray-400' aria-hidden='true' />
                          <span>{store.follow_counts} Follower</span>
                        </button>
                      </div>status
                    </div>
                  </div>
                  <div className='hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1'>
                    <h1 className='text-2xl font-bold text-gray-900 truncate'>{store.store_name}</h1>
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
                                <div className='sm:col-span-2'>
                                  <dt className='text-sm font-medium text-gray-500'>About</dt>
                                  <dd
                                    className='mt-1 max-w-prose text-sm text-gray-900 space-y-5'
                                    dangerouslySetInnerHTML={{ __html: store.description }}
                                  />
                                </div>
                                <div className='sm:col-span-1'>
                                  <dt className='text-sm font-medium text-gray-500'>Address</dt>
                                  <dd className='mt-1 text-sm text-gray-900'>{store.store_address}</dd>
                                </div>
                              </dl>
                            </div>
                            <div className='mb-3'>
                              <Gallery images={store.cover_img} />
                              <h2 className='text-sm font-medium text-gray-500'>Managers</h2>
                              <div className='mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div
                                  className='relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500'
                                >
                                  <div className='flex-shrink-0'>
                                    <img className='h-10 w-10 rounded-full'
                                         src={owner.avatar ? owner.avatar : '/assets/no_avatar.png'} alt='' />
                                  </div>
                                  <div className='flex-1 min-w-0'>
                                    <a href='#' className='focus:outline-none'>
                                      <span className='absolute inset-0' aria-hidden='true' />
                                      <p className='text-sm font-medium text-gray-900'>{owner.name}</p>
                                      <p className='text-sm text-gray-500 truncate'>Owner</p>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabPane>
                        <TabPane tab='Review' key='2'>
                          {/*REVIEW*/}
                          <div className='flex justify-center shadow-lg my-4 '>
                            <Formik
                              initialValues={{ score: '', description: '' }}
                              onSubmit={async (values, { setSubmitting }) => {
                                console.log('submit reviews', values);
                                await sendForm(values)
                                setSubmitting(false)
                              }}
                            >
                              {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                /* and other goodies */
                              }) => (
                                <form onSubmit={handleSubmit} className='w-full bg-white rounded-lg px-4 pt-2'>
                                  <div className='flex flex-wrap -mx-3 mb-6'>
                                    <h2 className='px-4 pt-3 text-gray-800 text-xl'>Quick Review</h2>
                                    <div className='w-full md:w-full px-3 mb-2'>
                                      <div className='my-3'>
                                        <label htmlFor='type' className='block text-sm font-medium text-gray-700'>
                                          Choose star
                                        </label>
                                        <div className='mt-1'>
                                          <Field name='score' as='select'
                                                 defaultValue={5}
                                                 onChange={handleChange}
                                                 className='block w-full border-gray-300 mt-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                                            <option value={5}>5</option>
                                            <option value={0}>0</option>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                          </Field>
                                        </div>
                                      </div>
                                      <textarea
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'
                                        name='description' placeholder='Type Your Review' required />
                                    </div>
                                    <div className='w-full md:w-full flex items-start md:w-full px-3'>
                                      <div className='flex items-start w-1/2 text-gray-700 px-2 mr-auto'>
                                        <svg fill='none' className='w-5 h-5 text-gray-600 mr-1' viewBox='0 0 24 24'
                                             stroke='currentColor'>
                                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                                                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                                        </svg>
                                        <p className='text-xs md:text-sm pt-px'>Some HTML is okay.</p>
                                      </div>
                                      <div className='-mr-1'>
                                        <input type='submit'
                                               className='bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100'
                                               value='Review' />
                                      </div>
                                    </div>
                                  </div>
                                </form>)}</Formik>
                          </div>
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
                          <Blog />
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
    </div> : <div>Loading...</div>
  )
}
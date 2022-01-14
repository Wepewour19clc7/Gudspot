import { BadgeCheckIcon, HeartIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, StarIcon } from '@heroicons/react/solid'
import BlogContent from '../../components/BlogContent'
import { Tabs } from 'antd'
import { useHistory } from 'react-router-dom'
import { StoreOwnerModel } from '../StoreOwner/StoreOwner.model'
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

export default function BlogPage () {
    const storeOwnerModel = new StoreOwnerModel()
    const history = useHistory()
    const historyCut=history.location.pathname.split('/')
    const store_id = historyCut[2]
    const blog_id = historyCut[4]

    const store_page='/'.concat(historyCut[1],'/',historyCut[2])

    console.log(store_page)

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
                            <a href={store_page} className='text-2xl font-bold text-gray-900 truncate'>
                                {profile.name}
                            </a>
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
  
                <div className='mt-6 sm:mt-2 2xl:mt-5'>
                  <div className='border-b border-gray-200'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t-2 mt-5 '>
                        <BlogContent />
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
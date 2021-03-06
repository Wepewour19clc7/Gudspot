import React, { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import { RandomStoresModel } from './RandomStores.model'

const RandomStores = () => {
  const [stores, setStores] = useState([])
  const [topStores, settTopStores] = useState([])
  const randomStoresModel = new RandomStoresModel()

  useEffect(() => {
    randomStoresModel.getAllStores().then((res) => {
      console.log('res data all stores', res.data)
      setStores(res.data.results)
    })
    randomStoresModel.getTopStores().then((res) => {
      console.log('top stores', res.data.data)
      settTopStores(res.data.data)
    })
  }, [])
  return (
    <div className='bg-white'>
      <div className={"pb-10"}>
        <h1 className='text-2xl font-semibold text-blue-500 text-center m-auto pb-3'>New Stores</h1>
        <div className='max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8'>
          <div className='-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4'>
            {stores.map((store) => (
              <div key={uuidv4()} className='group relative p-4 border-r border-b border-gray-200 sm:p-6'>
                <div className='rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75'>
                  <img
                    src={store.avatar}
                    alt={store.avatar}
                    className='w-full h-full object-center object-cover'
                  />
                </div>
                <div className='pt-10 pb-4 text-center'>
                  <h3 className='text-sm font-medium text-gray-900'>
                    <Link to={`store/${store.id}`}>
                      <span aria-hidden='true' className='absolute inset-0' />
                      {store.store_name}
                    </Link>
                  </h3>
                  <div className='mt-3 flex flex-col items-center'>
                    <div className='flex items-center'>
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={clsx(
                            store.avg_review > rating ? 'text-yellow-400' : 'text-gray-200',
                            'flex-shrink-0 h-5 w-5',
                          )}
                          aria-hidden='true'
                        />
                      ))}
                    </div>
                    <p className='mt-1 text-sm text-gray-500'>{store.review_count ? store.review_count : 0} reviews</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={"pt-10 border-t-2"}>
        <h1 className='text-2xl font-semibold text-blue-500 text-center m-auto pb-3'>Most Followed Stores</h1>
        <div className='max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8'>
          <h2 className='sr-only'>Products</h2>
          <div className='-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4'>
            {topStores.map((store) => (
              <div key={uuidv4()} className='group relative p-4 border-r border-b border-gray-200 sm:p-6'>
                <div className='rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75'>
                  <img
                    src={store[0].avatar}
                    alt={store[0].avatar}
                    className='w-full h-full object-center object-cover'
                  />
                </div>
                <div className='pt-10 pb-4 text-center'>
                  <h3 className='text-sm font-medium text-gray-900'>
                    <Link to={`store/${store[0].id}`}>
                      <span aria-hidden='true' className='absolute inset-0' />
                      {store[0].store_name}
                    </Link>
                  </h3>
                  <div className='mt-3 flex flex-col items-center'>
                    <p className='sr-only'>{store[0].rating} out of 5 stars</p>
                    <div className='flex items-center'>
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={clsx(
                            store[0].avg_scores > rating ? 'text-yellow-400' : 'text-gray-200',
                            'flex-shrink-0 h-5 w-5',
                          )}
                          aria-hidden='true'
                        />
                      ))}
                    </div>
                    <p className='mt-1 text-sm text-gray-500'>{store[0].total_followers} follower</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RandomStores
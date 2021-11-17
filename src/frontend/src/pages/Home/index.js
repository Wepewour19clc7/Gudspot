import React from 'react'
import RandomStores from '../../containers/RandomStores'
import HeaderApp from '../../components/HeaderApp'
import FooterApp from '../../components/FooterApp'

const Home = () => {
  return (
    <main className='overflow-y-auto w-full h-full focus:outline-none px-5'>
      <HeaderApp/>
      <div className='py-6'>
        <div className='px-4 sm:px-6 md:px-0'>
          <h1 className='text-2xl font-semibold text-gray-900'>Dashboard</h1>
        </div>
        <div className='px-4 sm:px-6 md:px-0'>
          <div className='py-4'>
            <RandomStores />
          </div>
        </div>
      </div>
      <FooterApp/>
    </main>
  )
}

export default Home
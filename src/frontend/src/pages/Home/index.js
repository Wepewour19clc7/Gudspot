import React, { useEffect, useState } from 'react'
import RandomStores from '../../containers/RandomStores'
import HeaderApp from '../../components/HeaderApp'
import FooterApp from '../../components/FooterApp'
import { getToken } from '../../auth'

const Home = () => {
  const isLogged = !!getToken()
  return (
    <main className='overflow-y-auto w-full h-full focus:outline-none px-5'>
      <HeaderApp isLogged={isLogged}/>
      <div className='py-6'>
        <div className='px-4 sm:px-6 md:px-0'>
          <div className='py-4'>
            <RandomStores />
          </div>
        </div>
      </div>
      <FooterApp />
    </main>
  )
}

export default Home
import React from 'react'
import RandomStores from '../../containers/RandomStores'
import HeaderApp from '../../components/HeaderApp'
import FooterApp from '../../components/FooterApp'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../reducers/counterSlice'
import { getToken } from '../../auth'

const Home = () => {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  const isLogged = !!getToken()

  return (
    <main className='overflow-y-auto w-full h-full focus:outline-none px-5'>
      <HeaderApp isLogged={isLogged}/>
      {/*<div>*/}
      {/*  <button*/}
      {/*    aria-label='Increment value'*/}
      {/*    onClick={() => dispatch(increment())}*/}
      {/*  >*/}
      {/*    Increment*/}
      {/*  </button>*/}
      {/*  <span>{count}</span>*/}
      {/*  <button*/}
      {/*    aria-label='Decrement value'*/}
      {/*    onClick={() => dispatch(decrement())}*/}
      {/*  >*/}
      {/*    Decrement*/}
      {/*  </button>*/}
      {/*</div>*/}
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
      <FooterApp />
    </main>
  )
}

export default Home
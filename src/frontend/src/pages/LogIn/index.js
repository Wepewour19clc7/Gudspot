import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../../containers/LoginForm'

const LogIn = () => {
  return (
    <main className='overflow-y-auto w-full h-full focus:outline-none px-5'>
      <div className='py-6'>
        <div className='px-4 sm:px-6 md:px-0'>
          <h1 className='text-2xl font-semibold text-gray-900'>Sign In</h1>
        </div>
        <div className='px-4 sm:px-6 md:px-0'>
          <div className='py-4 flex justify-center'>
              <LoginForm />
          </div>
        </div>
      </div>
    </main>
  )
}

export default LogIn
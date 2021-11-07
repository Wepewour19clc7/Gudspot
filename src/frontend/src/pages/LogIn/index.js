import React from 'react'
import { Link } from 'react-router-dom'

const LogIn = () => {
  return (
    <main className='overflow-y-auto w-full h-full focus:outline-none px-5'>
      <div className='py-6'>
        <div className='px-4 sm:px-6 md:px-0'>
          <h1 className='text-2xl font-semibold text-gray-900'>Sign In</h1>
        </div>
        <div className='px-4 sm:px-6 md:px-0'>
            <div className='py-4 flex justify-center'>
                <div class="w-full md:max-w-xl border border-gray-200 bg-white shadow-lg rounded px-8 pt-8 pb-6">
                    <form class="mb-4">
                        <div class="mb-8">
                            <label class="block text-gray-700 text-sm md:text-base font-bold mb-2" for="username">
                                Username
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Quamon" required/>
                        </div>
                        <div class="mb-8">
                            <label class="block text-gray-700 text-sm md:text-base font-bold mb-2" for="password">
                                Password
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" required minLength="8"/>
                        </div>
                        <div class="flex items-center justify-evenly text-base">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Sign In
                            </button>
                            <a class="inline-block align-baseline font-bold text-blue-500 hover:text-blue-800" href="#">
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                    <div class="text-center text-gray-500 text-base">
                        <span>New to site?</span>&nbsp;<Link to="/register" class="underline hover:underline hover:text-blue-800">Register</Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </main>
  )
};

export default LogIn
import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <main className='overflow-y-auto w-full h-full focus:outline-none px-5'>
      <div className='py-6'>
        <div className='px-4 sm:px-6 md:px-0'>
          <h1 className='text-2xl font-semibold text-gray-900'>Sign Up</h1>
        </div>
        <div className='px-4 sm:px-6 md:px-0'>
            <div className='py-4 flex justify-center'>
                <div class="w-full md:max-w-xl border border-gray-200 bg-white shadow-lg rounded px-8 pt-8 pb-6">
                    <form class="mb-4">
                        <div class="mb-3">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                Username
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Nguyen Van A" required/>
                        </div>
                        <div class="mb-3">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                                Email
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Quamon@example.com" required/>
                        </div>
                        <div class="mb-3">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                                Password
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password1" type="password" placeholder="********" required/>
                        </div>
                        <div class="mb-3">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                                Repeat password
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password2" type="password" placeholder="********" required/>
                        </div>
                        <div class="mb-3">
                            <label class="block text-gray-700 text-base font-bold mb-2" for="password">
                                User type
                            </label>
                            <select class="form-select pl-3 pr-10 py-3 rounded">
                                <option value="customer">Customer</option>
                                <option value="owner">Business owner</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <input class="shadow appearance-none rounded text-blue-600 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="userterm" type="checkbox" required/> I agree to the <Link to="/terms_of_user" target='_blank' class="text-blue-600 font-bold">Terms of User</Link>
                        </div>
                        <div class="flex items-center justify-evenly">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 w-4/5 rounded-3xl focus:outline-none focus:shadow-outline" type="button">
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <div class="text-center text-gray-500 text-base">
                        <span>Already have an account?</span>&nbsp;<Link to="/login" class="underline hover:underline hover:text-blue-800">Login</Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </main>
  )
};

export default Register;
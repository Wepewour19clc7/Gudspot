import React from 'react'
import { Formik } from 'formik'
import { RegisterFormModel } from '../RegisterForm/RegisterForm.model'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LoginFormModel } from './LoginForm.model'
import { saveToken } from '../../auth'

const LoginForm = () => {
  const loginFormModel = new LoginFormModel()
  const history = useHistory()
  const sendForm = async (values) => {
    const result = await loginFormModel.login(values)

    if (result.success) {
      toast.success('Login successfully')
      saveToken(result.data)
      history.push('/')
    } else {
      toast.error('Create account fail')
    }
  }
  return (
    <div className='w-full md:max-w-xl bg-white shadow-lg rounded px-8 pt-8 pb-6'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setSubmitting }) => {
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
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='block text-sm font-medium text-gray-700'>
                Username
              </label>
              <input
                name='username'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                className={'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'}
                id='email' type='text' placeholder='Quamon' required />
            </div>
            <div className='mb-3'>
              <label className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <input
                type='password'
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'}
                id='password' placeholder='********' required minLength='8' />
            </div>
            <div className='py-3 bg-gray-50 text-right flex flex-row justify-between'>
              <button
                type='submit'
                className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Sign in
              </button>
              <div className='text-center text-gray-500'>
                <span>New to site?</span>&nbsp;<Link to='/register'
                                                     class='underline hover:underline hover:text-blue-800'>Register</Link>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default LoginForm
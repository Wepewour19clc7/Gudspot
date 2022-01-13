import React from 'react'
import { Field, Formik } from 'formik'
import { Link, useHistory } from 'react-router-dom'
import { RegisterFormModel } from './RegisterForm.model'
import { toast } from 'react-toastify'

const RegisterForm = () => {
  const registerFormModel = new RegisterFormModel()
  const history = useHistory()
  const sendForm = async (values) => {
    const result = await registerFormModel.register(values)

    if (result.success) {
      toast.success('Create account successfully')
      history.push('/login')
    } else {
      toast.error('Create account fail')
    }
  }
  return (
    <div className='w-full md:max-w-xl bg-white shadow-lg rounded px-8 pt-8 pb-6'>
      <Formik
        initialValues={{ email: '', username: '', password: '', role: 'user' }}
        validate={values => {
          const errors = {}
          if (!values.email) {
            errors.email = 'Required'
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
          }
          return errors
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await sendForm(values)
          setSubmitting(false)
        }}
      >{({
        values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <div className='mt-1'>
              <input type='email'
                     name='email'
                     onChange={handleChange}
                     onBlur={handleBlur}
                     placeholder={'john.doe@example.com'}
                     value={values.email}
                     className={'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'} />
              <span className={'text-red-500'}>{errors.email && touched.email && errors.email}</span>
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
              Username
            </label>
            <div className='mt-1'>
              <input type='text'
                     name='username'
                     placeholder={'johndoe'}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.username}
                     className={'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'} />
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <div className='mt-1'>
              <input type='password'
                     name='password'
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.password}
                     className={'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'} />
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Role
            </label>
            <div className='mt-1'>
              <Field name='role' as='select'
                     defaultValue={'user'}
                     onChange={handleChange}
                     className='block w-full border-gray-300 mt-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                <option value={'user'}>Base User</option>
                <option value={'owner'}>Owner Store</option>
              </Field>
            </div>
          </div>
          <div>
            <div className='py-3 bg-gray-50 text-right flex flex-row justify-between'>
              <button
                type='submit'
                className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Sign up
              </button>
              <div className='text-center text-gray-500'>
                <span>Already have an account?</span>&nbsp;
                <Link to='/login' class='underline hover:underline hover:text-blue-800'>Login</Link>
              </div>
            </div>
          </div>
        </form>)}
      </Formik>
    </div>
  )
}

export default RegisterForm
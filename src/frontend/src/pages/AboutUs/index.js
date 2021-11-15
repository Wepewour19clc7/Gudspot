import React from 'react'

const AboutUs = () => {
  return (
    <div className='overflow-y-auto w-full h-full focus:outline-none px-5'>
      <div className='xl:mx-auto xl:container 2xl:px-20 px-6 py-20'>
        <h1 className='text-5xl font-semibold leading-10 text-gray-800 text-center'>Meet our team</h1>
        <div className='flex flex-wrap items-stretch xl:justify-between justify-center mt-16 xl:gap-6 gap-4'>
          <div className='lg:w-96 w-80'>
            <img
              src='https://images.unsplash.com/photo-1599566147214-ce487862ea4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=647&q=80'
              className='h-72 w-full object-cover object-center rounded-t-md' alt='woman smiling' />
            <div className='bg-white shadow-md rounded-md py-4 text-center'>
              <p className='text-base font-medium leading-6 text-gray-600'>Your name</p>
              <p className='text-base leading-6 mt-2 text-gray-800'>Front-end Developer</p>
            </div>
          </div>
          <div
            className='bg-indigo-700 rounded-md lg:w-96 w-80 flex flex-col items-center justify-center md:py-0 py-12'>
            <h3 className='text-2xl font-semibold leading-6 text-center text-white'>About Team</h3>
            <p className='lg:w-80 lg:px-0 px-4 text-base leading-6 text-center text-white mt-6'>Praesent quis commodo
              erat, id iaculis mauris. Nullam feugiat efficitur urna, ac scelerisque purus vestibulum at. Suspendisse
              luctus risus est, at fringilla eros interdum vel. Curabitur risus nulla, ullamcorper vehicula pulvinar ac,
              venenatis nec ex. Phasellus dolor lorem, dictum ac maximus quis, cursus vitae sapien. Integer non libero
              quis felis sagittis sollicitudin vel eget sapien. Integer fermentum dui ac odio tincidunt dignissim.
              Praesent convallis erat non magna egestas, sit amet consequat arcu dignissim. Curabitur lobortis magna
              dolor, quis auctor velit fringilla id. Mauris elementum congue auctor. Sed consectetur, libero ac varius
              euismod, nulla tortor dictum sem, vitae euismod urna erat sit amet nisi.</p>
          </div>
          <div className='lg:w-96 w-80'>
            <img
              src='https://images.unsplash.com/photo-1599566147214-ce487862ea4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=647&q=80'
              className='h-72 w-full object-cover object-center rounded-t-md' alt='woman in black dress' />
            <div className='bg-white shadow-md rounded-md py-4 text-center'>
              <p className='text-base font-medium leading-6 text-gray-600'>Your name</p>
              <p className='text-base leading-6 mt-2 text-gray-800'>Front-end Developer</p>
            </div>
          </div>
          <div className='lg:w-96 w-80'>
            <img
              src='https://images.unsplash.com/photo-1599566147214-ce487862ea4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=647&q=80'
              className='h-72 w-full object-cover object-center rounded-t-md' alt='woman smiling' />
            <div className='bg-white shadow-md rounded-md py-4 text-center'>
              <p className='text-base font-medium leading-6 text-gray-600'>Your name</p>
              <p className='text-base leading-6 mt-2 text-gray-800'>Front-end Developer</p>
            </div>
          </div>
          <div className='lg:w-96 w-80'>
            <img
              src='https://images.unsplash.com/photo-1599566147214-ce487862ea4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=647&q=80'
              className='h-72 w-full object-cover object-center rounded-t-md' alt='woman smiling' />
            <div className='bg-white shadow-md rounded-md py-4 text-center'>
              <p className='text-base font-medium leading-6 text-gray-600'>Your name</p>
              <p className='text-base leading-6 mt-2 text-gray-800'>Front-end Developer</p>
            </div>
          </div>
          <div className='lg:w-96 w-80'>
            <img
              src='https://images.unsplash.com/photo-1599566147214-ce487862ea4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=647&q=80'
              className='h-72 w-full object-cover object-center rounded-t-md' alt='woman smiling' />
            <div className='bg-white shadow-md rounded-md py-4 text-center'>
              <p className='text-base font-medium leading-6 text-gray-600'>Your name</p>
              <p className='text-base leading-6 mt-2 text-gray-800'>Front-end Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
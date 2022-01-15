import React from 'react'
import TienDat from './images/tiendat.jpg'
import Khoa from './images/khoa.jpg'
import Tien from './images/tien.jpg'
import TrongDat from './images/trongdat.jpg'
import Khoi from './images/khoi.jpg'
const AboutUs = () => {
  return (
    <div className='overflow-y-auto w-full h-full focus:outline-none px-5'>
      <div className='xl:mx-auto xl:container 2xl:px-20 px-6 py-20'>
        <h1 className='text-5xl font-semibold leading-10 text-gray-800 text-center'>Meet our team</h1>
        <div className='flex flex-wrap items-stretch xl:justify-between justify-center mt-16 xl:gap-6 gap-4'>
          <div className='lg:w-96 w-80'>
            <img
              src={Khoi}
              className='h-72 w-full object-cover object-center rounded-t-md' alt='Nguyễn Tiến Đạt' />
            <div className='bg-white shadow-md rounded-md py-4 text-center'>
              <p className='text-base font-medium leading-6 text-gray-600'>Dương Minh Khôi</p>
              <p className='text-base leading-6 mt-2 text-gray-800'>Team leader</p>
            </div>
          </div>
          <div
            className='bg-indigo-700 rounded-md lg:w-96 w-80 flex flex-col items-center justify-center md:py-0 py-12 order-first xl:order-none'>
            <h3 className='text-2xl font-semibold leading-6 text-center text-white py-5'>About Team</h3>
            <p className='lg:w-80 lg:px-0 px-4 text-base leading-6 text-center text-white'>
              
            </p>
          </div>
          <div className='lg:w-96 w-80'>
            <img
              src={TienDat}
              className='h-72 w-full object-cover object-center rounded-t-md' alt='woman in black dress' />
            <div className='bg-white shadow-md rounded-md py-4 text-center'>
              <p className='text-base font-medium leading-6 text-gray-600'>Nguyễn Tiến Đạt</p>
              <p className='text-base leading-6 mt-2 text-gray-800'>Front-end Developer</p>
            </div>
          </div>
          <div className='lg:w-96 w-80'>
            <img
              src={Tien}
              className='h-72 w-full object-cover object-center rounded-t-md' alt='woman smiling' />
            <div className='bg-white shadow-md rounded-md py-4 text-center'>
              <p className='text-base font-medium leading-6 text-gray-600'>Nguyễn Năng Tiến</p>
              <p className='text-base leading-6 mt-2 text-gray-800'>Front-end Developer</p>
            </div>
          </div>
          <div className='lg:w-96 w-80'>
            <img
              src={Khoa}
              className='h-72 w-full object-cover object-center rounded-t-md' alt='woman smiling' />
            <div className='bg-white shadow-md rounded-md py-4 text-center'>
              <p className='text-base font-medium leading-6 text-gray-600'>Nguyễn Đăng Khoa</p>
              <p className='text-base leading-6 mt-2 text-gray-800'>Back-end Developer</p>
            </div>
          </div>
          <div className='lg:w-96 w-80'>
            <img
              src={TrongDat}
              className='h-72 w-full object-cover object-center rounded-t-md' alt='woman smiling' />
            <div className='bg-white shadow-md rounded-md py-4 text-center'>
              <p className='text-base font-medium leading-6 text-gray-600'>Nguyễn Trọng Đạt</p>
              <p className='text-base leading-6 mt-2 text-gray-800'>Back-end Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
import React from 'react'
import Sidebar from '../Sidebar'

const LayoutApp = ({children}) => {
  return (
    <div className='h-screen bg-white overflow-hidden flex'>
      <Sidebar/>
      <div className='flex-1 max-w-4xl mx-auto w-0 flex flex-col md:px-8 xl:px-0'>
        {children}
      </div>
    </div>
  )
}

export default LayoutApp
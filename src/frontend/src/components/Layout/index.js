import React from 'react'
import Sidebar from '../Sidebar'

const LayoutApp = ({children}) => {
  return (
    <div className='h-screen bg-white overflow-hidden flex'>
      <Sidebar/>
      <div className='flex-1 w-full mx-auto w-0 flex flex-col'>
        {children}
      </div>
    </div>
  )
}

export default LayoutApp
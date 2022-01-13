import React from 'react'

const info=[
  {name:'Username',value:'Quamon'},
  {name:'Contact',value:'Quamon@gmail.com'},
  {name:'DoB',value:'01/01/2001'},
  {name:'User type',value:'Customer'}
]

const Profile = () => {
  return (
    <main className='overflow-y-auto w-full h-full focus:outline-none'>
      <div className='h-1/5 md:h-1/3 bg-black'>
      </div>
      <div className='flex flex-col items-center'>
        <div className='relative z-10 -top-20 bg-red-400 h-36 w-36 rounded-full'>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-24 gap-x-36 text-base'>
          {info.map((item)=>(
            <div>
              <div className='border-b-2 border-black font-bold'>{item.name}</div>
              <div>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
      
    </main>
  )
}

export default Profile
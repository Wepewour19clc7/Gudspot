import React from 'react'
import { CheckIcon, TrashIcon } from '@heroicons/react/outline'

const data=[
    {name:'Username',id1:'1',id2:'1',value:'Quamon'},
    {name:'Contact',id1:'2',id2:'2',value:'Quamon@gmail.com'},
    {name:'DoB',id1:'3',id2:'3',value:'01/01/2001'},
    {name:'User type',id1:'4',id2:'4',value:'Customer'}
  ]

const UserManager = () => {
    return (
        <main className='overflow-y-auto w-full h-full focus:outline-none'>
        <div className='py-6'>
        <div className='px-4 sm:px-6 md:px-0'>
          <h1 className='text-2xl font-semibold text-gray-900'>Blog Management</h1>
        </div>
        <table class="border-collapse border border-gray-400 w-full">
            <thead>
                <tr>
                <th class='border border-gray-400 text-center'>Blog name</th>
                <th class='border border-gray-400 text-center'>Blog id</th>
                <th class='border border-gray-400 text-center'>Store id</th>
                <th class='border border-gray-400 text-center'>Accept/Deny</th>
                </tr>
            </thead>
            <tbody>
            {data.map((item)=>(
                <tr>
                    <td class='border border-gray-400 text-center'>{item.name}</td>
                    <td class='border border-gray-400 text-center'>{item.id1}</td>
                    <td class='border border-gray-400 text-center'>{item.id2}</td>
                    <td class='border border-gray-400 text-center'>
                        <span class='flex justify-around'>
                            <button class='text-green-500'><CheckIcon class='h-6 w-6 inline-block'/>Accept</button>
                            <button class='text-red-500'><TrashIcon class='h-6 w-6  inline-block'/>Deny</button>
                        </span>
                    </td>
                </tr>
            ))}   
            </tbody>
            </table>
        </div>
        </main>
    )
}

export  default UserManager;
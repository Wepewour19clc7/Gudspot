import React from 'react'
import { CheckIcon, TrashIcon } from '@heroicons/react/outline'

const blogs=[
    {name:'Username',id1:'1',id2:'1',value:'Quamon'},
    {name:'Contact',id1:'2',id2:'2',value:'Quamon@gmail.com'},
    {name:'DoB',id1:'3',id2:'3',value:'01/01/2001'},
    {name:'User type',id1:'4',id2:'4',value:'Customer'},
    {name:'Username1',id1:'11',id2:'11',value:'Quamon'},
    {name:'Contact1',id1:'12',id2:'12',value:'Quamon@gmail.com'},
    {name:'DoB1',id1:'13',id2:'13',value:'01/01/2001'},
    {name:'User type1',id1:'14',id2:'14',value:'Customer'},
    {name:'Username2',id1:'21',id2:'21',value:'Quamon'},
    {name:'Contact2',id1:'22',id2:'22',value:'Quamon@gmail.com'},
    {name:'DoB2',id1:'23',id2:'23',value:'01/01/2001'},
    {name:'User type2',id1:'24',id2:'24',value:'Customer'}
]

let pageNum=1;

const UserManager = () => {
    return (
        <main className='overflow-y-auto w-full h-full focus:outline-none'>
            <div className='py-6'>
                <div className='px-4 sm:px-6 md:px-0'>
                <h1 className='text-2xl font-semibold text-gray-900'>Blog Management</h1>
                </div>
                <div class="container flex justify-center">
                    <table class="shadow-lg grow w-11/12 border border-collapse">
                        <thead class='h-10 border rounded bg-gray-300'>
                            <th class='border border-gray-400 text-center'>Blog name</th>
                            <th class='border border-gray-400 text-center'>Blog id</th>
                            <th class='border border-gray-400 text-center'>Store id</th>
                            <th class='border border-gray-400 text-center'>Actions</th>
                        </thead>
                        <tbody>
                        {blogs.map((item)=>(
                            <tr class='h-12'>
                                <td class='border border-gray-400 text-center'>{item.name}</td>
                                <td class='border border-gray-400 text-center'>{item.id1}</td>
                                <td class='border border-gray-400 text-center'>{item.id2}</td>
                                <td class='border border-gray-400 text-center'>
                                    <span class='flex justify-around'>
                                        <button class='text-green-500 border border-green-500 rounded-full sm:rounded py-1 px-1 hover:bg-green-500 hover:text-white'>
                                            <CheckIcon class='h-6 w-6 inline-block'/>
                                            <p class='hidden sm:inline'>Accept</p>
                                        </button>
                                        <button class='text-red-500 border border-red-500 rounded-full sm:rounded py-1 px-1 hover:bg-red-500 hover:text-white'>
                                            <TrashIcon class='h-6 w-6  inline-block'/>
                                            <p class='hidden sm:inline'> Deny</p>
                                        </button>
                                    </span>
                                </td>
                            </tr>
                        ))}   
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}

export  default UserManager;
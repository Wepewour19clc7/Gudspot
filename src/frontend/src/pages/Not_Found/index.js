import React from 'react'

const Not_Found = () => {
    return (
        <main className='overflow-y-none w-full h-full focus:outline-none'>
                <img
                className='w-full h-full object-cover'
                src="/assets/not_found.svg"
                alt='404'
                />
        </main>
    );
}

export default Not_Found;
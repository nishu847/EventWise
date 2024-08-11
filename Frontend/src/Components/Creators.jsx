import React from 'react'

const Creators = ({src="",Name="",Work=""}) => {
  return (
    <>
        <div className='bg-gray-50 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-lg py-4 shadow-lg px-4 border border-white flex flex-col items-center gap-4'>
        <div>
            <img src={src} alt="" className='rounded-full h-44 w-44'/>
        </div>
        <div className='text-center flex-col'>
            <h1 className='font-black text-gray-800 text-lg sm:text-xl md:text-2xl font-serif '>{Name}</h1>
            <p className='text-justify mt-2 text-sm font-serif'>{Work}</p>
        </div>
        </div>
    </>
  )
}

export default Creators
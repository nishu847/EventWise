import React from 'react'
import Creators from '../Components/Creators'
const Created = () => {
  return (
    <>
        <div className='bg-gray-50 w-full sm:w-[95%] mx-auto rounded-lg py-4 md:py-6 shadow-lg border border-white flex-col gap-4 p-4'>
        <div>
            <h1 className='font-black text-blue-800 text-4xl sm:text-2xl md:text-5xl font-serif text-center mb-4'>Our Team</h1>
        </div> 
        <div className='flex justify-center gap-16'>
        <Creators src='src/assets/nishuimg.jpg' Name='Nishu Sharma' Work='Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, sint velit? Earum, itaque culpa nostrum illum accusantium accusamus amet vel.'/>

        <Creators src='src/assets/prernaimg.jpg' Name='Prerna Jain' Work='Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, sint velit? Earum, itaque culpa nostrum illum accusantium accusamus amet vel.'/>
        </div> 
       
        </div>
    </>
  )
}

export default Created


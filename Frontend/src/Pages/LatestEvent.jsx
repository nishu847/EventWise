import React from 'react'
import Latestevents from '../Components/Latestevents'
const LatestEvent = () => {
  return (
    <div className='bg-gray-50 w-full sm:w-[95%] mx-auto rounded-lg py-4 md:py-6 shadow-lg border border-white flex flex-col md:flex-row justify-center md:justify-around gap-4 p-4 m-5'>
        <Latestevents/>
    </div>
  )
}

export default LatestEvent


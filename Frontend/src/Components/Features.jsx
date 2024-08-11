import React from 'react';
import E0entNoteIcon from '@mui/icons-material/EventNote';
const Features = ({logo: LogoIcon = EventNoteIcon, text = "", heading = "" }) => {

  return (
    <div className='bg-gray-50 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-lg py-4 shadow-lg px-4 border border-white flex flex-col items-center gap-4'>
      <div className='flex justify-center'>
        <LogoIcon sx={{ fontSize: 50 }} color='primary' />
      </div>
      <div className='text-center flex-col'>
        <h1 className='font-black text-gray-800 text-lg sm:text-xl md:text-2xl'>{heading}</h1>
        <p className='text-justify mt-2 text-sm '>{text}</p>
      </div>
    </div>
  );
};

export default Features;



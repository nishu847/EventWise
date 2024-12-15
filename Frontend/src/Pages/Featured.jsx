import React from 'react';
import Features from '../Components/Features';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const Featured = () => {
  return (
    <div className='bg-gray-50 w-full sm:w-[95%] mx-auto rounded-lg py-4 md:py-6 shadow-lg border border-white flex flex-col md:flex-row justify-center md:justify-around gap-4 p-4 m-5'>

      <Features text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste illo praesentium eius neque placeat porro accusamus non fuga soluta tempora." heading="Updated Future Events" logo={EventNoteIcon} />  

      <Features text="Lorem ipsum dolor sit amet consectetur adipisicing elit. In quisquam, eos quis excepturi fugit est eius nihil voluptatem provident officiis." heading='Shop Necessary Items' logo={ShoppingBagIcon}/>        

      <Features text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed possimus iste mollitia ad ipsam porro tenetur dolore blanditiis maxime nisi." heading='Register for Events' logo={AppRegistrationIcon}/>        
    </div>
  );
}

export default Featured;


import React from 'react';
import { NavLink } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-[#527162] text-white py-8">
      <div className="container mx-auto flex flex-col  justify-between items-center ">
      {/* <div class="flex-grow h-px"></div> 
      <hr class="flex-grow"></hr>  */}
      <div className="flex space-x-6">
     
          <a href="https://github.com/nishu847" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
           <img src="src/assets/icons8-github-30 (2).png "alt="" className='h-10 w-10'/>
          </a>

          <a href="https://www.linkedin.com/in/nishu-sharma0623" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <img src="src/assets/icons8-linkedin-30.png"alt="" className='h-10 w-10'/>
          </a>

          <a href="https://www.linkedin.com/in/nishu-sharma0623" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <img src="src/assets/icons8-facebook-30 (1).png"alt="" className='h-10 w-10'/>
          </a>

          <a href="https://www.linkedin.com/in/nishu-sharma0623" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <img src="src/assets/icons8-instagram-30 (1).png"alt="" className='h-10 w-10'/>
          </a>
        </div>



        {/* Brand name */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-5xl text-white italic font-bold text-center mt-5">EventWise</h1>
          <p className="text-lg mt-3 text-center mb-5 italic">Bringing events to life.</p>
        </div>

        {/* Navigation Links */}
        <div className="mb-4 md:mb-0 flex flex-wrap justify-center md:justify-start space-x-6">
        
          <NavLink to='/' className='hover:text-gray-400 text-lg underline'>Home</NavLink>
          <p>|</p>
          <NavLink to='/events' className='hover:text-gray-400 text-lg underline'>Events</NavLink>
          <p>|</p>
          <NavLink to='/shop' className='hover:text-gray-400 text-lg underline'>Shop</NavLink>
          <p>|</p>
          <NavLink to='/aboutus' className='hover:text-gray-400 text-lg underline'>About Us</NavLink>
        
        </div>

        {/* Developer Links */}
      
      </div>
      
      {/* Copyright Section */}
      <div className="mt-8 text-center text-sm text-white">
        <p>&copy; {new Date().getFullYear()} EventWise. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;


import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className='bg-gray-50 shadow-lg border border-white w-full h-16 flex items-center px-6 relative'>
      <div className='h-12 w-32 flex justify-center items-center'>
        <p className='text-3xl blue-gradient_text italic font-bold'>Eventwise</p>
      </div>
      <nav className={`flex-grow flex items-center md:justify-center ${isMobileMenuOpen ? 'block' : 'hidden'} md:flex`}>
        <NavLink to='/' className='mx-4 text-xl text-white dark-gradient_text'>
          Home
        </NavLink>
        <NavLink to='/events' className='mx-4 text-xl text-white dark-gradient_text'>
          Events
        </NavLink>
        <NavLink to='/shop' className='mx-4 text-xl text-white dark-gradient_text'>
          Shop
        </NavLink>
        <NavLink to='/aboutus' className='mx-4 text-xl text-white dark-gradient_text'>
          About Us
        </NavLink>
      </nav>
      <div className='flex-grow md:flex md:items-center md:justify-end hidden'>
        <Button type='button'>Register</Button>
        <Button type='button'>Login</Button>
      </div>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileMenu}
        className='md:hidden flex items-center p-2 ml-auto'
        aria-label='Toggle navigation'
      >
        
    
      </button>
      {/* Mobile menu */}
      <div className={`md:hidden fixed top-16 right-0 w-full bg-gray-50 shadow-lg border border-white ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <nav className='flex flex-col items-center py-4'>
          <NavLink to='/' className='py-2 text-xl text-white dark-gradient_text'>
            Home
          </NavLink>
          <NavLink to='/events' className='py-2 text-xl text-white dark-gradient_text'>
            Events
          </NavLink>
          <NavLink to='/shop' className='py-2 text-xl text-white dark-gradient_text'>
            Shop
          </NavLink>
          <NavLink to='/aboutus' className='py-2 text-xl text-white dark-gradient_text'>
            About Us
          </NavLink>
          <div className='flex flex-col items-center mt-4'>
            <Button type='button'>Register</Button>
            <Button type='button'>Login</Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

const BrandsNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for profile dropdown visibility

  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current route

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const gotoevents = () => {
    navigate('/events');
  };

  const gotohome = () => {
    navigate('/');
  };

  const gotous = () => {
    navigate('/aboutus');
  };

  const gotoshop = () => {
    navigate('/products');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const logout = async (event) => {
    event.preventDefault();
    try {
      // Request to backend API to log out
      const response = await axios.post("http://localhost:8000/v1/api/users/logout", {}, { withCredentials: true });
      console.log("Logout response:", response); 
      localStorage.removeItem("isLoggedin");
      localStorage.removeItem("user");

      // Handle response, alert user and redirect
      alert("User successfully logged out");
      setIsSidebarOpen(false); // Close sidebar on logout
      setIsDropdownOpen(false); // Close dropdown on logout
      navigate("/login"); // Redirect to login page
    } catch (error) {
      alert(error.response?.data?.error || 'Logout failed');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed top-0 left-0 w-full z-20">
      {/* Navbar */}
      <div className="mx-4 my-2 flex justify-between items-center bg-[#f0f4f2] rounded-full px-8 py-4" style={{ border: '1px solid #6c9380' }}>
        <div>
          <img src="/src/assets/Logo.png" alt="logo" className="h-12 rounded-full" />
        </div>
        <div className="hidden md:flex gap-6 items-center justify-center font-semibold">
          <a
            className={`relative cursor-pointer ${isActive('/') ? 'text-[#6c9380]' : 'text-slate-600 hover:text-[#6c9380]'}`}
            onClick={gotohome}
          >
            Home
          </a>
          <a
            className={`relative cursor-pointer ${isActive('/aboutus') ? 'text-[#6c9380]' : 'text-slate-600 hover:text-[#6c9380]'}`}
            onClick={gotous}
          >
            About
          </a>
          <a
            className={`relative cursor-pointer ${isActive('/events') ? 'text-[#6c9380]' : 'text-slate-600 hover:text-[#6c9380]'}`}
            onClick={gotoevents}
          >
            Events
          </a>
          <a
            className={`relative cursor-pointer ${isActive('/events') ? 'text-[#6c9380]' : 'text-slate-600 hover:text-[#6c9380]'}`}
            onClick={gotoshop}
          >
            Shop
          </a>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="relative cursor-pointer text-white bg-[#6c9380] pt-3 pb-3 pr-5 pl-5 rounded-2xl"
            >
              Profile
              {/* Add a dropdown icon (optional) */}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg z-10">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => { navigate('/profile'); setIsDropdownOpen(false); }} // Navigate to profile page
                  >
                    Profile
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={(e) => { logout(e); setIsDropdownOpen(false); }} // Logout
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* Toggle Button for Sidebar on Small Screens */}
        <div className="flex md:hidden">
          <button onClick={toggleSidebar} className="text-[#6c9380] focus:outline-none">
            {/* Hamburger Icon */}
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#f0f4f2] text-[#6c9380] shadow-md transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 md:hidden`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar} className="text-[#6c9380] focus:outline-none hover:bg-white py-2 px-4 rounded-full">
            <i className="fa fa-close text-2xl"></i>
          </button>
        </div>
        {/* Sidebar Content */}
        <div className="flex flex-col gap-6 items-start p-6 font-semibold">
          <h2
            className={`text-slate-600 cursor-pointer relative ${isActive('/') ? 'text-[#6c9380]' : ''}`}
            onClick={() => { toggleSidebar(); gotohome(); }}
          >
            Home
          </h2>
          <h2
            className={`text-slate-600 cursor-pointer relative ${isActive('/aboutus') ? 'text-[#6c9380]' : ''}`}
            onClick={() => { toggleSidebar(); gotous(); }}
          >
            About
          </h2>
          <h2
            className={`text-slate-600 cursor-pointer relative ${isActive('/events') ? 'text-[#6c9380]' : ''}`}
            onClick={() => { toggleSidebar(); gotoevents(); }}
          >
            Events
          </h2>
          <h2
            className={`text-slate-600 cursor-pointer relative ${isActive('/events') ? 'text-[#6c9380]' : ''}`}
            onClick={() => { toggleSidebar(); gotoshop(); }}
          >
            Shop
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BrandsNavbar;

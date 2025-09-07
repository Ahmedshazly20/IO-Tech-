'use client';

import React, { useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import ServicesDropdown from '../ServicesDropdown';

const HeroSection = () => {
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(true);

  const heroImage = '/dammy/hero.jpg'; 



  return (
    <div
      className="  h-screen  bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${heroImage})` }}
    >

      <div className='container mx-auto px-1'>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#4B2615AD]"></div>

        {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between sm:p-6 ">
          <div className="text-xl sm:text-2xl font-bold">
            {/* Improved: Use next/image for logo */}
            {/* <Image
              src="/logo.png" 
              alt="Company Logo"
              width={120}
              height={50}
              className="h-8 sm:h-10 w-auto"
            /> */}
          </div>
          
          <div className="hidden lg:flex items-center  space-x-8 text-sm md:text-base">
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">Home</a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">About us</a>
            <div
            className="relative"
            onMouseEnter={() => setIsServicesDropdownOpen(true)}
            onMouseLeave={() => setIsServicesDropdownOpen(false)}
          >
            <a href="#" className="hover:text-gray-300 transition-colors duration-300 flex items-center cursor-pointer">
              Services <RiArrowDropDownLine />
            </a>
          <ServicesDropdown
            isOpen={isServicesDropdownOpen}
            onMouseEnter={() => setIsServicesDropdownOpen(true)}
            onMouseLeave={() => setIsServicesDropdownOpen(false)}
          />
            </div>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">Our Team</a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">Blogs</a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">Contact us</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button aria-label="Search" className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 hidden sm:block">
              <FaSearch />
            </button>
            <a
              href="#"
              className="px-4 py-2 sm:px-6 sm:py-3 border-2 border-white rounded-[10px] text-sm sm:text-base hover:bg-white hover:text-[#483a2d] transition-all duration-300 transform hover:scale-105"
            >
              Book Appointment
            </a>
          </div>
       </nav>

        {/* Hero Content */}
     </div>
    </div>
  );
};

export default HeroSection;
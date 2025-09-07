'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const HeroSection = () => {
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(true);

  const heroImage = '/dammy/hero.jpg'; 

  const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ml-1 transition-transform duration-300 ${isServicesDropdownOpen ? 'rotate-180' : ''}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
  
  const servicesList = [
    { title: 'Legal Consultation Services', links: ['Contracts', 'Notarization', 'Insurance'] },
    { title: 'Defense in All Cases', links: ['Banks and Financial Institutions', 'Corporate Governance Services', 'Companies Liquidation', 'Internal Regulations'] },
    { title: 'Services for Companies', links: ['Arbitration', 'Intellectual Property', 'Corporate Restructuring', 'Reorganization'] },
    { title: 'Establishing Companies', links: ['Commercial Agencies', 'Supporting Vision 2030', 'Estates', 'Foreign Companies'] }
  ];

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
              Services <ChevronDownIcon />
            </a>
          {isServicesDropdownOpen && (
            <div className="fixed top-20 container mx-auto left-0 right-0 rounded-[10px] z-50 bg-[#4B2615] text-white backdrop-blur-sm shadow-2xl p-8 transform transition-all duration-300 ease-in-out">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {servicesList.map((column, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                      <h4 className="font-semibold text-white text-sm border-b border-gray-200 pb-4">{column.title}</h4>
                      {column.links.map((link, linkIndex) => (
                        <a key={linkIndex} href="#" className="text-sm text-white/90 text-[14px] pb-5 hover:text-blue-500 transition-colors duration-200 hover:translate-x-1 transform">
                          {link}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
            </div>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">Our Team</a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">Blogs</a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">Contact us</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button aria-label="Search" className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 hidden sm:block">
              <SearchIcon />
            </button>
            <a
              href="#"
              className="px-4 py-2 sm:px-6 sm:py-3 border-2 border-white rounded-full text-sm sm:text-base hover:bg-white hover:text-[#483a2d] transition-all duration-300 transform hover:scale-105"
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
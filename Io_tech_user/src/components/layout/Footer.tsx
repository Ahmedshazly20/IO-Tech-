'use client';

import React from 'react';
import { FaFacebookF, FaTwitter, FaGooglePlusG } from "react-icons/fa";

const Footer = () => {
    return (    
        <div className='bg-[#4B2615] text-white'>
            <div className='h-[25px] bg-white'></div>
            <div className='container mx-auto px-4'> 
                {/* Top Section */}
                <div className='flex flex-col lg:flex-row justify-between items-center lg:items-end py-6 lg:py-9 gap-6 lg:gap-0'>
                    <div className='hidden lg:block'></div>
                    
                    <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full lg:w-auto justify-center lg:justify-end'> 
                        {/* Email Subscription */}
                        <div className="flex justify-center items-center">
                            <div className="relative w-full sm:w-80">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full sm:w-56 pl-4 pr-20 sm:pr-24 py-[10px] bg-white rounded-[5px] focus:outline-none placeholder-black text-black text-sm"
                                />
                                <button
                                    type="submit"
                                    className="absolute cursor-pointer w-[80px] sm:w-[101px] h-[30px] right-25 top-1/2 -translate-y-1/2 bg-[#4B2615] rounded-lg text-white text-xs sm:text-sm hover:bg-[#5a2f1a] transition-colors"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                        
                        {/* Social Links */}
                        <div>
                            <ul className='flex gap-4 sm:gap-6 text-[16px] sm:text-[18px] items-center'>
                                <li className='hidden sm:block'>Contacts</li>
                                <li className='text-lg hover:text-blue-400 cursor-pointer transition-colors'>
                                    <FaTwitter />
                                </li>
                                <li className='text-lg hover:text-blue-600 cursor-pointer transition-colors'>
                                    <FaFacebookF />
                                </li>
                                <li className='text-xl hover:text-red-500 cursor-pointer transition-colors'>
                                    <FaGooglePlusG />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className='h-[2px] bg-white/50'></div>
                
                {/* Bottom Section */}
                <div className='flex flex-col lg:flex-row justify-between items-center py-4 lg:py-6 text-sm gap-4 lg:gap-0'>
                    {/* Navigation Links */}
                    <div className='order-2 lg:order-1'> 
                        <ul className='flex flex-wrap gap-3 sm:gap-4 lg:gap-6 justify-center text-xs sm:text-sm'>
                            <li className='hover:text-gray-300 cursor-pointer transition-colors'>About</li>
                            <li className='hover:text-gray-300 cursor-pointer transition-colors'>Our Strategy</li>
                            <li className='hover:text-gray-300 cursor-pointer transition-colors'>Our Advantages</li>
                            <li className='hover:text-gray-300 cursor-pointer transition-colors hidden sm:block'>Social Responsibility</li>
                            <li className='hover:text-gray-300 cursor-pointer transition-colors'>Our Services</li>
                        </ul>
                    </div>
                    
                    {/* Copyright */}
                    <div className='order-1 lg:order-2 text-xs sm:text-sm text-center lg:text-right'>
                        &copy; 2024 Cafe. All Rights Reserved.
                    </div>  
                </div>
            </div>
        </div>
    );
};

export default Footer;
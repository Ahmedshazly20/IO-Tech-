"use client";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaWhatsapp,FaPhoneVolume  } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { MdPhoneInTalk } from "react-icons/md";

import 'swiper/css';
import 'swiper/css/navigation';

export const TeamSection = () => {

  
  const teamMembers = [
    {
      name: 'Name Here',
      position: 'POSITION HERE',
      image: 'https://placehold.co/400x400/1e293b/d1d5db?text=M',
    },
    {
      name: 'Name Here',
      position: 'POSITION HERE',
      image: 'https://placehold.co/400x400/334155/e5e7eb?text=M',
    },
    {
      name: 'Name Here',
      position: 'POSITION HERE',
      image: 'https://placehold.co/400x400/475569/f3f4f6?text=M',
    },
    {
      name: 'Name Here',
      position: 'POSITION HERE',
      image: 'https://placehold.co/400x400/64748b/f9fafb?text=M',
    },
    {
      name: 'Name Here',
      position: 'POSITION HERE',
      image: 'https://placehold.co/400x400/475569/f3f4f6?text=M',
    },
  ];

  const SocialSVG = ({ pathData }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="w-4 h-4 md:w-5 md:h-5 text-gray-500 hover:text-gray-700 transition-colors"
    >
      <path d={pathData} />
    </svg>
  );

  return (
    <div className="py-[16px] md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Our Team</h2>
        <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
        </p>

        <div className="relative mt-12">
          {/* Swiper Component */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            breakpoints={{
              768: {
                slidesPerView: 3,
                spaceBetween: 44,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            className="mySwiper"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center">
                  <Image 
                    src={'/dammy/team.png'} 
                    alt={member.name}
                    width={269}
                    height={148}
                    className="sm:w-36 sm:h-36 md:w-48 md:h-48 object-cover bg-[#643F2E] shadow-lg"
                  />
                  <h3 className="font-['DM_Sans'] font-bold text-[14px] leading-[26px] tracking-[2px] text-center uppercase">{member.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{member.position}</p>
                  <div className="flex gap-4 mt-3">
                    <a href="#" aria-label="Phone">
                      <FaWhatsapp />
                    </a>
                    <a href="#" aria-label="Mail">
                      <MdPhoneInTalk  />

                    </a>
                    <a href="#" aria-label="LinkedIn">
                      <CiMail />

                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
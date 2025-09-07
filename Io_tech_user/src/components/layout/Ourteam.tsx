"use client";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaWhatsapp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { MdPhoneInTalk } from "react-icons/md";

import 'swiper/css';
import 'swiper/css/navigation';
import { useGetTeamMembersQuery } from '@/store/api/apiSlice';
import { TeamMember } from '@/types/strapi';

export const TeamSection = () => {
  const { data: teamMembers, error, isLoading } = useGetTeamMembersQuery();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="py-[16px] md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Our Team</h2>
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="py-[16px] md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Our Team</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Team Members</h3>
            <p className="text-red-600">
              {'status' in error ? `Error ${error.status}` : 'An error occurred while loading team members'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!teamMembers?.data || teamMembers.data.length === 0) {
    return (
      <div className="py-[16px] md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Our Team</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Team Members Found</h3>
            <p className="text-gray-600">There are no team members available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="py-[16px] md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Our Team</h2>
        <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s
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
            {teamMembers.data.map((member: TeamMember) => (
              <SwiperSlide key={member.id}>
                <div className="flex flex-col items-center">
                  <Image 
                    src={member.Photo ? `${member.Photo.url}` : '/dammy/team.png'} 
                    alt={member.Photo?.alternativeText || member.Name}
                    width={269}
                    height={148}
                    className="sm:w-36 sm:h-36 md:w-48 md:h-48 object-cover bg-[#643F2E] shadow-lg rounded-lg"
                  />
                  <h3 className="font-['DM_Sans'] font-bold text-[14px] leading-[26px] tracking-[2px] text-center uppercase mt-4">
                    {member.Name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{member.Role}</p>
                  <div className="flex gap-4 mt-3">
                    {member.WhatsApp && (
                      <a 
                        href={`https://wa.me/${member.WhatsApp.replace(/[^0-9]/g, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className="text-green-500 hover:text-green-600 transition-colors"
                      >
                        <FaWhatsapp />
                      </a>
                    )}
                    {member.Phone && (
                      <a 
                        href={`tel:${member.Phone}`} 
                        aria-label="Phone"
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        <MdPhoneInTalk />
                      </a>
                    )}
                    {member.Email && (
                      <a 
                        href={`mailto:${member.Email}`} 
                        aria-label="Email"
                        className="text-gray-500 hover:text-gray-600 transition-colors"
                      >
                        <CiMail />
                      </a>
                    )}
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
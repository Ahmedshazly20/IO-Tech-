"use client";
import { useState } from 'react';
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
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
  };
  
  const getVisibleMembers = () => {
    const members = [];
    for (let i = 0; i < visibleCount; i++) {
      members.push(teamMembers[(currentIndex + i) % teamMembers.length]);
    }
    return members;
  };

  const ArrowSVG = ({ direction }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className="w-8 h-8 md:w-10 md:h-10 text-gray-400 hover:text-gray-600 transition-colors"
    >
      {direction === 'left' ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12 15.75 4.5" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12 8.25 19.5" />
      )}
    </svg>
  );

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
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Our Team</h2>
        <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
          has been the industry's standard dummy text ever since the 1500s.
        </p>

        <div className="relative mt-12 flex items-center justify-center">
          <button onClick={handlePrev} className="absolute left-0 z-10 p-2 rounded-full hidden md:block">
            <ArrowSVG direction="left" />
          </button>
          
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-8 md:gap-12 lg:gap-16 transition-transform duration-300 ease-in-out">
            {getVisibleMembers().map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <h3 className="mt-6 text-lg sm:text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{member.position}</p>
                <div className="flex gap-4 mt-3">
                  <a href="#" aria-label="Phone">
                    <SocialSVG pathData="M16.5 6V4.5H7.5V6H4.5A1.5 1.5 0 0 0 3 7.5V16.5A1.5 1.5 0 0 0 4.5 18H19.5A1.5 1.5 0 0 0 21 16.5V7.5A1.5 1.5 0 0 0 19.5 6H16.5Z" />
                  </a>
                  <a href="#" aria-label="Mail">
                    <SocialSVG pathData="M21 5H3C2.17 5 1.5 5.67 1.5 6.5V17.5C1.5 18.33 2.17 19 3 19H21C21.83 19 22.5 18.33 22.5 17.5V6.5C22.5 5.67 21.83 5 21 5ZM21 17.5H3V7.5L12 13.5L21 7.5V17.5Z" />
                  </a>
                  <a href="#" aria-label="LinkedIn">
                    <SocialSVG pathData="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm15-11h-3v11h3v-11zm-15-1a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm14 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <button onClick={handleNext} className="absolute right-0 z-10 p-2 rounded-full hidden md:block">
            <ArrowSVG direction="right" />
          </button>
        </div>
      </div>
    </div>
  );
};
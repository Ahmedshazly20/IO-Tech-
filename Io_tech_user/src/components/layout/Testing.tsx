import React, { useState } from 'react';

// Main application component containing all sections
export default function App() {
  return (
    <div className="font-sans">
      <HeroSection />
      <TeamSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
}

// --- Hero Section Component ---


// --- Team Section Component ---
const TeamSection = () => {
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

// --- Testimonial Section Component ---
const TestimonialSection = () => {
  const testimonials = [
    {
      text: "With the help of the hospitable staff of Al Safar and Partners I was able to get my work done without any hassle. The help I received helped me a great deal to overcome the issues that I faced. I was always updated about my case and my queries never went unanswered.",
      name: 'Mohammed Saif',
      title: 'CEO/Company',
      image: 'https://placehold.co/400x400/334155/e5e7eb?text=M',
    },
    {
      text: "This company is amazing. They provided excellent service and the team was a pleasure to work with. I would highly recommend them to anyone looking for their services.",
      name: 'Jane Doe',
      title: 'CTO/Company',
      image: 'https://placehold.co/400x400/475569/f3f4f6?text=J',
    },
    {
      text: "Incredible experience from start to finish. The attention to detail and customer care are unparalleled. I'm a customer for life!",
      name: 'John Smith',
      title: 'Founder/Company',
      image: 'https://placehold.co/400x400/1e293b/d1d5db?text=J',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  const ArrowSVG = ({ direction }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className="w-8 h-8 md:w-10 md:h-10 text-white hover:text-gray-300 transition-colors"
    >
      {direction === 'left' ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12 15.75 4.5" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12 8.25 19.5" />
      )}
    </svg>
  );

  return (
    <div className="bg-[#483a2d] py-16 md:py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">What our clients are saying</h2>
        <p className="mt-4 text-sm sm:text-base max-w-xl text-gray-300">
          Our clients range from individual investors to local, international as well as fortune 500 companies.
          Our clients range from individual investors, to local, international as well as fortune 500 companies.
        </p>

        <div className="mt-12 md:mt-16 relative flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-white shadow-lg flex-shrink-0">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/2 relative">
            <p className="text-lg md:text-xl italic font-light text-gray-200 leading-relaxed">
              &ldquo;{currentTestimonial.text}&rdquo;
            </p>
            <div className="mt-6">
              <h3 className="text-xl font-semibold">{currentTestimonial.name}</h3>
              <p className="mt-1 text-sm text-gray-400">{currentTestimonial.title}</p>
            </div>
            
            <div className="mt-8 flex justify-end gap-4">
              <button onClick={handlePrev} className="p-2 rounded-full border border-gray-500 hover:border-gray-300 transition-colors">
                <ArrowSVG direction="left" />
              </button>
              <button onClick={handleNext} className="p-2 rounded-full border border-gray-500 hover:border-gray-300 transition-colors">
                <ArrowSVG direction="right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Footer Section Component (New) ---
const Footer = () => {
    return (
        <footer className="bg-[#483a2d] text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 text-sm text-gray-300">
                    <a href="#" className="hover:text-white transition-colors">About</a>
                    <a href="#" className="hover:text-white transition-colors">Our Strategy</a>
                    <a href="#" className="hover:text-white transition-colors">Our Advantages</a>
                    <a href="#" className="hover:text-white transition-colors">Social Responsibility</a>
                    <a href="#" className="hover:text-white transition-colors">Our Services</a>
                </div>
                <div className="flex items-center space-x-4 mt-8 md:mt-0">
                    <span className="text-sm text-gray-300">© 2024, All rights reserved.</span>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.103 0-5.617 2.514-5.617 5.617 0 .44.05.86.152 1.261-4.67-2.34-8.82-4.94-11.59-8.77-.48.82-.75 1.77-.75 2.76 0 1.95.99 3.667 2.49 4.67-..92-.03-1.78-.28-2.54-.7v.07c0 2.72 1.937 4.99 4.512 5.51-.47.128-.96.195-1.46.195-.36 0-.72-.03-1.06-.1.72 2.25 2.81 3.89 5.29 3.93-1.92 1.5-4.34 2.4-6.98 2.4-..45 0-.9-.02-1.34-.08 2.47 1.58 5.4 2.5 8.51 2.5 10.21 0 15.78-8.49 15.78-15.78 0-.24-.01-.48-.02-.72.67-.48 1.25-1.09 1.7-1.78z" /></svg>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.5 0h-21c-..829 0-1.5.671-1.5 1.5v21c0 .829.671 1.5 1.5 1.5h21c.829 0 1.5-.671 1.5-1.5v-21c0-.829-.671-1.5-1.5-1.5zM20 22h-17v-17h17v17zM18 6c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zM19 14h-2v7h-3v-7h-2v7h-3v-8h-2v8h-3v-11h15v11z" /></svg>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 0h-18c-1.657 0-3 1.343-3 3v18c0 1.657 1.343 3 3 3h18c1.657 0 3-1.343 3-3v-18c0-1.657-1.343-3-3-3zm-11 19h-3v-11h3v11zm-2-13.25c.68 0 1.25-.57 1.25-1.25s-.57-1.25-1.25-1.25-1.25.57-1.25 1.25.57 1.25 1.25 1.25zm13 13.25h-3v-7.14c0-3.23-.97-5.07-4.49-5.07-2.92 0-4.01 1.9-4.01 4.77v7.44h-3v-11h2.52s.06 1.48 0 2.29h.05c1.07-1.66 2.5-2.73 4.2-2.73 3.69 0 4.67 2.45 4.67 5.75v5.7h2.56v-5.7c0-2.22-.84-3.69-2.92-3.69-1.92 0-2.88 1.1-2.88 2.65v5.69h2.95v-8.08c0-1.34 1.1-1.89 2.07-1.89h.05v-1.12c-.06-.05-.09-.08-.15-.12z" /></svg>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-12v8l6-4-6-4z" /></svg>
                    </a>
                </div>
            </div>
        </footer>
    );
};

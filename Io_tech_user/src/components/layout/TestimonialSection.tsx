'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Mohammed Saif",
      company: "CEO/Company",
      quote: "With the help of the hospitable staff of Al Safar and Partners I was able to get my work done without any hassle. The help I received helped me a great deal to overcome the issues that I faced. I was always updated about my case and my queries never went unanswered.",
      image: "/dammy/team.png"
    },
    {
      id: 2,
      name: "Ahmed Ali",
      company: "Managing Director",
      quote: "The professional service and expertise provided by the team exceeded our expectations. Their attention to detail and commitment to client satisfaction is truly remarkable.",
      image: "/dammy/team.png"
    },
    {
      id: 3,
      name: "Sarah Johnson",
      company: "Business Owner",
      quote: "Outstanding legal consultation services. The team's knowledge and professionalism helped us navigate complex business regulations with ease.",
      image: "/dammy/team.png"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentClient = testimonials[currentTestimonial];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#4B2615]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 lg:space-y-12">
          
          {/* Header Section */}
          <div className="max-w-full lg:max-w-1/2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 lg:mb-10 leading-tight">
              What our clients are saying
            </h2>
          
            <p className="text-white/70 text-base sm:text-lg mb-8 lg:mb-12 leading-relaxed">
              Our clients range from individual investors, to local, international as 
              well as Fortune 500 companies. Our clients range from individual 
              investors, to local, international as well as Fortune 500 companies.
            </p>
          </div>

          {/* Testimonial Card */}
          <div className=" backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-12  border-white/10">
            
            {/* Main Content */}
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 mb-6 lg:mb-8">
              
              {/* Image Section */}
              <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
                <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-full lg:h-auto lg:aspect-square overflow-hidden rounded-lg bg-white/10">
                  <Image 
                    src={currentClient.image}
                    alt={currentClient.name}
                    width={374}
                    height={374}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Content Section */}
              <div className="w-full lg:w-2/3 flex flex-col justify-between min-h-full">
                
                {/* Quote */}
                <blockquote className="text-white/80 leading-relaxed text-base sm:text-lg lg:text-xl xl:text-2xl mb-6 lg:mb-8">
                  "{currentClient.quote}"
                </blockquote>
                
                {/* Client Info */}
                <div className="mb-4 lg:mb-0">
                  <h4 className="text-white font-bold text-lg sm:text-xl lg:text-2xl mb-1">
                    {currentClient.name}
                  </h4>
                  <p className="text-white/70 text-sm sm:text-base">
                    {currentClient.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center  justify-end pt-4 lg:pt-6 border-t border-white/10">
              
             
              
              {/* Arrow Navigation */}
              <div className="flex j space-x-3 sm:space-x-4">
                <button
                  onClick={prevTestimonial}
                  className="text-white bg-white/5 hover:bg-white hover:text-[#4b2615] rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-105"
                >
                  <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="text-white bg-white/5 hover:bg-white hover:text-[#4b2615] rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-105"
                >
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
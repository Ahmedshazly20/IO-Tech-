'use client';

import { useState } from 'react';
import Image from 'next/image';
import {   ArrowRight ,ArrowLeft   } from 'lucide-react';

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
    <section className="py-20  bg-[#4B2615]">
      <div className=" container mx-auto  px-1 sm:px-6 lg:px-8">
        <div className="">
          
            <div className='max-w-1/2'>
                <h2 className="text-[40px] md:text-5xl font-bold text-white mb-10">
               What our clients are saying
                </h2>
          
          <p className="text-white/70 text-[18px] mb-12 ">
            Our clients range from individual investors, to local, international as 
            well as Fortune 500 companies. Our clients range from individual 
            investors, to local, international as well as Fortune 500 companies.
          </p>
            
            
             
 
          </div>
        

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10">
            <div className="flex  flex-row md:flex-row items-start gap-4 h-full">
              <div className="w-1/3 ">
                <div className=" overflow-hidden bg-white/10">
                  <Image 
                    src={currentClient.image}
                    alt={currentClient.name}
                    width={374}
                    height={374}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="w-2/3 flex h-[-webkit-fill-available] flex-col justify-between items-start "> 
                
                <blockquote className="text-white/60 leading-[40px] text-[24px] md:text-xl  mb-6">
                  "{currentClient.quote}"
                </blockquote>
                
                <div className="mb-8">
                  <h4 className="text-white font-bold text-lg mb-1 text-[24px] md:text-xl">
                    {currentClient.name}
                  </h4>
                  <p className="text-white/70 text-sm">
                    {currentClient.company}
                  </p>
                </div>

               
               

              </div>
            </div>


             <div className="flex items-center justify-between ">
                  <div className="flex space-x-2 ">
                  
                  </div>
                  
                  <div className="flex space-x-6  rounded-full justify-between">
                    <button
                      onClick={prevTestimonial}
                      className="text-white bg-white/5 hover:bg-white hover:text-[#4b2615] rounded-full p-2 "
                    >
                      <ArrowLeft className="w-10 h-10" />
                     
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="text-white bg-white/5 hover:bg-white hover:text-[#4b2615] rounded-full p-2 "
                    >
                       <ArrowRight  className="w-10 h-10" />
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
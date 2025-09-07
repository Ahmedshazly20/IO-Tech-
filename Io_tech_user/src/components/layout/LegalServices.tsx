import Link from 'next/link';
import React from 'react';

const LegalServices = () => {
  return (
    <div className="bg-[#F8F5EF] p-8 md:p-16 font-['DM_Sans']">
      <div className="max-w-4xl mx-auto">

       
        <Link  href="/" className="flex items-center text-gray-700 hover:text-gray-900 transition-colors mb-8">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back
        </Link >

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Legal Consultation Services</h1>

      
        <p className="text-gray-600 leading-relaxed mb-12">
          Law Firm is one of the leading legal offices that offer exceptional advisory services for both individuals and companies. Our mission is to provide comprehensive and specialized legal support to meet our clients’ needs and offer the best legal solutions in various cases and legal fields, we provide our legal consultations services as a follow:
        </p>

       
        <div className="space-y-12">

         
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-[#643F2E] mr-2"></span>
              General Legal Consultations
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At Law Firm, we provide comprehensive legal consultations covering all legal aspects that our clients may encounter in their daily lives or business activities. Our goal is to offer accurate legal advice based on a deep understanding of local and international laws.
            </p>
          </div>

         
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-[#643F2E] mr-2"></span>
              Corporate Legal Consultations
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We at the Law Firm understand the importance of legal consultations for companies in building and enhancing their businesses.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our advisory services about:
            </p>
            <ul className="list-disc list-inside text-gray-600 ml-4 leading-relaxed">
              <li>Establishing and registering companies.</li>
              <li>All kinds of contracts and agreements.</li>
              <li>Commercial disputes.</li>
              <li>Compliance with local and international laws and regulations.</li>
            </ul>
          </div>

          
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-[#643F2E] mr-2"></span>
              Individual Legal Consultations
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Law Firm offers customized advisory services for individuals, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 ml-4 leading-relaxed">
              <li>Family issues such as divorce, alimony, and custody.</li>
              <li>Real estate matters like buying, selling, and renting properties.</li>
              <li>Employment issues such as hiring and wrongful termination.</li>
              <li>Criminal cases and defending personal rights.</li>
            </ul>
          </div>
        </div>

   
        <p className="text-[#483a2d] font-semibold mt-12 text-center">
          At Law Firm, we aim to provide the best legal services to ensure your rights and offer effective legal
        </p>
      </div>
    </div>
  );
};

export default LegalServices;
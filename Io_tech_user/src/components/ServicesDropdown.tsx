'use client';

import { useGetServicesQuery } from '../store/api/apiSlice';
import { Service } from '../types/strapi';

interface ServicesDropdownProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ServicesDropdown = ({ isOpen, onMouseEnter, onMouseLeave }: ServicesDropdownProps) => {
  const { data: services, error, isLoading } = useGetServicesQuery();

  // Fallback data in case API fails
  const fallbackServicesList = [
    { title: 'Legal Consultation Services', links: ['Contracts', 'Notarization', 'Insurance'] },
    { title: 'Defense in All Cases', links: ['Banks and Financial Institutions', 'Corporate Governance Services', 'Companies Liquidation', 'Internal Regulations'] },
    { title: 'Services for Companies', links: ['Arbitration', 'Intellectual Property', 'Corporate Restructuring', 'Reorganization'] },
    { title: 'Establishing Companies', links: ['Commercial Agencies', 'Supporting Vision 2030', 'Estates', 'Foreign Companies'] }
  ];

  // Use real data if available, otherwise fallback
  const servicesList = services?.data ? 
    services.data.map((service: Service) => ({
      title: service.Title,
      links: service.services.map(subService => subService.title)
    })) : 
    fallbackServicesList;

  if (!isOpen) return null;

  return (
    <div 
      className="fixed top-20 container mx-auto left-0 right-0 rounded-[10px] z-50 bg-[#4B2615] text-white backdrop-blur-sm shadow-2xl p-8 transform transition-all duration-300 ease-in-out"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8">
            <p className="text-red-300">Failed to load services. Using fallback data.</p>
          </div>
        )}
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesList.map((column, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <h4 className="font-semibold text-white text-sm border-b border-gray-200 pb-4">
                {column.title}
              </h4>
              {column.links.map((link, linkIndex) => (
                <a 
                  key={linkIndex} 
                  href="#" 
                  className="text-sm text-white/90 text-[14px] pb-5 hover:text-blue-500 transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesDropdown;

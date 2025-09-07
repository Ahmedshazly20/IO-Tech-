'use client';

import { useGetServicesQuery } from '../store/api/apiSlice';
import { Service } from '../types/strapi';

const ServicesList = () => {
  const { data, error, isLoading } = useGetServicesQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Services</h3>
        <p className="text-red-600">
          {'status' in error ? `Error ${error.status}` : 'An error occurred while loading services'}
        </p>
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Services Found</h3>
        <p className="text-gray-600">There are no services available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover the comprehensive range of services we offer
          </p>
        </div>
        
        <div className="space-y-8">
          {data.data.map((service: Service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {service.Title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.Description}
                </p>
                
                {/* Sub-services */}
                {service.services && service.services.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Our Services:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {service.services.map((subService) => (
                        <div
                          key={subService.id}
                          className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <h5 className="font-semibold text-gray-900 mb-2">
                            {subService.title}
                          </h5>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {subService.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesList;

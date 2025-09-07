'use client';

import { useGetServiceByIdQuery } from '../../store/api/apiSlice';

interface ServiceExampleProps {
  serviceId: string;
}

const ServiceExample = ({ serviceId }: ServiceExampleProps) => {
  const { data, error, isLoading } = useGetServiceByIdQuery(serviceId);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Service</h3>
        <p className="text-red-600">
          {'status' in error ? `Error ${error.status}` : 'An error occurred'}
        </p>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-gray-600">Service not found</p>
      </div>
    );
  }

  const service = data.data;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {service.Title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          {service.Description}
        </p>
        
        {/* Sub-services */}
        {service.services && service.services.length > 0 && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Services:</h4>
            <div className="space-y-2">
              {service.services.map((subService) => (
                <div
                  key={subService.id}
                  className="bg-gray-50 rounded p-3"
                >
                  <h5 className="font-semibold text-gray-900 mb-1">
                    {subService.title}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {subService.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceExample;

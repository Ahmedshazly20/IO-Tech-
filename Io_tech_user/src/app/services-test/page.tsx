'use client';

import { useGetServicesQuery } from '../../store/api/apiSlice';
import { Service } from '../../types/strapi';

export default function ServicesTestPage() {
  const { data, error, isLoading } = useGetServicesQuery();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Services API Test Page</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Services API Response</h2>
          
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
              <p className="text-red-600">
                {'status' in error ? `Error ${error.status}` : 'An error occurred'}
              </p>
            </div>
          )}
          
          {data && (
            <div>
              <p className="text-green-600 mb-4">✅ API call successful!</p>
              <p className="text-gray-600 mb-6">
                Found {data.data.length} service categories
              </p>
              
              <div className="space-y-8">
                {data.data.map((service: Service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.Title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.Description}
                    </p>
                    
                    {service.services && service.services.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">
                          Sub-services ({service.services.length}):
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {service.services.map((subService) => (
                            <div
                              key={subService.id}
                              className="bg-gray-50 rounded-lg p-4"
                            >
                              <h5 className="font-semibold text-gray-900 mb-2">
                                {subService.title}
                              </h5>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {subService.description}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                Slug: {subService.slug}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <details className="mt-8">
                <summary className="cursor-pointer text-blue-600 hover:text-blue-800 font-semibold">
                  View Raw JSON Response
                </summary>
                <pre className="mt-4 bg-gray-100 p-4 rounded text-xs overflow-auto max-h-96">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

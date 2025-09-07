'use client';

import { useGetTeamMembersQuery } from '../../store/api/apiSlice';

export default function TestApiPage() {
  const { data, error, isLoading } = useGetTeamMembersQuery();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">API Test Page</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Team Members API Response</h2>
          
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
              <p className="text-gray-600 mb-4">
                Found {data.data.length} team members
              </p>
              
              <div className="space-y-4">
                {data.data.map((member) => (
                  <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-lg">{member.Name}</h3>
                    <p className="text-gray-600">{member.Role}</p>
                    {member.Photo && (
                      <div className="mt-2">
                        <img 
                          src={`http://localhost:1337${member.Photo.url}`}
                          alt={member.Photo.alternativeText || member.Name}
                          className="w-20 h-20 object-cover rounded"
                        />
                      </div>
                    )}
                    <div className="mt-2 text-sm text-gray-500">
                      <p>WhatsApp: {member.WhatsApp || 'N/A'}</p>
                      <p>Phone: {member.Phone || 'N/A'}</p>
                      <p>Email: {member.Email || 'N/A'}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <details className="mt-6">
                <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                  View Raw JSON Response
                </summary>
                <pre className="mt-2 bg-gray-100 p-4 rounded text-xs overflow-auto">
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

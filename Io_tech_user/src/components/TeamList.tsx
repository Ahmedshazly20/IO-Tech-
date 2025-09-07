'use client';

import { useGetTeamMembersQuery } from '../store/api/apiSlice';
import { TeamMember } from '../types/strapi';

const TeamList = () => {
  const { data, error, isLoading } = useGetTeamMembersQuery();

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
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Team Members</h3>
        <p className="text-red-600">
          {'status' in error ? `Error ${error.status}` : 'An error occurred while loading team members'}
        </p>
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Team Members Found</h3>
        <p className="text-gray-600">There are no team members available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Team
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Meet the talented individuals behind our success
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data.data.map((member: TeamMember) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden text-center"
            >
              <div className="relative">
                {member.Photo ? (
                  <img
                    src={`http://localhost:1337${member.Photo.url}`}
                    alt={member.Photo.alternativeText || member.Name}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-semibold text-gray-500">
                        {member.Name.charAt(0)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.Name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.Role}
                </p>
                {member.WhatsApp && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    WhatsApp: {member.WhatsApp}
                  </p>
                )}
                {member.Email && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Email: {member.Email}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamList;

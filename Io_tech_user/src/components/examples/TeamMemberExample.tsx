'use client';

import { useGetTeamMemberByIdQuery } from '../../store/api/apiSlice';

interface TeamMemberExampleProps {
  memberId: string;
}

const TeamMemberExample = ({ memberId }: TeamMemberExampleProps) => {
  const { data, error, isLoading } = useGetTeamMemberByIdQuery(memberId);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="animate-pulse">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Team Member</h3>
        <p className="text-red-600">
          {'status' in error ? `Error ${error.status}` : 'An error occurred'}
        </p>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-600">Team member not found</p>
      </div>
    );
  }

  const member = data.data;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
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
  );
};

export default TeamMemberExample;

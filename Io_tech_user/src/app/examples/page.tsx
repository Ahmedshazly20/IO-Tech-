'use client';

import ServicesList from '../../components/ServicesList';
import TeamList from '../../components/TeamList';
import ServiceExample from '../../components/examples/ServiceExample';
import TeamMemberExample from '../../components/examples/TeamMemberExample';

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Redux Toolkit + RTK Query Examples
          </h1>
          <p className="text-lg text-gray-600">
            Demonstrating data fetching from Strapi CMS using Redux Toolkit Query
          </p>
        </div>

        {/* Services Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Services List (useGetServicesQuery) - Nested Structure
            </h2>
            <p className="text-gray-600 mb-4">
              This shows the nested services structure where each service category contains multiple sub-services.
            </p>
            <ServicesList />
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Team Members List (useGetTeamMembersQuery)
            </h2>
            <TeamList />
          </div>
        </section>

        {/* Individual Service Example */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Individual Service (useGetServiceByIdQuery)
            </h2>
            <p className="text-gray-600 mb-4">
              Example: Fetching service with ID "1" (change the ID in the component to test with different services)
            </p>
            <div className="max-w-md">
              <ServiceExample serviceId="1" />
            </div>
          </div>
        </section>

        {/* Individual Team Member Example */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Individual Team Member (useGetTeamMemberByIdQuery)
            </h2>
            <p className="text-gray-600 mb-4">
              Example: Fetching team member with ID "1" (change the ID in the component to test with different members)
            </p>
            <div className="max-w-sm">
              <TeamMemberExample memberId="1" />
            </div>
          </div>
        </section>

        {/* Usage Instructions */}
        <section className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            How to Use These Components
          </h2>
          <div className="space-y-4 text-blue-800">
            <div>
              <h3 className="font-semibold">1. Import the hooks:</h3>
              <pre className="bg-blue-100 p-2 rounded mt-2 text-sm overflow-x-auto">
{`import { 
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetTeamMembersQuery,
  useGetTeamMemberByIdQuery 
} from '../store/api/apiSlice';`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold">2. Use in your components:</h3>
              <pre className="bg-blue-100 p-2 rounded mt-2 text-sm overflow-x-auto">
{`const { data, error, isLoading } = useGetServicesQuery();`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold">3. Handle states:</h3>
              <pre className="bg-blue-100 p-2 rounded mt-2 text-sm overflow-x-auto">
{`if (isLoading) return <div>Loading...</div>;
if (error) return <div>Error occurred</div>;
if (!data) return <div>No data</div>;`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

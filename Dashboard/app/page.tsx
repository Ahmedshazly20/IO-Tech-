'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetServiceCategories, useGetServices, useGetTeamMembers } from '@/lib/strapi';
import { FolderOpen, Wrench, Users, Building } from 'lucide-react';

export default function Dashboard() {
  // Fetch data from Strapi API
  const { data: serviceCategoriesResponse, isLoading: loadingCategories } = useGetServiceCategories();
  const { data: servicesResponse, isLoading: loadingServices } = useGetServices();
  const { data: teamMembersResponse, isLoading: loadingTeamMembers } = useGetTeamMembers();

  // Extract data arrays from API responses
  const serviceCategories = serviceCategoriesResponse?.data || [];
  const services = servicesResponse?.data || [];
  const teamMembers = teamMembersResponse?.data || [];

  // Calculate stats from real API data
  const stats = [
    {
      title: 'Service Categories',
      value: serviceCategories.length,
      icon: FolderOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Services',
      value: services.length,
      icon: Wrench,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Team Members',
      value: teamMembers.length,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Company Info',
      value: 1,
      icon: Building,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
  ];

  // Show loading state
  if (loadingCategories || loadingServices || loadingTeamMembers) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Loading dashboard data...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="animate-pulse h-8 bg-gray-200 rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to your admin dashboard. Manage your services, team, and company information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Service Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {serviceCategories.length > 0 ? (
                serviceCategories.slice(0, 5).map((category: any) => (
                  <div key={category.documentId} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{category.Title || category.title}</p>
                      <p className="text-sm text-gray-500">{category.Slug || category.slug}</p>
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No service categories found</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMembers.length > 0 ? (
                teamMembers.slice(0, 5).map((member: any) => (
                  <div key={member.documentId} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{member.Name || member.name}</p>
                      <p className="text-sm text-gray-500">{member.Role || member.role}</p>
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(member.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No team members found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
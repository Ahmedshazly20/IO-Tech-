import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dataStore } from '@/lib/data';
import { FolderOpen, Wrench, Users, Building } from 'lucide-react';

export default function Dashboard() {
  const serviceCategories = dataStore.getServiceCategories();
  const services = dataStore.getServices();
  const teamMembers = dataStore.getTeamMembers();

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
              {serviceCategories.slice(0, 5).map((category) => (
                <div key={category.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{category.title}</p>
                    <p className="text-sm text-gray-500">{category.slug}</p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {category.createdAt.toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMembers.slice(0, 5).map((member) => (
                <div key={member.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {member.createdAt.toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
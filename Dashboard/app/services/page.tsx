import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { dataStore } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function ServicesPage() {
  const services = dataStore.getServices();
  const categories = dataStore.getServiceCategories();

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.title || 'Unknown Category';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Services"
        description="Manage your services"
        action={
          <Link href="/services/add">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {service.title}
                    </h3>
                    <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                      {getCategoryName(service.categoryId)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    Slug: {service.slug}
                  </p>
                  <p className="text-gray-600 mb-2">
                    {service.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    Created: {formatDate(service.createdAt)}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Link href={`/services/edit/${service.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {services.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No services found.</p>
              {categories.length > 0 ? (
                <Link href="/services/add" className="mt-4 inline-block">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Service
                  </Button>
                </Link>
              ) : (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-4">
                    You need to create at least one service category first.
                  </p>
                  <Link href="/service-categories/add">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Service Category
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
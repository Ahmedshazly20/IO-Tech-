'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGetServices, useGetServiceCategories, useDeleteService } from '@/lib/strapi';
import { formatDate } from '@/lib/utils';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Service, ServiceCategory } from '@/types';

export default function ServicesPage() {
  const { data: servicesRes, isLoading: servicesLoading } = useGetServices();
  const { data: categoriesRes, isLoading: categoriesLoading } = useGetServiceCategories();
  const { mutateAsync: deleteService, isPending: isDeleting } = useDeleteService();

  const services = (servicesRes as { data?: Service[] } | undefined)?.data || [];
  const categories = (categoriesRes as { data?: ServiceCategory[] } | undefined)?.data || [];

  const getCategoryName = (service: Service & { Service?: any }) => {
    const relation = (service as any)?.Service;
    if (!relation) return 'Unknown Category';
    if (typeof relation === 'string') {
      const match = categories.find(cat => cat.documentId === relation || String(cat.id) === String(relation));
      return match?.Title || 'Unknown Category';
    }
    return relation?.Title || relation?.title || 'Unknown Category';
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
        {(servicesLoading || categoriesLoading) && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading services...</p>
            </CardContent>
          </Card>
        )}
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
                      {getCategoryName(service as any)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    Slug: {service.slug}
                  </p>
                  <p className="text-gray-600 mb-2">
                    {service.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    Created: {formatDate(new Date(service.createdAt))}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                 
                  <Button 
                    variant="destructive" 
                    size="sm"
                    disabled={isDeleting}
                    onClick={async () => {
                      if (!confirm(`Delete service "${service.title}"? This cannot be undone.`)) return;
                      try {
                        await deleteService(service.documentId as any);
                      } catch (e) {
                        console.error('Delete service failed', e);
                        alert('Failed to delete service.');
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {!servicesLoading && services.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No services found.</p>
              {!categoriesLoading && categories.length > 0 ? (
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
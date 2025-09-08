'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGetServiceCategories, useDeleteServiceCategory } from '@/lib/strapi';
import { formatDate } from '@/lib/utils';
import { Plus, Edit, Trash2, AlertCircle } from 'lucide-react';
import { ServiceCategory } from '@/types';
import { log } from 'console';

export default function ServiceCategoriesPage() {
  const { data, isLoading, isError, error, refetch } = useGetServiceCategories();
  const { mutateAsync: deleteCategory, isPending } = useDeleteServiceCategory();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const categories = (data as { data?: ServiceCategory[] } | undefined)?.data || [];

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteCategory(id.toString());
      await refetch();
    } catch (err) {
      console.error('Error deleting service category:', err);
      alert('Failed to delete service category. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };
       
  console.log({ data, isLoading, isError, error });
  

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Service Categories"
          description="Manage your service categories"
        />
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-gray-600">Loading service categories...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Service Categories"
          description="Manage your service categories"
        />
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{(error as Error)?.message || 'Failed to fetch service categories'}</p>
            <Button onClick={() => refetch()} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Service Categories"
        description="Manage your service categories"
        action={
          <Link href="/service-categories/add">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.Title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Slug: {category.Slug}
                  </p>
                  {category.Description && (
                    <p className="text-gray-600 mt-2">
                      {category.Description}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    Created: {formatDate(new Date(category.createdAt))}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Link href={`/service-categories/edit/${category.documentId}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(category.id, category.Title)}
                    disabled={deletingId === category.id || isPending}
                  >
                    {deletingId === category.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {categories.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No service categories found.</p>
              <Link href="/service-categories/add" className="mt-4 inline-block">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Category
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { dataStore } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function ServiceCategoriesPage() {
  const categories = dataStore.getServiceCategories();

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
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Slug: {category.slug}
                  </p>
                  {category.description && (
                    <p className="text-gray-600 mt-2">
                      {category.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    Created: {formatDate(category.createdAt)}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Link href={`/service-categories/edit/${category.id}`}>
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
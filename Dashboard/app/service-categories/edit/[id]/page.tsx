import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { strapiApi } from '@/lib/strapi';
import EditServiceCategoryForm from './forms';

// This function is required for Next.js static export to pre-render pages
export async function generateStaticParams() {
  const categories = await strapiApi.getServiceCategories();
  
  if (!categories || !categories.data) {
    return [];
  }
  
  return categories.data.map((category: any) => ({
    id: String(category.id),
  }));
}

interface EditServiceCategoryPageProps {
  params: {
    id: string;
  };
}

// This is a Server Component, it fetches data before rendering
export default async function EditServiceCategoryPage({ params }: EditServiceCategoryPageProps) {
  const categoryData = await strapiApi.getServiceCategory(params.id);

  if (!categoryData?.data) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        title="Edit Service Category"
        description="Update service category details"
        backLink="/service-categories"
      />
      <Card>
        <CardContent className="p-6">
          <EditServiceCategoryForm initialData={categoryData.data} />
        </CardContent>
      </Card>
    </div>
  );
}
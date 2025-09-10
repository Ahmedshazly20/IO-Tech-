"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useGetServiceCategory, useUpdateServiceCategory, useGetServiceCategories } from '@/lib/strapi';
import { generateSlug } from '@/lib/utils';
import { FormErrors } from '@/types';

interface EditServiceCategoryPageProps {
  params: {
    id: string;
  };
}

export default function EditServiceCategoryPage({ params }: EditServiceCategoryPageProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    Title: '',
    Slug: '',
    Description: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const { data: categoryData, isLoading, isError, error: fetchError } = useGetServiceCategory(params.id);
  const { data: allCategoriesData } = useGetServiceCategories();
  const { mutate: updateCategory, isPending: isSubmitting, isError: updateError, error: updateMemberError } = useUpdateServiceCategory();

  useEffect(() => {
    if (categoryData) {
      setFormData({
        Title: categoryData.data.Title,
        Slug: categoryData.data.Slug,
        Description: categoryData.data.Description || ''
      });
    } else if (isError) {
      router.push('/service-categories');
    }
  }, [categoryData, isError, router]);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.Title.trim()) {
      newErrors.Title = 'Title is required';
    }
    if (!formData.Slug.trim()) {
      newErrors.Slug = 'Slug is required';
    } else {
      const existingCategories = allCategoriesData?.data || [];
      if (existingCategories.some((cat: any) => cat.Slug === formData.Slug && cat.id !== parseInt(params.id))) {
        newErrors.Slug = 'Slug must be unique';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    updateCategory({
      id: params.id,
      data: {
        Title: formData.Title.trim(),
        Slug: formData.Slug.trim(),
        Description: formData.Description.trim() || undefined
      }
    }, {
      onSuccess: () => {
        router.push('/service-categories');
      },
      onError: (error) => {
        console.error('Error updating category:', error);
        alert('Failed to update category. Please try again.');
      },
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Title = e.target.value;
    setFormData(prev => ({
      ...prev,
      Title,
      Slug: generateSlug(Title)
    }));
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl text-red-500">Error loading category.</h2>
        <p className="text-gray-600">Please check the ID and try again.</p>
        <Button onClick={() => router.push('/service-categories')} className="mt-4">
          Go back
        </Button>
      </div>
    );
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <Input
                type="text"
                value={formData.Title}
                onChange={handleTitleChange}
                placeholder="Enter category title"
                className={errors.Title ? 'border-red-500' : ''}
              />
              {errors.Title && (
                <p className="text-sm text-red-500 mt-1">{errors.Title}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <Input
                type="text"
                value={formData.Slug}
                onChange={(e) => setFormData(prev => ({ ...prev, Slug: e.target.value }))}
                placeholder="category-slug"
                className={errors.Slug ? 'border-red-500' : ''}
              />
              {errors.Slug && (
                <p className="text-sm text-red-500 mt-1">{errors.Slug}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Used in URLs. Auto-generated from title, but you can customize it.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                value={formData.Description}
                onChange={(e) => setFormData(prev => ({ ...prev, Description: e.target.value }))}
                placeholder="Optional description of the category"
                rows={4}
              />
            </div>
            <div className="flex space-x-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Updating...' : 'Update Category'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
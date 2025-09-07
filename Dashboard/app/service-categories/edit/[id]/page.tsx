'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { dataStore } from '@/lib/data';
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
    title: '',
    slug: '',
    description: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const category = dataStore.getServiceCategory(params.id);
    if (category) {
      setFormData({
        title: category.title,
        slug: category.slug,
        description: category.description || ''
      });
    } else {
      router.push('/service-categories');
    }
    setIsLoading(false);
  }, [params.id, router]);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else {
      const existingCategories = dataStore.getServiceCategories();
      if (existingCategories.some(cat => cat.slug === formData.slug && cat.id !== params.id)) {
        newErrors.slug = 'Slug must be unique';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      dataStore.updateServiceCategory(params.id, {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        description: formData.description.trim() || undefined
      });
      
      router.push('/service-categories');
    } catch (error) {
      console.error('Error updating category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
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
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Enter category title"
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <Input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="category-slug"
                className={errors.slug ? 'border-red-500' : ''}
              />
              {errors.slug && (
                <p className="text-sm text-red-500 mt-1">{errors.slug}</p>
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
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
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
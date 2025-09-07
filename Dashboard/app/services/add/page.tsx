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
import { FormErrors, ServiceCategory } from '@/types';

export default function AddServicePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    categoryId: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const serviceCategories = dataStore.getServiceCategories();
    setCategories(serviceCategories);
    
    if (serviceCategories.length === 0) {
      router.push('/service-categories');
    }
  }, [router]);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else {
      const existingServices = dataStore.getServices();
      if (existingServices.some(service => service.slug === formData.slug)) {
        newErrors.slug = 'Slug must be unique';
      }
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      dataStore.addService({
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        description: formData.description.trim(),
        categoryId: formData.categoryId
      });
      
      router.push('/services');
    } catch (error) {
      console.error('Error creating service:', error);
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

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        title="Add Service"
        description="Create a new service"
        backLink="/services"
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
                placeholder="Enter service title"
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
                placeholder="service-slug"
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
                Category *
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.categoryId ? 'border-red-500' : ''}`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-sm text-red-500 mt-1">{errors.categoryId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the service"
                rows={4}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">{errors.description}</p>
              )}
            </div>

            <div className="flex space-x-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Creating...' : 'Create Service'}
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
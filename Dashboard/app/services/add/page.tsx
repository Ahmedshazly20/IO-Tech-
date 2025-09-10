'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateService, useGetServiceCategories } from '@/lib/strapi';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AddServicePage() {
  const router = useRouter();
  const { data: categoriesResponse, isLoading: isLoadingCategories } = useGetServiceCategories();
  const { mutateAsync: createService, isPending: isCreating } = useCreateService();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const categories = useMemo(() => {
    return (categoriesResponse as { data?: Array<{ documentId: string; Title: string }> } | undefined)?.data || [];
  }, [categoriesResponse]);

  const formik = useFormik({
    initialValues: {
      Title: '',
      Slug: '',
      Description: '',
      Service: '',
    },
    validationSchema: Yup.object({
      Title: Yup.string().required('Title is required'),
      Slug: Yup.string().required('Slug is required'),
      Description: Yup.string().required('Description is required'),
      Service: Yup.string().required('Category is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setSubmitError(null);
      try {
        await createService({
          Title: values.Title,
          Slug: values.Slug,
          Description: values.Description,
          Service: values.Service,
        });
        resetForm();
        router.push('/services');
      } catch (err: any) {
        const msg = err?.response?.data?.error?.message || err?.message || 'Failed to create service';
        console.error('Create service error:', err?.response?.status, err?.response?.data);
        setSubmitError(msg);
      }
    },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Service"
        description="Create a new service and assign it to a category"
        action={
          <Link href="/services">
            <Button variant="outline">Back</Button>
          </Link>
        }
      />

      <Card>
        <CardContent className="p-6">
          {submitError && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {submitError}
            </div>
          )}
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="Title"
                value={formik.values.Title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                placeholder="Enter service title"
              />
              {formik.touched.Title && formik.errors.Title && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.Title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Slug</label>
              <input
                type="text"
                name="Slug"
                value={formik.values.Slug}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                placeholder="enter-slug"
              />
              {formik.touched.Slug && formik.errors.Slug && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.Slug}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="Description"
                value={formik.values.Description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                placeholder="Enter a description"
                rows={4}
              />
              {formik.touched.Description && formik.errors.Description && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.Description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="servicecatego"
                value={formik.values.Service}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                disabled={isLoadingCategories}
              >
                <option value="">{isLoadingCategories ? 'Loading categories...' : 'Select a category'}</option>
                {categories.map((c: any) => (
                  <option key={c.documentId ?? c.id} value={c.documentId ?? c.id}>
                    {c.Title}
                  </option>
                ))}
              </select>
              {formik.touched.Service && formik.errors.Service && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.Service}</p>
              )}
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={isCreating}>
                {isCreating ? 'Creating...' : 'Create Service'}
              </Button>
              <Button type="button" variant="outline" onClick={() => formik.resetForm()} disabled={isCreating}>
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { strapiApi } from '@/lib/strapi';
import { Upload, User, Mail, Phone, MessageCircle, Briefcase, CheckCircle, AlertCircle } from 'lucide-react';

interface TeamMemberFormData {
  Name: string;
  Role: string;
  Email: string;
  Phone: string;
  WhatsApp: string;
  photo: File | null;
}

interface TeamMemberFormProps {
  onSuccess?: () => void;
  initialData?: Partial<TeamMemberFormData>;
  teamMemberId?: string;
  mode?: 'create' | 'edit';
}

const validationSchema = Yup.object({
  Name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  Role: Yup.string()
    .min(2, 'Role must be at least 2 characters')
    .max(50, 'Role must be less than 50 characters')
    .required('Role is required'),
  Email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  Phone: Yup.string()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .required('Phone number is required'),
  WhatsApp: Yup.string()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid WhatsApp number')
    .required('WhatsApp number is required'),
  photo: Yup.mixed()
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return true; // Allow empty for edit mode
      return (value as File).size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Only image files are allowed', (value) => {
      if (!value) return true; // Allow empty for edit mode
      return ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes((value as File).type);
    })
});

export function TeamMemberForm({ 
  onSuccess, 
  initialData = {}, 
  teamMemberId, 
  mode = 'create' 
}: TeamMemberFormProps) {
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const initialValues: TeamMemberFormData = {
    Name: initialData.Name || '',
    Role: initialData.Role || '',
    Email: initialData.Email || '',
    Phone: initialData.Phone || '',
    WhatsApp: initialData.WhatsApp || '',
    photo: null,
  };

  const handleSubmit = async (values: TeamMemberFormData, { setSubmitting, resetForm }: any) => {
    try {
      setSubmitStatus({ type: null, message: '' });
      
      // Create FormData for multipart/form-data request
      const formData = new FormData();
      
      // Add the data object as required by Strapi
      const data = {
        Name: values.Name,
        Role: values.Role,
        Email: values.Email,
        Phone: values.Phone,
        WhatsApp: values.WhatsApp,
      };
      
      formData.append('data', JSON.stringify(data));
      
      // Add photo if provided
      if (values.photo) {
        formData.append('files.Photo', values.photo);
      }

      let response;
      if (mode === 'edit' && teamMemberId) {
        response = await strapiApi.updateTeamMember(teamMemberId, formData);
      } else {
        response = await strapiApi.createTeamMember(formData);
      }

      setSubmitStatus({
        type: 'success',
        message: `Team member ${mode === 'edit' ? 'updated' : 'created'} successfully!`
      });

      if (mode === 'create') {
        resetForm();
        setPreviewUrl(null);
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue('photo', file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-primary">
          <User className="w-6 h-6 mr-2" />
          {mode === 'edit' ? 'Edit Team Member' : 'Add New Team Member'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="space-y-6">
              {/* Status Messages */}
              {submitStatus.type && (
                <div className={`p-4 rounded-lg flex items-center ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitStatus.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 mr-2" />
                  ) : (
                    <AlertCircle className="w-5 h-5 mr-2" />
                  )}
                  {submitStatus.message}
                </div>
              )}

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Full Name *
                  </label>
                  <Field
                    as={Input}
                    name="Name"
                    type="text"
                    placeholder="Enter full name"
                    className="w-full"
                  />
                  <ErrorMessage name="Name" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="w-4 h-4 inline mr-1" />
                    Role *
                  </label>
                  <Field
                    as={Input}
                    name="Role"
                    type="text"
                    placeholder="e.g., Senior Developer"
                    className="w-full"
                  />
                  <ErrorMessage name="Role" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Contact Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address *
                  </label>
                  <Field
                    as={Input}
                    name="Email"
                    type="email"
                    placeholder="email@example.com"
                    className="w-full"
                  />
                  <ErrorMessage name="Email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number *
                    </label>
                    <Field
                      as={Input}
                      name="Phone"
                      type="tel"
                      placeholder="+1234567890"
                      className="w-full"
                    />
                    <ErrorMessage name="Phone" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MessageCircle className="w-4 h-4 inline mr-1" />
                      WhatsApp Number *
                    </label>
                    <Field
                      as={Input}
                      name="WhatsApp"
                      type="tel"
                      placeholder="+1234567890"
                      className="w-full"
                    />
                    <ErrorMessage name="WhatsApp" component="div" className="text-red-500 text-sm mt-1" />
                    <p className="text-xs text-gray-500 mt-1">Include country code</p>
                  </div>
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Profile Photo</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Upload className="w-4 h-4 inline mr-1" />
                    Upload Photo {mode === 'create' && '*'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleFileChange(event, setFieldValue)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary-800 file:cursor-pointer cursor-pointer"
                  />
                  <ErrorMessage name="photo" component="div" className="text-red-500 text-sm mt-1" />
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: JPEG, PNG, GIF, WebP. Max size: 5MB
                  </p>
                </div>

                {/* Photo Preview */}
                {previewUrl && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary-800 text-white px-8 py-2 rounded-lg font-medium transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {mode === 'edit' ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    mode === 'edit' ? 'Update Team Member' : 'Add Team Member'
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
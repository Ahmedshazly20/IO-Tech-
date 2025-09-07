'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { dataStore } from '@/lib/data';
import { validateEmail, validatePhone } from '@/lib/utils';
import { FormErrors } from '@/types';

export default function AddTeamMemberPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    photo: '',
    whatsapp: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (formData.whatsapp && !validatePhone(formData.whatsapp)) {
      newErrors.whatsapp = 'Please enter a valid WhatsApp number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      dataStore.addTeamMember({
        name: formData.name.trim(),
        role: formData.role.trim(),
        description: formData.description.trim(),
        email: formData.email.trim(),
        photo: formData.photo.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        whatsapp: formData.whatsapp.trim() || undefined
      });
      
      router.push('/team-members');
    } catch (error) {
      console.error('Error creating team member:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        title="Add Team Member"
        description="Add a new team member"
        backLink="/team-members"
      />

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <Input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  placeholder="e.g., Senior Developer"
                  className={errors.role ? 'border-red-500' : ''}
                />
                {errors.role && (
                  <p className="text-sm text-red-500 mt-1">{errors.role}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the team member"
                rows={3}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">{errors.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo URL
              </label>
              <Input
                type="url"
                value={formData.photo}
                onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.value }))}
                placeholder="https://example.com/photo.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional. Provide a URL to the team member's photo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@example.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1234567890"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number
              </label>
              <Input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                placeholder="+1234567890"
                className={errors.whatsapp ? 'border-red-500' : ''}
              />
              {errors.whatsapp && (
                <p className="text-sm text-red-500 mt-1">{errors.whatsapp}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Include country code for WhatsApp links to work properly.
              </p>
            </div>

            <div className="flex space-x-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Creating...' : 'Add Team Member'}
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
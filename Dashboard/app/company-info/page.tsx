'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dataStore } from '@/lib/data';
import { validateEmail } from '@/lib/utils';
import { FormErrors } from '@/types';
import { Twitter, Facebook, Mail, Upload } from 'lucide-react';

export default function CompanyInfoPage() {
  const [formData, setFormData] = useState({
    logo: '',
    twitter: '',
    facebook: '',
    gmail: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const companyInfo = dataStore.getCompanyInfo();
    setFormData({
      logo: companyInfo.logo || '',
      twitter: companyInfo.twitter || '',
      facebook: companyInfo.facebook || '',
      gmail: companyInfo.gmail || ''
    });
  }, []);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (formData.gmail && !validateEmail(formData.gmail)) {
      newErrors.gmail = 'Please enter a valid email address';
    }
    
    if (formData.twitter && !formData.twitter.startsWith('https://')) {
      newErrors.twitter = 'Please enter a valid Twitter URL (starting with https://)';
    }
    
    if (formData.facebook && !formData.facebook.startsWith('https://')) {
      newErrors.facebook = 'Please enter a valid Facebook URL (starting with https://)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      dataStore.updateCompanyInfo({
        logo: formData.logo.trim() || undefined,
        twitter: formData.twitter.trim() || undefined,
        facebook: formData.facebook.trim() || undefined,
        gmail: formData.gmail.trim() || undefined
      });
      
      setSuccessMessage('Company information updated successfully!');
    } catch (error) {
      console.error('Error updating company info:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        title="Company Information"
        description="Manage your company's social media links and branding"
      />

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Company Logo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo URL
                </label>
                <Input
                  type="url"
                  value={formData.logo}
                  onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
                  placeholder="https://example.com/logo.png"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Provide a URL to your company logo image.
                </p>
              </div>
              
              {formData.logo && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Logo Preview:</p>
                  <img 
                    src={formData.logo} 
                    alt="Company Logo Preview" 
                    className="max-w-xs max-h-24 object-contain border border-gray-200 rounded-md p-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media & Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Twitter className="w-4 h-4 inline mr-2" />
                  Twitter Profile URL
                </label>
                <Input
                  type="url"
                  value={formData.twitter}
                  onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                  placeholder="https://twitter.com/yourcompany"
                  className={errors.twitter ? 'border-red-500' : ''}
                />
                {errors.twitter && (
                  <p className="text-sm text-red-500 mt-1">{errors.twitter}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Facebook className="w-4 h-4 inline mr-2" />
                  Facebook Page URL
                </label>
                <Input
                  type="url"
                  value={formData.facebook}
                  onChange={(e) => setFormData(prev => ({ ...prev, facebook: e.target.value }))}
                  placeholder="https://facebook.com/yourcompany"
                  className={errors.facebook ? 'border-red-500' : ''}
                />
                {errors.facebook && (
                  <p className="text-sm text-red-500 mt-1">{errors.facebook}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Contact Email
                </label>
                <Input
                  type="email"
                  value={formData.gmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, gmail: e.target.value }))}
                  placeholder="contact@yourcompany.com"
                  className={errors.gmail ? 'border-red-500' : ''}
                />
                {errors.gmail && (
                  <p className="text-sm text-red-500 mt-1">{errors.gmail}</p>
                )}
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Updating...' : 'Update Company Information'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Logo:</span>
                <span>{formData.logo ? 'Set' : 'Not set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Twitter:</span>
                <span>{formData.twitter ? 'Connected' : 'Not connected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Facebook:</span>
                <span>{formData.facebook ? 'Connected' : 'Not connected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span>{formData.gmail || 'Not set'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
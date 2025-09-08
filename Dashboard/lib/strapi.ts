import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

const STRAPI_URL = 'https://truthful-rainbow-e74803c8a0.strapiapp.com/api';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;



const strapiClient = axios.create({
  baseURL: `${STRAPI_URL}`});

// No auth header needed; endpoints are public

interface StrapiError {
  error?: {
    message?: string;
    name?: string;
    details?: unknown;
  };
}

// --------------------- Our Team ---------------------
export const useGetTeamMembers = () => {
  return useQuery({
    queryKey: ['teamMembers'],
    queryFn: async () => {
      const { data } = await strapiClient.get('/ourteams?populate=Photo');
      return data;
    },
  });
};

export const useGetTeamMember = (id: string) => {
  return useQuery({
    queryKey: ['teamMember', id],
    queryFn: async () => {
      const { data } = await strapiClient.get(`/ourteams/${id}?populate=Photo`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await strapiClient.post('/ourteams', formData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
    },
    onError: (error: AxiosError<StrapiError>) => {
      throw new Error(error.response?.data.error?.message || 'Failed to create team member');
    },
  });
};

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const { data } = await strapiClient.put(`/ourteams/${id}`, formData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
    },
    onError: (error: AxiosError<StrapiError>) => {
      throw new Error(error.response?.data.error?.message || 'Failed to update team member');
    },
  });
};

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await strapiClient.delete(`/ourteams/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
    },
    onError: (error: AxiosError<StrapiError>) => {
      throw new Error(error.response?.data.error?.message || 'Failed to delete team member');
    },
  });
};

// --------------------- Service Categories ---------------------
interface ServiceCategoryData {
  Title: string;
  Slug: string;
  Description?: string;
}

export const useGetServiceCategories = () => {
  return useQuery({
    queryKey: ['serviceCategories'],
    queryFn: async () => {
      const { data } = await strapiClient.get('/servicecategos');
      return data;
    },
  });
};

export const useGetServiceCategory = (id: string) => {
  return useQuery({
    queryKey: ['serviceCategory', id],
    queryFn: async () => {
      const { data } = await strapiClient.get(`/servicecategos/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateServiceCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ServiceCategoryData) => {
      const response = await strapiClient.post('/servicecategos', { data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['serviceCategories'] });
    },
    onError: (error: AxiosError<StrapiError>) => {
      throw new Error(error.response?.data.error?.message || 'Failed to create service category');
    },
  });
};

export const useUpdateServiceCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ServiceCategoryData }) => {
      const response = await strapiClient.put(`/servicecategos/${id}`, { data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['serviceCategories'] });
    },
    onError: (error: AxiosError<StrapiError>) => {
      throw new Error(error.response?.data.error?.message || 'Failed to update service category');
    },
  });
};

export const useDeleteServiceCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await strapiClient.delete(`/servicecategos/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['serviceCategories'] });
    },
    onError: (error: AxiosError<StrapiError>) => {
      throw new Error(error.response?.data.error?.message || 'Failed to delete service category');
    },
  });
};

// --------------------- Services ---------------------
interface ServiceData {
  Title: string;
  Slug: string;
  Description: string;
  servicecatego: string; // documentId string
}

export const useGetServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data } = await strapiClient.get('/services?populate=servicecatego');
      return data;
    },
  });
};

export const useGetService = (id: string) => {
  return useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const { data } = await strapiClient.get(`/services/${id}?populate=*`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ServiceData) => {
      // Map to Strapi's expected field names (lowercase)
      const requestData = {
        title: data.Title,
        slug: data.Slug,
        description: data.Description,
        // Strapi accepts relation by documentId string directly
        servicecatego: data.servicecatego,
      };
      const response = await strapiClient.post('/services', { data: requestData });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
    onError: (error: AxiosError<StrapiError>) => {
      throw new Error(error.response?.data.error?.message || 'Failed to create service');
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ServiceData }) => {
      const requestData = {
        title: data.Title,
        slug: data.Slug,
        description: data.Description,
        servicecatego: data.servicecatego,
      };
      const response = await strapiClient.put(`/services/${id}`, { data: requestData });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
    onError: (error: AxiosError<StrapiError>) => {
      throw new Error(error.response?.data.error?.message || 'Failed to update service');
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (documentId: string) => {
      if (!documentId) {
        throw new Error("DocumentId is required");
      }

      // حذف باستخدام documentId مباشرة
      const response = await strapiClient.delete(`/services/${documentId}`);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
    onError: (error: AxiosError<StrapiError>) => {
      throw new Error(
        error.response?.data.error?.message || 'Failed to delete service'
      );
    },
  });
};


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const servicesApi = createApi({
  reducerPath: 'servicesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api' }), // رابط Strapi API
  endpoints: (builder) => ({
    getServices: builder.query<any, void>({
      query: () => '/services?populate=*', // populate=* عشان تجيب الصور والعلاقات
    }),
    getServiceById: builder.query<any, string>({
      query: (id) => `/services/${id}?populate=*`,
    }),
  }),
});

export const { useGetServicesQuery, useGetServiceByIdQuery } = servicesApi;

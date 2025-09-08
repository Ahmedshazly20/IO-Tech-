import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Service, TeamMember, StrapiCollectionResponse, StrapiResponse } from '../../types/strapi';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://truthful-rainbow-e74803c8a0.strapiapp.com/api',
    prepareHeaders: (headers) => {
     
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Service', 'TeamMember'],
  endpoints: (builder) => ({
    // Services endpoints
    getServices: builder.query<StrapiCollectionResponse<Service>, void>({
      query: () => '/servicecategos?populate=services',
      providesTags: ['Service'],
    }),
    getServiceById: builder.query<StrapiResponse<Service>, string>({
      query: (id) => `/services/${id}`,
      providesTags: (result, error, id) => [{ type: 'Service', id }],
    }),
    
    // Team members endpoints
    getTeamMembers: builder.query<StrapiCollectionResponse<TeamMember>, void>({
      query: () => '/ourteams?populate=Photo',
      providesTags: ['TeamMember'],
    }),
    getTeamMemberById: builder.query<StrapiResponse<TeamMember>, string>({
      query: (id) => `/our-teams/${id}?populate=*`,
      providesTags: (result, error, id) => [{ type: 'TeamMember', id }],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetTeamMembersQuery,
  useGetTeamMemberByIdQuery,
} = api;

export interface ServiceCategory {
  id: number ;
  documentId: string;
  Title: string;
  Slug: string;
  Description?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  publishedAt: string;
}

export interface Service {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  Service?: {
    id?: number;
    documentId?: string;
    Title?: string;
  } | string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface TeamMember {
  id: number;
  documentId: string;
  Name: string;
  Role: string;
  Email: string;
  Phone: string;
  WhatsApp: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Photo?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: {
      small?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path?: string;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
      thumbnail?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path?: string;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface CompanyInfo {
  id: string;
  logo?: string;
  twitter?: string;
  facebook?: string;
  gmail?: string;
  updatedAt: string;
}

export interface FormErrors {
  [key: string]: string;
}

// Strapi response wrappers
export interface StrapiResponse<T> {
  data: T;
  meta?: any;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
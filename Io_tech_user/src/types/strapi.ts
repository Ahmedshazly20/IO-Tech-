// Strapi API response types
export interface StrapiImageFormats {
  thumbnail?: {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
  };
  small?: {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
  };
  medium?: {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
  };
  large?: {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
  };
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats: StrapiImageFormats;
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
}

export interface ServiceItem {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  slug: string;
  description: string;
}

export interface Service {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Title: string;
  Slug: string;
  Description: string;
  services: ServiceItem[];
}

export interface TeamMember {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Name: string;
  Role: string;
  WhatsApp?: string;
  Phone?: string;
  Email?: string;
  Photo?: StrapiImage;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ServiceCategory {
  id: string;
  title: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  photo?: string;
  whatsapp?: string;
  phone?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyInfo {
  id: string;
  logo?: string;
  twitter?: string;
  facebook?: string;
  gmail?: string;
  updatedAt: Date;
}

export interface FormErrors {
  [key: string]: string;
}
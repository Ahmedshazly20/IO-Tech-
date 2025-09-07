import { ServiceCategory, Service, TeamMember, CompanyInfo } from '@/types';

// Mock data store - In a real app, this would be replaced with a database
export class DataStore {
  private static instance: DataStore;
  
  private serviceCategories: ServiceCategory[] = [
    {
      id: '1',
      title: 'Web Development',
      slug: 'web-development',
      description: 'Professional web development services',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '2',
      title: 'Mobile Development',
      slug: 'mobile-development',
      description: 'iOS and Android app development',
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    }
  ];

  private services: Service[] = [
    {
      id: '1',
      title: 'React Development',
      slug: 'react-development',
      description: 'Modern React applications with cutting-edge technology',
      categoryId: '1',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '2',
      title: 'iOS App Development',
      slug: 'ios-app-development',
      description: 'Native iOS applications built with Swift',
      categoryId: '2',
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    }
  ];

  private teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Senior Developer',
      description: 'Full-stack developer with 8+ years of experience',
      email: 'john@example.com',
      phone: '+1234567890',
      whatsapp: '+1234567890',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    }
  ];

  private companyInfo: CompanyInfo = {
    id: '1',
    twitter: 'https://twitter.com/company',
    facebook: 'https://facebook.com/company',
    gmail: 'contact@company.com',
    updatedAt: new Date('2024-01-01')
  };

  static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  // Service Categories
  getServiceCategories(): ServiceCategory[] {
    return [...this.serviceCategories];
  }

  getServiceCategory(id: string): ServiceCategory | undefined {
    return this.serviceCategories.find(cat => cat.id === id);
  }

  addServiceCategory(category: Omit<ServiceCategory, 'id' | 'createdAt' | 'updatedAt'>): ServiceCategory {
    const newCategory: ServiceCategory = {
      ...category,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.serviceCategories.push(newCategory);
    return newCategory;
  }

  updateServiceCategory(id: string, updates: Partial<ServiceCategory>): ServiceCategory | null {
    const index = this.serviceCategories.findIndex(cat => cat.id === id);
    if (index === -1) return null;
    
    this.serviceCategories[index] = {
      ...this.serviceCategories[index],
      ...updates,
      updatedAt: new Date()
    };
    return this.serviceCategories[index];
  }

  deleteServiceCategory(id: string): boolean {
    const index = this.serviceCategories.findIndex(cat => cat.id === id);
    if (index === -1) return false;
    
    // Also delete related services
    this.services = this.services.filter(service => service.categoryId !== id);
    this.serviceCategories.splice(index, 1);
    return true;
  }

  // Services
  getServices(): Service[] {
    return [...this.services];
  }

  getService(id: string): Service | undefined {
    return this.services.find(service => service.id === id);
  }

  getServicesByCategory(categoryId: string): Service[] {
    return this.services.filter(service => service.categoryId === categoryId);
  }

  addService(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Service {
    const newService: Service = {
      ...service,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.services.push(newService);
    return newService;
  }

  updateService(id: string, updates: Partial<Service>): Service | null {
    const index = this.services.findIndex(service => service.id === id);
    if (index === -1) return null;
    
    this.services[index] = {
      ...this.services[index],
      ...updates,
      updatedAt: new Date()
    };
    return this.services[index];
  }

  deleteService(id: string): boolean {
    const index = this.services.findIndex(service => service.id === id);
    if (index === -1) return false;
    
    this.services.splice(index, 1);
    return true;
  }

  // Team Members
  getTeamMembers(): TeamMember[] {
    return [...this.teamMembers];
  }

  getTeamMember(id: string): TeamMember | undefined {
    return this.teamMembers.find(member => member.id === id);
  }

  addTeamMember(member: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>): TeamMember {
    const newMember: TeamMember = {
      ...member,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.teamMembers.push(newMember);
    return newMember;
  }

  updateTeamMember(id: string, updates: Partial<TeamMember>): TeamMember | null {
    const index = this.teamMembers.findIndex(member => member.id === id);
    if (index === -1) return null;
    
    this.teamMembers[index] = {
      ...this.teamMembers[index],
      ...updates,
      updatedAt: new Date()
    };
    return this.teamMembers[index];
  }

  deleteTeamMember(id: string): boolean {
    const index = this.teamMembers.findIndex(member => member.id === id);
    if (index === -1) return false;
    
    this.teamMembers.splice(index, 1);
    return true;
  }

  // Company Info
  getCompanyInfo(): CompanyInfo {
    return { ...this.companyInfo };
  }

  updateCompanyInfo(updates: Partial<CompanyInfo>): CompanyInfo {
    this.companyInfo = {
      ...this.companyInfo,
      ...updates,
      updatedAt: new Date()
    };
    return this.companyInfo;
  }
}

export const dataStore = DataStore.getInstance();
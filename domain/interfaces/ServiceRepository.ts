import { ServiceCategory } from '../entities/ServiceCategory';
import { ServiceItem } from '../entities/ServiceItem';

// Port for the Application layer to communicate with the DB inside Infrastructure
export interface ServiceRepository {
  // Category operations
  getAllCategories(): Promise<ServiceCategory[]>;
  getCategoryById(id: string): Promise<ServiceCategory | null>;
  createCategory(category: Omit<ServiceCategory, 'id'>): Promise<ServiceCategory>;
  updateCategory(id: string, updates: Partial<ServiceCategory>): Promise<ServiceCategory>;
  deleteCategory(id: string): Promise<boolean>;

  // Service Item operations
  getAllServiceItems(): Promise<ServiceItem[]>;
  getServiceItemsByCategory(categoryId: string): Promise<ServiceItem[]>;
  getServiceItemById(id: string): Promise<ServiceItem | null>;
  createServiceItem(item: Omit<ServiceItem, 'id'>): Promise<ServiceItem>;
  updateServiceItem(id: string, updates: Partial<ServiceItem>): Promise<ServiceItem>;
  deleteServiceItem(id: string): Promise<boolean>;
}

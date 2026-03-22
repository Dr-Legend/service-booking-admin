import { ServiceCategory } from '@/domain/entities/ServiceCategory';
import { ServiceItem } from '@/domain/entities/ServiceItem';
import { ServiceRepository } from '@/domain/interfaces/ServiceRepository';

export class InMemoryServiceRepository implements ServiceRepository {
  private categories: ServiceCategory[] = [];
  private items: ServiceItem[] = [];

  async getAllCategories(): Promise<ServiceCategory[]> {
    return this.categories;
  }

  async getCategoryById(id: string): Promise<ServiceCategory | null> {
    return this.categories.find(c => c.id === id) || null;
  }

  async createCategory(category: Omit<ServiceCategory, 'id'>): Promise<ServiceCategory> {
    const newCategory: ServiceCategory = {
      ...category,
      id: crypto.randomUUID(),
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async updateCategory(id: string, updates: Partial<ServiceCategory>): Promise<ServiceCategory> {
    const index = this.categories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Category not found');

    this.categories[index] = { ...this.categories[index], ...updates };
    return this.categories[index];
  }

  async deleteCategory(id: string): Promise<boolean> {
    const initialLength = this.categories.length;
    this.categories = this.categories.filter(c => c.id !== id);
    // Also delete associated items
    this.items = this.items.filter(i => i.categoryId !== id);
    return this.categories.length < initialLength;
  }

  async getAllServiceItems(): Promise<ServiceItem[]> {
    return this.items;
  }

  async getServiceItemsByCategory(categoryId: string): Promise<ServiceItem[]> {
    return this.items.filter(i => i.categoryId === categoryId);
  }

  async getServiceItemById(id: string): Promise<ServiceItem | null> {
    return this.items.find(i => i.id === id) || null;
  }

  async createServiceItem(item: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
    const newItem: ServiceItem = {
      ...item,
      id: crypto.randomUUID(),
    };
    this.items.push(newItem);
    return newItem;
  }

  async updateServiceItem(id: string, updates: Partial<ServiceItem>): Promise<ServiceItem> {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Service Item not found');

    this.items[index] = { ...this.items[index], ...updates };
    return this.items[index];
  }

  async deleteServiceItem(id: string): Promise<boolean> {
    const initialLength = this.items.length;
    this.items = this.items.filter(i => i.id !== id);
    return this.items.length < initialLength;
  }
}

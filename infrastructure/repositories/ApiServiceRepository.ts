import { cookies } from 'next/headers';
import { ServiceCategory } from '@/domain/entities/ServiceCategory';
import { ServiceItem } from '@/domain/entities/ServiceItem';
import { ServiceRepository } from '@/domain/interfaces/ServiceRepository';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export class ApiServiceRepository implements ServiceRepository {
  private get baseUrl(): string {
    return process.env.API_BASE_URL || 'http://127.0.0.1:8787';
  }

  private async getHeaders(): Promise<HeadersInit> {
    const token = (await cookies()).get('auth-token')?.value ?? '';
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  private async unwrap<T>(res: Response): Promise<T> {
    const json: ApiResponse<T> = await res.json();
    return json.data;
  }

  async getAllCategories(): Promise<ServiceCategory[]> {
    const res = await fetch(`${this.baseUrl}/api/categories`, {
      method: 'GET',
      headers: await this.getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return this.unwrap<ServiceCategory[]>(res);
  }

  async getCategoryById(id: string): Promise<ServiceCategory | null> {
    const res = await fetch(`${this.baseUrl}/api/categories/${id}`, {
      method: 'GET',
      headers: await this.getHeaders(),
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Failed to fetch category');
    return this.unwrap<ServiceCategory>(res);
  }

  async createCategory(category: Omit<ServiceCategory, 'id'>): Promise<ServiceCategory> {
    const res = await fetch(`${this.baseUrl}/api/categories`, {
      method: 'POST',
      headers: await this.getHeaders(),
      body: JSON.stringify(category),
    });
    if (!res.ok) throw new Error('Failed to create category');
    return this.unwrap<ServiceCategory>(res);
  }

  async updateCategory(id: string, updates: Partial<ServiceCategory>): Promise<ServiceCategory> {
    const res = await fetch(`${this.baseUrl}/api/categories/${id}`, {
      method: 'PUT',
      headers: await this.getHeaders(),
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update category');
    return this.unwrap<ServiceCategory>(res);
  }

  async deleteCategory(id: string): Promise<boolean> {
    const res = await fetch(`${this.baseUrl}/api/categories/${id}`, {
      method: 'DELETE',
      headers: await this.getHeaders(),
    });
    return res.ok;
  }

  // --- Service Items ---

  async getAllServiceItems(): Promise<ServiceItem[]> {
    const res = await fetch(`${this.baseUrl}/api/items`, {
      method: 'GET',
      headers: await this.getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch service items');
    return this.unwrap<ServiceItem[]>(res);
  }

  async getServiceItemsByCategory(categoryId: string): Promise<ServiceItem[]> {
    // The API might not have a direct filter endpoint, so we fetch all and filter server-side
    const items = await this.getAllServiceItems();
    return items.filter((item) => item.categoryId === categoryId);
  }

  async getServiceItemById(id: string): Promise<ServiceItem | null> {
    const res = await fetch(`${this.baseUrl}/api/items/${id}`, {
      method: 'GET',
      headers: await this.getHeaders(),
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Failed to fetch service item');
    return this.unwrap<ServiceItem>(res);
  }

  async createServiceItem(item: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
    const res = await fetch(`${this.baseUrl}/api/items`, {
      method: 'POST',
      headers: await this.getHeaders(),
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to create service item');
    return this.unwrap<ServiceItem>(res);
  }

  async updateServiceItem(id: string, updates: Partial<ServiceItem>): Promise<ServiceItem> {
    const res = await fetch(`${this.baseUrl}/api/items/${id}`, {
      method: 'PUT',
      headers: await this.getHeaders(),
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update service item');
    return this.unwrap<ServiceItem>(res);
  }

  async deleteServiceItem(id: string): Promise<boolean> {
    const res = await fetch(`${this.baseUrl}/api/items/${id}`, {
      method: 'DELETE',
      headers: await this.getHeaders(),
    });
    return res.ok;
  }
}

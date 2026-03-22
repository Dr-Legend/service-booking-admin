import { cookies } from 'next/headers';
import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/interfaces/UserRepository';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export class ApiUserRepository implements UserRepository {
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

  async getAllUsers(): Promise<User[]> {
    const res = await fetch(`${this.baseUrl}/api/users`, {
      method: 'GET',
      headers: await this.getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    return this.unwrap<User[]>(res);
  }

  async getUserById(id: string): Promise<User | null> {
    const res = await fetch(`${this.baseUrl}/api/users/${id}`, {
      method: 'GET',
      headers: await this.getHeaders(),
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Failed to fetch user');
    return this.unwrap<User>(res);
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const res = await fetch(`${this.baseUrl}/api/users`, {
      method: 'POST',
      headers: await this.getHeaders(),
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error('Failed to create user');
    return this.unwrap<User>(res);
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const res = await fetch(`${this.baseUrl}/api/users/${id}`, {
      method: 'PUT',
      headers: await this.getHeaders(),
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return this.unwrap<User>(res);
  }

  async deleteUser(id: string): Promise<boolean> {
    const res = await fetch(`${this.baseUrl}/api/users/${id}`, {
      method: 'DELETE',
      headers: await this.getHeaders(),
    });
    return res.ok;
  }
}

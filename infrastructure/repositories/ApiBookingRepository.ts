import { cookies } from 'next/headers';
import { Booking } from '@/domain/entities/Booking';
import { BookingRepository } from '@/domain/interfaces/BookingRepository';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export class ApiBookingRepository implements BookingRepository {
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

  async getAllBookings(): Promise<Booking[]> {
    const res = await fetch(`${this.baseUrl}/api/bookings`, {
      method: 'GET',
      headers: await this.getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return this.unwrap<Booking[]>(res);
  }

  async getBookingById(id: string): Promise<Booking | null> {
    const res = await fetch(`${this.baseUrl}/api/bookings/${id}`, {
      method: 'GET',
      headers: await this.getHeaders(),
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Failed to fetch booking');
    return this.unwrap<Booking>(res);
  }

  async createBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
    const res = await fetch(`${this.baseUrl}/api/bookings`, {
      method: 'POST',
      headers: await this.getHeaders(),
      body: JSON.stringify(booking),
    });
    if (!res.ok) throw new Error('Failed to create booking');
    return this.unwrap<Booking>(res);
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
    const res = await fetch(`${this.baseUrl}/api/bookings/${id}`, {
      method: 'PUT',
      headers: await this.getHeaders(),
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update booking');
    return this.unwrap<Booking>(res);
  }

  async deleteBooking(id: string): Promise<boolean> {
    const res = await fetch(`${this.baseUrl}/api/bookings/${id}`, {
      method: 'DELETE',
      headers: await this.getHeaders(),
    });
    return res.ok;
  }
}

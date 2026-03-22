export type BookingStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Booking {
  id: string;
  userId: string;
  serviceItemId: string;
  status: BookingStatus;
  targetStartDate: string; // ISO Date String
  projectDescription: string;
  createdAt?: string;
}

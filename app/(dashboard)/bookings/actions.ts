'use server';

import { revalidatePath } from 'next/cache';
import { UpdateBookingStatusUseCase } from '@/application/use-cases/bookings/UpdateBookingStatusUseCase';
import { bookingRepository } from '@/infrastructure/di/container';
import { BookingStatus } from '@/domain/entities/Booking';

export async function updateBookingStatusAction(id: string, newStatus: BookingStatus) {
  const useCase = new UpdateBookingStatusUseCase(bookingRepository);
  await useCase.execute(id, newStatus);
  
  revalidatePath('/bookings');
  revalidatePath('/'); // Also refresh the dashboard since it might show counts
}

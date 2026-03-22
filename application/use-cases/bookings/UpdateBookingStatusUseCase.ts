import { Booking, BookingStatus } from '@/domain/entities/Booking';
import { BookingRepository } from '@/domain/interfaces/BookingRepository';

export class UpdateBookingStatusUseCase {
  constructor(private bookingRepository: BookingRepository) {}

  async execute(id: string, status: BookingStatus): Promise<Booking> {
    return this.bookingRepository.updateBooking(id, { status });
  }
}

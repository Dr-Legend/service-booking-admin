import { Booking } from '@/domain/entities/Booking';
import { BookingRepository } from '@/domain/interfaces/BookingRepository';

export class GetAllBookingsUseCase {
  constructor(private bookingRepository: BookingRepository) {}

  async execute(): Promise<Booking[]> {
    return this.bookingRepository.getAllBookings();
  }
}

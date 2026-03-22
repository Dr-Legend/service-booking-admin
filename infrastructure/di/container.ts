import { ApiServiceRepository } from '../repositories/ApiServiceRepository';
import { ApiUserRepository } from '../repositories/ApiUserRepository';
import { ApiBookingRepository } from '../repositories/ApiBookingRepository';
import { ServiceRepository } from '@/domain/interfaces/ServiceRepository';
import { UserRepository } from '@/domain/interfaces/UserRepository';
import { BookingRepository } from '@/domain/interfaces/BookingRepository';

// Exporting the API implementation of the Repositories.
export const serviceRepository: ServiceRepository = new ApiServiceRepository();
export const userRepository: UserRepository = new ApiUserRepository();
export const bookingRepository: BookingRepository = new ApiBookingRepository();

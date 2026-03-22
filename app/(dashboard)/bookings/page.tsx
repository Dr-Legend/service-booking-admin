import { GetAllBookingsUseCase } from '@/application/use-cases/bookings/GetAllBookingsUseCase';
import { GetAllUsersUseCase } from '@/application/use-cases/users/GetAllUsersUseCase';
import { GetAllServiceItemsUseCase } from '@/application/use-cases/services/GetAllServiceItemsUseCase';
import { bookingRepository, userRepository, serviceRepository } from '@/infrastructure/di/container';
import BookingManager from '@/presentation/components/BookingManager';

export const dynamic = 'force-dynamic';

export default async function BookingsPage() {
  const getBookingsUseCase = new GetAllBookingsUseCase(bookingRepository);
  const getUsersUseCase = new GetAllUsersUseCase(userRepository);
  const getItemsUseCase = new GetAllServiceItemsUseCase(serviceRepository);

  try {
    const [bookings, users, serviceItems] = await Promise.all([
      getBookingsUseCase.execute(),
      getUsersUseCase.execute(),
      getItemsUseCase.execute()
    ]);

    return (
      <div className="p-8 md:p-12 w-full max-w-7xl mx-auto">
        <BookingManager 
          bookings={bookings} 
          users={users} 
          serviceItems={serviceItems} 
        />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch bookings data:", error);
    return (
      <div className="p-12 text-center text-red-500">
        <h2 className="text-xl font-bold mb-2">Error Connecting to Backend</h2>
        <p>Ensure the background API worker is running!</p>
      </div>
    );
  }
}

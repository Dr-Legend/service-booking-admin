import { GetAllUsersUseCase } from '@/application/use-cases/users/GetAllUsersUseCase';
import { userRepository } from '@/infrastructure/di/container';
import UserManager from '@/presentation/components/UserManager';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const getUsersUseCase = new GetAllUsersUseCase(userRepository);

  try {
    const users = await getUsersUseCase.execute();

    return (
      <div className="p-8 md:p-12 w-full max-w-7xl mx-auto">
        <UserManager users={users} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return (
      <div className="p-12 text-center text-red-500">
        <h2 className="text-xl font-bold mb-2">Error Connecting to Backend</h2>
        <p>Ensure the background API worker is running!</p>
      </div>
    );
  }
}

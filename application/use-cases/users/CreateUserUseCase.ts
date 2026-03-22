import { User, UserRole } from '@/domain/entities/User';
import { UserRepository } from '@/domain/interfaces/UserRepository';

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    name: string,
    email: string,
    role: UserRole,
    phone?: string,
    company?: string
  ): Promise<User> {
    if (!name || !email || !role) {
      throw new Error('Name, Email, and Role are required to create a user.');
    }

    return this.userRepository.createUser({
      name,
      email,
      role,
      phone,
      company,
    });
  }
}

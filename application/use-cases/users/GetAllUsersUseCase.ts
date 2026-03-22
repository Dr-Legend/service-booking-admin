import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/interfaces/UserRepository';

export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }
}

'use server';

import { revalidatePath } from 'next/cache';
import { CreateUserUseCase } from '@/application/use-cases/users/CreateUserUseCase';
import { userRepository } from '@/infrastructure/di/container';
import { UserRole } from '@/domain/entities/User';

export async function createUserAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const role = formData.get('role') as UserRole;
  const phone = formData.get('phone') as string;
  const company = formData.get('company') as string;

  const useCase = new CreateUserUseCase(userRepository);
  await useCase.execute(
    name,
    email,
    role,
    phone || undefined,
    company || undefined
  );

  revalidatePath('/users');
  revalidatePath('/bookings'); // Since bookings display user names
}

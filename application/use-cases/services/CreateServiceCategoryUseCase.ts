import { ServiceCategory } from '@/domain/entities/ServiceCategory';
import { ServiceRepository } from '@/domain/interfaces/ServiceRepository';

export class CreateServiceCategoryUseCase {
  constructor(private serviceRepository: ServiceRepository) { }

  async execute(title: string, description: string): Promise<ServiceCategory> {
    if (!title || title.trim() === '') {
      throw new Error('Service Category title is required.');
    }

    return this.serviceRepository.createCategory({
      title,
      description,
    });
  }
}

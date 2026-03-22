import { ServiceCategory } from '@/domain/entities/ServiceCategory';
import { ServiceRepository } from '@/domain/interfaces/ServiceRepository';

export class GetAllCategoriesUseCase {
  constructor(private serviceRepository: ServiceRepository) { }

  async execute(): Promise<ServiceCategory[]> {
    return this.serviceRepository.getAllCategories();
  }
}

import { ServiceRepository } from '@/domain/interfaces/ServiceRepository';

export class DeleteServiceCategoryUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.serviceRepository.deleteCategory(id);
  }
}

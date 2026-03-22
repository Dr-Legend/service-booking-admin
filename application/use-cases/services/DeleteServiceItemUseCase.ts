import { ServiceRepository } from '@/domain/interfaces/ServiceRepository';

export class DeleteServiceItemUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.serviceRepository.deleteServiceItem(id);
  }
}

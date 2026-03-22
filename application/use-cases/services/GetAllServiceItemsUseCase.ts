import { ServiceItem } from '@/domain/entities/ServiceItem';
import { ServiceRepository } from '@/domain/interfaces/ServiceRepository';

export class GetAllServiceItemsUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(): Promise<ServiceItem[]> {
    return this.serviceRepository.getAllServiceItems();
  }
}

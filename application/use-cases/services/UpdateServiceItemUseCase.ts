import { ServiceItem, PricingType } from '@/domain/entities/ServiceItem';
import { ServiceRepository } from '@/domain/interfaces/ServiceRepository';

export class UpdateServiceItemUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(
    id: string,
    updates: {
      name?: string;
      description?: string;
      price?: number;
      pricingType?: PricingType;
      isActive?: boolean;
      availableSlots?: number;
    }
  ): Promise<ServiceItem> {
    return this.serviceRepository.updateServiceItem(id, updates);
  }
}

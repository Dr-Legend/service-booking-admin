import { ServiceItem, PricingType } from '@/domain/entities/ServiceItem';
import { ServiceRepository } from '@/domain/interfaces/ServiceRepository';

export class CreateServiceItemUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(
    categoryId: string,
    name: string,
    pricingType: PricingType,
    basePrice?: number,
    isActive: boolean = true,
    availableSlots?: number
  ): Promise<ServiceItem> {
    if (!name || !categoryId) {
      throw new Error('Name and Category ID are required to create a service item.');
    }
    
    return this.serviceRepository.createServiceItem({
      categoryId,
      name,
      pricingType,
      basePrice,
      isActive,
      availableSlots
    });
  }
}

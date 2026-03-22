export type PricingType = 'FIXED' | 'HOURLY' | 'CUSTOM_QUOTE';

export interface ServiceItem {
  id: string;
  categoryId: string; // Foreign key to ServiceCategory
  name: string;
  description?: string;
  pricingType: PricingType;
  basePrice?: number;
  isActive: boolean;
  availableSlots?: number;
}

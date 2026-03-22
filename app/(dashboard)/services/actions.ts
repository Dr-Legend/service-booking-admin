'use server';

import { revalidatePath } from 'next/cache';
import { CreateServiceCategoryUseCase } from '@/application/use-cases/services/CreateServiceCategoryUseCase';
import { DeleteServiceCategoryUseCase } from '@/application/use-cases/services/DeleteServiceCategoryUseCase';
import { CreateServiceItemUseCase } from '@/application/use-cases/services/CreateServiceItemUseCase';
import { DeleteServiceItemUseCase } from '@/application/use-cases/services/DeleteServiceItemUseCase';
import { UpdateServiceItemUseCase } from '@/application/use-cases/services/UpdateServiceItemUseCase';
import { serviceRepository } from '@/infrastructure/di/container';
import { PricingType } from '@/domain/entities/ServiceItem';

// Wrapping Use Cases in Next.js Server Actions

export async function createCategoryAction(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  const useCase = new CreateServiceCategoryUseCase(serviceRepository);
  await useCase.execute(title, description);

  revalidatePath('/services');
  revalidatePath('/'); // Dashboard
}

export async function deleteCategoryAction(categoryId: string) {
  const useCase = new DeleteServiceCategoryUseCase(serviceRepository);
  await useCase.execute(categoryId);

  revalidatePath('/services');
  revalidatePath('/');
}

export async function createServiceItemAction(formData: FormData) {
  const categoryId = formData.get('categoryId') as string;
  const name = formData.get('name') as string;
  const pricingType = formData.get('pricingType') as PricingType;
  const basePriceStr = formData.get('basePrice') as string;
  
  const basePrice = basePriceStr ? parseFloat(basePriceStr) : undefined;

  const useCase = new CreateServiceItemUseCase(serviceRepository);
  await useCase.execute(categoryId, name, pricingType, basePrice, true);

  revalidatePath('/services');
}

export async function deleteServiceItemAction(itemId: string) {
  const useCase = new DeleteServiceItemUseCase(serviceRepository);
  await useCase.execute(itemId);

  revalidatePath('/services');
}

export async function updateServiceItemAction(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const pricingType = formData.get('pricingType') as PricingType;
  const isAvailable = formData.get('isAvailable') === 'on';
  
  const basePriceStr = formData.get('basePrice') as string;
  const basePrice = basePriceStr ? parseFloat(basePriceStr) : undefined;
  
  const availableSlotsStr = formData.get('availableSlots') as string;
  const availableSlots = availableSlotsStr ? parseInt(availableSlotsStr, 10) : undefined;

  const useCase = new UpdateServiceItemUseCase(serviceRepository);
  await useCase.execute(id, {
    name,
    description: description || undefined,
    pricingType,
    price: basePrice,
    isActive: isAvailable,
    availableSlots
  });

  revalidatePath('/services');
}

import { GetAllCategoriesUseCase } from '@/application/use-cases/services/GetAllCategoriesUseCase';
import { GetAllServiceItemsUseCase } from '@/application/use-cases/services/GetAllServiceItemsUseCase';
import { serviceRepository } from '@/infrastructure/di/container';
import ServiceManager from '@/presentation/components/ServiceManager';

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const getCategoriesUseCase = new GetAllCategoriesUseCase(serviceRepository);
  const getItemsUseCase = new GetAllServiceItemsUseCase(serviceRepository);

  try {
    const [categories, items] = await Promise.all([
      getCategoriesUseCase.execute(),
      getItemsUseCase.execute()
    ]);

    return (
      <div className="p-8 md:p-12 w-full max-w-7xl mx-auto">
        <ServiceManager categories={categories} items={items} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return (
      <div className="p-12 text-center text-red-500">
        <h2 className="text-xl font-bold mb-2">Error Connecting to Backend</h2>
        <p>Ensure the backend API is running!</p>
      </div>
    );
  }
}

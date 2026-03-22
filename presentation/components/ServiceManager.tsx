'use client';

import { useState } from 'react';
import { 
  createCategoryAction, 
  deleteCategoryAction, 
  createServiceItemAction,
  deleteServiceItemAction,
  updateServiceItemAction 
} from '@/app/(dashboard)/services/actions';
import { ServiceCategory } from '@/domain/entities/ServiceCategory';
import { ServiceItem } from '@/domain/entities/ServiceItem';

interface Props {
  categories: ServiceCategory[];
  items: ServiceItem[];
}

export default function ServiceManager({ categories, items }: Props) {
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-slate-900 dark:text-white">Service Catalog</h1>
          <p className="text-slate-500 mt-1">Manage what your agency offers to clients.</p>
        </div>
        <button 
          onClick={() => setCategoryModalOpen(true)}
          className="px-5 py-2.5 rounded-full shadow-lg shadow-indigo-500/20 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-transform active:scale-95"
        >
          + New Category
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-500">
          No categories found. Create one to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {categories.map((cat) => {
            const catItems = items.filter(i => i.categoryId === cat.id);
            return (
              <div key={cat.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{cat.title}</h2>
                    <p className="text-sm text-slate-500">{cat.description}</p>
                  </div>
                  <button 
                    onClick={() => deleteCategoryAction(cat.id)}
                    className="text-red-500 hover:text-red-600 text-sm font-medium p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    Delete Category
                  </button>
                </div>
                
                <div className="p-6">
                  {catItems.length > 0 ? (
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="text-slate-400 font-medium uppercase tracking-wider text-xs border-b border-slate-100 dark:border-slate-800">
                          <th className="pb-3">Service Name</th>
                          <th className="pb-3">Pricing</th>
                          <th className="pb-3">Base Price</th>
                          <th className="pb-3 text-right">Status</th>
                          <th className="pb-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 pt-2">
                        {catItems.map(item => (
                          <tr key={item.id} className="group">
                            <td className="py-4 font-medium text-slate-900 dark:text-white">{item.name}</td>
                            <td className="py-4 text-slate-500">
                              <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-semibold">{item.pricingType}</span>
                            </td>
                            <td className="py-4 text-slate-500">
                              {item.basePrice ? `$${item.basePrice}` : 'Custom'}
                            </td>
                            <td className="py-4 text-right">
                              {item.isActive ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                                </span>
                              ) : (
                                <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                  Paused
                                </span>
                              )}
                            </td>
                            <td className="py-4 text-right space-x-2">
                              <button 
                                onClick={() => setEditingItem(item)}
                                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium text-sm transition-colors"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => deleteServiceItemAction(item.id)}
                                className="text-red-500 hover:text-red-600 dark:text-red-400 font-medium text-sm transition-colors"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-sm text-slate-400 italic">No specific services added to this category yet.</p>
                  )}

                  {/* Add Service Item Form inline */}
                  <form action={createServiceItemAction} className="mt-6 flex gap-3 items-end p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
                    <input type="hidden" name="categoryId" value={cat.id} />
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">New Service Name</label>
                      <input name="name" type="text" placeholder="e.g. UX Audit" required className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div className="w-40">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Pricing Form</label>
                      <select name="pricingType" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none">
                        <option value="FIXED">Fixed Price</option>
                        <option value="HOURLY">Hourly Rate</option>
                        <option value="CUSTOM_QUOTE">Custom Quote</option>
                      </select>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                      Add Service
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Basic Category Creation Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-lg font-outfit">Create New Category</h3>
              <button onClick={() => setCategoryModalOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form 
              action={(formData) => {
                createCategoryAction(formData);
                setCategoryModalOpen(false);
              }} 
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1.5">Category Title</label>
                <input name="title" autoFocus required placeholder="e.g. Marketing" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Description</label>
                <textarea name="description" required placeholder="Briefly describe this cluster of services..." rows={3} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"></textarea>
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setCategoryModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-medium bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-95">Create Category</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Service Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-lg font-outfit">Edit Service Item</h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form 
              action={(formData) => {
                updateServiceItemAction(formData);
                setEditingItem(null);
              }} 
              className="p-6 space-y-4"
            >
              <input type="hidden" name="id" value={editingItem.id} />
              
              <div>
                <label className="block text-sm font-medium mb-1.5">Service Name</label>
                <input name="name" defaultValue={editingItem.name} required className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 transition-all" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Description (Optional)</label>
                <textarea name="description" defaultValue={editingItem.description || ''} rows={2} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 transition-all resize-none"></textarea>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1.5">Pricing Type</label>
                  <select name="pricingType" defaultValue={editingItem.pricingType} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 transition-all">
                    <option value="FIXED">Fixed Price</option>
                    <option value="HOURLY">Hourly Rate</option>
                    <option value="CUSTOM_QUOTE">Custom Quote</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1.5">Base Price ($)</label>
                  <input name="basePrice" type="number" step="0.01" defaultValue={editingItem.basePrice || ''} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 transition-all" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1.5">Available Slots</label>
                  <input name="availableSlots" type="number" defaultValue={editingItem.availableSlots || ''} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 transition-all" placeholder="Unlimited" />
                </div>
                <div className="flex-1 flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="isAvailable" defaultChecked={editingItem.isActive} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-sm font-medium">Is Active / Available</span>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingItem(null)} className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-medium bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-95">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

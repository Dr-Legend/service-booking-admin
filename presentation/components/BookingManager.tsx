'use client';

import { useState } from 'react';
import { updateBookingStatusAction } from '@/app/(dashboard)/bookings/actions';
import { Booking, BookingStatus } from '@/domain/entities/Booking';
import { User } from '@/domain/entities/User';
import { ServiceItem } from '@/domain/entities/ServiceItem';

interface Props {
  bookings: Booking[];
  users: User[];
  serviceItems: ServiceItem[];
}

const statusColors: Record<BookingStatus, string> = {
  PENDING: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
  IN_PROGRESS: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
  COMPLETED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
  CANCELLED: 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400 border-slate-200 dark:border-slate-500/20',
};

const statusLabels: Record<BookingStatus, string> = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export default function BookingManager({ bookings, users, serviceItems }: Props) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const getUserName = (id: string) => users.find(u => u.id === id)?.name || 'Unknown User';
  const getServiceName = (id: string) => serviceItems.find(s => s.id === id)?.name || 'Unknown Service';

  const handleStatusChange = async (id: string, newStatus: BookingStatus) => {
    setUpdatingId(id);
    await updateBookingStatusAction(id, newStatus);
    setUpdatingId(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-outfit text-slate-900 dark:text-white">Active Bookings</h1>
        <p className="text-slate-500 mt-1">Manage service requests and pipeline status.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {bookings.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No bookings found. Wait for a client to request a service!
          </div>
        ) : (
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 dark:bg-slate-800/50 dark:border-slate-800 text-slate-500 font-medium">
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Service</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Start Date</th>
                <th className="py-4 px-6 w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {bookings.map(booking => (
                <tr key={booking.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900 dark:text-white">
                    {getUserName(booking.userId)}
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                    {getServiceName(booking.serviceItemId)}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${statusColors[booking.status]}`}>
                      {statusLabels[booking.status]}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500">
                    {new Date(booking.targetStartDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <select 
                        disabled={updatingId === booking.id}
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value as BookingStatus)}
                        className="bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 outline-none text-xs disabled:opacity-50"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancel</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

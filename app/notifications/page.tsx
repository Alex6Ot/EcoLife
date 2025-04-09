'use client';

import { useState } from 'react';
import { Bell, CheckCircle } from 'lucide-react';

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: 'Tienes un nuevo mensaje.', read: false },
    { id: 2, message: 'Tu pago ha sido procesado.', read: false },
    { id: 3, message: 'Actualización de seguridad disponible.', read: false },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notificaciones</h2>
          <button
            onClick={markAllAsRead}
            className="flex items-center text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            <CheckCircle size={16} className="mr-1" />
            Marcar todo como leído
          </button>
        </div>

        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded-lg shadow-sm flex items-center ${
                  notif.read ? 'bg-gray-200 dark:bg-gray-700' : 'bg-blue-100 dark:bg-blue-800'
                }`}
              >
                <Bell size={20} className="text-blue-500 dark:text-blue-300 mr-2" />
                <p className="text-gray-900 dark:text-white">{notif.message}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">No tienes notificaciones.</p>
          )}
        </div>
      </div>
    </div>
  );
}

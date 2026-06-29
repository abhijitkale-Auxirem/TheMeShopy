import DashboardLayout from '@/layouts/DashboardLayout';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import { Bell, Check, DollarSign, Star, Download, Info, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function Notifications() {
  const { user } = useAuthStore();
  const { notifications: allNotifications, markAsRead, markAllAsRead, notifications } = useNotificationStore();

  if (!user) return null;

  const userNotifications = allNotifications.filter(n => n.userId === user.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleMarkAllRead = () => {
    markAllAsRead(user.id);
    toast.success('All notifications marked as read');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'sale':
        return <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'review':
        return <Star className="w-5 h-5 text-amber-500 fill-amber-500" />;
      case 'download':
        return <Download className="w-5 h-5 text-blue-500" />;
      case 'system':
      default:
        return <Info className="w-5 h-5 text-indigo-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'sale':
        return 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/20';
      case 'review':
        return 'bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/20';
      case 'download':
        return 'bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/20';
      case 'system':
      default:
        return 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900/20';
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Notifications</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Stay updated with activity on the platform</p>
          </div>
          {userNotifications.some(n => !n.isRead) && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 text-sm font-medium rounded-xl hover:bg-indigo-100 transition-colors"
            >
              <Check className="w-4 h-4" />
              Mark all as read
            </button>
          )}
        </div>

        {userNotifications.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">All caught up!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">You don't have any notifications at the moment.</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm divide-y divide-gray-100 dark:divide-gray-700">
            {userNotifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => !notif.isRead && markAsRead(notif.id)}
                className={`p-5 flex items-start gap-4 transition-colors cursor-pointer ${
                  notif.isRead 
                    ? 'hover:bg-gray-50 dark:hover:bg-gray-700/20' 
                    : 'bg-indigo-50/20 dark:bg-indigo-950/10 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${getBgColor(notif.type)}`}>
                  {getIcon(notif.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={`text-sm text-gray-900 dark:text-white ${notif.isRead ? 'font-medium' : 'font-bold'}`}>
                        {notif.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {new Date(notif.createdAt).toLocaleDateString()} at {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {!notif.isRead && (
                      <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                    {notif.message}
                  </p>
                  {notif.link && (
                    <Link
                      to={notif.link}
                      className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

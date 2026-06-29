import DashboardLayout from '@/layouts/DashboardLayout';
import { Users as UsersIcon, Search, CheckCircle, Mail, Ban, Eye, Download, FileText, X } from 'lucide-react';
import { useState } from 'react';
import { mockUsers } from '@/database/mockDb';
import { toast } from 'sonner';

const allUsers = [
  ...mockUsers.map(u => ({ ...u, status: 'active', totalOrders: Math.floor(Math.random() * 50) })),
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `extra_${i}`,
    name: `User ${i + 10}`,
    email: `user${i + 10}@example.com`,
    role: ['buyer', 'seller', 'buyer', 'buyer'][i % 4] as 'buyer' | 'seller',
    avatar: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face'][i % 2],
    joinedAt: '2024-0' + ((i % 6) + 1) + '-15',
    isVerified: i % 3 !== 0,
    status: i % 7 === 0 ? 'suspended' : 'active',
    totalOrders: (i + 1) * 3,
    totalPurchases: (i + 1) * 3,
    earnings: 0,
    totalSales: 0,
  })),
];

const roleColors: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  seller: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  buyer: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  affiliate: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  agency: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
};

export default function AdminUsers() {
  const [usersList, setUsersList] = useState(allUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const filtered = usersList.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleToggleSuspend = (id: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'suspended' ? 'active' : 'suspended';
        toast.success(`User account is now ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleSendMessage = (email: string) => {
    toast.success(`Mock email compose modal opened for ${email}`);
  };

  const handleExportCSV = () => {
    const csvRows = [
      ['ID', 'Name', 'Email', 'Role', 'Joined At', 'Status', 'Verified'],
      ...filtered.map(u => [
        u.id,
        u.name,
        u.email,
        u.role,
        u.joinedAt,
        u.status,
        u.isVerified ? 'Yes' : 'No'
      ])
    ];
    const csvContent = "data:text/csv;charset=utf-8," 
      + csvRows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "platform_users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Users list exported to Excel (CSV) successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Users</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage all registered users on the platform</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" /> Export CSV (Excel)
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4" /> Export PDF (Print)
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8 print:hidden">
          {[
            { label: 'Total Users', value: usersList.length },
            { label: 'Buyers', value: usersList.filter(u => u.role === 'buyer').length },
            { label: 'Sellers', value: usersList.filter(u => u.role === 'seller').length },
            { label: 'Affiliates', value: usersList.filter(u => u.role === 'affiliate').length },
            { label: 'Suspended', value: usersList.filter(u => u.status === 'suspended').length },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 shadow-sm">
              <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 print:hidden">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none">
            <option value="all">All Roles</option>
            <option value="buyer">Buyers</option>
            <option value="seller">Sellers</option>
            <option value="affiliate">Affiliates</option>
            <option value="agency">Agencies</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <tr>
                  {['User', 'Role', 'Joined', 'Verified', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${roleColors[user.role] || roleColors.buyer}`}>{user.role}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{user.joinedAt}</td>
                    <td className="px-5 py-4">
                      {user.isVerified ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <span className="text-xs text-amber-500">Pending</span>}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${user.status === 'suspended' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 print:hidden">
                      <div className="flex gap-1">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                          title="View Profile Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleSendMessage(user.email)}
                          className="p-1.5 text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                          title="Send Message"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleToggleSuspend(user.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            user.status === 'suspended'
                              ? 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                              : 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                          }`}
                          title={user.status === 'suspended' ? 'Activate Account' : 'Suspend Account'}
                        >
                          <Ban className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl w-full max-w-md p-6 relative animate-scale-in shadow-xl">
            <button onClick={() => setSelectedUser(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center text-center">
              <img src={selectedUser.avatar} alt={selectedUser.name} className="w-20 h-20 rounded-full object-cover border border-gray-100 dark:border-gray-700 shadow-sm mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedUser.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{selectedUser.email}</p>
              <span className="inline-block mt-2 text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-2.5 py-0.5 rounded-full capitalize font-semibold">{selectedUser.role}</span>
              
              <div className="w-full grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 text-left text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Joined Date</p>
                  <p className="font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{selectedUser.joinedAt}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Account Status</p>
                  <p className={`font-semibold capitalize mt-0.5 ${selectedUser.status === 'suspended' ? 'text-red-500' : 'text-emerald-500'}`}>{selectedUser.status}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Total Orders</p>
                  <p className="font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{selectedUser.totalOrders}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Verified</p>
                  <p className="font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{selectedUser.isVerified ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

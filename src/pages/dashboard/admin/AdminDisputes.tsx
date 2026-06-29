import DashboardLayout from '@/layouts/DashboardLayout';
import { AlertTriangle, Search, CheckCircle, Clock, MessageSquare, Eye, XCircle, Send, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const initialDisputes = [
  { id: 'disp_1', orderId: '#ORD-10023', buyer: { name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' }, seller: { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face' }, product: 'Cosmos WordPress Theme', reason: 'Product not as described', amount: 49, status: 'open', priority: 'high', createdAt: '2024-06-10', messagesCount: 3 },
  { id: 'disp_2', orderId: '#ORD-10018', buyer: { name: 'Carlos Rivera', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face' }, seller: { name: 'Stella Rodriguez', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face' }, product: 'Aurora Landing Kit', reason: 'Download link not working', amount: 29, status: 'under_review', priority: 'medium', createdAt: '2024-06-08', messagesCount: 2 },
  { id: 'disp_3', orderId: '#ORD-10011', buyer: { name: 'Liam Park', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' }, seller: { name: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face' }, product: 'Nexus Dashboard', reason: 'Major bugs in product', amount: 59, status: 'resolved', priority: 'low', createdAt: '2024-05-28', messagesCount: 5 },
  { id: 'disp_4', orderId: '#ORD-10035', buyer: { name: 'Nina Patel', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face' }, seller: { name: 'Priya Patel', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face' }, product: 'Prism UI Library', reason: 'Requesting refund', amount: 79, status: 'open', priority: 'medium', createdAt: '2024-06-12', messagesCount: 1 },
];

const initialChats: Record<string, { sender: string; text: string; time: string }[]> = {
  disp_1: [
    { sender: 'buyer', text: 'Hi, the theme settings page fails to save accent colors on my dev server.', time: '10:05 AM' },
    { sender: 'seller', text: 'Please verify if you have write permission enabled in your node project configuration.', time: '10:30 AM' },
    { sender: 'buyer', text: 'Yes, write file access is enabled. I still get a 500 server error.', time: '10:45 AM' },
  ],
  disp_2: [
    { sender: 'buyer', text: 'I completed payment but the zip file download results in a 403 Forbidden error.', time: 'Yesterday' },
    { sender: 'seller', text: 'Let me refresh the file bucket. Try checking it in 5 minutes.', time: 'Yesterday' },
  ],
  disp_3: [
    { sender: 'buyer', text: 'There are major CSS compile issues in the Tailwind build process.', time: 'May 28' },
    { sender: 'seller', text: 'Apologies, a new fix was uploaded. Version 1.0.4 fixes this compiling issue.', time: 'May 28' },
    { sender: 'buyer', text: 'Got it, the update works. We can close this dispute.', time: 'May 28' },
  ],
  disp_4: [
    { sender: 'buyer', text: 'I requested a refund under the 14-day warranty rule.', time: 'June 12' },
  ]
};

const statusConfig: Record<string, { label: string; color: string }> = {
  open: { label: 'Open', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  under_review: { label: 'Under Review', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  resolved: { label: 'Resolved', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
};

const priorityConfig: Record<string, string> = {
  high: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  medium: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  low: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
};

export default function AdminDisputes() {
  const [disputesList, setDisputesList] = useState(initialDisputes);
  const [chats, setChats] = useState(initialChats);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [mediatingDispute, setMediatingDispute] = useState<any | null>(null);
  const [messageText, setMessageText] = useState('');

  const filtered = disputesList.filter(d => {
    const matchSearch = d.product.toLowerCase().includes(search.toLowerCase()) || d.buyer.name.toLowerCase().includes(search.toLowerCase()) || d.orderId.includes(search);
    const matchStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleResolve = (id: string) => {
    setDisputesList(prev => prev.map(d => {
      if (d.id === id) {
        toast.success(`Dispute ${d.orderId} marked as resolved.`);
        return { ...d, status: 'resolved' };
      }
      return d;
    }));
  };

  const handleMediate = (dispute: any) => {
    setMediatingDispute(dispute);
    if (dispute.status === 'open') {
      // Transition open disputes to under review when admin starts mediating
      setDisputesList(prev => prev.map(d => {
        if (d.id === dispute.id) {
          return { ...d, status: 'under_review' };
        }
        return d;
      }));
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !mediatingDispute) return;

    const newMessage = {
      sender: 'admin',
      text: messageText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats(prev => ({
      ...prev,
      [mediatingDispute.id]: [...(prev[mediatingDispute.id] || []), newMessage]
    }));

    setDisputesList(prev => prev.map(d => {
      if (d.id === mediatingDispute.id) {
        return { ...d, messagesCount: d.messagesCount + 1 };
      }
      return d;
    }));

    setMessageText('');
    toast.success('Mediation response sent successfully!');
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Disputes</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage buyer-seller disputes and refund requests</p>
        </div>

        {/* Summary metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Disputes', value: disputesList.length, color: 'gray' },
            { label: 'Open', value: disputesList.filter(d => d.status === 'open').length, color: 'red' },
            { label: 'Under Review', value: disputesList.filter(d => d.status === 'under_review').length, color: 'amber' },
            { label: 'Resolved', value: disputesList.filter(d => d.status === 'resolved').length, color: 'emerald' },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm">
              <p className={`text-2xl font-bold font-heading ${
                s.color === 'red' ? 'text-red-600' : s.color === 'amber' ? 'text-amber-600' : s.color === 'emerald' ? 'text-emerald-600' : 'text-gray-900 dark:text-white'
              }`}>{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search disputes..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none">
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="under_review">Under Review</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Dispute item boxes */}
        <div className="space-y-4">
          {filtered.map(dispute => (
            <div key={dispute.id} className={`bg-white dark:bg-gray-800 border rounded-xl p-6 shadow-sm ${dispute.status === 'open' ? 'border-red-200 dark:border-red-800' : 'border-gray-100 dark:border-gray-700'}`}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{dispute.orderId}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusConfig[dispute.status]?.color}`}>{statusConfig[dispute.status]?.label}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${priorityConfig[dispute.priority]}`}>{dispute.priority} priority</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{dispute.product}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 italic">"{dispute.reason}"</p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <img src={dispute.buyer.avatar} alt={dispute.buyer.name} className="w-6 h-6 rounded-full object-cover" />
                      <div>
                        <p className="text-xs text-gray-400">Buyer</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{dispute.buyer.name}</p>
                      </div>
                    </div>
                    <div className="text-gray-300 dark:text-gray-600">→</div>
                    <div className="flex items-center gap-2">
                      <img src={dispute.seller.avatar} alt={dispute.seller.name} className="w-6 h-6 rounded-full object-cover" />
                      <div>
                        <p className="text-xs text-gray-400">Seller</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{dispute.seller.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <span>Amount: <span className="font-semibold text-gray-700 dark:text-gray-300">${dispute.amount}</span></span>
                    <span>Opened: {dispute.createdAt}</span>
                    <div className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{dispute.messagesCount} messages</div>
                  </div>
                </div>
                
                <div className="flex sm:flex-col gap-2 flex-shrink-0">
                  <button 
                    onClick={() => handleMediate(dispute)}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 border border-indigo-200 dark:border-indigo-700 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Mediate Chat
                  </button>
                  {dispute.status !== 'resolved' && (
                    <button 
                      onClick={() => handleResolve(dispute.id)}
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-600 border border-emerald-200 dark:border-emerald-700 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Close & Resolve
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mediation Chat Modal */}
      {mediatingDispute && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl w-full max-w-lg p-6 relative flex flex-col h-[550px] shadow-2xl animate-scale-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Mediate Dispute: {mediatingDispute.orderId}</h3>
                <p className="text-xs text-gray-400 mt-0.5">Product: {mediatingDispute.product}</p>
              </div>
              <button onClick={() => setMediatingDispute(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              {(chats[mediatingDispute.id] || []).map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col max-w-[80%] ${
                    msg.sender === 'admin' 
                      ? 'ml-auto items-end' 
                      : msg.sender === 'buyer' 
                      ? 'mr-auto items-start' 
                      : 'mr-auto items-start'
                  }`}
                >
                  <span className="text-[10px] text-gray-400 capitalize mb-1 font-semibold">
                    {msg.sender} • {msg.time}
                  </span>
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'admin' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : msg.sender === 'buyer' 
                      ? 'bg-gray-100 dark:bg-gray-750 text-gray-800 dark:text-gray-200 rounded-tl-none' 
                      : 'bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Send Input Form */}
            <form onSubmit={handleSendMessage} className="pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-2">
              <input 
                type="text" 
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                placeholder="Type response as Platform Mediate Admin..." 
                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
              />
              <button type="submit" className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

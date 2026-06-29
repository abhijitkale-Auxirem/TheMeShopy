import DashboardLayout from '@/layouts/DashboardLayout';
import { MessageSquare, Search, Send, User } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const initialConversations = [
  { id: 'conv_1', buyer: { name: 'Sarah Williams', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face' }, lastMessage: 'Hi! I have a question about the Nexus dashboard customization.', time: '10:32 AM', unread: 2, product: 'Nexus Dashboard' },
  { id: 'conv_2', buyer: { name: 'Carlos Rivera', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face' }, lastMessage: 'Thanks for the help! The issue is resolved now.', time: 'Yesterday', unread: 0, product: 'LaunchKit' },
  { id: 'conv_3', buyer: { name: 'Emma Thompson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face' }, lastMessage: 'Could you add dark mode support in the next update?', time: '2 days ago', unread: 1, product: 'DataVault' },
  { id: 'conv_4', buyer: { name: 'Liam O\'Brien', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face' }, lastMessage: 'Great product! Left a 5-star review.', time: '3 days ago', unread: 0, product: 'Nexus Dashboard' },
];

const initialMessagesMap: Record<string, { id: string; from: 'buyer' | 'seller'; text: string; time: string }[]> = {
  conv_1: [
    { id: 'm1', from: 'buyer', text: 'Hi! I have a question about the Nexus dashboard customization.', time: '10:30 AM' },
    { id: 'm2', from: 'buyer', text: 'Specifically, how do I change the primary color theme?', time: '10:31 AM' },
    { id: 'm3', from: 'seller', text: 'Hi Sarah! Great question. You can change the primary color by editing the tailwind.config.ts file and updating the "primary" color value.', time: '10:35 AM' },
    { id: 'm4', from: 'buyer', text: 'Perfect, thank you so much! That was really helpful.', time: '10:38 AM' },
  ],
  conv_2: [
    { id: 'm2_1', from: 'buyer', text: 'Hey, I had an error with the component loader.', time: 'Yesterday' },
    { id: 'm2_2', from: 'seller', text: 'Please ensure you are using Vite React 18 configuration templates.', time: 'Yesterday' },
    { id: 'm2_3', from: 'buyer', text: 'Thanks for the help! The issue is resolved now.', time: 'Yesterday' },
  ],
  conv_3: [
    { id: 'm3_1', from: 'buyer', text: 'Could you add dark mode support in the next update?', time: '2 days ago' },
  ],
  conv_4: [
    { id: 'm4_1', from: 'buyer', text: 'Great product! Left a 5-star review.', time: '3 days ago' },
  ],
};

export default function SellerMessages() {
  const [conversationsList, setConversationsList] = useState(initialConversations);
  const [messagesMap, setMessagesMap] = useState(initialMessagesMap);
  const [activeConv, setActiveConv] = useState('conv_1');
  const [search, setSearch] = useState('');
  const [newMsg, setNewMsg] = useState('');

  const active = conversationsList.find(c => c.id === activeConv);
  const activeMessages = messagesMap[activeConv] || [];

  const handleSelectConv = (id: string) => {
    setActiveConv(id);
    setConversationsList(prev => 
      prev.map(c => c.id === id ? { ...c, unread: 0 } : c)
    );
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsgObj = {
      id: `m_new_${Date.now()}`,
      from: 'seller' as const,
      text: newMsg,
      time: timestamp,
    };

    // Update message threads state
    setMessagesMap(prev => ({
      ...prev,
      [activeConv]: [...(prev[activeConv] || []), newMsgObj]
    }));

    // Update conversations list state
    setConversationsList(prev => 
      prev.map(c => 
        c.id === activeConv 
          ? { ...c, lastMessage: newMsg, time: 'Just now', unread: 0 } 
          : c
      )
    );

    setNewMsg('');
    toast.success('Message sent successfully!');
  };

  const filteredConversations = conversationsList.filter(c =>
    c.buyer.name.toLowerCase().includes(search.toLowerCase()) ||
    c.product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">Messages</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Communicate with your buyers</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm" style={{ height: '600px' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-80 border-r border-gray-100 dark:border-gray-700 flex flex-col flex-shrink-0">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-700 text-sm rounded-lg border border-gray-250 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map(conv => (
                  <button
                    key={conv.id}
                    onClick={() => handleSelectConv(conv.id)}
                    className={`w-full flex items-start gap-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-750/30 transition-colors border-l-2 ${activeConv === conv.id ? 'bg-indigo-50/50 dark:bg-indigo-900/20 border-l-indigo-650' : 'border-l-transparent'}`}
                  >
                    <img src={conv.buyer.avatar} alt={conv.buyer.name} className="w-10 h-10 rounded-full flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{conv.buyer.name}</span>
                        <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{conv.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{conv.lastMessage}</p>
                      <p className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 mt-1">{conv.product}</p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0 ml-1">{conv.unread}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat */}
            {active ? (
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                  <img src={active.buyer.avatar} alt={active.buyer.name} className="w-9 h-9 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{active.buyer.name}</p>
                    <p className="text-xs text-gray-400">Re: {active.product}</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {activeMessages.map(msg => (
                    <div key={msg.id} className={`flex gap-3 ${msg.from === 'seller' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.from === 'seller' ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'}`}>
                        {msg.from === 'seller' ? <User className="w-4 h-4 text-white" /> : <img src={active.buyer.avatar} alt="" className="w-8 h-8 rounded-full" />}
                      </div>
                      <div className={`max-w-xs lg:max-w-md ${msg.from === 'seller' ? 'items-end' : 'items-start'} flex flex-col`}>
                        <div className={`px-4 py-2.5 rounded-2xl text-sm ${msg.from === 'seller' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-gray-100 dark:bg-gray-750 text-gray-900 dark:text-white rounded-tl-sm'}`}>
                          {msg.text}
                        </div>
                        <span className="text-xs text-gray-450 mt-1">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                  <form onSubmit={handleSend} className="flex gap-3">
                    <input
                      type="text"
                      value={newMsg}
                      onChange={e => setNewMsg(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button type="submit" className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">Select a conversation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

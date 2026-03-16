import React, { useState } from 'react';
import { Camera, Mail, Shield, LogOut, History, Wallet, ArrowUpFromLine, IndianRupee } from 'lucide-react';
import { useAppContext } from '../store';
import { useNavigate } from 'react-router';
import { Card, Badge, Button } from './ui';

export const UserProfile = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'reels' | 'transactions' | 'withdrawals'>('reels');
  
  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-3xl mx-auto pb-20 md:pb-0 space-y-6">
      {/* Profile Header Card */}
      <Card className="p-0 overflow-hidden border-none shadow-sm">
         <div className="h-32 bg-gradient-to-r from-[#FF7A18] via-[#FF3B5C] to-[#E1306C]"></div>
         <div className="px-6 pb-6 relative">
            <div className="flex justify-center -mt-12 mb-4">
               <div className="h-24 w-24 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold relative overflow-hidden">
                  {user.name.charAt(0)}
               </div>
            </div>
            
            <div className="text-center">
               <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
               <p className="text-gray-500 flex items-center justify-center gap-1.5 mt-1">
                  <Mail className="w-4 h-4" /> {user.email}
               </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
               <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1 flex items-center gap-1.5"><Wallet className="w-4 h-4" /> Wallet Balance</p>
                  <p className="text-2xl font-bold text-gray-900 flex items-center"><IndianRupee className="w-5 h-5 mr-0.5" />{user.walletBalance.toFixed(2)}</p>
               </div>
               <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1 flex items-center gap-1.5"><Shield className="w-4 h-4" /> Tier Level</p>
                  <Badge className="bg-blue-100 text-blue-800 text-sm py-1 mt-0.5">Basic Tier</Badge>
               </div>
            </div>
         </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
         <button 
            className={`whitespace-nowrap px-5 py-2.5 text-[15px] font-medium rounded-full transition-colors ${activeTab === 'reels' ? 'bg-[#FF3B5C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('reels')}
         >
            Reel History
         </button>
         <button 
            className={`whitespace-nowrap px-5 py-2.5 text-[15px] font-medium rounded-full transition-colors ${activeTab === 'transactions' ? 'bg-[#FF3B5C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('transactions')}
         >
            Transactions
         </button>
         <button 
            className={`whitespace-nowrap px-5 py-2.5 text-[15px] font-medium rounded-full transition-colors ${activeTab === 'withdrawals' ? 'bg-[#FF3B5C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('withdrawals')}
         >
            Withdrawals
         </button>
      </div>

      <Card className="shadow-sm border-gray-100 p-0 overflow-hidden">
         {activeTab === 'reels' && (
            <div className="p-6 text-center text-gray-500">
               <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
               <p>No recent reel history available.</p>
            </div>
         )}
         {activeTab === 'transactions' && (
            <div className="p-6 text-center text-gray-500">
               <Wallet className="w-12 h-12 text-gray-300 mx-auto mb-3" />
               <p>No recent transactions.</p>
            </div>
         )}
         {activeTab === 'withdrawals' && (
            <div className="p-6 text-center text-gray-500">
               <ArrowUpFromLine className="w-12 h-12 text-gray-300 mx-auto mb-3" />
               <p>No withdrawal requests yet.</p>
            </div>
         )}
      </Card>

      <Button variant="danger" className="w-full mt-8 h-12 text-[16px]" onClick={handleLogout}>
        <LogOut className="w-5 h-5 mr-2" />
        Log Out
      </Button>
    </div>
  );
};
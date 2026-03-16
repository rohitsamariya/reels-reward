import React from 'react';
import { Card, Button, Badge } from './ui';
import { useAppContext } from '../store';
import { Play, TrendingUp, Wallet, Clock, CheckCircle, IndianRupee, Video, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

export const UserDashboard = () => {
  const { user, assignedReels } = useAppContext();
  const navigate = useNavigate();

  if (!user) return null;

  const watchedCount = assignedReels.filter(r => r.status === 'watched').length;
  const totalCount = assignedReels.length;
  const progress = (user.dailyEarnings / user.dailyTarget) * 100;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 md:pb-0">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
        <p className="text-sm text-gray-500 hidden sm:block">Here is your daily overview</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {/* Wallet Balance Card */}
        <Card className="bg-gradient-to-br from-[#FF3B5C] to-[#FF7A18] text-white border-none shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/20 rounded-xl">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white/90 text-sm font-medium">Available Balance</p>
              <h2 className="text-3xl font-bold flex items-center mt-1"><IndianRupee className="w-6 h-6 mr-0.5" />{user.walletBalance}</h2>
            </div>
          </div>
          <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
               <p className="text-xs text-white/80">Weekly Earnings</p>
               <span className="text-lg font-bold text-white flex items-center mt-0.5"><IndianRupee className="w-4 h-4 mr-0.5" />145.00</span>
            </div>
            <Button variant="ghost" size="md" className="w-full sm:w-auto text-[#FF3B5C] bg-white hover:bg-gray-50 font-bold rounded-xl" onClick={() => navigate('/wallet')}>
              Withdraw Funds
            </Button>
          </div>
        </Card>

        {/* Daily Earnings Progress */}
        <Card className="shadow-sm border-gray-100 flex flex-col justify-center">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5 text-[#22C55E]" />
              Today's Earnings
            </h3>
            <div className="flex items-baseline gap-2 mt-2">
               <p className="text-3xl font-bold text-gray-900 flex items-baseline">
                 <IndianRupee className="w-6 h-6 mr-0.5 self-center" />{user.dailyEarnings}
               </p>
               <span className="text-gray-500 text-sm font-medium">/ <IndianRupee className="w-3 h-3 inline mx-0.5" />{user.dailyTarget} goal</span>
            </div>
          </div>
          <div className="relative pt-1 mt-2">
            <div className="flex justify-between text-xs font-semibold mb-2">
               <span className="text-[#22C55E]">{Math.round(progress)}% Complete</span>
               <span className="text-gray-500"><IndianRupee className="w-3 h-3 inline mr-0.5" />{(user.dailyTarget - user.dailyEarnings).toFixed(2)} remaining</span>
            </div>
            <div className="overflow-hidden h-4 text-xs flex rounded-full bg-gray-100">
              <div style={{ width: `${Math.min(progress, 100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#22C55E] transition-all duration-500 ease-in-out"></div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Today's Assigned Reels</h2>
          <Badge variant="default">{totalCount - watchedCount} Remaining</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-4">
          {assignedReels.map((reel) => (
            <Card key={reel.id} className="p-0 overflow-hidden flex flex-col shadow-sm border border-gray-100 rounded-2xl">
              <div className="relative h-56 sm:h-64 bg-gray-200">
                <img src={reel.thumbnail} alt={`Reel ${reel.id}`} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3">
                  <Badge variant={reel.status === 'watched' ? 'success' : 'warning'} className="shadow-sm">
                    {reel.status === 'watched' ? 'Watched' : 'Pending'}
                  </Badge>
                </div>
                {reel.status === 'watched' && (
                   <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-[#22C55E] mb-2" />
                    <span className="font-bold text-gray-900">Completed</span>
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                <div className="mb-4">
                  <h4 className="font-bold text-gray-900 text-[16px] truncate">{reel.creatorName}</h4>
                  <div className="flex items-center gap-3 mt-1.5 text-sm font-medium">
                    <div className="flex items-center gap-1 text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                      <Clock className="w-3.5 h-3.5" />
                      {reel.duration}s
                    </div>
                    <div className="flex items-center text-[#22C55E] bg-[#22C55E]/10 px-2 py-1 rounded-md">
                      +<IndianRupee className="w-3.5 h-3.5 mx-0.5" />{reel.rewardAmount}
                    </div>
                  </div>
                </div>
                <Button 
                  variant={reel.status === 'watched' ? 'secondary' : 'primary'}
                  className="w-full text-[15px] font-bold h-12"
                  disabled={reel.status === 'watched'}
                  onClick={() => navigate(`/watch/${reel.id}`)}
                >
                  {reel.status === 'watched' ? 'Watched' : 'Watch Reel'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

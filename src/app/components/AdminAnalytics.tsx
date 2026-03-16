import React from 'react';
import { Card } from './ui';
import { Users, Eye, IndianRupee, Activity, TrendingUp } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const dailyActiveUsersData = [
  { name: 'Mon', users: 240 },
  { name: 'Tue', users: 300 },
  { name: 'Wed', users: 280 },
  { name: 'Thu', users: 350 },
  { name: 'Fri', users: 320 },
  { name: 'Sat', users: 400 },
  { name: 'Sun', users: 450 },
];

const reelViewsData = [
  { name: 'Mon', views: 4000 },
  { name: 'Tue', views: 5500 },
  { name: 'Wed', views: 4800 },
  { name: 'Thu', views: 6200 },
  { name: 'Fri', views: 5900 },
  { name: 'Sat', views: 8000 },
  { name: 'Sun', views: 8432 },
];

const topPerformers = [
  { id: 'R-102', title: 'Tech Unboxing', views: 12450, earnings: 1245 },
  { id: 'R-089', title: 'Travel Vlog India', views: 9800, earnings: 980 },
  { id: 'R-115', title: 'Fitness Tips', views: 8200, earnings: 820 },
  { id: 'R-045', title: 'Cooking Hack', views: 7600, earnings: 760 },
  { id: 'R-099', title: 'Finance 101', views: 6500, earnings: 650 },
];

export const AdminAnalytics = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 md:pb-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-sm text-gray-500">Platform performance and metrics</p>
        </div>
        <select className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm">
           <option>Last 7 Days</option>
           <option>Last 30 Days</option>
           <option>This Month</option>
           <option>This Year</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm border-gray-100 flex items-center gap-4 p-5">
           <div className="p-3 bg-[#FF3B5C]/10 text-[#FF3B5C] rounded-xl">
              <Users className="w-6 h-6" />
           </div>
           <div>
              <p className="text-sm text-gray-500 font-medium mb-0.5">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-900">1,245</h3>
           </div>
        </Card>
        
        <Card className="shadow-sm border-gray-100 flex items-center gap-4 p-5">
           <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
              <Activity className="w-6 h-6" />
           </div>
           <div>
              <p className="text-sm text-gray-500 font-medium mb-0.5">Active Today</p>
              <h3 className="text-2xl font-bold text-gray-900">328</h3>
           </div>
        </Card>

        <Card className="shadow-sm border-gray-100 flex items-center gap-4 p-5">
           <div className="p-3 bg-[#22C55E]/10 text-[#22C55E] rounded-xl">
              <Eye className="w-6 h-6" />
           </div>
           <div>
              <p className="text-sm text-gray-500 font-medium mb-0.5">Views Today</p>
              <h3 className="text-2xl font-bold text-gray-900">8,432</h3>
           </div>
        </Card>

        <Card className="shadow-sm border-gray-100 flex items-center gap-4 p-5">
           <div className="p-3 bg-[#F59E0B]/10 text-[#F59E0B] rounded-xl">
              <TrendingUp className="w-6 h-6" />
           </div>
           <div>
              <p className="text-sm text-gray-500 font-medium mb-0.5">Total Earnings Paid</p>
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                 <IndianRupee className="w-5 h-5 mr-0.5" />45,200
              </h3>
           </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card className="shadow-sm border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-6">Daily Active Users</h3>
            <div className="h-72">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyActiveUsersData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs key="defs">
                      <linearGradient id="adminAnalyticsGradient" x1="0" y1="0" x2="0" y2="1" key="gradient">
                        <stop offset="5%" stopColor="#FF3B5C" stopOpacity={0.3} key="stop1" />
                        <stop offset="95%" stopColor="#FF3B5C" stopOpacity={0} key="stop2" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis key="xaxis" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                    <YAxis key="yaxis" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                    <Tooltip 
                       key="tooltip"
                       contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                       itemStyle={{ color: '#111827', fontWeight: 'bold' }}
                    />
                    <Area key="area" type="monotone" dataKey="users" stroke="#FF3B5C" strokeWidth={3} fillOpacity={1} fill="url(#adminAnalyticsGradient)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </Card>

         <Card className="shadow-sm border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-6">Reel Views per Day</h3>
            <div className="h-72">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reelViewsData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis key="xaxis" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                    <YAxis key="yaxis" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                    <Tooltip 
                       key="tooltip"
                       cursor={{fill: '#F3F4F6'}}
                       contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar key="bar" dataKey="views" fill="#22C55E" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card className="shadow-sm border-gray-100 p-0 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-100">
               <h3 className="font-semibold text-gray-900">Top Performing Reels</h3>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-gray-50/50">
                     <tr>
                        <th className="py-3 px-5 text-xs font-medium text-gray-500 uppercase tracking-wider">Reel Title</th>
                        <th className="py-3 px-5 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Views</th>
                        <th className="py-3 px-5 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Earnings Gen.</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {topPerformers.map((item, i) => (
                        <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                           <td className="py-3 px-5">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded bg-gray-200 shrink-0 flex items-center justify-center text-xs font-bold text-gray-500">R</div>
                                 <div>
                                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                    <p className="text-xs text-gray-500">{item.id}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="py-3 px-5 text-sm text-gray-900 font-medium text-right">{item.views.toLocaleString()}</td>
                           <td className="py-3 px-5 text-sm text-[#FF3B5C] font-bold text-right flex items-center justify-end">
                              <IndianRupee className="w-3 h-3 mr-0.5" />{item.earnings.toLocaleString()}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Card>

         <Card className="shadow-sm border-gray-100 p-0 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-100">
               <h3 className="font-semibold text-gray-900">Top Earners</h3>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-gray-50/50">
                     <tr>
                        <th className="py-3 px-5 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="py-3 px-5 text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
                        <th className="py-3 px-5 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Total Earnings</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {[
                        { name: 'Priya Patel', tier: 'Gold', earn: 8450 },
                        { name: 'Sneha Reddy', tier: 'Gold', earn: 7200 },
                        { name: 'Anjali Sharma', tier: 'Gold', earn: 6800 },
                        { name: 'Neha Gupta', tier: 'Silver', earn: 3450 },
                        { name: 'Rohit Sharma', tier: 'Silver', earn: 2100 },
                     ].map((user, i) => (
                        <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                           <td className="py-3 px-5">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-[#FF3B5C]/10 text-[#FF3B5C] shrink-0 flex items-center justify-center text-xs font-bold">{user.name.charAt(0)}</div>
                                 <p className="text-sm font-medium text-gray-900">{user.name}</p>
                              </div>
                           </td>
                           <td className="py-3 px-5">
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                 user.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                 {user.tier}
                              </span>
                           </td>
                           <td className="py-3 px-5 text-sm text-green-600 font-bold text-right flex items-center justify-end">
                              <IndianRupee className="w-3 h-3 mr-0.5" />{user.earn.toLocaleString()}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Card>
      </div>
    </div>
  );
};
import React from 'react';
import { Card, Button, Badge } from './ui';
import { Users, Eye, ArrowUpFromLine, TrendingUp, BarChart3, IndianRupee } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

import { useNavigate } from 'react-router';

const kpis = [
  { name: 'Total Users', value: '1,245', icon: Users, change: '+12%', color: 'text-[#FF3B5C]', bg: 'bg-[#FF3B5C]/10' },
  { name: 'Views Today', value: '8,432', icon: Eye, change: '+5.4%', color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/10' },
  { name: 'Pending Withdrawals', value: '16', icon: ArrowUpFromLine, change: '-2', color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10' },
  { name: 'Earnings Paid', value: '45,200', prefixIcon: true, icon: TrendingUp, change: '+24%', color: 'text-blue-500', bg: 'bg-blue-500/10' },
];

const recentActivity = [
  { id: 1, user: 'Alex Johnson', action: 'Withdrawal Request', amount: '500', isRupee: true, time: '10 mins ago', status: 'pending' },
  { id: 2, user: 'Maria Garcia', action: 'Reel Watched', amount: '10', isRupee: true, time: '25 mins ago', status: 'completed' },
  { id: 3, user: 'James Smith', action: 'Deposit Approved', amount: '1000', isRupee: true, time: '1 hour ago', status: 'completed' },
  { id: 4, user: 'Linda Lee', action: 'New Registration', amount: '-', isRupee: false, time: '2 hours ago', status: 'completed' },
];

const mockChartData = [
  { name: 'Mon', users: 150 },
  { name: 'Tue', users: 230 },
  { name: 'Wed', users: 180 },
  { name: 'Thu', users: 290 },
  { name: 'Fri', users: 250 },
  { name: 'Sat', users: 340 },
  { name: 'Sun', users: 380 },
];

export const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 md:pb-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
          <p className="text-sm text-gray-500">Track key metrics and recent activity</p>
        </div>
        <Button className="hidden sm:flex" variant="primary">
          <BarChart3 className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <Card key={kpi.name} className="shadow-sm border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${kpi.bg}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <Badge variant={kpi.change.startsWith('+') ? 'success' : 'danger'}>
                {kpi.change}
              </Badge>
            </div>
            <p className="text-sm font-medium text-gray-500">{kpi.name}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1 flex items-center">
              {kpi.prefixIcon && <IndianRupee className="w-5 h-5 mr-0.5" />}
              {kpi.value}
            </h3>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Placeholder Chart */}
        <Card className="col-span-1 lg:col-span-2 shadow-sm border-gray-100 min-h-[400px] flex flex-col">
          <div className="mb-6 flex justify-between items-center">
             <h3 className="font-semibold text-gray-900">User Growth & Activity</h3>
             <select className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm p-1.5 bg-gray-50">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
             </select>
          </div>
          <div className="flex-1 min-h-0 bg-white rounded-lg pt-4">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs key="defs">
                    <linearGradient id="adminDashboardGradient" x1="0" y1="0" x2="0" y2="1" key="gradient">
                      <stop offset="5%" stopColor="#FF3B5C" stopOpacity={0.3} key="stop1" />
                      <stop offset="95%" stopColor="#FF3B5C" stopOpacity={0} key="stop2" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis key="xaxis" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                  <YAxis key="yaxis" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                  <RechartsTooltip 
                     key="tooltip"
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                     itemStyle={{ color: '#111827', fontWeight: 'bold' }}
                  />
                  <Area key="area" type="monotone" dataKey="users" stroke="#FF3B5C" strokeWidth={3} fillOpacity={1} fill="url(#adminDashboardGradient)" />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-1 shadow-sm border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 group cursor-default">
                <div className="w-10 h-10 rounded-full bg-[#FF3B5C]/10 flex items-center justify-center shrink-0 text-[#FF3B5C] font-bold">
                  {activity.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.user}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {activity.action}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-gray-900 flex items-center justify-end">
                    {activity.isRupee && <IndianRupee className="w-3.5 h-3.5" />}
                    {activity.amount}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-4 border-t border-gray-100">
             <Button variant="ghost" className="w-full text-[#FF3B5C] hover:bg-[#FF3B5C]/10" onClick={() => navigate('/admin/activity')}>View All Activity</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
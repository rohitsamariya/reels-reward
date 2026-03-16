import React from 'react';
import { Card, Badge } from './ui';
import { Shield, User } from 'lucide-react';

const activities = [
  { id: 1, time: '10:30 AM', role: 'User', name: 'Rohit Sharma', type: 'Registration', details: 'New user registered via referral link' },
  { id: 2, time: '11:15 AM', role: 'Admin', name: 'System', type: 'Deposit Approved', details: 'Approved ₹500 deposit for Priya Patel' },
  { id: 3, time: '11:45 AM', role: 'User', name: 'Amit Kumar', type: 'Reel Watched', details: 'Watched Reel ID R-102 (+₹10)' },
  { id: 4, time: '12:05 PM', role: 'Admin', name: 'System', type: 'Withdrawal Completed', details: 'Processed ₹425 payout to Vikram Singh' },
  { id: 5, time: '01:20 PM', role: 'Admin', name: 'System', type: 'User Suspended', details: 'Suspended Amit Kumar for suspicious activity' },
  { id: 6, time: '02:00 PM', role: 'User', name: 'Neha Gupta', type: 'Upgrade Plan', details: 'Upgraded to Silver Tier' },
];

export const AdminActivity = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
        <p className="text-sm text-gray-500">Track all actions performed by users and admins across the platform.</p>
      </div>

      <Card className="shadow-sm border-gray-100 p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500 font-medium bg-gray-50">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">User / Actor</th>
                <th className="py-3 px-4">Action Type</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activities.map((act) => (
                <tr key={act.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-500">{act.time}</td>
                  <td className="py-4 px-4">
                    <Badge variant={act.role === 'Admin' ? 'info' : 'default'} icon={act.role === 'Admin' ? Shield : User}>
                       {act.role}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">{act.name}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-gray-700">{act.type}</td>
                  <td className="py-4 px-4 text-sm text-gray-500">{act.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
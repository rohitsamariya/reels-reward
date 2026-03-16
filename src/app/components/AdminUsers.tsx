import React, { useState } from 'react';
import { Card, Button, Badge, Input } from './ui';
import { Search, Filter, IndianRupee, CheckCircle, AlertCircle, Ban } from 'lucide-react';

const mockUsers = [
  { id: 'USR-001', name: 'Rohit Sharma', email: 'rohit@example.com', wallet: 425, tier: 'Silver', joined: '2026-01-12', status: 'Active' },
  { id: 'USR-002', name: 'Priya Patel', email: 'priya@example.com', wallet: 1250, tier: 'Gold', joined: '2026-01-15', status: 'Active' },
  { id: 'USR-003', name: 'Amit Kumar', email: 'amit@example.com', wallet: 45, tier: 'Basic', joined: '2026-02-01', status: 'Suspended' },
  { id: 'USR-004', name: 'Neha Gupta', email: 'neha@example.com', wallet: 850, tier: 'Silver', joined: '2026-02-10', status: 'Active' },
  { id: 'USR-005', name: 'Vikram Singh', email: 'vikram@example.com', wallet: 0, tier: 'Basic', joined: '2026-02-28', status: 'Banned' },
  { id: 'USR-006', name: 'Sneha Reddy', email: 'sneha@example.com', wallet: 2100, tier: 'Gold', joined: '2025-12-05', status: 'Active' },
  { id: 'USR-007', name: 'Rajesh Verma', email: 'rajesh@example.com', wallet: 320, tier: 'Silver', joined: '2026-01-20', status: 'Active' },
  { id: 'USR-008', name: 'Kavita Joshi', email: 'kavita@example.com', wallet: 15, tier: 'Basic', joined: '2026-03-01', status: 'Active' },
  { id: 'USR-009', name: 'Sanjay Mishra', email: 'sanjay@example.com', wallet: 600, tier: 'Silver', joined: '2026-02-15', status: 'Active' },
  { id: 'USR-010', name: 'Anjali Sharma', email: 'anjali@example.com', wallet: 1800, tier: 'Gold', joined: '2025-11-20', status: 'Active' },
];

export const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = tierFilter === 'All' || user.tier === tierFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Suspended': return 'warning';
      case 'Banned': return 'danger';
      default: return 'default';
    }
  };

  if (selectedUser) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-16 md:pb-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
            <p className="text-sm text-gray-500">Detailed view for {selectedUser.name}</p>
          </div>
          <Button variant="secondary" onClick={() => setSelectedUser(null)}>Back to Users</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1 shadow-sm border-gray-100">
            <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
              <div className="w-24 h-24 bg-[#FF3B5C]/10 rounded-full flex items-center justify-center text-[#FF3B5C] text-3xl font-bold mb-4">
                {selectedUser.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{selectedUser.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{selectedUser.email}</p>
              <Badge 
                 variant={getStatusBadgeVariant(selectedUser.status)}
                 icon={selectedUser.status === 'Active' ? CheckCircle : selectedUser.status === 'Suspended' ? AlertCircle : Ban}
              >
                 {selectedUser.status}
              </Badge>
            </div>
            
            <div className="py-6 space-y-4 border-b border-gray-100">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">User ID</span>
                <span className="text-sm font-medium text-gray-900">{selectedUser.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Joined</span>
                <span className="text-sm font-medium text-gray-900">{selectedUser.joined}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Tier</span>
                <span className="text-sm font-medium text-gray-900">{selectedUser.tier}</span>
              </div>
            </div>

            <div className="pt-6">
               <div className="bg-gray-50 rounded-xl p-4 text-center mb-4 border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Wallet Balance</p>
                  <p className="text-3xl font-bold text-[#FF3B5C] flex items-center justify-center">
                    <IndianRupee className="w-6 h-6 mr-0.5" />{selectedUser.wallet}
                  </p>
               </div>
               <div className="flex flex-col gap-3">
                  <Button variant="secondary" className="w-full">Adjust Wallet Balance</Button>
                  {selectedUser.status === 'Active' ? (
                     <Button variant="danger" className="w-full">Deactivate User</Button>
                  ) : (
                     <Button variant="success" className="w-full">Activate User</Button>
                  )}
               </div>
            </div>
          </Card>

          {/* Details Tabs */}
          <Card className="lg:col-span-2 shadow-sm border-gray-100 p-0 overflow-hidden">
             <div className="flex border-b border-gray-200">
                <button className="flex-1 py-3 px-4 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50">Reel History</button>
                <button className="flex-1 py-3 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50">Transactions</button>
                <button className="flex-1 py-3 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50">Fraud Flags</button>
             </div>
             <div className="p-6">
                <div className="text-center py-12 text-gray-500">
                   <p>No recent reel history to display.</p>
                </div>
             </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 md:pb-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-sm text-gray-500">Manage user accounts, balances, and statuses</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="primary">Export Users</Button>
        </div>
      </div>

      <Card className="shadow-sm border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search by name, email, or ID..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
               <Filter className="w-4 h-4 text-gray-500" />
               <select 
                 className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                 value={tierFilter}
                 onChange={(e) => setTierFilter(e.target.value)}
               >
                 <option value="All">All Tiers</option>
                 <option value="Basic">Basic</option>
                 <option value="Silver">Silver</option>
                 <option value="Gold">Gold</option>
               </select>
            </div>
            <select 
              className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Banned">Banned</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500 font-medium bg-gray-50">
                <th className="py-3 px-4">User Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Wallet Balance</th>
                <th className="py-3 px-4">Tier Level</th>
                <th className="py-3 px-4">Join Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-500">{user.email}</td>
                  <td className="py-4 px-4 text-sm font-semibold flex items-center mt-1">
                    <IndianRupee className="w-3.5 h-3.5 mr-0.5" />{user.wallet}
                  </td>
                  <td className="py-4 px-4">
                     <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        user.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                        user.tier === 'Silver' ? 'bg-gray-100 text-gray-800' :
                        'bg-blue-100 text-blue-800'
                     }`}>
                        {user.tier}
                     </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">{user.joined}</td>
                  <td className="py-4 px-4">
                    <Badge 
                       variant={getStatusBadgeVariant(user.status)} 
                       icon={user.status === 'Active' ? CheckCircle : user.status === 'Suspended' ? AlertCircle : Ban}
                    >
                       {user.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button variant="secondary" size="sm" onClick={() => setSelectedUser(user)}>
                      View Profile
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
             <div className="text-center py-8 text-gray-500">
                No users found matching the current filters.
             </div>
          )}
        </div>
        
        {/* Pagination placeholder */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
           <span className="text-sm text-gray-500">Showing 1 to {filteredUsers.length} of {mockUsers.length} entries</span>
           <div className="flex gap-1">
              <Button variant="ghost" size="sm" disabled>Previous</Button>
              <Button variant="ghost" size="sm" className="bg-indigo-50 text-indigo-600">1</Button>
              <Button variant="ghost" size="sm">2</Button>
              <Button variant="ghost" size="sm">Next</Button>
           </div>
        </div>
      </Card>
    </div>
  );
};
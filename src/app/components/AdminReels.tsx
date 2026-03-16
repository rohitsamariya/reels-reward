import React, { useState } from 'react';
import { Card, Button, Badge, Input, Label } from './ui';
import { Plus, Search, Edit, Trash2, IndianRupee, Power, CheckCircle } from 'lucide-react';
import { useAppContext } from '../store';

export const AdminReels = () => {
  const { assignedReels } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 md:pb-0">
      <div className="flex justify-between items-center flex-col sm:flex-row gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reel Management</h1>
          <p className="text-sm text-gray-500">Add, edit, and manage reels for users</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)}>
          <Plus className="w-4 h-4 mr-2" /> Add New Reel
        </Button>
      </div>

      {isAdding && (
        <Card className="bg-gray-50 border-indigo-100 shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Reel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Video URL / Thumbnail URL</Label>
              <Input placeholder="https://..." />
            </div>
            <div>
              <Label className="flex items-center gap-1">Reward Amount (<IndianRupee className="w-3 h-3" />)</Label>
              <Input type="number" placeholder="10" />
            </div>
            <div>
              <Label>Duration (seconds)</Label>
              <Input type="number" placeholder="30" />
            </div>
            <div>
              <Label>Target Audience</Label>
              <select className="w-full flex h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>All Users</option>
                <option>Premium Tier</option>
                <option>New Users</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
            <Button onClick={() => setIsAdding(false)}>Save Reel</Button>
          </div>
        </Card>
      )}

      <Card className="shadow-sm">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input className="pl-10" placeholder="Search reels..." />
          </div>
          <div className="flex gap-2">
            <select className="flex h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>All Status</option>
              <option>Active</option>
              <option>Archived</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500 font-medium bg-gray-50">
                <th className="py-3 px-4 font-semibold w-24">Thumbnail</th>
                <th className="py-3 px-4 font-semibold">ID</th>
                <th className="py-3 px-4 font-semibold">Reward</th>
                <th className="py-3 px-4 font-semibold">Duration</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assignedReels.map((reel) => (
                <tr key={reel.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <img src={reel.thumbnail} alt={`Reel ${reel.id}`} className="w-16 h-16 object-cover rounded-lg shadow-sm border border-gray-200" />
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">#{reel.id}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-indigo-600">
                    <span className="flex items-center"><IndianRupee className="w-3.5 h-3.5" />{reel.rewardAmount}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{reel.duration}s</td>
                  <td className="py-3 px-4">
                    <Badge variant="success" icon={CheckCircle}>Active</Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-[#FF3B5C] rounded-lg hover:bg-[#FF3B5C]/10 transition-colors" title="Toggle Active">
                        <Power className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
          <p>Showing 1 to {assignedReels.length} of {assignedReels.length} reels</p>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" disabled>Previous</Button>
            <Button variant="ghost" size="sm" disabled>Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

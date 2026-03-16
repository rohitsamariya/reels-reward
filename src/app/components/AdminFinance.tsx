import React, { useState } from 'react';
import { Card, Button, Badge, Input, Label } from './ui';
import { Check, X, Image as ImageIcon, IndianRupee, Clock, CheckCircle } from 'lucide-react';

const mockDeposits = [
  { id: 'DEP-1001', user: 'Rohit Sharma', amount: 100, ref: 'UPI987654321', date: '2026-03-16 10:30 AM', status: 'pending' },
  { id: 'DEP-1002', user: 'Priya Patel', amount: 500, ref: 'BNK456789123', date: '2026-03-16 09:15 AM', status: 'pending' },
  { id: 'DEP-1003', user: 'Amit Kumar', amount: 100, ref: 'UPI123456789', date: '2026-03-15 04:20 PM', status: 'approved' },
];

const mockWithdrawals = [
  { id: 'WDL-2001', user: 'Sanjay Mishra', gross: 600, tax: 90, net: 510, bank: 'HDFC Bank', account: 'XXXX1234', ifsc: 'HDFC0001234', status: 'pending' },
  { id: 'WDL-2002', user: 'Anjali Sharma', gross: 1200, tax: 180, net: 1020, bank: 'SBI', account: 'XXXX9876', ifsc: 'SBIN0009876', status: 'pending' },
  { id: 'WDL-2003', user: 'Vikram Singh', gross: 500, tax: 75, net: 425, bank: 'ICICI Bank', account: 'XXXX5555', ifsc: 'ICIC0005555', status: 'paid' },
];

export const AdminFinance = () => {
  const [activeTab, setActiveTab] = useState<'deposits' | 'withdrawals'>('deposits');
  const [showProofModal, setShowProofModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  const handleViewProof = (deposit: any) => {
     setSelectedItem(deposit);
     setShowProofModal(true);
  };
  
  const handlePayClick = (withdrawal: any) => {
     setSelectedItem(withdrawal);
     setShowPayModal(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 md:pb-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Finance Management</h1>
          <p className="text-sm text-gray-500">Manage user deposits and withdrawal requests</p>
        </div>
      </div>

      <div className="flex border-b border-gray-200 bg-white px-2 pt-2 rounded-t-xl shadow-sm">
         <button 
            className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors ${activeTab === 'deposits' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-lg' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('deposits')}
         >
            Pending Deposits
            <Badge className="ml-2 bg-amber-100 text-amber-700 hover:bg-amber-100 border-none">2</Badge>
         </button>
         <button 
            className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors ${activeTab === 'withdrawals' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-lg' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('withdrawals')}
         >
            Withdrawal Requests
            <Badge className="ml-2 bg-amber-100 text-amber-700 hover:bg-amber-100 border-none">2</Badge>
         </button>
      </div>

      {activeTab === 'deposits' && (
         <Card className="shadow-sm border-gray-100 rounded-tl-none">
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-gray-200 text-sm text-gray-500 font-medium bg-gray-50">
                   <th className="py-3 px-4">Req ID</th>
                   <th className="py-3 px-4">User</th>
                   <th className="py-3 px-4">Amount</th>
                   <th className="py-3 px-4">Reference No.</th>
                   <th className="py-3 px-4">Date</th>
                   <th className="py-3 px-4">Status</th>
                   <th className="py-3 px-4 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 {mockDeposits.map((dep) => (
                   <tr key={dep.id} className="hover:bg-gray-50/50 transition-colors">
                     <td className="py-4 px-4 text-sm font-medium text-gray-900">{dep.id}</td>
                     <td className="py-4 px-4 text-sm text-gray-900">{dep.user}</td>
                     <td className="py-4 px-4 text-sm font-bold text-indigo-600 flex items-center">
                       <IndianRupee className="w-3.5 h-3.5 mr-0.5" />{dep.amount}
                     </td>
                     <td className="py-4 px-4 text-sm font-mono text-gray-600">
                        {dep.ref}
                     </td>
                     <td className="py-4 px-4 text-sm text-gray-500">{dep.date}</td>
                     <td className="py-4 px-4">
                       <Badge variant={dep.status === 'approved' ? 'success' : 'warning'} icon={dep.status === 'approved' ? CheckCircle : Clock}>
                         <span className="capitalize">{dep.status}</span>
                       </Badge>
                     </td>
                     <td className="py-4 px-4 text-right">
                       {dep.status === 'pending' ? (
                          <div className="flex justify-end gap-2">
                             <Button variant="ghost" size="sm" className="text-gray-600 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 p-2" onClick={() => handleViewProof(dep)} title="View Proof">
                                <ImageIcon className="w-4 h-4" />
                             </Button>
                             <Button variant="success" size="sm" className="min-h-[36px] px-3" title="Approve">
                                Approve
                             </Button>
                             <Button size="sm" variant="danger" className="min-h-[36px] px-3" title="Reject">
                                Reject
                             </Button>
                          </div>
                       ) : (
                          <span className="text-sm text-gray-400">Processed</span>
                       )}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </Card>
      )}

      {activeTab === 'withdrawals' && (
         <Card className="shadow-sm border-gray-100 rounded-tl-none">
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-gray-200 text-sm text-gray-500 font-medium bg-gray-50">
                   <th className="py-3 px-4">Req ID</th>
                   <th className="py-3 px-4">User</th>
                   <th className="py-3 px-4">Amount Breakdown</th>
                   <th className="py-3 px-4">Bank Details</th>
                   <th className="py-3 px-4">Status</th>
                   <th className="py-3 px-4 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 {mockWithdrawals.map((wdl) => (
                   <tr key={wdl.id} className="hover:bg-gray-50/50 transition-colors">
                     <td className="py-4 px-4 text-sm font-medium text-gray-900">{wdl.id}</td>
                     <td className="py-4 px-4 text-sm text-gray-900">{wdl.user}</td>
                     <td className="py-4 px-4">
                        <div className="text-sm">
                           <div className="flex justify-between w-32 mb-1">
                              <span className="text-gray-500">Gross:</span>
                              <span className="flex items-center"><IndianRupee className="w-3 h-3" />{wdl.gross}</span>
                           </div>
                           <div className="flex justify-between w-32 mb-1 text-red-500">
                              <span>Tax (15%):</span>
                              <span className="flex items-center">-<IndianRupee className="w-3 h-3" />{wdl.tax}</span>
                           </div>
                           <div className="flex justify-between w-32 pt-1 border-t border-gray-200 font-bold text-green-600">
                              <span>Net:</span>
                              <span className="flex items-center"><IndianRupee className="w-3 h-3" />{wdl.net}</span>
                           </div>
                        </div>
                     </td>
                     <td className="py-4 px-4">
                        <p className="text-sm font-medium text-gray-900">{wdl.bank}</p>
                        <p className="text-xs text-gray-500 font-mono mt-0.5">{wdl.account}</p>
                        <p className="text-xs text-gray-500 font-mono">{wdl.ifsc}</p>
                     </td>
                     <td className="py-4 px-4">
                       <Badge variant={wdl.status === 'paid' ? 'info' : 'warning'} icon={wdl.status === 'paid' ? CheckCircle : Clock}>
                         <span className="capitalize">{wdl.status}</span>
                       </Badge>
                     </td>
                     <td className="py-4 px-4 text-right">
                       {wdl.status === 'pending' ? (
                          <div className="flex justify-end gap-2">
                             <Button variant="info" size="sm" className="min-h-[36px] px-3" onClick={() => handlePayClick(wdl)}>
                                Mark as Paid
                             </Button>
                             <Button size="sm" variant="danger" className="min-h-[36px] px-3" title="Reject">
                                Reject
                             </Button>
                          </div>
                       ) : (
                          <span className="text-sm text-gray-400">Paid</span>
                       )}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </Card>
      )}

      {/* Proof Modal */}
      {showProofModal && selectedItem && (
         <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl">
               <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="font-bold text-lg">Payment Proof: {selectedItem.id}</h3>
                  <button onClick={() => setShowProofModal(false)} className="text-gray-500 hover:text-gray-900"><X className="w-5 h-5" /></button>
               </div>
               <div className="p-4 bg-gray-100 flex items-center justify-center min-h-[300px]">
                  <div className="text-center text-gray-400">
                     <ImageIcon className="w-16 h-16 mx-auto mb-2 opacity-50" />
                     <p>Mock Screenshot Placeholder</p>
                     <p className="text-sm mt-2">Ref: {selectedItem.ref}</p>
                  </div>
               </div>
               <div className="p-4 border-t flex justify-end gap-3 bg-gray-50">
                  <Button variant="secondary" onClick={() => setShowProofModal(false)}>Close</Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => setShowProofModal(false)}>Approve Deposit</Button>
               </div>
            </div>
         </div>
      )}

      {/* Pay Modal */}
      {showPayModal && selectedItem && (
         <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full overflow-hidden shadow-2xl">
               <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="font-bold text-lg">Process Withdrawal</h3>
                  <button onClick={() => setShowPayModal(false)} className="text-gray-500 hover:text-gray-900"><X className="w-5 h-5" /></button>
               </div>
               <div className="p-6 space-y-4">
                  <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm mb-4 border border-blue-100">
                     Please transfer <strong className="flex items-center mt-1 text-lg"><IndianRupee className="w-4 h-4 mr-0.5" />{selectedItem.net}</strong> to {selectedItem.user}'s {selectedItem.bank} account.
                  </div>
                  
                  <div>
                     <Label>Bank Reference / UTR Number</Label>
                     <Input placeholder="Enter transfer reference" className="mt-1" />
                  </div>
                  <div>
                     <Label>Notes (Optional)</Label>
                     <Input placeholder="Add any notes" className="mt-1" />
                  </div>
               </div>
               <div className="p-4 border-t flex justify-end gap-3 bg-gray-50">
                  <Button variant="secondary" onClick={() => setShowPayModal(false)}>Cancel</Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowPayModal(false)}>Confirm Payment</Button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};
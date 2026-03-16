import React, { useState } from 'react';
import { useAppContext } from '../store';
import { Card, Button, Input, Label } from './ui';
import { Wallet, ArrowDownToLine, ArrowUpFromLine, Image as ImageIcon, IndianRupee, ShieldCheck } from 'lucide-react';

export const WalletSection = () => {
  const { user } = useAppContext();
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  
  // Deposit State
  const [depositAmount, setDepositAmount] = useState('');
  const [refNumber, setRefNumber] = useState('');
  const [depositStatus, setDepositStatus] = useState<string | null>(null);

  // Withdraw State
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawStatus, setWithdrawStatus] = useState<string | null>(null);

  if (!user) return null;

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(depositAmount) < 100) {
       alert("Minimum deposit is ₹100");
       return;
    }
    setDepositStatus("Deposit request submitted. Waiting for admin approval.");
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(withdrawAmount) < 100) {
       alert("Minimum withdrawal is ₹100");
       return;
    }
    if (Number(withdrawAmount) > user.walletBalance) {
       alert("Insufficient balance");
       return;
    }
    setWithdrawStatus("Withdrawal request submitted successfully.");
  };

  const calculateTax = (amount: number) => amount * 0.15;
  const calculateNet = (amount: number) => amount - calculateTax(amount);

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-20 md:pb-0">
      <Card className="bg-gradient-to-br from-[#FF7A18] via-[#FF3B5C] to-[#E1306C] text-white border-none shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <p className="text-white/90 font-medium">Available Balance</p>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold flex items-baseline gap-1">
            <IndianRupee className="w-8 h-8 opacity-90 self-center" strokeWidth={3} />
            {user.walletBalance}
          </h2>
        </div>
      </Card>

      <div className="flex rounded-xl bg-white p-1 border border-gray-100 shadow-sm">
         <button 
            className={`flex-1 py-3 text-sm font-semibold rounded-lg flex justify-center items-center gap-2 transition-all ${activeTab === 'deposit' ? 'bg-[#FF3B5C] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setActiveTab('deposit')}
         >
            <ArrowDownToLine className="w-4 h-4" /> Deposit
         </button>
         <button 
            className={`flex-1 py-3 text-sm font-semibold rounded-lg flex justify-center items-center gap-2 transition-all ${activeTab === 'withdraw' ? 'bg-[#FF3B5C] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setActiveTab('withdraw')}
         >
            <ArrowUpFromLine className="w-4 h-4" /> Withdraw
         </button>
      </div>

      {activeTab === 'deposit' && (
         <Card className="shadow-sm border-gray-100">
            {depositStatus ? (
               <div className="text-center py-8">
                  <ShieldCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Request Submitted</h3>
                  <p className="text-gray-500">{depositStatus}</p>
                  <Button className="mt-6 w-full" variant="secondary" onClick={() => setDepositStatus(null)}>Make Another Deposit</Button>
               </div>
            ) : (
               <form onSubmit={handleDepositSubmit} className="space-y-6">
                  <div>
                     <h3 className="font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-3">Admin Payment Details</h3>
                     <div className="bg-gray-50 p-4 rounded-xl space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                           <span className="text-sm text-gray-500">UPI ID</span>
                           <span className="text-sm font-bold text-gray-900">admin@reelrewards</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm text-gray-500">Bank Name</span>
                           <span className="text-sm font-bold text-gray-900">HDFC Bank</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm text-gray-500">Account No.</span>
                           <span className="text-sm font-bold text-gray-900">123456789012</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm text-gray-500">IFSC Code</span>
                           <span className="text-sm font-bold text-gray-900">HDFC0001234</span>
                        </div>
                     </div>
                  </div>

                  <div>
                     <Label className="flex items-center gap-1">Deposit Amount (<IndianRupee className="w-3 h-3" />)</Label>
                     <Input 
                        type="number" 
                        placeholder="Min. ₹100" 
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        required
                        min="100"
                     />
                     <p className="text-xs text-gray-500 mt-1">Minimum deposit is ₹100</p>
                  </div>
                  <div>
                     <Label>Transaction Reference Number (UTR)</Label>
                     <Input 
                        type="text" 
                        placeholder="e.g. 312345678901" 
                        value={refNumber}
                        onChange={(e) => setRefNumber(e.target.value)}
                        required
                     />
                  </div>
                  <div>
                     <Label>Upload Payment Screenshot</Label>
                     <div className="mt-1 flex justify-center rounded-xl border border-dashed border-gray-300 px-6 py-8 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="text-center">
                           <ImageIcon className="mx-auto h-10 w-10 text-gray-300" aria-hidden="true" />
                           <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-transparent font-semibold text-[#FF3B5C] focus-within:outline-none hover:text-[#E1306C]">
                                 <span>Upload a file</span>
                                 <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                           </div>
                           <p className="text-xs leading-5 text-gray-500">PNG, JPG up to 5MB</p>
                        </div>
                     </div>
                  </div>
                  <Button type="submit" className="w-full py-6 text-lg font-bold">Submit Deposit</Button>
               </form>
            )}
         </Card>
      )}

      {activeTab === 'withdraw' && (
         <Card className="shadow-sm border-gray-100">
            {withdrawStatus ? (
               <div className="text-center py-8">
                  <ShieldCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Request Submitted</h3>
                  <p className="text-gray-500">{withdrawStatus}</p>
                  <Button className="mt-6 w-full" variant="secondary" onClick={() => setWithdrawStatus(null)}>Back to Wallet</Button>
               </div>
            ) : (
               <form onSubmit={handleWithdrawSubmit} className="space-y-6">
                  <div>
                     <Label className="flex items-center gap-1">Withdrawal Amount (<IndianRupee className="w-3 h-3" />)</Label>
                     <Input 
                        type="number" 
                        placeholder="Min. ₹100" 
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        required
                        min="100"
                     />
                     <p className="text-xs text-gray-500 mt-1">Minimum withdrawal is ₹100</p>
                  </div>

                  {Number(withdrawAmount) > 0 && (
                     <div className="bg-[#FF3B5C]/5 p-5 rounded-xl border border-[#FF3B5C]/20 space-y-3">
                        <div className="flex justify-between items-center">
                           <span className="text-sm text-gray-600">Gross Amount</span>
                           <span className="font-semibold text-gray-900 flex items-center"><IndianRupee className="w-3.5 h-3.5" />{Number(withdrawAmount).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-red-500">
                           <span className="text-sm">Standard Tax (15%)</span>
                           <span className="font-semibold flex items-center">-<IndianRupee className="w-3.5 h-3.5" />{calculateTax(Number(withdrawAmount)).toFixed(2)}</span>
                        </div>
                        <div className="pt-3 border-t border-[#FF3B5C]/20 flex justify-between items-center">
                           <span className="font-bold text-gray-900">Net Payout</span>
                           <span className="text-xl font-bold text-green-600 flex items-center"><IndianRupee className="w-5 h-5" />{calculateNet(Number(withdrawAmount)).toFixed(2)}</span>
                        </div>
                     </div>
                  )}

                  <div className="pt-4">
                     <h3 className="font-semibold text-gray-900 mb-4">Bank Details</h3>
                     <div className="space-y-4">
                        <div>
                           <Label>Account Holder Name</Label>
                           <Input required placeholder="Full Name" />
                        </div>
                        <div>
                           <Label>Account Number</Label>
                           <Input required placeholder="XXXX XXXX XXXX" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <Label>IFSC Code</Label>
                              <Input required placeholder="e.g. SBIN0001234" />
                           </div>
                           <div>
                              <Label>Bank Name</Label>
                              <Input required placeholder="e.g. State Bank of India" />
                           </div>
                        </div>
                     </div>
                  </div>

                  <Button type="submit" className="w-full py-6 text-lg font-bold" disabled={Number(withdrawAmount) < 100 || Number(withdrawAmount) > user.walletBalance}>
                     Request Withdrawal
                  </Button>
               </form>
            )}
         </Card>
      )}
    </div>
  );
};
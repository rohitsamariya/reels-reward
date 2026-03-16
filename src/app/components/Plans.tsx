import React, { useState } from 'react';
import { Check, Zap, X, UploadCloud, IndianRupee, Shield, ArrowRight, Wallet, Film, TrendingUp } from 'lucide-react';
import { useAppContext } from '../store';

interface Plan {
  id: string;
  name: string;
  price: string;
  range: string;
  reels: number;
  earnings: string;
  recommended?: boolean;
  buttonText: string;
  depositAmount: number;
  isCurrent: boolean;
}

export const Plans = () => {
  const { user } = useAppContext();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [modalStep, setModalStep] = useState<'form' | 'success'>('form');
  const [transactionRef, setTransactionRef] = useState('');
  
  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: '₹0',
      range: '₹0 – ₹100',
      reels: 3,
      earnings: '₹10',
      buttonText: 'Current Plan',
      depositAmount: 0,
      isCurrent: true,
    },
    {
      id: 'silver',
      name: 'Silver',
      price: '₹100',
      range: '₹101 – ₹500',
      reels: 5,
      earnings: '₹20',
      recommended: true,
      buttonText: 'Deposit ₹100 to Upgrade',
      depositAmount: 100,
      isCurrent: false,
    },
    {
      id: 'gold',
      name: 'Gold',
      price: '₹500',
      range: '₹501 – ₹1000',
      reels: 7,
      earnings: '₹35',
      buttonText: 'Deposit ₹500 to Upgrade',
      depositAmount: 500,
      isCurrent: false,
    }
  ];

  const handleUpgradeClick = (plan: Plan) => {
    if (plan.isCurrent) return;
    setSelectedPlan(plan);
    setModalStep('form');
    setTransactionRef('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionRef) return;
    setModalStep('success');
  };

  const closeModal = () => {
    setSelectedPlan(null);
    setModalStep('form');
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Upgrade Your Earning Tier</h1>
        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          Increase your wallet balance to unlock higher daily rewards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`relative bg-white rounded-2xl shadow-sm border flex flex-col ${
              plan.recommended 
                ? 'border-indigo-500 ring-2 ring-indigo-500 shadow-md transform md:-translate-y-4' 
                : 'border-gray-200'
            }`}
          >
            {plan.recommended && (
              <div className="absolute top-0 inset-x-0 flex justify-center -mt-4">
                <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-indigo-500 text-white shadow-sm">
                  <Zap className="w-4 h-4 mr-1" /> Recommended
                </span>
              </div>
            )}
            
            <div className="p-8 flex-1">
              <h3 className="text-2xl font-bold text-gray-900 text-center">{plan.name}</h3>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold justify-center text-gray-900">
                <IndianRupee className="w-10 h-10 self-center" strokeWidth={3} />
                {plan.price.replace('₹', '')}
              </div>
              <p className="mt-2 text-sm text-gray-500 text-center">deposit to unlock</p>

              <ul className="mt-8 space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Wallet className="h-6 w-6 text-indigo-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Wallet Balance Range</p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <IndianRupee className="w-3 h-3" />{plan.range.split('₹')[1]} – <IndianRupee className="w-3 h-3" />{plan.range.split('₹')[2]}
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Film className="h-6 w-6 text-indigo-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Daily Reels</p>
                    <p className="text-sm text-gray-500">{plan.reels} videos per day</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-indigo-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Max Daily Earnings</p>
                    <p className="text-sm text-gray-500 flex items-center">Up to <IndianRupee className="w-3 h-3 ml-1" />{plan.earnings.replace('₹', '')}</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="p-8 bg-gray-50 border-t border-gray-100 rounded-b-2xl">
              <button
                onClick={() => handleUpgradeClick(plan)}
                disabled={plan.isCurrent}
                className={`w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl text-base font-bold transition-all ${
                  plan.isCurrent 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : plan.recommended
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                }`}
              >
                {plan.buttonText.includes('₹') ? (
                  <>Deposit <IndianRupee className="w-4 h-4 mx-0.5" />{plan.depositAmount} to Upgrade</>
                ) : plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Deposit Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeModal}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {modalStep === 'form' ? (
                <div className="bg-white">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900" id="modal-title">
                      Upgrade to {selectedPlan.name}
                    </h3>
                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Close</span>
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="px-6 py-6 space-y-6">
                    {/* Amount to deposit */}
                    <div className="bg-indigo-50 rounded-xl p-4 flex items-center justify-between border border-indigo-100">
                      <div>
                        <p className="text-sm font-medium text-indigo-900">Amount to Deposit</p>
                        <p className="text-xs text-indigo-700 mt-1">Required for {selectedPlan.name} Tier</p>
                      </div>
                      <div className="text-3xl font-extrabold text-indigo-700 flex items-center">
                        <IndianRupee className="w-6 h-6 mr-0.5" />{selectedPlan.depositAmount}
                      </div>
                    </div>

                    {/* Admin Payment Details */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-gray-400" />
                        Admin Payment Details
                      </h4>
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">UPI ID</span>
                          <span className="text-sm font-semibold text-gray-900">admin@reelrewards</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Bank Name</span>
                          <span className="text-sm font-semibold text-gray-900">HDFC Bank</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Account No.</span>
                          <span className="text-sm font-semibold text-gray-900">1234 5678 9012</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">IFSC Code</span>
                          <span className="text-sm font-semibold text-gray-900">HDFC0001234</span>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Transaction Reference */}
                      <div>
                        <label htmlFor="ref" className="block text-sm font-medium text-gray-700">
                          Transaction Reference Number *
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="ref"
                            required
                            value={transactionRef}
                            onChange={(e) => setTransactionRef(e.target.value)}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border outline-none transition-colors"
                            placeholder="e.g. UPI Ref No. 123456789012"
                          />
                        </div>
                      </div>

                      {/* File Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Payment Screenshot (Optional)
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-indigo-400 hover:bg-gray-50 transition-colors cursor-pointer group">
                          <div className="space-y-1 text-center">
                            <UploadCloud className="mx-auto h-12 w-12 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                            <div className="flex text-sm text-gray-600 justify-center">
                              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 5MB
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={!transactionRef}
                          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Submit Deposit Request
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                    <Check className="h-8 w-8 text-green-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-2" id="modal-title">
                    Request Submitted!
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your deposit request for <span className="inline-flex items-center"><IndianRupee className="w-3 h-3" />{selectedPlan.depositAmount}</span> has been submitted successfully. Waiting for admin approval. Your tier will be upgraded once verified.
                    </p>
                  </div>
                  <div className="mt-8 mb-2">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-3 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm transition-colors"
                      onClick={closeModal}
                    >
                      Return to Plans
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

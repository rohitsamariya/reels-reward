import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAppContext } from '../store';
import { Card, Button, Badge } from './ui';
import { ArrowLeft, CheckCircle2, Loader2, PlayCircle, IndianRupee } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReelWatch = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { assignedReels, watchReel } = useAppContext();
  
  const reel = assignedReels.find(r => r.id === id);
  const [stage, setStage] = useState<'preview' | 'playing' | 'confirm' | 'success'>('preview');
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (reel && stage === 'playing') {
      setTimeLeft(reel.duration);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setStage('confirm');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [reel, stage]);

  const handleConfirm = () => {
    if (reel) {
      watchReel(reel.id);
      setStage('success');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  if (!reel) {
    return <div className="p-8 text-center">Reel not found</div>;
  }

  return (
    <div className="max-w-md mx-auto h-full flex flex-col pt-6">
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </button>

      <Card className="flex-1 flex flex-col overflow-hidden p-0 shadow-lg border-gray-200 bg-white">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-indigo-500" />
            <h2 className="font-semibold text-gray-900">Watch & Earn</h2>
          </div>
          <Badge variant="success" className="px-3 py-1 font-bold shadow-sm flex items-center gap-0.5">+<IndianRupee className="w-3.5 h-3.5" />{reel.rewardAmount}</Badge>
        </div>

        {/* Content Area */}
        <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center min-h-[400px]">
          {stage === 'preview' && (
             <div className="absolute inset-0">
               <img src={reel.thumbnail} className="w-full h-full object-cover opacity-60" alt="Preview" />
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                  <div className="text-white text-center mb-6 px-4">
                    <h3 className="text-xl font-bold mb-2">Ready to watch?</h3>
                    <p className="text-sm text-gray-300 flex items-center justify-center">Watch for {reel.duration} seconds to earn <IndianRupee className="w-3 h-3 ml-1" />{reel.rewardAmount}</p>
                  </div>
                  <Button size="lg" className="rounded-full px-8 shadow-xl" onClick={() => setStage('playing')}>
                     Start Video
                  </Button>
               </div>
             </div>
          )}

          {stage === 'playing' && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
               <img src={reel.thumbnail} className="w-full h-full object-cover opacity-30 blur-sm absolute" alt="Background" />
               <div className="relative z-10 flex flex-col items-center p-8 bg-black/60 rounded-2xl border border-white/10 backdrop-blur-md">
                 <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mb-4" />
                 <div className="text-4xl font-bold text-white mb-2">{timeLeft}s</div>
                 <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Remaining</div>
               </div>
             </div>
          )}

          {stage === 'confirm' && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-900/90 p-8 text-center backdrop-blur-md">
               <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full transform transition-all scale-100">
                 <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                 <h3 className="text-xl font-bold text-gray-900 mb-2">Watch Complete!</h3>
                 <p className="text-gray-500 mb-6">Confirm your view to receive your reward.</p>
                 <Button className="w-full flex items-center justify-center gap-1" size="lg" onClick={handleConfirm}>
                    Claim <IndianRupee className="w-4 h-4" />{reel.rewardAmount}
                 </Button>
               </div>
             </div>
          )}

          {stage === 'success' && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-8 text-center">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <span className="text-3xl font-bold text-green-600 flex items-center"><IndianRupee className="w-6 h-6 mr-0.5" />{reel.rewardAmount}</span>
               </div>
               <h3 className="text-2xl font-bold text-gray-900 mb-2">Reward Credited!</h3>
               <p className="text-gray-500 mb-8">Your wallet has been updated successfully.</p>
               <Button className="w-full max-w-[200px]" variant="secondary" onClick={() => navigate('/')}>
                  Back to Dashboard
               </Button>
             </div>
          )}
        </div>
      </Card>
    </div>
  );
};

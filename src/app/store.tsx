import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'user' | 'admin' | null;

interface Reel {
  id: string;
  thumbnail: string;
  creatorName: string;
  rewardAmount: number;
  duration: number; // seconds
  status: 'pending' | 'watched';
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  walletBalance: number;
  dailyEarnings: number;
  dailyTarget: number;
}

interface AppContextType {
  user: User | null;
  assignedReels: Reel[];
  loginAs: (role: UserRole) => void;
  logout: () => void;
  watchReel: (id: string) => void;
}

const mockReels: Reel[] = [
  { id: '1', thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=800&fit=crop', creatorName: '@comedy_king', rewardAmount: 5, duration: 15, status: 'pending' },
  { id: '2', thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=500&h=800&fit=crop', creatorName: '@travel_diaries', rewardAmount: 7, duration: 30, status: 'pending' },
  { id: '3', thumbnail: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=500&h=800&fit=crop', creatorName: '@tech_guru', rewardAmount: 10, duration: 45, status: 'pending' },
  { id: '4', thumbnail: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=500&h=800&fit=crop', creatorName: '@fitness_freak', rewardAmount: 3, duration: 10, status: 'watched' },
];

const mockUser: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: 'user',
  walletBalance: 325,
  dailyEarnings: 12,
  dailyTarget: 20,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [assignedReels, setAssignedReels] = useState<Reel[]>(mockReels);

  const loginAs = (role: UserRole) => {
    if (role === 'user') {
      setUser({ ...mockUser, role: 'user' });
    } else if (role === 'admin') {
      setUser({ ...mockUser, name: 'Admin User', role: 'admin', email: 'admin@reelrewards.com' });
    }
  };

  const logout = () => setUser(null);

  const watchReel = (id: string) => {
    setAssignedReels(prev => 
      prev.map(r => r.id === id ? { ...r, status: 'watched' } : r)
    );
    const reel = assignedReels.find(r => r.id === id);
    if (reel && user) {
      setUser({
        ...user,
        walletBalance: user.walletBalance + reel.rewardAmount,
        dailyEarnings: user.dailyEarnings + reel.rewardAmount
      });
    }
  };

  return (
    <AppContext.Provider value={{ user, assignedReels, loginAs, logout, watchReel }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

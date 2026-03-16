import React from 'react';
import { Outlet, NavLink, useNavigate, Navigate } from 'react-router';
import { LayoutDashboard, Wallet, User, PlayCircle, LogOut, Search, Bell, Settings, PieChart, Users, DollarSign, ListVideo, Zap } from 'lucide-react';
import { useAppContext } from '../store';

export const Layout = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = user.role === 'admin' ? [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Reels', icon: ListVideo, path: '/admin/reels' },
    { name: 'Users', icon: Users, path: '/admin/users' },
    { name: 'Finance', icon: DollarSign, path: '/admin/finance' },
    { name: 'Analytics', icon: PieChart, path: '/admin/analytics' },
  ] : [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Wallet', icon: Wallet, path: '/wallet' },
    { name: 'Upgrades', icon: Zap, path: '/plans' },
    { name: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-inter text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-2 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#FF7A18] via-[#FF3B5C] to-[#E1306C]">
            <PlayCircle className="w-8 h-8 text-[#FF3B5C]" />
            <span>ReelRewards</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/' || item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-pink-50 text-[#E1306C]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center flex-1">
            <div className="w-full max-w-lg relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#FF3B5C] focus:border-[#FF3B5C] sm:text-sm"
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#FF7A18] to-[#FF3B5C] flex items-center justify-center text-white font-bold shadow-sm">
                {user?.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-medium text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile Nav Overlay */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 z-50 pb-safe shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/' || item.path === '/admin'}
            className={({ isActive }) =>
              `flex flex-col items-center p-2 text-[10px] font-medium transition-colors ${
                isActive
                  ? 'text-[#FF3B5C]'
                  : 'text-gray-500'
              }`
            }
          >
            <item.icon className="h-6 w-6 mb-1" />
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
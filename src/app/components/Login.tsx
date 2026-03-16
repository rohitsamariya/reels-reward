import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../store';
import { Card, Button, Input, Label } from './ui';
import { PlayCircle, Mail, Lock, User } from 'lucide-react';

export const Login = () => {
  const { loginAs } = useAppContext();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('admin')) {
      loginAs('admin');
      navigate('/admin');
    } else {
      loginAs('user');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center text-[#FF3B5C] mb-6">
            <PlayCircle className="w-16 h-16" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
            {isRegister ? 'Create your account' : 'Sign in to ReelRewards'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isRegister ? 'Already have an account? ' : 'Or '}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="font-medium text-[#FF3B5C] hover:text-[#E1306C] transition-colors"
            >
              {isRegister ? 'Sign in' : 'create an account today'}
            </button>
          </p>
        </div>

        <Card className="mt-8 shadow-xl border-gray-100 bg-white">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {isRegister && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="pl-10 h-12"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}
            
            <div>
              <Label htmlFor="email-address">Email address</Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-10 h-12"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">Hint: Use 'admin' in email to login as admin.</p>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-10 h-12"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {!isRegister && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#FF3B5C] focus:ring-[#FF3B5C] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-[#FF3B5C] hover:text-[#E1306C]">
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <Button type="submit" className="w-full h-12 text-base font-bold shadow-md hover:shadow-lg transition-all" size="lg">
                {isRegister ? 'Sign up' : 'Sign in'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

import React from 'react';
import { Outlet } from 'react-router';
import { AppProvider } from './store';

export const Root = () => {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
};

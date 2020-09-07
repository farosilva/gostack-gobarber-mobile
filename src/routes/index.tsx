import React from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import Loading from '../components/Loading';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;

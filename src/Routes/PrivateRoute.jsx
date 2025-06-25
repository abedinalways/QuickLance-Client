import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  console.log(location.pathname);
  if (loading) {
    return <span className="loading loading-dots loading-xs"></span>;
  }
  if (!user) {
    return <Navigate to="/login" state={location.pathname} />;
  }
  return children;
};

export default PrivateRoute;

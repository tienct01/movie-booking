import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ role, children }) {
  const { currentUser } = useSelector(state => state.auth);
  console.log('currentUser',currentUser);
  if (!currentUser) {
   return  <Navigate to='/' />;
  } else if (currentUser.role!=='ADMIN' && role === 'ADMIN') {
    return <Navigate to='/' />;
  }
  return children;
}

export default ProtectedRoute;

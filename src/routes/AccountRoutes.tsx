import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import MasterLayout from '../layouts/MasterLayout';
import AccountManagement from '../pages/AccountManagement/AccountManagement';

const AccountRoutes = () => {
  const RequireAuth: React.FC<{ children: JSX.Element }> = ({
    children
  }: {
    children: JSX.Element;
  }) => {
    const auth = localStorage.getItem('admin');
    const location = useLocation();

    if (!auth) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<MasterLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <AccountManagement />
            </RequireAuth>
          }
        />
      </Route>
     
    </Routes>
  );
};

export default AccountRoutes;

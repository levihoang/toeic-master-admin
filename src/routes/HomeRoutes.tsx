import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import MasterLayout from '../layouts/MasterLayout';
import { HomePage } from '../pages/Home/HomePage';
import CategoryAdd from '../pages/Home/CategoryAdd';

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

export const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MasterLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/category-add" element={<MasterLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <CategoryAdd />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/category-edit/:id" element={<MasterLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <CategoryAdd />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/:id" element={<MasterLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <CategoryAdd />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

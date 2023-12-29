import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import BlogManagement from '../pages/BlogManagement/BlogManagement';
import BlogManagementAdd from '../pages/BlogManagement/BlogManagementAdd';
import MasterLayout from '../layouts/MasterLayout';

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

export const BlogRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MasterLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <BlogManagement />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/blog-add" element={<MasterLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <BlogManagementAdd />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/blog-edit/:id" element={<MasterLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <BlogManagementAdd />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import MasterLayout from '../layouts/MasterLayout';
import CourseManagement from '../pages/CourseManagement/CourseManagement';
import CourseManagementAdd from '../pages/CourseManagement/CourseManagementAdd';

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

export const CourseRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MasterLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <CourseManagement />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/course-add" element={<MasterLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <CourseManagementAdd />
            </RequireAuth>
          }
        />
      </Route>

      <Route path="/course-edit/:id" element={<MasterLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <CourseManagementAdd />
            </RequireAuth>
          }
        />
      </Route>

      <Route path="/course-chapter/:id" element={<MasterLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <CourseManagementAdd />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

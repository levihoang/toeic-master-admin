import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import MasterLayout from '../layouts/MasterLayout';
import { HomePage } from '../pages/Home/HomePage';
import CategoryAdd from '../pages/Home/CategoryAdd';
import CourseManagement from '../pages/CourseManagement/CourseManagement';
import ExamManagement from '../pages/ExamManagement/ExamManagement';
import ExamManagementAdd from '../pages/ExamManagement/ExamManagementAdd';
import ExamGroupQuestion from '../pages/ExamManagement/ExamGroupQuestion';

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

export const ExamRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MasterLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <ExamManagement />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/exam-add" element={<MasterLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <ExamManagementAdd />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/exam-edit/:id" element={<MasterLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <ExamManagementAdd />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/exam-group-question/:id" element={<MasterLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <ExamManagementAdd />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

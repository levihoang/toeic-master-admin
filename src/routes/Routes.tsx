import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeRoutes } from './HomeRoutes';
import LoginRoutes from './LoginRoutes';
import { BlogRoutes } from './BlogRoutes';
import AccountRoutes from './AccountRoutes';

const routes = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<HomeRoutes />} />
        <Route path="/login/*" element={<LoginRoutes />} />
        <Route path="/blog/*" element={<BlogRoutes />} />
        <Route path="/account/*" element={<AccountRoutes />} />
        <Route path="/group-question/*" element={<HomeRoutes />} />
      </Routes>
    </>
  );
};

export default routes;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';

const LoginRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
};

export default LoginRoutes;

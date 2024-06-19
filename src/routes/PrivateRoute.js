import React from 'react';
import { Outlet } from 'react-router-dom';

const PrivateRoute = ({ permissionLevel }) => {
  return <Outlet />;
};

export default PrivateRoute;

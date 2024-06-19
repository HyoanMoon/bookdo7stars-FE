import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = ({ children }) => {
  return (
    <div>
      AppLayout 내용 추가.
      <div>{children}</div>
    </div>
  );
};

export default AppLayout;

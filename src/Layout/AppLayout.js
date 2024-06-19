import * as React from 'react';
import Typography from '@mui/material/Typography';
import NavBar from '../components/Navbar';

const AppLayout = ({ children }) => {
  return (
    <div>
      <div style={{ flexDirection: 'column', backgroundColor: '#6b8e23', marginBottom: '30px', padding: '2px' }}>
        <h2 style={{ marginBottom: '10px', color: '#fff' }}>100불 이상 주문 시 모든 주문 무료 배송 (Standard Shipping)</h2>
      </div>
      <div>
        <NavBar />
        <div style={{ marginTop: '20px' }}>{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;

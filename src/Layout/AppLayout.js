import * as React from 'react';
import Typography from '@mui/material/Typography';
import NavBar from '../components/Navbar';
import ToastMessage from '../components/ToastMessage';

const AppLayout = ({ children }) => {
  return (
    <div>
      <ToastMessage />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#6b8e23',
          height: '60px',
        }}>
        <h2 style={{ margin: 0, color: '#fff', textAlign: 'center' }}>100불 이상 주문 시 모든 주문 무료 배송 (Standard Shipping)</h2>
      </div>
      <div>
        <NavBar />
        <div style={{ marginTop: '20px' }}>{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;

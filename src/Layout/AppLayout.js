import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
// import NavBar from '../components/Navbar';
import ToastMessage from '../components/ToastMessage';
import { userActions } from '../action/userActions';
import { useDispatch, useSelector } from 'react-redux';

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(userActions.loginWithToken());
  }, []);
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
        {/* <NavBar user={user} /> */}
        <div style={{ marginTop: '20px' }}>{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;

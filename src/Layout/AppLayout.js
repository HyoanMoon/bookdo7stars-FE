import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import NavBar from '../components/Navbar';
import ToastMessage from '../components/ToastMessage';
import { userActions } from '../action/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(userActions.loginWithToken());
  }, []);
  return (
    <div>
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
      {location.pathname.includes('admin') ? (
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <main style={{ flexGrow: 1, padding: '20px' }}>{children}</main>
        </div>
      ) : (
        <div>
          <NavBar />
          <div style={{ marginTop: '20px' }}>{children}</div>
        </div>
      )}
    </div>
  );
};

export default AppLayout;

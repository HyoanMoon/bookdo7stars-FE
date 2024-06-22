import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import CategoryBar from '../components/CategoryBar';
import { useDispatch, useSelector } from 'react-redux';
import ToastMessage from '../components/ToastMessage';
import { userActions } from '../action/userActions';
import { bookActions } from '../action/bookActions';
import { useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(userActions.loginWithToken());
  }, []);
  const { books, bookGroup } = useSelector((state) => state.book);

  useEffect(() => {
    if (bookGroup) {
      dispatch(bookActions.getBookList({ queryType: bookGroup }));
    } else {
      dispatch(bookActions.getBookList({}));
    }
  }, [bookGroup]);
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
        <NavBar user={user} />
        <CategoryBar books={books} />
        <div style={{ marginTop: '20px' }}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;

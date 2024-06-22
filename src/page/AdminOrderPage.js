import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import AdminPageOrderSearchBox from '../components/AdminPageOrderSearchBox';
import AdminPageOrderTable from '../components/AdminPageOrderTable';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { orderActions } from '../action/orderActions';
import * as types from '../constants/order.constants';

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderTableHead = ['', '주문 번호', '주문 일시', '구매자', '도서명', '주소', '총가격', '주문 상태'];
  const [query, setQuery] = useSearchParams();
  const fields = ['orderID', 'userEmail'];

  const totalField = fields.reduce((total, option) => {
    total[option] = query.get(option) || '';
    return total;
  }, {});
  const [searchQuery, setSearchQuery] = useState(totalField);

  // 주문 더미 데이터
  const orderList = [
    { id: 293482039481, email: '북', createdAt: '2024-06-23', status: 'Pending', totalPrice: '$100' },
    { id: 234234242322, email: '두', createdAt: '2024-06-16', status: 'Completed', totalPrice: '$200' },
    { id: 734235242323, email: '칠', createdAt: '2024-05-24', status: 'Delivered', totalPrice: '$300' },
    { id: 284235542322, email: '성', createdAt: '2024-03-25', status: 'Refund', totalPrice: '$400' },
  ];

  useEffect(() => {
    if (searchQuery.orderID === '') delete searchQuery.orderID;
    if (searchQuery.userEmail === '') delete searchQuery.userEmail;
    const params = new URLSearchParams();
    Object.keys(searchQuery).forEach((key) => {
      const value = searchQuery[key];
      if (value !== undefined && value !== '') {
        params.append(key, value);
      }
    });
    navigate('?' + params.toString());
    dispatch(orderActions.getOrderList({ ...searchQuery }));
  }, [searchQuery]);

  // 검색한 값을 리셋하기.
  const resetSearch = () => {
    setSearchQuery({});
  };
  useEffect(() => {
    resetSearch();
  }, []);

  // 쿼리 url.
  const filteredOrders = orderList.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const startDate = searchQuery.startDate ? new Date(searchQuery.startDate) : null;
    const endDate = searchQuery.endDate ? new Date(searchQuery.endDate) : null;

    const matchOrderID = !searchQuery.orderID || order.id.toString().includes(searchQuery.orderID);
    const matchUserEmail = !searchQuery.userEmail || order.email.toLowerCase().includes(searchQuery.userEmail.toLowerCase());
    const withinDateRange = (!startDate || orderDate >= startDate) && (!endDate || orderDate <= endDate);

    return matchOrderID && matchUserEmail && withinDateRange;
  });

  return (
    <Container>
      <Grid container>
        <Grid item xs={1} md={1}>
          주문 관리
        </Grid>
        <Grid item xs={11} md={11}>
          <AdminPageOrderSearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} resetSearch={resetSearch} />
          <AdminPageOrderTable orderTableHead={orderTableHead} orderList={filteredOrders} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminOrderPage;

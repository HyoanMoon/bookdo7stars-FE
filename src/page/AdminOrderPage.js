import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import AdminPageOrderSearchBox from '../components/AdminPageOrderSearchBox';
import AdminPageOrderTable from '../components/AdminPageOrderTable';
// import AdminPageOrderDialog from '../components/AdminPageOrderDialog';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { orderActions } from '../action/orderActions';
import * as types from '../constants/order.constants';
import { format, parse } from 'date-fns';

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [openOrderDialog, setOpenOrderDialog] = useState(false);
  const orderTableHead = ['', '주문 번호', '주문 일시', '구매자', '도서명', '주소', '총가격', '주문 상태'];
  const [query, setQuery] = useSearchParams();
  // const fields = ['orderID', 'userEmail'];
  const fields = ['orderID', 'userEmail', 'startDate', 'endDate'];

  const totalField = fields.reduce((total, option) => {
    total[option] = query.get(option) || '';
    return total;
  }, {});
  const [searchQuery, setSearchQuery] = useState(totalField);

  // 주문 더미 데이터
  const orderList = [
    { id: 293482039481, email: 'John Doe', createdAt: '2023-09-30', status: 'Pending', totalPrice: '$100' },
    { id: 234234242322, email: 'Jane Smith', createdAt: '2023-09-30', status: 'Completed', totalPrice: '$200' },
    { id: 234235242322, email: 'Jane Smith', createdAt: '2023-09-30', status: 'Completed', totalPrice: '$200' },
  ];

  useEffect(() => {
    if (searchQuery.orderID === '') delete searchQuery.orderID;
    if (searchQuery.userEmail === '') delete searchQuery.userEmail;
    if (searchQuery.startDate === '') delete searchQuery.startDate;
    if (searchQuery.endDate === '') delete searchQuery.endDate;
    const formattedQuery = {
      ...searchQuery,
      startDate: searchQuery.startDate ? format(parse(searchQuery.startDate, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd') : '',
      endDate: searchQuery.endDate ? format(parse(searchQuery.endDate, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd') : '',
    };
    const params = new URLSearchParams();
    Object.keys(formattedQuery).forEach((key) => {
      const value = formattedQuery[key];
      if (value !== undefined && value !== '') {
        params.append(key, value);
      }
    });
    navigate('?' + params.toString());
    dispatch(orderActions.getOrderList({ ...formattedQuery }));
  }, [searchQuery]);

  // 검색한 값을 리셋하기.
  const resetSearch = () => {
    setSearchQuery({});
  };
  useEffect(() => {
    resetSearch();
  }, []);

  const filteredOrders = orderList.filter((order) => {
    return (
      (!searchQuery.orderID || order.id.toString().includes(searchQuery.orderID)) &&
      (!searchQuery.userEmail || order.email.toLowerCase().includes(searchQuery.userEmail.toLowerCase()))
    );
  });

  // // State for dialog
  // const [dialogOpen, setDialogOpen] = useState(false);
  // const [selectedOrder, setSelectedOrder] = useState(null);

  // const handleOpenDialog = (order) => {
  //   setSelectedOrder(order);
  //   setDialogOpen(true);
  // };

  // const handleCloseDialog = () => {
  //   setDialogOpen(false);
  //   setSelectedOrder(null);
  // };

  return (
    <Container>
      <Grid container>
        <Grid item xs={1} md={1}>
          주문 관리
        </Grid>
        <Grid item xs={11} md={11}>
          {/* 검색 박스 */}
          <AdminPageOrderSearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} resetSearch={resetSearch} handleDateRange={handleDateRange} />

          {/* 주문 테이블 */}
          <AdminPageOrderTable orderTableHead={orderTableHead} orderList={filteredOrders} handleDateRange={handleDateRange} />

          {/* 주문 다이얼로그 */}
          {/* <AdminPageOrderDialog open={dialogOpen} handleClose={handleCloseDialog} orderDetails={selectedOrder} /> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminOrderPage;

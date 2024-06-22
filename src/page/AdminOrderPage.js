import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import AdminPageOrderSearchBox from '../components/AdminPageOrderSearchBox';
import AdminPageOrderTable from '../components/AdminPageOrderTable';
// import AdminPageOrderDialog from '../components/AdminPageOrderDialog';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { orderActions } from '../action/orderActions';
import * as types from '../constants/order.constants';

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [openOrderDialog, setOpenOrderDialog] = useState(false);
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
    { id: 293482039481, email: 'John Doe', createdAt: '2023-06-22', status: 'Pending', totalPrice: '$100' },
    { id: 234234242322, email: 'Jane Smith', createdAt: '2023-06-21', status: 'Completed', totalPrice: '$200' },
    { id: 234235242322, email: 'Jane Smith', createdAt: '2023-06-21', status: 'Completed', totalPrice: '$200' },
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
          <AdminPageOrderSearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* 주문 테이블 */}
          <AdminPageOrderTable orderTableHead={orderTableHead} orderList={filteredOrders} />

          {/* 주문 다이얼로그 */}
          {/* <AdminPageOrderDialog open={dialogOpen} handleClose={handleCloseDialog} orderDetails={selectedOrder} /> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminOrderPage;

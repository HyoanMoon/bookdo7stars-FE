import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import AdminPageOrderSearchBox from '../components/AdminPageOrderSearchBox';
import AdminPageOrderTable from '../components/AdminPageOrderTable';
import AdminPageOrderDialog from '../components/AdminPageOrderDialog';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { orderActions } from '../action/orderActions';
import * as types from '../constants/order.constants';

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const orderTableHead = ['', '주문 번호', '주문 일시', '구매자', '도서명', '주소', '총가격', '주문 상태'];
  const orderDialogTableHead = ['ID', '도서명', '권당 가격', '수량', '전체 가격'];
  const [query, setQuery] = useSearchParams();
  const fields = ['orderID', 'userEmail'];

  const totalField = fields.reduce((total, option) => {
    total[option] = query.get(option) || '';
    return total;
  }, {});
  const [searchQuery, setSearchQuery] = useState(totalField);

  // 주문 더미 데이터
  const orderList = [
    {
      _id: 123456789,
      userID: { email: 'test@gmail.com' },
      contact: { firstName: 'test', lastName: 'test', contact: 123 },
      shipTo: [{ address: 'test', city: 'test' }],
      totalPrice: 0,
      status: 'Preparing',
      items: [{ BookID: { title: '도서 내용' }, price: 10000, qty: 2 }],
      orderNum: 123,
      createdAt: '2024-06-23',
    },
  ];

  useEffect(() => {
    if (searchQuery.orderID === '') delete searchQuery.orderID; // orderID === orderNum
    if (searchQuery.userEmail === '') delete searchQuery.userEmail; // userEmail === userID.email
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

  // 상세 검색 쿼리 필터.
  const filteredOrders = orderList.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const startDate = searchQuery.startDate ? new Date(searchQuery.startDate) : null;
    const endDate = searchQuery.endDate ? new Date(searchQuery.endDate) : null;

    const matchOrderID = !searchQuery.orderID || order.id.toString().includes(searchQuery.orderID);
    const matchUserEmail = !searchQuery.userEmail || order.userID.email.toLowerCase().includes(searchQuery.userEmail.toLowerCase());
    const withinDateRange = (!startDate || orderDate >= startDate) && (!endDate || orderDate <= endDate);

    return matchOrderID && matchUserEmail && withinDateRange;
  });

  // 주문 수정 다이얼로그 열기.
  const handleOpenOrderDialog = (order) => {
    setOpenDialog(true);
    // dispatch({ type: types.SET_SELECTED_ORDER, payload: order });
  };

  // 주문 다이얼로그 닫기.
  const handleCloseOrderDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={1} md={1}>
          주문 관리
        </Grid>
        <Grid item xs={11} md={11}>
          <AdminPageOrderSearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} resetSearch={resetSearch} />
          <AdminPageOrderTable orderTableHead={orderTableHead} orderList={filteredOrders} handleOpenOrderDialog={handleOpenOrderDialog} />
          <AdminPageOrderDialog open={openDialog} orderList={orderList} handleClose={handleCloseOrderDialog} orderDialogTableHead={orderDialogTableHead} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminOrderPage;

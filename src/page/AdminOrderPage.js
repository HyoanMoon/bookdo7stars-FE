import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import AdminPageOrderSearchBox from '../components/AdminPageOrderSearchBox';
import AdminPageOrderTable from '../components/AdminPageOrderTable';
import AdminPageOrderDialog from '../components/AdminPageOrderDialog';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { orderActions } from '../action/orderActions';
import * as types from '../constants/order.constants';

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const orderTableHead = ['', '주문 번호', '주문 일시', '구매자', '도서명', '주소', '총가격', '주문 상태'];
  const orderDialogTableHead = ['ID', '도서명', '권당 가격', '수량', '전체 가격'];
  const { orderList } = useSelector((state) => state.order);
  const [query, setQuery] = useSearchParams();
  const fields = ['orderNum', 'userName'];

  const totalField = fields.reduce((total, option) => {
    total[option] = query.get(option) || '';
    return total;
  }, {});
  const [searchQuery, setSearchQuery] = useState(totalField);

  useEffect(() => {
    if (searchQuery.orderNum === '') delete searchQuery.orderNum;
    if (searchQuery.userName === '') delete searchQuery.userName;
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

    // const matchorderNum = !searchQuery.orderNum || order.orderNum.toString().includes(searchQuery.orderNum);
    // const matchUserName = !searchQuery.userName || order.contact.name.toLowerCase().includes(searchQuery.userName.toLowerCase());
    const withinDateRange = (!startDate || orderDate >= startDate) && (!endDate || orderDate <= endDate);

    return withinDateRange && orderList;
  });

  // 주문 수정 다이얼로그 열기.
  const handleOpenOrderDialog = (order) => {
    setOpenDialog(true);
    dispatch({ type: types.SET_SELECTED_ORDER, payload: order });
  };

  // 주문 다이얼로그 닫기.
  const handleCloseOrderDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={11} md={11}>
          <AdminPageOrderSearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} resetSearch={resetSearch} />
          <AdminPageOrderTable orderTableHead={orderTableHead} orderList={filteredOrders} handleOpenOrderDialog={handleOpenOrderDialog} />
          {openDialog && <AdminPageOrderDialog open={openDialog} handleClose={handleCloseOrderDialog} orderDialogTableHead={orderDialogTableHead} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminOrderPage;

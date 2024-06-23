import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ORDER_STATUS } from '../constants/order.constants';
import { orderActions } from '../action/orderActions';
import { currencyFormat } from '../utils/number';

const AdminPageOrderDialog = ({ open, orderList, handleClose, orderDialogTableHead }) => {
  const dispatch = useDispatch();
  const selectedOrder = useSelector((state) => state.order.selectedOrder);
  const [orderStatus, setOrderStatus] = useState(orderList?.status || '');

  // 주문 진행 상태 변경 핸들러.
  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };

  // 주문 변경 제출 핸들러.
  const handleOrderSubmit = (event) => {
    event.preventDefault();
    dispatch(orderActions.updateOrder(selectedOrder._id, orderStatus));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ width: '100%' }}>
      <DialogTitle>주문 정보</DialogTitle>

      {/* 주문 정보 */}
      <DialogContent>
        {/* <Typography>예약번호: {orderList?.orderNum}</Typography>
        <Typography>주문날짜: {orderList?.createdAt}</Typography>
        <Typography>주문날짜: {orderList?.createdAt.slice(0, 10)}</Typography>
        <Typography>이메일: {orderList?.userID?.email}</Typography>
        <Typography>주소: {orderList?.shipTo?.address + ' ' + orderList?.shipTo?.city}</Typography>
        <Typography>연락처: {`${orderList?.contact?.firstName} ${orderList?.contact?.lastName} ${orderList?.contact?.contact}`}</Typography> */}
        <Typography>예약번호: test</Typography>
        <Typography>주문날짜: 2024-0623</Typography>
        <Typography>이메일: test</Typography>
        <Typography>주소: {'test' + ' ' + 'test'}</Typography>
        <Typography>연락처: test 123</Typography>
        <Typography>주문내역</Typography>
        <TableContainer>
          <Table>
            {/* 테이블 헤드 */}
            <TableHead>
              <TableRow>
                {orderDialogTableHead.map((head, index) => (
                  <TableCell key={index}>{head}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* 테이블 바디 */}
            <TableBody>
              {orderList?.map((order) => (
                <TableRow key={order?._id}>
                  <TableCell>{order?._id}</TableCell>
                  {/* <TableCell>{order?.items?.bookID?.title}</TableCell>
                  <TableCell>{currencyFormat(order?.items?.price)}</TableCell>
                  <TableCell>{order?.items?.qty}</TableCell>
                  <TableCell>{currencyFormat(order?.items?.price * order?.items?.qty)}</TableCell> */}
                  <TableCell>도서명</TableCell>
                  <TableCell>3000</TableCell>
                  <TableCell>4</TableCell>
                  <TableCell>12000</TableCell>
                </TableRow>
              ))}
              <TableRow>
                {/* <TableCell colSpan={4}>총계: {currencyFormat(orderList?.totalPrice)}</TableCell> */}
                <TableCell colSpan={4}>총계: 12000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* 주문 상태 변경 */}
        <form onSubmit={handleOrderSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select value={orderStatus} onChange={handleStatusChange}>
              {ORDER_STATUS.map((status, index) => (
                <MenuItem key={index} value={status.toLowerCase()}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              닫기
            </Button>
            <Button type="submit" color="primary">
              저장
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPageOrderDialog;

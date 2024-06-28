import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableContainer,
  Paper,
} from '@mui/material';
import { currencyFormat } from '../utils/number';
import { useSelector } from 'react-redux';

const MyPageOrderDialog = ({ open, handleClose }) => {
  const { selectedOrder } = useSelector((state) => state.order);

  // console.log('selectedOrder', selectedOrder);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>주문 상세 정보</DialogTitle>
      <DialogContent dividers>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>주문번호</TableCell>
                <TableCell>주문일자</TableCell>
                <TableCell>이메일</TableCell>
                <TableCell>주소</TableCell>
                <TableCell>연락처</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>{selectedOrder?.orderNum}</TableCell>
                <TableCell>{selectedOrder?.createdAt.slice(0, 10)}</TableCell>
                <TableCell>{selectedOrder?.contact?.email}</TableCell>
                <TableCell>{selectedOrder?.shipTo?.address1 + '' + selectedOrder?.shipTo?.address2}</TableCell>
                <TableCell>{selectedOrder?.contact?.phone}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>도서명</TableCell>
                <TableCell>권당 가격</TableCell>
                <TableCell>권수</TableCell>
                <TableCell>총 가격</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {selectedOrder?.items?.length > 0 &&
                selectedOrder?.items?.map((item) => (
                  <TableRow key={selectedOrder._id}>
                    <TableCell>{item?.bookId?.title}</TableCell>
                    <TableCell>{item?.price}</TableCell>
                    <TableCell>{item?.qty}</TableCell>
                    <TableCell>{currencyFormat(item?.price * item?.qty)}</TableCell>
                  </TableRow>
                ))}
              <TableCell>총 주문액: {currencyFormat(selectedOrder?.totalPrice)}</TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyPageOrderDialog;

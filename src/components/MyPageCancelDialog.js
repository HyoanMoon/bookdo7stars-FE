import React, { useEffect, useState } from 'react';
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
  TextField,
} from '@mui/material';
import { currencyFormat } from '../utils/number';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../action/orderActions';

const MyPageCancelDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { selectedRequest } = useSelector((state) => state.order);
  const { myOrderList } = useSelector((state) => state.order);
  const [bookTitle, setBookTitle] = useState(null);

  // console.log('selectedRequest', selectedRequest);
  // console.log('myOrderList', myOrderList[0]?.items);

  useEffect(() => {
    dispatch(orderActions.getMyOrder());
  }, [user, dispatch]);

  useEffect(() => {
    if (selectedRequest && myOrderList) {
      const order = myOrderList.find((order) => order._id === selectedRequest._id);
      if (order) {
        order.items.forEach((item) => {
          const BookTitle = item.bookId.title;
          setBookTitle(BookTitle);
        });
      }
    }
  }, [selectedRequest, myOrderList]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>주문 상세 정보</DialogTitle>
      <DialogContent dividers>
        {/* 주문정보 */}
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
                <TableCell>{selectedRequest?.orderNum}</TableCell>
                <TableCell>{selectedRequest?.createdAt.slice(0, 10)}</TableCell>
                <TableCell>{selectedRequest?.contact?.email}</TableCell>
                <TableCell>{selectedRequest?.shipTo?.address1 + '' + selectedRequest?.shipTo?.address2}</TableCell>
                <TableCell>{selectedRequest?.contact?.phone}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* 요청정보 */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>요청일자</TableCell>
                <TableCell>처리상태</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>{selectedRequest?.createdAt.slice(0, 10)}</TableCell>
                <TableCell>{selectedRequest?.request?.requestType}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <TextField
            label="취소사유"
            value={selectedRequest?.request?.reason}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </TableContainer>
        {/* 상세주문내역 */}
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
              {selectedRequest?.items?.length > 0 &&
                selectedRequest?.items?.map((item) => (
                  <TableRow key={selectedRequest._id}>
                    <TableCell>{bookTitle}</TableCell>
                    <TableCell>{item?.price}</TableCell>
                    <TableCell>{item?.qty}</TableCell>
                    <TableCell>{currencyFormat(item?.price * item?.qty)}</TableCell>
                  </TableRow>
                ))}
              <TableCell>총 주문액: {currencyFormat(selectedRequest?.totalPrice)}</TableCell>
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

export default MyPageCancelDialog;

// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Typography,
// } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { ORDER_STATUS } from '../constants/order.constants';
// import { orderActions } from '../action/orderActions';
// import { currencyFormat } from '../utils/number';

// const AdminPageOrderDialog = ({ open, handleClose, filteredOrders }) => {
//   const selectedOrder = useSelector((state) => state.order.selectedOrder);
//   const [orderStatus, setOrderStatus] = useState(filteredOrders?.status || '');
//   const dispatch = useDispatch();

//   const handleStatusChange = (event) => {
//     setOrderStatus(event.target.value);
//   };

//   const submitStatus = (event) => {
//     event.preventDefault();
//     dispatch(orderActions.updateOrder(selectedOrder._id, orderStatus));
//     handleClose();
//   };

//   // if (!selectedOrder) {
//   //   return null;
//   // }

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>Order Detail</DialogTitle>
//       <DialogContent>
//         {/* <Typography>예약번호: {filteredOrders.orderNum}</Typography> */}
//         {/* <Typography>주문날짜: {filteredOrders.createdAt.slice(0, 10)}</Typography> */}
//         {/* <Typography>이메일: {filteredOrders.userId.email}</Typography> */}
//         {/* <Typography>주소: {filteredOrders.shipTo.address + ' ' + filteredOrders.shipTo.city}</Typography> */}
//         {/* <Typography>연락처: {`${filteredOrders.contact.firstName} ${filteredOrders.contact.lastName} ${filteredOrders.contact.contact}`}</Typography> */}
//         <Typography>주문내역</Typography>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Unit Price</TableCell>
//                 <TableCell>Qty</TableCell>
//                 <TableCell>Price</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredOrders.items.map((item) => (
//                 <TableRow key={item._id}>
//                   <TableCell>{item._id}</TableCell>
//                   <TableCell>{item.productId.name}</TableCell>
//                   <TableCell>{currencyFormat(item.price)}</TableCell>
//                   <TableCell>{item.qty}</TableCell>
//                   <TableCell>{currencyFormat(item.price * item.qty)}</TableCell>
//                 </TableRow>
//               ))}
//               <TableRow>
//                 <TableCell colSpan={4}>총계:</TableCell>
//                 <TableCell>{currencyFormat(filteredOrders.totalPrice)}</TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <form onSubmit={submitStatus}>
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Status</InputLabel>
//             <Select value={orderStatus} onChange={handleStatusChange}>
//               {ORDER_STATUS.map((status, index) => (
//                 <MenuItem key={index} value={status.toLowerCase()}>
//                   {status}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <DialogActions>
//             <Button onClick={handleClose} color="secondary">
//               닫기
//             </Button>
//             <Button type="submit" color="primary">
//               저장
//             </Button>
//           </DialogActions>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AdminPageOrderDialog;

import React from 'react';
import { Box, Typography, Paper, Divider, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { currencyFormat } from '../utils/number';
import { useDispatch } from 'react-redux';
import { orderActions } from '../action/orderActions';
import { cartActions } from '../action/cartActions';

const OrderReceipt = ({ finalTotalPrice, hasSelectedItems, cartList, handleCheckout, sticky, shippingInfo, cardInfo }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = React.useState(false); // 모달 상태 추가

  const shippingFee = hasSelectedItems ? (finalTotalPrice > 100000 ? 0 : 2500) : 0;
  const pointsEarned = finalTotalPrice * 0.05;
  const grandTotal = finalTotalPrice + shippingFee;

  const handlePaymentSuccess = async () => {
    if (
      !shippingInfo.name ||
      !shippingInfo.zipCode ||
      !shippingInfo.address1 ||
      !shippingInfo.phone ||
      !shippingInfo.email ||
      !cardInfo.cardType ||
      !cardInfo.cardNumber ||
      !cardInfo.expiryDate ||
      !cardInfo.cvc
    ) {
      setIsDialogOpen(true); // 입력되지 않은 정보가 있으면 모달 열기
      return;
    }

    const { name, zipCode, address1, address2, phone, email } = shippingInfo;
    const data = {
      totalPrice: grandTotal,
      shipTo: { zipCode, address1, address2 },
      contact: { name, phone, email },
      orderList: cartList.map((item) => {
        return {
          bookId: item.bookId,
          qty: item.qty,
          price: item.bookId.priceSales,
        };
      }),
    };

    try {
      const response = await dispatch(orderActions.createOrder(data));
      await dispatch(cartActions.getCartQty());
      navigate('/payment/success', {
        state: {
          shippingInfo,
          grandTotal,
          paymentMethod: cardInfo.cardType, // 결제 방식으로 설정
        },
      });
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: '16px',
          width: '100%',
          maxWidth: '600px',
          borderRadius: '10px',
          position: sticky ? 'sticky' : 'static',
          top: sticky ? '20px' : 'auto',
        }}>
        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
          Order Summary
        </Typography>
        <Divider />
        <Box mt={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="body1">총 상품 금액:</Typography>
            <Typography variant="body1">₩{currencyFormat(finalTotalPrice)}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="body1">배송비:</Typography>
            <Typography variant="body1">₩{currencyFormat(shippingFee)}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="body1">적립금:</Typography>
            <Typography variant="body1">₩{currencyFormat(pointsEarned)}</Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={2}>
            <Typography variant="h6">최종 결제 금액:</Typography>
            <Typography variant="h6">₩{currencyFormat(grandTotal)}</Typography>
          </Box>

          {location.pathname.includes('/cart') && cartList.length > 0 && (
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleCheckout}>
              주문하기
            </Button>
          )}
          {location.pathname.includes('/payment') && (
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handlePaymentSuccess}>
              결제하기
            </Button>
          )}
        </Box>
      </Paper>

      {/* 모달 컴포넌트 추가 */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>입력 필요</DialogTitle>
        <DialogContent>
          <DialogContentText>주문을 완료하려면 모든 정보를 입력해 주세요.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderReceipt;

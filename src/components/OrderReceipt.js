import React from 'react';
import { Box, Typography, Paper, Divider, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { currencyFormat } from '../utils/number';

const OrderReceipt = ({ finalTotalPrice, hasSelectedItems, cartList, handleCheckout, sticky }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const shippingFee = hasSelectedItems ? (finalTotalPrice > 100000 ? 0 : 2500) : 0;
  const pointsEarned = finalTotalPrice * 0.05;
  const grandTotal = finalTotalPrice + shippingFee;

  const handlePaymentSuccess = () => {
    navigate('/payment/success');
  };

  return (
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
  );
};

export default OrderReceipt;

import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';

const OrderReceipt = ({ totalPrice }) => {
  const tax = totalPrice * 0.1;
  const shippingFee = totalPrice > 100 ? 0 : 10; // 100불 이상 무료 배송, 그 외 10불
  const pointsEarned = totalPrice * 0.05;
  const grandTotal = totalPrice + tax + shippingFee;

  return (
    <Paper elevation={3} sx={{ padding: '16px', width: '100%', maxWidth: '300px' }}>
      <Typography variant="h6">Summary</Typography>
      <Box mt={2}>
        <Typography variant="body1">Subtotal: ₩{totalPrice.toFixed(2)}</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body1">Tax: ₩{tax.toFixed(2)}</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body1">Shipping Fee: ₩{shippingFee.toFixed(2)}</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body1">Points Earned: ₩{pointsEarned.toFixed(2)}</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="h6" mt={2}>
          Order Total: ₩{grandTotal.toFixed(2)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default OrderReceipt;

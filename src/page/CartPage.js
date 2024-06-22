import React from 'react';
import { Container, Grid, Typography, Box, Divider } from '@mui/material';
import CartProductCard from '../components/CartProductCard';
import OrderReceipt from '../components/OrderReceipt';
import '../style/cart.style.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const CartPage = () => {
  // 가짜 데이터
  const cartList = [
    {
      _id: '1',
      productId: {
        name: '폭염 살인',
        price: 24840,
        image: 'https://via.placeholder.com/112',
      },
      qty: 1,
      size: 'm',
    },
    {
      _id: '2',
      productId: {
        name: '내 언어의 한계는 내 세계의 한계다',
        price: 20300,
        image: 'https://via.placeholder.com/112',
      },
      qty: 1,
      size: 'm',
    },
  ];

  const totalPrice = cartList.reduce((acc, item) => acc + item.productId.price * item.qty, 0);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">상품 정보</Typography>
              <Typography variant="h6">가격</Typography>
              <Typography variant="h6">수량</Typography>
              <Typography variant="h6">토탈 가격</Typography>
              <Typography variant="h6">삭제</Typography>
            </Box>
            {cartList.map((item) => (
              <CartProductCard item={item} key={item._id} />
            ))}
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1">총 상품 금액:</Typography>
              <Typography variant="body1">₩{totalPrice.toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1">배송비 (100불 이상 구매 시 무료):</Typography>
              <Typography variant="body1">₩{totalPrice > 100000 ? 0 : 2500}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1">총 적립액 (구매 금액의 5%):</Typography>
              <Typography variant="body1">₩{(totalPrice * 0.05).toFixed(2)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box mb={2} position="sticky" top={16}>
              <OrderReceipt totalPrice={totalPrice} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default CartPage;

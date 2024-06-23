import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box, Divider, Button } from '@mui/material';
import CartProductCard from '../components/CartProductCard';
import OrderReceipt from '../components/OrderReceipt';
import '../style/cart.style.css';
import { cartActions } from '../action/cartActions';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { Link } from 'react-router-dom';
const CartPage = () => {
  const dispatch = useDispatch();
  const { cartList, totalPrice } = useSelector((state) => state.cart);

  console.log('cartList', cartList);
  // useEffect(() => {
  //   // 카트리스트 불러오기
  //   dispatch(cartActions.getCartList());
  // }, []);

  useEffect(() => {
    dispatch(cartActions.getCartList());
  }, [dispatch]);

  useEffect(() => {
    console.log('cartList:', cartList);
    console.log('totalPrice:', totalPrice);
  }, [cartList, totalPrice]);

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
            {cartList.length > 0 ? (
              cartList.map((item) => <CartProductCard item={item} key={item._id} />)
            ) : (
              <Box textAlign="center" mt={4}>
                <Typography variant="h6" gutterBottom>
                  카트가 비어 있습니다
                </Typography>
                <Button component={Link} to="/shop" variant="contained" color="primary">
                  상품을 담으러 가기
                </Button>
              </Box>
            )}
            <Divider sx={{ my: 2 }} />
            {cartList.length > 0 && (
              <>
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
              </>
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <Box mb={2} position="sticky" top={16}>
              <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
export default CartPage;

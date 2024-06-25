import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box, Divider, Button, Checkbox, FormControlLabel } from '@mui/material';
import CartProductCard from '../components/CartProductCard';
import OrderReceipt from '../components/OrderReceipt';
import '../style/cart.style.css';
import { cartActions } from '../action/cartActions';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { Link } from 'react-router-dom';
import { currencyFormat } from '../utils/number';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartList, totalPrice, user } = useSelector((state) => state.cart); // 사용자 정보 추가
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 상품을 상태로 관리

  console.log(user.level, 'userrrrrrr');

  useEffect(() => {
    dispatch(cartActions.getCartList());
  }, [dispatch]);

  useEffect(() => {
    console.log('cartList:', cartList);
    console.log('user:', user);
  }, [cartList, user]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(cartList.map((item) => item._id)); // 전체 선택
    } else {
      setSelectedItems([]); // 전체 선택 해제
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(
      (prevState) => (prevState.includes(itemId) ? prevState.filter((id) => id !== itemId) : [...prevState, itemId]), // 선택 해제 또는 추가
    );
  };

  const selectedCartList = cartList.filter((item) => selectedItems.includes(item._id)); // 선택된 상품 리스트
  const selectedTotalPrice = selectedCartList.reduce((total, item) => total + item.bookId.priceSales * item.qty, 0); // 선택된 상품의 총 가격

  // 레벨에 따른 할인 비율 정의
  const getDiscountRate = (level) => {
    switch (level) {
      case 'silver':
        return 0.02;
      case 'gold':
        return 0.05;
      case 'platinum':
        return 0.07;
      default:
        return 0;
    }
  };

  const discountRate = getDiscountRate(user.level);
  const discountAmount = selectedTotalPrice * discountRate;
  const finalTotalPrice = selectedTotalPrice - discountAmount;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {/* 상단에 사용자 이름과 레벨 표시 */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h6">{user.userName}님</Typography>
          <Typography variant="body1">Level: {user.level}</Typography>
        </Box>

        <Box mb={4}>
          <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
            <FormControlLabel
              control={<Checkbox checked={selectedItems.length === cartList.length} onChange={handleSelectAll} color="primary" />}
              label="전체 선택"
            />
            <Typography variant="h6">상품 정보</Typography>
            <Typography variant="h6">수량</Typography>
            <Typography variant="h6">상품 금액</Typography>
            <Typography variant="h6">삭제</Typography>
          </Box>
          {cartList.length > 0 ? (
            cartList.map((item) => (
              <CartProductCard
                item={item}
                key={item._id}
                isSelected={selectedItems.includes(item._id)} // 선택된 상태 전달
                onSelectItem={handleSelectItem} // 선택 상태 변경 함수 전달
                userLevel={user.level} // 사용자 레벨 전달
              />
            ))
          ) : (
            <Box textAlign="center" mt={4}>
              <Typography variant="h6" gutterBottom>
                카트가 비어 있습니다
              </Typography>
              <Button component={Link} to="/" variant="contained" color="primary">
                상품을 담으러 가기
              </Button>
            </Box>
          )}
          <Divider sx={{ my: 2 }} />
          {selectedCartList.length > 0 && (
            <>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1">총 상품 금액:</Typography>
                <Typography variant="body1">₩{currencyFormat(selectedTotalPrice)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1">할인 금액:</Typography>
                <Typography variant="body1">₩{currencyFormat(discountAmount)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1">최종 금액:</Typography>
                <Typography variant="body1">₩{currencyFormat(finalTotalPrice)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1">배송비 (100불 이상 구매 시 무료):</Typography>
                <Typography variant="body1">₩{finalTotalPrice > 100000 ? 0 : currencyFormat(2500)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1">총 적립액 (구매 금액의 5%):</Typography>
                <Typography variant="body1">₩{currencyFormat(finalTotalPrice * 0.05)}</Typography>
              </Box>
            </>
          )}
        </Box>
        <OrderReceipt
          cartList={selectedCartList}
          finalTotalPrice={finalTotalPrice}
          hasSelectedItems={selectedItems.length > 0} // 선택된 상품이 있는지 여부 전달
        />
      </Container>
    </ThemeProvider>
  );
};

export default CartPage;

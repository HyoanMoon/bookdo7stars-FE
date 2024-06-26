import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box, Divider, Button, Checkbox, FormControlLabel } from '@mui/material';
import CartProductCard from '../components/CartProductCard';
import OrderReceipt from '../components/OrderReceipt';
import '../style/cart.style.css';
import { cartActions } from '../action/cartActions';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { Link, useNavigate } from 'react-router-dom';
import { currencyFormat } from '../utils/number';
import SortMenu from '../components/SortMenu';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartList, user, deliveryAddress } = useSelector((state) => state.cart);
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 상품을 상태로 관리
  const [selectedSortOption, setSelectedSortOption] = useState('카트넣기순');

  const sortCartList = (list, sortOption) => {
    switch (sortOption) {
      case '상품명순':
        return [...list].sort((a, b) => a.bookId.title.localeCompare(b.bookId.title));
      case '높은가격순':
        return [...list].sort((a, b) => b.bookId.priceSales - a.bookId.priceSales);
      case '낮은가격순':
        return [...list].sort((a, b) => a.bookId.priceSales - b.bookId.priceSales);
      case '출간일순':
        return [...list].sort((a, b) => new Date(b.bookId.pubDate) - new Date(a.bookId.pubDate));
      default:
        return list;
    }
  };

  const sortedCartList = sortCartList(cartList, selectedSortOption);

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
    setSelectedItems((prevState) => (prevState.includes(itemId) ? prevState.filter((id) => id !== itemId) : [...prevState, itemId])); // 선택 해제 또는 추가
  };

  const handleSortOptionSelect = (option) => {
    setSelectedSortOption(option);
  };

  const selectedCartList = cartList.filter((item) => selectedItems.includes(item._id));
  const selectedTotalPrice = selectedCartList.reduce((total, item) => total + item.bookId.priceSales * item.qty, 0);

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
  const shippingFee = selectedItems.length > 0 ? (finalTotalPrice > 100000 ? 0 : 2500) : 0;
  const pointsEarned = finalTotalPrice * 0.05;
  const grandTotal = finalTotalPrice + shippingFee;

  const handleCheckout = () => {
    navigate('/payment', {
      state: { selectedCartList, finalTotalPrice, discountAmount, discountRate, shippingFee, pointsEarned, grandTotal, deliveryAddress },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h6">{user.userName}님</Typography>
          <Typography variant="body1">Level: {user.level}</Typography>
        </Box>
        <Box mb={4} display="flex" justifyContent="flex-end">
          <SortMenu selectedSortOption={selectedSortOption} onSelectSortOption={handleSortOptionSelect} />
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
            <Typography variant="h6">배송 정보</Typography>
            <Typography variant="h6">삭제</Typography>
          </Box>
          {sortedCartList.length > 0 ? (
            sortedCartList.map((item) => (
              <CartProductCard
                item={item}
                key={item._id}
                isSelected={selectedItems.includes(item._id)} // 선택된 상태 전달
                onSelectItem={handleSelectItem} // 선택 상태 변경 함수 전달
                userLevel={user.level} // 사용자 레벨 전달
                deliveryAddress={deliveryAddress}
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
          {/* <Divider sx={{ my: 2 }} /> */}
          {selectedCartList.length > 0 && (
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
                <Typography variant="body1">총 상품 금액:</Typography>
                <Typography variant="body1">₩{currencyFormat(selectedTotalPrice)}</Typography>
              </Box>
              <Divider sx={{ my: 1, width: '100%' }} />
              <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
                <Typography variant="body1">할인 금액:</Typography>
                <Typography variant="body1">₩{currencyFormat(discountAmount)}</Typography>
              </Box>
              <Divider sx={{ my: 1, width: '100%' }} />
              <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
                <Typography variant="body1">최종 금액:</Typography>
                <Typography variant="body1">₩{currencyFormat(finalTotalPrice)}</Typography>
              </Box>
              <Divider sx={{ my: 1, width: '100%' }} />
              <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
                <Typography variant="body1">배송비 (10만원 이상 구매 시 무료):</Typography>
                <Typography variant="body1">₩{finalTotalPrice > 100000 ? 0 : currencyFormat(2500)}</Typography>
              </Box>
              <Divider sx={{ my: 1, width: '100%' }} />
              <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
                <Typography variant="body1">총 적립액 (구매 금액의 5%):</Typography>
                <Typography variant="body1">₩{currencyFormat(finalTotalPrice * 0.05)}</Typography>
              </Box>
            </Box>
          )}
        </Box>
        <OrderReceipt
          cartList={selectedCartList}
          finalTotalPrice={finalTotalPrice}
          hasSelectedItems={selectedItems.length > 0}
          handleCheckout={handleCheckout}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CartPage;

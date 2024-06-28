import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box, Button, Checkbox, FormControlLabel, TableContainer, Table, TableBody, TableCell, TableRow, Paper } from '@mui/material';
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
  const recommend =
    selectedItems.length > 0 ? (
      finalTotalPrice > 100000 ? (
        '무료배송 금액을 충족하셨어요!'
      ) : (
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component="span" mr={2}>
            ₩{currencyFormat(100000 - finalTotalPrice)} 더 담으면 무료 배송 🚚
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            더 담으러 가기
          </Button>
        </Box>
      )
    ) : (
      <Typography variant="h6">10만원 이상 구매 시 무료배송 🚚</Typography>
    );

  const handleCheckout = () => {
    navigate('/payment', {
      state: { selectedCartList, finalTotalPrice, discountAmount, discountRate, shippingFee, pointsEarned, grandTotal, deliveryAddress },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {/* 유저 정보 박스 */}
        <Box display="flex" flexDirection="column" alignItems="flex-start" ml={10} mr={10} p={2} pl={4} bgcolor="#f5f5f5" borderRadius="25px">
          <Typography variant="h6" pb={1}>
            반갑습니다 {user?.userName?.toUpperCase()}님!
          </Typography>
          <Typography variant="body1">
            {user?.userName?.toUpperCase()}님의 등급은{' '}
            <Box component="span" fontWeight="bold" color="primary">
              {user?.level?.toUpperCase()}
            </Box>{' '}
            입니다.
          </Typography>
        </Box>
        <Box mb={4} display="flex" justifyContent="flex-end" mr={10}>
          <SortMenu selectedSortOption={selectedSortOption} onSelectSortOption={handleSortOptionSelect} />
        </Box>
        {/* 무료 배송 정보 헤더 */}

        <Box display="flex" justifyContent="space-between" mb={2} mt={2} alignItems="center" p={1}>
          <Typography variant="h6">{recommend}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Box flex={3} mb={4}>
            {/* 상품 정보 헤더 아래 박스 */}
            <Box display="flex" justifyContent="space-between" mb={2} alignItems="center" p={1} bgcolor="#f5f5f5" borderRadius="4px">
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
                  userLevel={user.level}
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

            {selectedCartList.length > 0 && (
              <TableContainer component={Paper} sx={{ mt: 4, bgcolor: '#f5f5f5', borderRadius: '10px' }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1">총 상품 금액:</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1">₩{currencyFormat(selectedTotalPrice)}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1">할인 금액:</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1">₩{currencyFormat(discountAmount)}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1">최종 금액:</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1">₩{currencyFormat(finalTotalPrice)}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1">배송비 (10만원 이상 구매 시 무료):</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1">₩{finalTotalPrice > 100000 ? 0 : currencyFormat(2500)}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1">총 적립액 (구매 금액의 5%):</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1">₩{currencyFormat(finalTotalPrice * 0.05)}</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
          <Box flex={1} ml={3}>
            <OrderReceipt
              cartList={selectedCartList}
              finalTotalPrice={finalTotalPrice}
              hasSelectedItems={selectedItems.length > 0}
              handleCheckout={handleCheckout}
              sticky={true} // Sticky prop 추가
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CartPage;

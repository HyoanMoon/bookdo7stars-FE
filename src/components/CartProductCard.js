import React from 'react';
import { Grid, Typography, Box, IconButton, FormControl, Select, MenuItem, Checkbox } from '@mui/material';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { currencyFormat } from '../utils/number';
import { cartActions } from '../action/cartActions';

const CartProductCard = ({ item, isSelected, onSelectItem, userLevel }) => {
  const dispatch = useDispatch();

  const handleQtyChange = (id, value) => {
    dispatch(cartActions.updateItemQty(id, value));
  };

  const deleteCart = (id, qty) => {
    dispatch(cartActions.deleteCartItem(id, qty));
  };

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

  const discountRate = getDiscountRate(userLevel);
  const originalPrice = item.bookId.priceSales * item.qty;
  const discountAmount = originalPrice * discountRate;
  const discountedPrice = originalPrice - discountAmount;

  return (
    <Box display="flex" justifyContent="space-between" mb={3} alignItems="center">
      <Checkbox
        checked={isSelected} // 선택된 상태
        onChange={() => onSelectItem(item._id)} // 선택 상태 변경 함수 호출
        color="primary"
      />
      <Box display="flex" alignItems="center" width="25%">
        <img src={item.bookId.cover} width={60} alt={item.bookId.title} />
        <Box ml={2}>
          <Typography variant="body2">{item.bookId.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {item.bookId.stockStatus === '' ? '재고 있음' : item.bookId.stockStatus}
          </Typography>{' '}
        </Box>
      </Box>
      <FormControl variant="outlined" size="small" style={{ width: '15%' }}>
        <Select onChange={(event) => handleQtyChange(item._id, event.target.value)} required defaultValue={item.qty}>
          {[...Array(10).keys()].map((x) => (
            <MenuItem key={x + 1} value={x + 1}>
              {x + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box display="flex" flexDirection="column" alignItems="center" width="15%">
        <Typography variant="body2" style={{ textDecoration: 'line-through', color: 'grey' }}>
          ₩ {currencyFormat(originalPrice)}
        </Typography>
        <Typography variant="body2" color="primary">
          ₩ {currencyFormat(discountedPrice)} ({(discountRate * 100).toFixed(0)}% 할인)
        </Typography>
      </Box>
      <IconButton onClick={() => deleteCart(item._id, item.qty)} color="secondary" style={{ width: '5%' }}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default CartProductCard;

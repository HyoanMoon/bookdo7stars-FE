import React from 'react';
import { Grid, Typography, Box, IconButton, FormControl, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';

const CartProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleQtyChange = (event) => {
    const value = event.target.value;
    // 아이템 수량을 수정하는 로직
    console.log('Update quantity to:', value);
  };

  const deleteCart = () => {
    // 아이템을 삭제하는 로직
    console.log('Delete item:', item._id);
  };

  const stockInfo = Object.keys(item.productId.stock || {}).map((size) => {
    const stockCount = item.productId.stock[size];
    const stockAlert = stockCount <= 5 && stockCount > 0 ? `${stockCount} items left` : '';
    return {
      size,
      stockCount,
      stockAlert,
    };
  });

  return (
    <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
      <Box display="flex" alignItems="center" width="25%">
        <img src={item.productId.image} width={60} alt={item.productId.name} />
        <Typography variant="body2" ml={2}>
          {item.productId.name}
        </Typography>
      </Box>
      <Typography variant="body2" width="15%">
        ₩{item.productId.price.toFixed(2)}
      </Typography>
      <FormControl variant="outlined" size="small" width="15%">
        <Select value={item.qty} onChange={handleQtyChange}>
          {[...Array(10).keys()].map((x) => (
            <MenuItem key={x + 1} value={x + 1}>
              {x + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="body2" width="15%">
        ₩{(item.productId.price * item.qty).toFixed(2)}
      </Typography>
      <IconButton onClick={deleteCart} color="secondary" width="5%">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default CartProductCard;

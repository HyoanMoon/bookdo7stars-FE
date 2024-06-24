import React, { useEffect } from 'react';
import { Button, Box } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { pink } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { favoriteActions } from '../../action/favoriteActions';

const BookToCart = ({ favorite, selectedBook }) => {
  const dispatch = useDispatch();

  const handleFavoriteClick = () => {
    dispatch(favoriteActions.addFavorite(selectedBook._id));
  };
  const deleteFavoriteClick = () => {
    dispatch(favoriteActions.deleteFavorite(selectedBook._id));
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Button variant="contained" color="primary" startIcon={<AddShoppingCartIcon />} sx={{ height: '60px', flexGrow: 1 }}>
        ADD TO CART
      </Button>
      {favorite ? (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FavoriteBorderIcon sx={{ color: pink[500] }} />}
          sx={{ height: '60px', flexGrow: 1 }}
          onClick={deleteFavoriteClick}>
          WISH
        </Button>
      ) : (
        <Button variant="outlined" color="primary" startIcon={<FavoriteBorderIcon />} sx={{ height: '60px', flexGrow: 1 }} onClick={handleFavoriteClick}>
          WISH
        </Button>
      )}
    </Box>
  );
};

export default BookToCart;

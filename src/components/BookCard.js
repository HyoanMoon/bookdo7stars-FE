import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as types from '../constants/book.constants';
import { useDispatch } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickBookCard = (book) => {
    dispatch({ type: types.SET_SELECTED_BOOK, payload: book });
    navigate(`/book/${book._id}`);
  };
  const handleFavoriteClick = () => {
    // Your favorite click handling logic
  };

  const handleCartClick = () => {
    // Your cart click handling logic
  };

  return (
    <Card sx={{ width: 230, height: 350, borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <CardMedia component="img" image={book.cover} alt={book.title} sx={{ height: 275, objectFit: 'cover' }} onClick={() => clickBookCard(book)} />
      <CardContent sx={{ height: 100 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box sx={{ width: 220 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                width: '100%',
                textAlign: 'flex-start',
              }}>
              {book.title}
            </Typography>
          </Box>
          <Box sx={{ width: 220 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                width: '100%',
                textAlign: 'right',
              }}>
              {book.author}
            </Typography>
          </Box>
          <Box sx={{ width: 220 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.primary">
                  {`₩${book.priceStandard}`} {/* Assuming price is in book object */}
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={handleFavoriteClick} sx={{ padding: '5px' }}>
                  <FavoriteBorderIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={handleCartClick} sx={{ padding: '5px' }}>
                  <ShoppingCartIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookCard;

import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as types from '../constants/book.constants';
import { useDispatch } from 'react-redux';
const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickBookCard = (book) => {
    dispatch({ type: types.SET_SELECTED_BOOK, payload: book });
    navigate(`/book/${book._id}`);
  };

  return (
    <Card sx={{ width: 217, height: 325, marginRight: 2, borderRadius: 2 }} onClick={() => clickBookCard(book)}>
      <CardMedia component="img" image={book.cover} alt={book.title} sx={{ height: 250, objectFit: 'cover' }} />
      <CardContent sx={{ height: 100 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            width: '100%',
          }}>
          {book.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            width: '100%',
          }}>
          {book.author}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;

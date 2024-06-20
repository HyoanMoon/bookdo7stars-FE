import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const clickBookCard = () => {
    navigate(`/book/${book._id}`);
  };

  return (
    <Card sx={{ maxWidth: 217, maxHeight: 325 }} onClick={clickBookCard}>
      <CardMedia component="img" image={book.cover} alt={book.title} sx={{ height: 194, objectFit: 'cover' }} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {book.title}, {book.author}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;

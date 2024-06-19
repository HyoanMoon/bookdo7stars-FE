import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
const BookCard = ({ book }) => {
  return (
    <Card sx={{ maxWidth: 217, maxHeight: 325 }}>
      <CardMedia component="img" height="194" image={book.cover} alt={book.title} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {book.title}, {book.author}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;

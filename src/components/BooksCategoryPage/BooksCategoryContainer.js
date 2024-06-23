import { Box, Container, Grid, Typography, Tab, Tabs, Button, IconButton } from '@mui/material';
import BookSlider from '../BookSlider/BookSlider';
import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard';
import { AddCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const BookContainer = ({ books, sx, title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [displayCount, setDisplayCount] = useState(12); // 처음에 표시할 책의 수
  // "더보기" 기능
  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 12);
  };

  useEffect(() => {
    setDisplayCount(12);
  }, [title]);

  console.log(displayCount);

  return (
    <Container
      sx={{
        ...sx,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 2,
        paddingLeft: '0px',
        paddingRight: '0px',
        backgroundColor: '#b5c791',
      }}>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <Typography variant="h3" component="div" gutterBottom sx={{ width: '400px', height: '60px', fontWeight: 'bold', textAlign: 'center', margin: '0px' }}>
          {title}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {books.slice(0, displayCount).map((book) => (
            <Grid
              key={book._id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ paddingY: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <BookCard key={book._id} book={book} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ width: '100%' }}>
          {books.length > displayCount && (
            <Button onClick={handleLoadMore} variant="outlined" fullWidth endIcon={<AddCircleOutline />} sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
              더보기
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default BookContainer;

import { Box, Container, Grid, Typography, Tab, Tabs, Button, IconButton } from '@mui/material';
import BookSlider from '../BookSlider/BookSlider';
import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard';
import { AddCircleOutline, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { bookActions } from '../../action/bookActions';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteActions } from '../../action/favoriteActions';
const BooksGroupContainer = ({ bookList, title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [displayCount, setDisplayCount] = useState(16); // 처음에 표시할 책의 수
  const { favorite } = useSelector((state) => state.favorite);
  const { user } = useSelector((state) => state.favorite);

  useEffect(() => {
    dispatch(favoriteActions.getFavorite());
  }, [dispatch, user]);

  // "더보기" 기능
  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 16);
  };

  useEffect(() => {
    setDisplayCount(16);
  }, [title]);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const filteredBooks = selectedCategory === '전체' ? bookList : bookList.filter((book) => book.categoryName.includes(selectedCategory));

  return (
    <Container>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', margin: '0px' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {filteredBooks.slice(0, displayCount).map((book) => (
            <Grid
              key={book._id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ paddingY: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <BookCard key={book._id} book={book} favorite={favorite.some((favorite) => favorite._id === book._id)} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ width: '100%' }}>
          {filteredBooks.length > displayCount && (
            <Button onClick={handleLoadMore} variant="outlined" fullWidth endIcon={<AddCircleOutline />} sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
              더보기
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default BooksGroupContainer;

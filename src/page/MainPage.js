import React from 'react';
import { Box, Container, Grid, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

import BooksCarousel from '../components/BooksCarousel/BooksCarousel';
import BookContainer from '../components/BookContainer/BookContainer';
import CarouselSlide from '../components/CarouselSlide';
import { getCategories } from '../_helper/getCategories';

const MainPage = () => {
  const { bookList } = useSelector((state) => state.book);
  const isMobile = useMediaQuery('(max-width: 600px)');

  if (!bookList) {
    return null;
  }

  const blogBestBooks = bookList.filter((book) => book.queryType === 'BlogBest');
  const bestSeller = bookList.filter((book) => book.queryType === 'BestSeller');
  const newSpecialBooks = bookList.filter((book) => book.queryType === 'ItemNewSpecial');
  const newAllBooks = bookList.filter((book) => book.queryType === 'ItemNewAll');

  const newAllBooksCategories = getCategories(newAllBooks);
  const bestSellerCategories = getCategories(bestSeller);

  return (
    <Box sx={{ paddingBottom: 15, position: 'relative', zIndex: 0 }}>
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <CarouselSlide />
      </Box>
      <Container
        sx={{
          maxWidth: '100%',
          '@media (min-width: 800px)': {
            maxWidth: '1000px',
            margin: 'auto',
          },
          '@media (min-width: 1000px)': {
            maxWidth: '1200px',
            margin: 'auto',
          },
          '@media (min-width: 1200px)': {
            maxWidth: '1600px',
            margin: 'auto',
          },
          '@media (min-width: 1400px)': {
            maxWidth: '1800px',
          },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          padding: '20px',
          position: 'relative',
          zIndex: 1,
        }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ marginTop: '30px', position: 'relative', zIndex: 1 }}>
            <BooksCarousel bookList={newSpecialBooks.slice(0, 10)} title={'화제의 신작'} isMobile={isMobile} />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: '30px', position: 'relative', zIndex: 2 }}>
            {isMobile ? (
              <BooksCarousel bookList={bestSeller.slice(0, 12)} categories={bestSellerCategories} title={'베스트 셀러'} isMobile={isMobile} />
            ) : (
              <BookContainer bookList={bestSeller.slice(0, 12)} categories={bestSellerCategories} title={'베스트 셀러'} />
            )}
          </Grid>
          <Grid item xs={12} sx={{ marginTop: '30px', position: 'relative', zIndex: 3 }}>
            <BooksCarousel bookList={newAllBooks.slice(0, 100)} categories={newAllBooksCategories} title={'신간 도서'} isMobile={isMobile} />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: '30px', position: 'relative', zIndex: 4 }}>
            {isMobile ? (
              <BooksCarousel bookList={blogBestBooks.slice(0, 4)} title={'에디터 추천'} isMobile={isMobile} />
            ) : (
              <BookContainer bookList={blogBestBooks.slice(0, 4)} title={'에디터 추천'} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MainPage;

import React from 'react';
import { Box, Container, useMediaQuery } from '@mui/material';
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
    <Box sx={{ paddingBottom: 15 }}>
      <Box>
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
        }}>
        <Box sx={{ paddingTop: '20px' }}>
          <BooksCarousel bookList={newSpecialBooks.slice(0, 10)} title={'화제의 신작'} isMobile={isMobile} />
        </Box>
        <Box sx={{ paddingTop: '20px' }}>
          {isMobile ? (
            <BooksCarousel bookList={bestSeller.slice(0, 12)} categories={bestSellerCategories} title={'베스트 셀러'} isMobile={isMobile} />
          ) : (
            <BookContainer bookList={bestSeller.slice(0, 12)} categories={bestSellerCategories} title={'베스트 셀러'} />
          )}
        </Box>
        <Box sx={{ paddingTop: '20px' }}>
          <BooksCarousel bookList={newAllBooks.slice(0, 100)} categories={newAllBooksCategories} title={'신간 도서'} isMobile={isMobile} />
        </Box>
        <Box sx={{ paddingTop: '20px' }}>
          {isMobile ? (
            <BooksCarousel bookList={blogBestBooks.slice(0, 4)} title={'에디터 추천'} isMobile={isMobile} />
          ) : (
            <BookContainer bookList={blogBestBooks.slice(0, 4)} title={'에디터 추천'} />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default MainPage;

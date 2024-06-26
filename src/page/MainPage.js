import React from 'react';
import { Box, Container } from '@mui/material';
import { useSelector } from 'react-redux';

import BooksCarousel from '../components/BooksCarousel/BooksCarousel';
import BookContainer from '../components/BookContainer/BookContainer';
import CarouselSlide from '../components/CarouselSlide';
import { getCategories } from '../_helper/getCategories';
const MainPage = () => {
  const { bookList } = useSelector((state) => state.book);

  if (!bookList) {
    return;
  }

  // BlogBestBooks
  const blogBestBooks = bookList.filter((book) => {
    return book.queryType === 'BlogBest';
  });

  // bestSeller
  const bestSeller = bookList.filter((book) => {
    return book.queryType === 'BestSeller';
  });

  // newSpecialBooks
  const newSpecialBooks = bookList.filter((book) => {
    return book.queryType === 'ItemNewSpecial';
  });

  // newAllBooks
  const newAllBooks = bookList.filter((book) => {
    return book.queryType === 'ItemNewAll';
  });

  // category object for category-slide-bar
  const newAllBooksCategories = getCategories(newAllBooks);
  const bestSellerCategories = getCategories(bestSeller);

  return (
    <>
      <Box>
        <CarouselSlide />
      </Box>
      <Container
        sx={{
          maxWidth: '100%',
          '@media (min-width: 800)': {
            maxWidth: '1000px',
            margin: 'auto', // 화면 너비가 800 이상일 때 적용
          },
          '@media (min-width: 1000px)': {
            maxWidth: '1200px',
            margin: 'auto', // 화면 너비가 1000px 이상일 때 적용
          },
          '@media (min-width: 1200px)': {
            maxWidth: '1600px',
            margin: 'auto', // 화면 너비가 1200px 이상일 때 적용
          },
          '@media (min-width: 1400px)': {
            maxWidth: '1800px', // 화면 너비가 1200px 이상일 때 적용
          },
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          borderRadius: 2,
          padding: 0,
          margin: 'auto',
        }}>
        <Box>
          <BooksCarousel bookList={newSpecialBooks.slice(0, 10)} title={'화제의 신작'} />
        </Box>
        <Box>
          <BookContainer bookList={bestSeller.slice(0, 12)} categories={bestSellerCategories} title={'베스트 셀러'} />
        </Box>
        <Box>
          <BooksCarousel bookList={newAllBooks.slice(0, 100)} categories={newAllBooksCategories} title={'신간 도서'} />
        </Box>
        <Box>
          <BookContainer bookList={bestSeller.slice(7, 11)} title={'에디터 추천'} />
        </Box>
      </Container>
    </>
  );
};
export default MainPage;

//backgroundColor: 'primary.light'

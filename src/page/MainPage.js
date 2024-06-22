import React from 'react';
import { Box, Container } from '@mui/material';
import { useSelector } from 'react-redux';

import BooksCarousel from '../components/BooksCarousel/BooksCarousel';
import BookContainer from '../components/BookContainer/BookContainer';
import CarouselSlide from '../components/CarouselSlide';
import { getCategories } from '../_helper/getCategories';
const MainPage = () => {
  const { books } = useSelector((state) => state.book);

  if (!books) {
    return;
  }

  // BlogBestBooks
  const blogBestBooks = books.filter((book) => {
    return book.queryType === 'BlogBest';
  });

  // bestSeller
  const bestSeller = books.filter((book) => {
    return book.queryType === 'BestSeller';
  });

  // newSpecialBooks
  const newSpecialBooks = books.filter((book) => {
    return book.queryType === 'ItemNewSpecial';
  });

  // newAllBooks
  const newAllBooks = books.filter((book) => {
    return book.queryType === 'ItemNewAll';
  });

  // category object for category-slide-bar
  const newAllBooksCategories = getCategories(newAllBooks);
  const newSpecialBooksCategories = getCategories(newSpecialBooks);
  const bestSellerCategories = getCategories(bestSeller);
  const blogBestBooksCategories = getCategories(blogBestBooks);

  return (
    <>
      <Box>
        <CarouselSlide />
      </Box>
      <Container>
        <Box>
          <BooksCarousel books={newSpecialBooks.slice(0, 10)} title={'화제의 신작'} />
        </Box>
        <Box>
          <BookContainer books={bestSeller.slice(0, 12)} categories={bestSellerCategories} title={'베스트 셀러'} />
        </Box>
        <Box>
          <BooksCarousel books={newAllBooks.slice(0, 100)} categories={newAllBooksCategories} title={'신간 도서'} />
        </Box>
        <Box>
          <BookContainer books={bestSeller.slice(7, 11)} title={'에디터 추천'} />
        </Box>
      </Container>
    </>
  );
};
export default MainPage;

//backgroundColor: 'primary.light'

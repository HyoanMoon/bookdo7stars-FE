import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { Box, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { bookActions } from '../action/bookActions';
import NotFoundPage from './NotFoundPage';
import SlideBanner from '../components/SlideBanner/SlideBanner';
import BooksCarousel from '../components/BooksCarousel/BooksCarousel';
import BookContainer from '../components/BookContainer/BookContainer';
import CarouselSlide from '../components/CarouselSlide';
import Footer from '../components/Footer/Footer';
const MainPage = () => {
  const { books, bookGroup, categoryBooks } = useSelector((state) => state.book);

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

  const bestRankedBooks = [];
  books.map((book) => {
    if (book.customerReviewRank > 8) {
      bestRankedBooks.push(book);
    }
  });
  const topBestRankedBooks = bestRankedBooks.slice(0, 10);

  const getCategories = (books) => {
    const categoriesOfGroup = books.map((book) => {
      return book.categoryName.split('>')[1];
    });
    const _categories = [];
    categoriesOfGroup.map((cat) => {
      if (!_categories.includes(cat)) {
        _categories.push(cat);
      }
    });
    const categories = [];
    const all = { id: '전체', label: '전체' };
    categories.push(all);
    _categories.map((c) => {
      const cat = { id: c, label: c };
      return categories.push(cat);
    });
    return categories;
  };

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
          <BookContainer books={bestSeller.slice(0, 10)} categories={bestSellerCategories} title={'베스트 셀러'} />
        </Box>
        <Box>
          <BookContainer books={newAllBooks.slice(0, 5)} categories={newAllBooksCategories} title={'신간'} />
        </Box>
      </Container>
    </>
  );
};
export default MainPage;

//backgroundColor: 'primary.light'

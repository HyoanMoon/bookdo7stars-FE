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
    <Container sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box sx={{ marginBottom: '30px', marginTop: '60px' }}>
        <SlideBanner books={topBestRankedBooks} />
      </Box>
      <Box sx={{ marginBottom: '30px', marginTop: '60px' }}>
        <BooksCarousel books={newSpecialBooks.slice(0, 10)} title={'화제의 신작'} sx={{ backgroundColor: 'primary.light' }} />
      </Box>
      <Box sx={{ marginBottom: '30px', marginTop: '60px' }}>
        <BookContainer books={bestSeller.slice(0, 10)} categories={bestSellerCategories} title={'베스트 셀러'} sx={{ height: 500 }} />
      </Box>
      <Box sx={{ marginTop: '400px' }}>
        <BookContainer books={newAllBooks.slice(0, 5)} categories={newAllBooksCategories} title={'신간'} sx={{ height: 500 }} />
      </Box>
    </Container>
  );
};
export default MainPage;

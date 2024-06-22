import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard';
import { Box, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { bookActions } from '../../action/bookActions';
import NotFoundPage from '../../page/NotFoundPage';
import SlideBanner from '../SlideBanner/SlideBanner';
import BooksCarousel from '../BooksCarousel/BooksCarousel';
import BookContainer from '../BookContainer/BookContainer';

import { getCategories } from '../../_helper/getCategories';
import { getGroupNameInKorean } from '../../_helper/getGroupNameInKorean';
import BooksGroupContainer from './BooksGroupContainer';
const BooksGroupPage = () => {
  const dispatch = useDispatch();
  const { books, groupBooks } = useSelector((state) => state.book);
  const bookGroup = useParams();

  console.log(bookGroup);

  useEffect(() => {
    if (bookGroup) {
      dispatch(bookActions.getBookListByGroup(bookGroup.bookGroup));
    }
  }, [bookGroup]);

  if (!books) {
    return;
  }
  if (!groupBooks || !bookGroup) {
    return;
  }
  const groupBooksCategories = getCategories(groupBooks);
  const groupNameInKorean = getGroupNameInKorean(bookGroup.bookGroup);

  return (
    <>
      <Container sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ marginBottom: '50px', marginTop: '10px' }}>
          <BooksGroupContainer books={groupBooks} categories={groupBooksCategories} title={groupNameInKorean} moreButtonShowed={false} />
        </Box>
      </Container>
      {/* <Footer /> */}
    </>
  );
};
export default BooksGroupPage;

//backgroundColor: 'primary.light'

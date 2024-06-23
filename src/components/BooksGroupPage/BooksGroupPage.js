import React, { useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bookActions } from '../../action/bookActions';

import { getCategories } from '../../_helper/getCategories';
import { getGroupNameInKorean } from '../../_helper/getGroupNameInKorean';
import BooksGroupContainer from './BooksGroupContainer';
import CategoryList from '../CategoryList/CategoryList';

const BooksGroupPage = () => {
  const dispatch = useDispatch();
  const { books, groupBooks } = useSelector((state) => state.book);

  const bookGroup = useParams();

  const totalCategories = [];
  books.map((book) => {
    return totalCategories.push(book.categoryName);
  });

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
    <Container sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Grid container spacing={2}>
        {/* 왼쪽 칼럼 (2:10 비율) */}
        <Grid item xs={2}>
          <Box sx={{ marginBottom: '50px', marginTop: '10px' }}>
            <CategoryList totalCategories={totalCategories} />
          </Box>
        </Grid>

        {/* 오른쪽 칼럼 (2:10 비율) */}
        <Grid item xs={10}>
          <Box sx={{ marginBottom: '50px', marginTop: '10px' }}>
            <BooksGroupContainer books={groupBooks} categories={groupBooksCategories} title={groupNameInKorean} moreButtonShowed={false} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
export default BooksGroupPage;

//backgroundColor: 'primary.light'

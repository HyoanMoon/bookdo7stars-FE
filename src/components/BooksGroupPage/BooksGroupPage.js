import React, { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bookActions } from '../../action/bookActions';

import BooksGroupContainer from './BooksGroupContainer';
import CategoryList from '../CategoryList/CategoryList';
import { getGroupNameInKorean } from '../../_helper/getGroupNameInKorean';

const BooksGroupPage = () => {
  const dispatch = useDispatch();
  const { bookList, groupBooks } = useSelector((state) => state.book);
  const [category, setCategory] = useState('국내도서');

  const bookGroup = useParams();

  const totalCategories = [];
  bookList.map((book) => {
    return totalCategories.push(book.categoryName);
  });

  useEffect(() => {
    if (bookGroup) {
      dispatch(bookActions.getBookListByGroup(bookGroup.bookGroup));
    }
  }, [bookGroup]);

  if (!bookList) {
    return;
  }
  if (!groupBooks || !bookGroup) {
    return;
  }
  const groupNameInKorean = getGroupNameInKorean(bookGroup.bookGroup);

  const onCategoryClick = (categoryPath) => {
    setCategory(categoryPath);
  };
  let groupBooksByCategory = [];
  groupBooks.map((book) => {
    if (book.categoryName.includes(category)) {
      groupBooksByCategory.push(book);
    }
  });

  return (
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
          maxWidth: '1400px',
          margin: 'auto', // 화면 너비가 1200px 이상일 때 적용
        },
        '@media (min-width: 1400px)': {
          maxWidth: '1600px', // 화면 너비가 1200px 이상일 때 적용
        },
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 2,
        padding: 0,
        margin: 'auto',
      }}>
      <Grid container spacing={2}>
        {/* 왼쪽 칼럼 (2:10 비율) */}
        <Grid item xs={2}>
          <Box>
            <CategoryList totalCategories={totalCategories} onCategoryClick={onCategoryClick} groupName={groupNameInKorean} />
          </Box>
        </Grid>

        {/* 오른쪽 칼럼 (2:10 비율) */}
        <Grid item xs={10}>
          <Box sx={{ marginLeft: { xs: 0, sm: 2 } }}>
            <BooksGroupContainer bookList={groupBooksByCategory} title={groupNameInKorean} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
export default BooksGroupPage;

//backgroundColor: 'primary.light'

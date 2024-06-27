import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Drawer, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // 드로어 열림 상태
  const [displayCount, setDisplayCount] = useState(3); // 모바일에서 보이는 책의 개수
  const isMobile = useMediaQuery('(max-width: 600px)'); // 모바일 여부 확인

  const bookGroup = useParams();

  const totalCategories = [];
  bookList.map((book) => totalCategories.push(book.categoryName));

  useEffect(() => {
    if (bookGroup) {
      dispatch(bookActions.getBookListByGroup(bookGroup.bookGroup));
    }
  }, [bookGroup]);

  if (!bookList) return null;
  if (!groupBooks || !bookGroup) return null;

  const groupNameInKorean = getGroupNameInKorean(bookGroup.bookGroup);

  const onCategoryClick = (categoryPath) => {
    setCategory(categoryPath);
    if (isMobile) {
      setIsDrawerOpen(false); // 모바일에서 카테고리 선택 시 드로어 닫기
    }
  };

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  let groupBooksByCategory = [];
  groupBooks.map((book) => {
    if (book.categoryName.includes(category)) {
      groupBooksByCategory.push(book);
    }
  });

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 3);
  };

  return (
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
          maxWidth: '1400px',
          margin: 'auto',
        },
        '@media (min-width: 1400px)': {
          maxWidth: '1600px',
        },
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 2,
        padding: 0,
        margin: 'auto',
      }}>
      <Grid container spacing={2}>
        {!isMobile && (
          <Grid item xs={2}>
            <Box>
              <CategoryList totalCategories={totalCategories} onCategoryClick={onCategoryClick} groupName={groupNameInKorean} />
            </Box>
          </Grid>
        )}
        {isMobile && (
          <IconButton onClick={toggleDrawer(true)} color="primary" aria-label="filter" sx={{ marginLeft: '10px' }}>
            <MenuIcon />
          </IconButton>
        )}
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <CategoryList totalCategories={totalCategories} onCategoryClick={onCategoryClick} groupName={groupNameInKorean} />
        </Drawer>
        <Grid item xs={12} sm={10}>
          <Box>
            <BooksGroupContainer bookList={groupBooksByCategory.slice(0, displayCount)} title={groupNameInKorean} />
            {groupBooksByCategory.length > displayCount && (
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <IconButton onClick={handleLoadMore} color="primary">
                  <AddIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BooksGroupPage;

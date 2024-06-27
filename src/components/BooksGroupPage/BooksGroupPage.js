import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Drawer, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
  const [selectedPath, setSelectedPath] = useState([]); // 선택된 카테고리 경로 상태
  const isMobile = useMediaQuery('(max-width: 600px)'); // 모바일 여부 확인

  const bookGroup = useParams();

  const totalCategories = [];
  bookList.map((book) => totalCategories.push(book.categoryName));

  useEffect(() => {
    if (bookGroup) {
      dispatch(bookActions.getBookListByGroup(bookGroup.bookGroup));
    }
  }, [bookGroup, dispatch]);

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

  const groupBooksByCategory = groupBooks.filter((book) => book.categoryName.includes(category));

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
              <CategoryList
                totalCategories={totalCategories}
                onCategoryClick={onCategoryClick}
                groupName={groupNameInKorean}
                setSelectedPath={setSelectedPath}
              />
            </Box>
          </Grid>
        )}
        {isMobile && (
          <>
            <Box sx={{ marginLeft: '10px', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={toggleDrawer(true)} color="primary" aria-label="filter">
                <MenuIcon />
              </IconButton>
              <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap', marginLeft: '10px' }}>
                {selectedPath.map((pathItem, index) => (
                  <span key={index}>
                    <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setSelectedPath(selectedPath.slice(0, index + 1))}>
                      {pathItem}
                    </span>
                    {index < selectedPath.length - 1 && ' > '}
                  </span>
                ))}
              </Box>
            </Box>
            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
              <CategoryList
                totalCategories={totalCategories}
                onCategoryClick={onCategoryClick}
                groupName={groupNameInKorean}
                setSelectedPath={setSelectedPath}
              />
            </Drawer>
          </>
        )}
        <Grid item xs={12} sm={10}>
          <Box>
            <BooksGroupContainer bookList={groupBooksByCategory} title={groupNameInKorean} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BooksGroupPage;

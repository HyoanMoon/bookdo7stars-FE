import { Box, Container, Grid, Typography, Tab, Tabs, Button, IconButton } from '@mui/material';
import BookSlider from '../BookSlider/BookSlider';
import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard';
import { AddCircleOutline, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { bookActions } from '../../action/bookActions';
import { useDispatch } from 'react-redux';

const BooksGroupContainer = ({ books, title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [displayCount, setDisplayCount] = useState(12); // 처음에 표시할 책의 수
  // "더보기" 기능
  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 12);
  };

  useEffect(() => {
    setDisplayCount(12);
  }, [title]);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };
  console.log(displayCount);

  const filteredBooks = selectedCategory === '전체' ? books : books.filter((book) => book.categoryName.includes(selectedCategory));

  return (
    <Container
      sx={{
        width: '1400px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 2,
        paddingLeft: '0px',
        paddingRight: '0px',
        backgroundColor: 'red',
      }}>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <Typography variant="h3" component="div" gutterBottom sx={{ width: '400px', height: '60px', fontWeight: 'bold', textAlign: 'center', margin: '0px' }}>
          {title}
        </Typography>
      </Box>
      {/*<Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '20px' }}>*/}
      {/*  <Tabs*/}
      {/*    value={selectedCategory}*/}
      {/*    onChange={handleCategoryChange}*/}
      {/*    aria-label="category tabs"*/}
      {/*    allowScrollButtonsMobile*/}
      {/*    variant="scrollable" // 탭 스크롤 가능*/}
      {/*    indicatorColor="primary" // 선택된 탭의 인디케이터 색상 설정*/}
      {/*    textColor="primary"*/}
      {/*    scrollbuttons="auto"*/}
      {/*    sx={{*/}
      {/*      paddingLeft: '0px',*/}
      {/*      '& .MuiTabs-scrollable': {*/}
      {/*        // 탭의 전체 너비 조정*/}
      {/*        maxWidth: '100%', // 전체 너비 사용*/}
      {/*        width: 'auto', // 자동으로 너비 설정*/}
      {/*      },*/}
      {/*    }}>*/}
      {/*    // 탭 텍스트 색상 설정*/}
      {/*    {categories.map((category) => (*/}
      {/*      <Tab*/}
      {/*        key={category.id}*/}
      {/*        label={category.label}*/}
      {/*        value={category.id}*/}
      {/*        sx={{*/}
      {/*          fontSize: '1rem', // 폰트 사이즈 설정*/}
      {/*          '&.Mui-selected': {*/}
      {/*            fontWeight: 'bold', // 선택된 탭 폰트 볼드 처리*/}
      {/*            borderBottom: '2px solid #608020', // 선택된 탭에 밑줄 스타일*/}
      {/*            transition: 'border-bottom 0.3s ease', // 밑줄에 트랜지션 적용*/}
      {/*          },*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*  </Tabs>*/}
      {/*</Box>*/}
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {filteredBooks.slice(0, displayCount).map((book) => (
            <Grid
              key={book._id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ paddingY: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <BookCard key={book._id} book={book} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ width: '100%' }}>
          {filteredBooks.length > displayCount && (
            <Button onClick={handleLoadMore} variant="outlined" fullWidth endIcon={<AddCircleOutline />} sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
              더보기
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default BooksGroupContainer;

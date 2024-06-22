import { Box, Container, Grid, Typography, Tab, Tabs, Button, IconButton } from '@mui/material';
import BookSlider from '../BookSlider/BookSlider';
import React, { useState } from 'react';
import BookCard from '../BookCard';
import { AddCircleOutline } from '@mui/icons-material';

const BookContainer = ({ books, categories, sx, title }) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const filteredBooks = selectedCategory === '전체' ? books : books.filter((book) => book.categoryName.includes(selectedCategory));

  return (
    <div style={{ ...sx, width: '100%', marginTop: '50px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h3" component="div" gutterBottom sx={{ fontWeight: 'bold', marginTop: '50px', display: 'flex', alignItems: 'center' }}>
          {title}
        </Typography>
        <Button size="large" endIcon={<AddCircleOutline />}>
          더보기
        </Button>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '20px' }}>
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          aria-label="category tabs"
          allowScrollButtonsMobile
          variant="fullWidth" // 탭 너비를 꽉 채우도록 설정
          indicatorColor="primary" // 선택된 탭의 인디케이터 색상 설정
          textColor="primary">
          // 탭 텍스트 색상 설정
          {categories.map((category) => (
            <Tab
              key={category.id}
              label={category.label}
              value={category.id}
              sx={{
                fontSize: '1rem', // 폰트 사이즈 설정
                '&.Mui-selected': {
                  fontWeight: 'bold', // 선택된 탭 폰트 볼드 처리
                  borderBottom: '2px solid #608020', // 선택된 탭에 밑줄 스타일
                  transition: 'border-bottom 0.3s ease', // 밑줄에 트랜지션 적용
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
      <Grid container spacing={2}>
        {filteredBooks.map((book) => (
          <Grid key={book._id} item xs={12} sm={6} md={4} lg={2.4}>
            <BookCard key={book._id} book={book} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BookContainer;

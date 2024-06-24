import React from 'react';
import { Box, Typography, Link, Container, Grid } from '@mui/material';
import MyPageCategory from '../components/MyPageCategory';

const MyPageWishList = () => {
  return (
    <Container>
      <Box p={3}>
        <Grid container mb={1} style={{ fontSize: '15px' }}>
          <Link href="/" underline="hover" color="inherit">
            welcome
          </Link>
          <Typography mr={1} ml={1}>{`>`}</Typography>
          <Link href="/mypage" underline="hover" color="inherit">
            mypage
          </Link>
        </Grid>

        {/* 마이페이지 */}
        <Grid container>
          <Typography variant="h4" gutterBottom>
            마이페이지
          </Typography>
        </Grid>
        <Grid container>
          <Typography variant="subtitle1">userName님 오늘도 즐겁고 행복한 하루 보내세요.</Typography>
        </Grid>

        <Grid container>
          {/* 마이페이지 좌측 카테고리 */}
          <Grid item md={3}>
            <MyPageCategory />
          </Grid>
          {/* 마이페이지 우측 정보 */}
          <Grid item md={9}>
            <Box mt={2} ml={2} mb={4}>
              {/* 광고 짧은 배너 */}
              <Typography style={{ backgroundColor: '#A6BB76', color: 'white' }} mt={2} p={1} border={1} borderRadius={4} align="center">
                구매하신 책, 다 읽으셨다면 정가대비 최대 50% 지급받고 북두칠성에 판매하세요!
              </Typography>

              {/* 위시리스트 */}
              <Typography variant="h6" mt={3}>
                위시리스트
              </Typography>

              {/* 구분선 */}
              <Typography mt={2} mb={2} borderBottom={1} borderColor="grey.400" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MyPageWishList;

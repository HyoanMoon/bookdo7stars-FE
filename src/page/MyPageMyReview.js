import React, { useEffect } from 'react';
import { Box, Typography, Link, Container, Grid, Paper } from '@mui/material';
import MyPageCategory from '../components/MyPageCategory';
import { useDispatch, useSelector } from 'react-redux';
import { commentActions } from '../action/commentAction';

const MyPageMyReview = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { userComment } = useSelector((state) => state.comment);

  // console.log('userComment', userComment);

  const comments = userComment?.comment || [];

  useEffect(() => {
    dispatch(commentActions.getMyComment());
  }, [dispatch]);

  // 중복된 책을 하나로 묶기 위한 작업
  const uniqueBooks = {};
  comments.forEach((review) => {
    if (!uniqueBooks[review.bookId._id]) {
      uniqueBooks[review.bookId._id] = {
        ...review.bookId,
        reviews: [review],
      };
    } else {
      uniqueBooks[review.bookId._id].reviews.push(review);
    }
  });

  // uniqueBooks 객체를 배열로 변환
  const uniqueBookList = Object.values(uniqueBooks);

  return (
    <Container>
      <Box p={3}>
        <Grid container mb={1} style={{ fontSize: '15px' }}>
          <Link href="/" underline="hover" color="inherit">
            welcome
          </Link>
          <Typography mr={1} ml={1}>{`>`}</Typography>
          <Link href="/mypage" underline="hover" color="primary" fontWeight="medium">
            mypage
          </Link>
        </Grid>

        {/* 마이페이지 */}
        <Grid container>
          <Typography variant="h4" gutterBottom fontWeight="medium">
            <Link href="/mypage" color="primary" sx={{ textDecoration: 'none' }}>
              마이페이지
            </Link>
          </Typography>
        </Grid>
        <Grid container>
          <Typography variant="subtitle1">{user?.userName}님 오늘도 즐겁고 행복한 하루 보내세요.</Typography>
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
              <Typography sx={{ backgroundColor: 'primary.main', color: 'white' }} mt={2} p={1} border={1} borderRadius={4} align="center">
                구매하신 책, 다 읽으셨다면 정가대비 최대 50% 지급받고 북두칠성에 판매하세요!
              </Typography>
              {/* 마이리뷰 */}
              <Typography variant="h6" mt={3}>
                마이리뷰
              </Typography>

              {/* 구분선 */}
              <Typography mt={2} mb={2} borderBottom={1} borderColor="grey.400" />

              {/* 나의 리뷰 나열 */}
              {uniqueBookList.map((book) => (
                <Box mb={2} key={book._id}>
                  <Container>
                    <Grid container>
                      <Grid item md={4}>
                        <img src={book.cover} alt="Book Cover" style={{ maxWidth: '100%' }} />
                      </Grid>
                      <Grid item md={8}>
                        <Typography variant="h6">{book.title}</Typography>
                        <Typography sx={{ fontWeight: 'medium' }} style={{ marginTop: '5px', marginBottom: '10px' }} color="primary">
                          {book.author} | {book.pubDate?.slice(0, 10)}
                        </Typography>
                        {book.reviews.map((review) => (
                          <Typography key={review._id}>
                            {review.createdAt?.slice(0, 10)} | {review.content}
                          </Typography>
                        ))}
                      </Grid>
                    </Grid>
                  </Container>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MyPageMyReview;

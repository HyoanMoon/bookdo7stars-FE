import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Link, Tabs, Tab, Container, Grid, TableContainer, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MyPageCategory from '../components/MyPageCategory';
import { useDispatch, useSelector } from 'react-redux';
import { contactActions } from '../action/contactActions';
import InquiryTable from '../components/InquiryTable';
import { orderActions } from '../action/orderActions';
import MyPageWishlistTable from '../components/MyPageWishlistTable';
import MyPageMyReviewTable from '../components/MyPageMyReviewTable';

const MyShoppingPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { user } = useSelector((state) => state.user);
  const { myOrderList } = useSelector((state) => state.order);
  const { userContacts } = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderActions.getMyOrder());
    dispatch(contactActions.getContactsByUser());
  }, [user, dispatch]);

  // console.log('myOrderList', myOrderList);

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
          <Grid item md={9} pl={3}>
            {/* 최근 주문 내역 */}
            <Box mt={2}>
              <Grid sx={{ display: 'flex' }}>
                <Typography variant="h6">최근 주문 내역</Typography>
                <Link ml={1} mt={1} href="/mypage/order-list" underline="hover" color="inherit">
                  <Typography variant="subtitle2" color="primary">
                    더보기
                  </Typography>
                </Link>
              </Grid>
              <Table>
                {/* 테이블 헤드 */}
                <TableHead>
                  <TableCell>주문번호</TableCell>
                  <TableCell>주문일자</TableCell>
                  <TableCell>주문내역</TableCell>
                  <TableCell>주문상태</TableCell>
                  <TableCell>비고</TableCell>
                </TableHead>
                {/* 테이블 바디 */}
                <TableBody>
                  {myOrderList.length > 0 &&
                    myOrderList?.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item?.orderNum}</TableCell>
                        <TableCell>{item?.createdAt.slice(0, 10)}</TableCell>
                        <TableCell>
                          {item?.items
                            ?.map((item) => item.bookId?.title)
                            .join(', ')
                            .slice(0, 20)}
                          {item?.items?.map((item) => item.bookId?.title).join(', ').length > 20 ? '...' : ''}
                        </TableCell>
                        <TableCell>{item?.status}</TableCell>
                        <TableCell>{''}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
            {/* 광고 짧은 배너 */}
            <Typography sx={{ backgroundColor: 'primary.main', color: 'white' }} mt={2} p={1} border={1} borderRadius={4} align="center">
              구매하신 책, 다 읽으셨다면 정가대비 최대 50% 지급받고 북두칠성에 판매하세요!
            </Typography>

            {/* 1:1 문의 */}
            {/* <Box mt={4} p={2} border={1} borderRadius={4} borderColor="grey.400"> */}
            <Box>
              <Typography variant="h6" mt={5} borderBottom={1} borderColor="grey.400">
                나의 1:1 문의
              </Typography>
              {userContacts.length === 0 ? (
                <Typography mt={1} variant="subtitle1">
                  문의 사항이 없습니다.
                </Typography>
              ) : (
                <Box my={4}>
                  <InquiryTable inquiries={userContacts} />
                </Box>
              )}
            </Box>

            {/* 위시리스트/ 나의 리뷰 */}
            <Box mt={5}>
              <Tabs value={tabIndex} onChange={(event, newIndex) => setTabIndex(newIndex)} selectionFollowsFocus>
                <Tab label="위시리스트" />
                <Tab label="마이리뷰" />
              </Tabs>
              {/* {tabIndex === 0 && <Typography mt={1}>찜한 상품이 없습니다.</Typography>}
              {tabIndex === 1 && <Typography mt={1}>등록한 리뷰가 없습니다.</Typography>} */}
              {tabIndex === 0 && <MyPageWishlistTable />}
              {tabIndex === 1 && <MyPageMyReviewTable />}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MyShoppingPage;

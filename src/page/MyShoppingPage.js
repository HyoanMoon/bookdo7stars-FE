import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Link, Tabs, Tab, Container, Grid } from '@mui/material';
import React, { useState } from 'react';

const MyShoppingPage = () => {
  const userLevel = ['브론즈', '실버', '골드', '플래텸'];
  const recentOrderHistory = [{ _id: '12345', createdAt: '2024-06-23', orderNum: '123456', bookTitle: 'BookTitle', status: 'Delivered', none: '' }];
  const myShoppingList = [
    { list: '주문내역/배송조회', link: '#' },
    { list: '반품/교환 신청 및 조회', link: '#' },
    { list: '취소 주문 내역', link: '#' },
    { list: '리뷰 관리', link: '#' },
    { list: '찜한 도서', link: '#' },
  ];
  const myInfoList = [
    { list: '개인정보 수정', link: '#' },
    { list: '이벤트 당첨 내역', link: '#' },
    { list: '회원 탈퇴', link: '#' },
  ];

  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Container>
      <Box p={3}>
        <Grid container>
          <Typography variant="h4" gutterBottom>
            마이페이지
          </Typography>
        </Grid>
        <Grid container>
          <Typography variant="subtitle1">userName님 오늘도 즐겁고 행복한 하루 보내세요.</Typography>
        </Grid>
        <Grid container>
          <Grid item md={3}>
            {/* 유저 등급 */}
            <Grid container>
              <Box mt={4} p={2} border={1} borderRadius={4} borderColor="grey.400">
                <Typography variant="h6">나의 북두칠성 등급</Typography>
                <Box display="flex" mt={2}>
                  {userLevel.length > 0
                    ? userLevel?.map((level, index) => (
                        <Box
                          key={index}
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          mr={2}
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Typography variant="caption">{level}</Typography>
                        </Box>
                      ))
                    : 'null'}
                </Box>
              </Box>
            </Grid>
            {/* 나의 쇼핑 */}
            <Grid container>
              <Box mt={2} p={2} pl={3} pr={9} border={1} borderRadius={4} borderColor="grey.400">
                <Typography color="primary">나의 쇼핑</Typography>
                <Box>
                  {myShoppingList?.map((item, index) => (
                    <Box m={1} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <Link href={item.link} underline="hover" color="inherit" key={index}>
                        {item.list}
                      </Link>
                    </Box>
                  ))}
                </Box>
                {/* </Box> */}
                <Typography mt={2} mb={2} borderBottom={1} borderColor="grey.400" />

                {/* 나의 정보 */}
                {/* <Box mt={4} p={2} border={1} borderRadius={4} borderColor="grey.400"> */}
                <Typography color="primary">나의 정보</Typography>
                <Box>
                  {myInfoList?.map((item, index) => (
                    <Box m={1}>
                      <Link href={item.link} underline="hover" color="inherit" key={index}>
                        {item.list}
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid item md={9} pl={3}>
            {/* 최근 주문 내역 */}
            <Box mt={4}>
              <Typography>최근 주문 내역</Typography>
              <Table>
                {/* 테이블 헤드 */}
                <TableHead>
                  <TableCell>주문 일자</TableCell>
                  <TableCell>주문 번호</TableCell>
                  <TableCell>주문 내역</TableCell>
                  <TableCell>주문 상태</TableCell>
                  <TableCell>비고</TableCell>
                </TableHead>
                {/* 테이블 바디 */}
                <TableBody>
                  {recentOrderHistory?.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.createdAt}</TableCell>
                      <TableCell>{item.orderNum}</TableCell>
                      <TableCell>{item.bookTitle}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.none}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            {/* 광고 짧은 배너 */}
            <Typography style={{ backgroundColor: '#89a54f', color: 'white' }} mt={1} p={1} border={1} borderRadius={4} align="center">
              구매하신 책, 다 읽으셨다면 정가대비 최대 50% 지급받고 북두칠성에 판매하세요!
            </Typography>
            {/* 1:1 문의 */}
            {/* <Box mt={4} p={2} border={1} borderRadius={4} borderColor="grey.400"> */}
            <Box>
              <Typography mt={4} borderBottom={1} borderColor="grey.400">
                나의 1:1 문의
              </Typography>
              <Typography mt={1} variant="subtitle1">
                등록하신 1:1이 없습니다.
              </Typography>
            </Box>
            {/* 위시리스트/ 나의 리뷰 */}
            <Box mt={3}>
              {/* <Typography>위시리스트 / 마이리뷰</Typography> */}
              <Tabs value={tabIndex} onChange={(event, newIndex) => setTabIndex(newIndex)} selectionFollowsFocus>
                <Tab label="위시리스트" />
                <Tab label="마이리뷰" />
              </Tabs>
              {tabIndex === 0 && <Typography mt={1}>찜한 상품이 없습니다.</Typography>}
              {tabIndex === 1 && <Typography mt={1}>등록한 리뷰가 없습니다.</Typography>}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MyShoppingPage;

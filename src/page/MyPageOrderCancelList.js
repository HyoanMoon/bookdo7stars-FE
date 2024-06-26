import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
  Container,
  Grid,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import MyPageCategory from '../components/MyPageCategory';
import { useSelector } from 'react-redux';

const MyPageOrderCancelList = () => {
  const { user } = useSelector((state) => state.user);
  const [recentChecked, setRecentChecked] = useState(false);
  const [oldChecked, setOldChecked] = useState(false);

  const handleRecentChange = (event) => {
    setRecentChecked(event.target.checked);
    // 최근순 ~~
  };

  const handleOldChange = (event) => {
    setOldChecked(event.target.checked);
    // 오래된순~~
  };

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
              <Grid container mb={2}>
                <Grid item xs={12}>
                  {/* <Typography variant="body1" mb={1}>
                    ► 취소 주문 내역
                  </Typography> */}
                  <Typography variant="subtitle2" pl={1} sx={{ fontWeight: 'bold' }}>
                    {'취소 주문 재접수 : 해당주문의 <다시 주문> 을 누르신 후, 해당 도서 페이지에서 새로 구매하실 수 있습니다.'}
                  </Typography>
                  <Typography variant="subtitle2" pl={1}>
                    입금확인 이전 취소된 주문인 경우, 고객센터로 결제정보를 알려주셔야만 입금확인 후 환불이 가능합니다.
                  </Typography>
                </Grid>
              </Grid>

              {/* 정렬기준 */}
              {/* 데이터 바인딩 해보고 기준 하나 삭제하기 */}
              <FormGroup style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <FormControlLabel
                  control={<Checkbox checked={recentChecked} onChange={handleRecentChange} />}
                  label={<Typography variant="body2">최근순</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox checked={oldChecked} onChange={handleOldChange} />}
                  label={<Typography variant="body2">오래된순</Typography>}
                />
              </FormGroup>

              {/* 주문 내역 테이블 */}
              <Typography variant="h6">취소한 주문 내역</Typography>
              <Box>
                <Table>
                  {/* 테이블 헤드 */}
                  <TableHead>
                    <TableCell>주문 일시</TableCell>
                    <TableCell>주문 번호</TableCell>
                    <TableCell>주문 내역</TableCell>
                    <TableCell>다시 주문</TableCell>
                  </TableHead>
                  {/* 테이블 바디 */}
                  <TableBody>
                    {/* {recentOrderHistory?.map((item) => ( */}
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <Button variant="contained" color="secondary" fullWidth sx={{ ml: 1, width: '10ch', height: '20px', borderRadius: '5px' }}>
                          <Typography variant="subtitle2" color="white">
                            이동
                          </Typography>
                        </Button>
                      </TableCell>
                    </TableRow>
                    {/* ))} */}
                  </TableBody>
                </Table>
              </Box>

              {/* 안내 사항 */}
              <Box mt={1}>
                <Typography variant="subtitle2">{'- 주문내역에서 주문취소를 선택한 내역이 확인됩니다.'}</Typography>
                <Typography variant="subtitle2">{'- 이동을 클릭하시면 취소한 도서 상품을 확인 하실수 있습니다.'}</Typography>
                <Typography variant="subtitle2">
                  {'- 주문 취소한 후 취소 대금은 신용카드 승인취소 또는 예치금으로 환급되며 이후 주문 결제시 사용 가능합니다.'}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MyPageOrderCancelList;

import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Link, Container, Grid, Button } from '@mui/material';
import MyPageCategory from '../components/MyPageCategory';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyPageOrderClaimList = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleClaim = () => {
    navigate('');
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
              <Grid container alignItems="center" mb={2}>
                <Typography variant="subtitle2">구매하셨던 상품의 반품/교환/추가배송 신청 및 내역을 조회하실 수 있습니다.</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ ml: 1, width: '25ch', height: '30px', borderRadius: '20px' }}
                  onClick={handleClaim}>
                  <Typography variant="subtitle2" color="white">
                    반품/교환 신청하기
                  </Typography>
                </Button>
              </Grid>

              {/* 주문 내역 테이블 */}
              <Typography variant="h6">반품/교환 신청내역</Typography>
              <Box>
                <Table>
                  {/* 테이블 헤드 */}
                  <TableHead>
                    <TableCell>접수 일자</TableCell>
                    <TableCell>주문 번호</TableCell>
                    <TableCell>주문 내역</TableCell>
                    <TableCell>신청 내용</TableCell>
                    <TableCell>처리 상태</TableCell>
                  </TableHead>
                  {/* 테이블 바디 */}
                  <TableBody>
                    {/* {recentOrderHistory?.map((item) => ( */}
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    {/* ))} */}
                  </TableBody>
                </Table>
              </Box>

              {/* 안내 사항 */}
              <Box mt={3} border={1} borderColor="grey.300" p={2} borderRadius={1} maxWidth={800}>
                <Typography variant="body1">
                  <Typography variant="subtitle2">1. 신청안내</Typography>
                  <ul>
                    <li>
                      <Typography variant="body2">{'출고완료 후 10일 이내 주문 상품에 대해 신청이 가능합니다.'}</Typography>
                    </li>
                    <li>
                      <Typography variant="body2" color="red">
                        {'다른 상품으로의 교환은 불가합니다. [반품] 후 새로 주문해주세요.'}
                      </Typography>
                    </li>
                  </ul>

                  <Typography variant="subtitle2">2. 유의사항</Typography>
                  <ul>
                    <li>
                      <Typography variant="body2">
                        {
                          '사서함, 군부대, 도서산간 지역 등은 지정회사 택배로 반품이 불가능하오니 신청 후 상품을 직접 반품해주시기 바랍니다. (상품파손, 오배송의 경우 반품 배송비는 고객센터로 연락 주시면 환불해 드리겠습니다.)'
                        }
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" color="red">
                        {'수령 전 부분 반품 접수 시 상품 전체가 반송되오니 수령 후 접수해 주세요.'}
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">{'반품 신청하신 상품 또는 사은품을 일부라도 반송하지 않는 경우 환불이 보류될 수 있습니다.'}</Typography>
                    </li>
                    <li>
                      <Typography variant="body2">{'분철상품의 경우, 물리적 편집 작업 후 출고되는 상품으로 반품/교환이 불가합니다.'}</Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        {
                          '세트 상품의 경우 낱권 교환이 불가합니다. 배송 중 반송, 접수 없이 임의 반송된 내역의 처리는 반드시 당사 물류센터 도착 후 일주일 내 연락 부탁드립니다.'
                        }
                      </Typography>
                    </li>
                  </ul>

                  <Typography variant="subtitle2">3. 환불안내</Typography>
                  <ul>
                    <li>
                      <Typography variant="body2">
                        {'배송비추가 : 무료배송 기준이 아닌 경우 추가 배송비가 청구됩니다. 여러 박스로 반송하는 경우 박스당 배송비가 청구됩니다.'}
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">{'상품권 소멸 : 유효기간이 지난 상품권은 자동 소멸됩니다.'}</Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        {
                          '쿠폰 환불 : 할인 조건에 따라 쿠폰이 복구되며, 유효기간이 지난 경우 소멸됩니다. 궁금하신 사항은 1:1 친절상담을 이용하시면 친절히 답변해드리겠습니다.'
                        }
                      </Typography>
                    </li>
                  </ul>

                  <Typography variant="subtitle2">4. 반품, 교환 상품 발송 시 필요사항</Typography>
                  <ul>
                    <li>
                      <Typography variant="body2" color="red">
                        {'박스나 봉투에 포장 후 주문번호, 이름을 기재해주세요.'}
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">{'반품주소 : (10846) 경기도 파주시 탄현면 월롱산로 294-58 북두칠성 물류센터 내 반송담당자 앞'}</Typography>
                    </li>
                  </ul>
                </Typography>
              </Box>

              {/* 추가 문의 사항 */}
              <Typography variant="subtitle2" gutterBottom mt={3} ml={1} color="red">
                {'아래의 경우는 1:1문의나 고객만족센터(1544-3800)로 문의해주세요.'}
              </Typography>
              <ul>
                <li>
                  <Typography variant="body2">{'접수한 내역이 취소 또는 변경이 불가능한 경우'}</Typography>
                </li>
                <li>
                  <Typography variant="body2">{'업체 배송 상품/직수입 외서/ 해외 배송 주문'}</Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    {'매장에서 픽업 서비스로 수령받은 상품은 매장에서 교환/반품/환불 처리는 불가하며, 고객센터 연락 후 택배사를 이용해야 합니다.'}
                  </Typography>
                </li>
              </ul>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MyPageOrderClaimList;

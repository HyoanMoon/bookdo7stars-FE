import React, { useEffect, useState } from 'react';
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
  Select,
  MenuItem,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import MyPageCategory from '../components/MyPageCategory';
import { format, isValid, startOfDay, endOfDay } from 'date-fns';
import DateFilter from '../components/DateFilter';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../action/orderActions';

const MyPageOrderList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { myOrderList } = useSelector((state) => state.order);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('orderAll');

  const [searchQuery, setSearchQuery] = useState({});

  const [recentChecked, setRecentChecked] = useState(false);
  const [oldChecked, setOldChecked] = useState(false);
  const [sortOrder, setSortOrder] = useState('recent');

  console.log('myOrderList', myOrderList);
  console.log('user', user);

  useEffect(() => {
    dispatch(orderActions.getMyOrder());
  }, [dispatch]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (startDate && endDate && isValid(new Date(startDate)) && isValid(new Date(endDate))) {
      const formattedStartDate = startOfDay(new Date(startDate));
      const formattedEndDate = endOfDay(new Date(endDate));

      setSearchQuery({
        ...searchQuery,
        startDate: format(formattedStartDate, 'yyyy-MM-dd HH:mm:ss'),
        endDate: format(formattedEndDate, 'yyyy-MM-dd HH:mm:ss'),
      });
    } else {
      setSearchQuery({ ...searchQuery, startDate: null, endDate: null });
    }
  };

  const handleRecentChange = (event) => {
    setRecentChecked(event.target.checked);
    setOldChecked(!event.target.value);
    setSortOrder('recent');
  };
  const handleOldChange = (event) => {
    setOldChecked(event.target.checked);
    setRecentChecked(!event.target.value);
    setSortOrder('old');
  };
  const sortedMyOrderList = [...myOrderList].sort((a, b) => {
    if (sortOrder === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

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
              <Typography variant="subtitle2" ml={1} mb={1}>
                최근 5년간 주문내역을 조회하실 수 있습니다.
              </Typography>
              <Grid container border={4} borderRadius={4} borderColor="#A6BB76" p={3}>
                <Grid container>
                  <DateFilter startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                </Grid>
                {/* 상세 조건 검색 */}
                {/* <InputLabel sx={{ height: '4ch' }}>상세 조건</InputLabel> */}
                <Grid container spacing={2} mt={1}>
                  <Grid item xs={12} md={2}>
                    <Select value={selectedOption} onChange={(event) => setSelectedOption(event.target.value)} fullWidth sx={{ height: '40px' }}>
                      <MenuItem value="orderAll">주문 전체</MenuItem>
                      <MenuItem value="orderNum">주문 번호</MenuItem>
                      <MenuItem value="orderBookTitle">도서명</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      label={selectedOption}
                      variant="outlined"
                      fullWidth
                      value={searchQuery[selectedOption] || ''}
                      placeholder="내용을 입력해주세요."
                      InputLabelProps={{ shrink: true, style: { top: 0 } }}
                      InputProps={{ style: { height: '40px', padding: '0 14px' } }}
                      sx={{ width: '150px', height: '40px' }}
                      onChange={(event) => setSearchQuery({ ...searchQuery, [selectedOption]: event.target.value })}
                    />
                  </Grid>

                  {/* 검색 버튼 */}
                  <Grid item xs={12} md={8}>
                    <Button variant="contained" color="primary" fullWidth sx={{ ml: 3, width: '10ch', height: '40px' }} onCLick={handleSearch}>
                      조회
                    </Button>
                    <Button variant="contained" color="primary" fullWidth sx={{ ml: 1, width: '10ch', height: '40px' }}>
                      초기화
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              {/* <Typography mt={2} mb={2} borderBottom={1} borderColor="grey.400" /> */}

              {/* 광고 짧은 배너 */}
              <Typography style={{ backgroundColor: '#A6BB76', color: 'white' }} mt={2} p={1} border={1} borderRadius={4} align="center">
                구매하신 책, 다 읽으셨다면 정가대비 최대 50% 지급받고 북두칠성에 판매하세요!
              </Typography>

              {/* 정렬기준 */}
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
              <Typography variant="h6">주문 내역/배송 상태</Typography>
              <Box>
                <Table>
                  {/* 테이블 헤드 */}
                  <TableHead>
                    <TableCell>주문 번호</TableCell>
                    <TableCell>주문 일자</TableCell>
                    <TableCell>주문 내역</TableCell>
                    <TableCell>주문 금액/수량</TableCell>
                    <TableCell>주문 상태</TableCell>
                  </TableHead>
                  {/* 테이블 바디 */}
                  <TableBody>
                    {sortedMyOrderList?.length > 0 &&
                      sortedMyOrderList?.map((item, index) => (
                        <TableRow key={item._id}>
                          <TableCell>{item.orderNum}</TableCell>
                          <TableCell>{item.createdAt.slice(0, 10)}</TableCell>
                          {/* <TableCell>{item.items.map((book) => book.bookId.title).join('.')}</TableCell> */}
                          <TableCell>{item.items[0].bookId.title}</TableCell>
                          <TableCell>{item.totalPrice}</TableCell>
                          <TableCell>{item.status}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>

              <Typography variant="subtitle2" mt={2}>
                - 발송 전 주문은 주문상세내역에서 주문취소, 배송 주소 변경(국내배송만 해당) 이 가능합니다.
              </Typography>
              <Typography variant="subtitle2">- 주문번호를 클릭하시면 주문상세내역을 확인하실수 있습니다.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MyPageOrderList;

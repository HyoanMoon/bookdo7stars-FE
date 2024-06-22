import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Select, MenuItem, InputLabel } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { subDays } from 'date-fns';

const AdminPageOrderSearchBox = ({ searchQuery, setSearchQuery }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('orderID');

  const handleDateRange = (range) => {
    const today = new Date();
    let start, end;
    switch (range) {
      case 'today':
        start = today;
        end = today;
        break;
      case 'week':
        start = subDays(today, 7);
        end = today;
        break;
      case 'month':
        start = subDays(today, 30);
        end = today;
        break;
      case '3months':
        start = subDays(today, 90);
        end = today;
        break;
      default:
        start = null;
        end = null;
    }
    setStartDate(start);
    setEndDate(end);
  };

  const onCheckEnter = (event, option) => {
    if (event && event.key === 'Enter') {
      event.preventDefault();
      setSearchQuery({ ...searchQuery, [option]: event.target.value });
    }
  };

  const handleSearch = (event, option) => {
    event.preventDefault();
    setSearchQuery({ ...searchQuery, [option]: event.target.value });
    console.log('searchQuery', searchQuery);
    console.log('startDate', startDate);
  };

  return (
    <Box mb={4}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={2}>
          {/* 주문 목록 조회 */}
          <InputLabel sx={{ mt: 2, height: '4ch' }}>조회 기간</InputLabel>
          {/* 날짜 범위 버튼 검색 */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Grid container>
                <Grid item xs={3} md={3}>
                  <Button variant="outlined" fullWidth onClick={() => handleDateRange('today')}>
                    {/* <Button variant="outlined" fullWidth sx={{ height: 55 }} onClick={() => handleDateRange('today')}> */}
                    오늘
                  </Button>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Button variant="outlined" fullWidth onClick={() => handleDateRange('week')}>
                    일주일
                  </Button>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Button variant="outlined" fullWidth onClick={() => handleDateRange('month')}>
                    일개월
                  </Button>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Button variant="outlined" fullWidth onClick={() => handleDateRange('3months')}>
                    삼개월
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container>
                {/* 날짜 지정 검색 */}
                <Grid item xs={12} sm={4}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* 세부 주문 검색 */}
          <InputLabel sx={{ height: '4ch' }}>상세 조건</InputLabel>
          <Grid container>
            <Grid item xs={12} sm={2}>
              <Select value={selectedOption} onChange={(event) => setSelectedOption(event.target.value)} fullWidth>
                <MenuItem value="orderID">주문 번호</MenuItem>
                <MenuItem value="userEmail">구매자</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label={selectedOption}
                variant="outlined"
                fullWidth
                onKeyPress={onCheckEnter}
                value={searchQuery[selectedOption] || ''}
                placeholder="값을 입력해주세요."
                // sx={{ height: '10px', width: '20ch', '& input': { height: '7px' } }}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => setSearchQuery({ ...searchQuery, [selectedOption]: event.target.value })}
              />
            </Grid>

            {/* 검색 버튼 */}
            <Grid item xs={12} sm={8}>
              <Button variant="contained" color="primary" fullWidth sx={{ ml: 1, width: '30ch', height: '55px' }} onClick={handleSearch}>
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Box>
  );
};

export default AdminPageOrderSearchBox;

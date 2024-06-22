import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Select, MenuItem, InputLabel } from '@mui/material';
import { subDays, format } from 'date-fns';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const AdminPageOrderSearchBox = ({ searchQuery, setSearchQuery, resetSearch }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('orderID');

  const handleDateRange = (range) => {
    const today = new Date();
    let start, end;
    switch (range) {
      case 'today':
        start = new Date();
        end = new Date();
        break;
      case 'week':
        start = subDays(today, 7);
        end = new Date();
        break;
      case 'month':
        start = subDays(today, 30);
        end = new Date();
        break;
      case '3months':
        start = subDays(today, 90);
        end = new Date();
        break;
      default:
        start = null;
        end = null;
    }
    setStartDate(start);
    setEndDate(end);
  };

  // const onCheckEnter = (event, option) => {
  //   if (event && event.key === 'Enter') {
  //     event.preventDefault();
  //     setSearchQuery({ ...searchQuery, [option]: event.target.value });
  //   }
  // };

  const formattedStartDate = startDate ? format(startDate, 'yyyy-MM-dd') : null;
  const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : null;
  const handleSearch = (event, option) => {
    event.preventDefault();
    setSearchQuery({ ...searchQuery, [option]: event.target.value, startDate: formattedStartDate, endDate: formattedEndDate });
  };

  return (
    <Box ml={2} mb={4}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={2}>
          {/* 주문 목록 조회 */}
          <InputLabel sx={{ mt: 2, height: '4ch' }}>조회 기간</InputLabel>
          {/* 날짜 범위 버튼 검색 */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Grid container mt={1}>
                <Grid item xs={3} md={3}>
                  <Button variant="outlined" fullWidth onClick={() => handleDateRange('today')}>
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
              <Grid container spacing={2}>
                {/* 날짜 지정 검색 */}
                <Grid item xs={12} sm={4}>
                  <DesktopDatePicker
                    label="Start Date"
                    value={startDate}
                    fullWidth
                    onChange={(newValue) => setStartDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DesktopDatePicker
                    label="End Date"
                    value={endDate}
                    fullWidth
                    onChange={(newValue) => setEndDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* 세부 주문 검색 */}
          <InputLabel sx={{ height: '4ch' }}>상세 조건</InputLabel>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              <Select
                value={selectedOption}
                onChange={(event) => {
                  setSelectedOption(event.target.value);
                }}
                fullWidth>
                <MenuItem value="orderID">주문 번호</MenuItem>
                <MenuItem value="userEmail">구매자</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label={selectedOption}
                variant="outlined"
                fullWidth
                // onKeyPress={onCheckEnter}
                value={searchQuery[selectedOption] || ''}
                placeholder="값을 입력해주세요."
                // sx={{ height: '10px', width: '20ch', '& input': { height: '7px' } }}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => setSearchQuery({ ...searchQuery, [selectedOption]: event.target.value })}
              />
            </Grid>

            {/* 검색 버튼 */}
            <Grid item xs={12} sm={8} spacing={2}>
              <Button variant="contained" color="primary" fullWidth sx={{ ml: 1, width: '30ch', height: '55px' }} onClick={handleSearch}>
                Search
              </Button>
              <Button variant="contained" color="primary" fullWidth sx={{ ml: 1, width: '30ch', height: '55px' }} onClick={resetSearch}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Box>
  );
};

export default AdminPageOrderSearchBox;

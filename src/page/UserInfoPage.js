import React, { useState } from 'react';
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userActions';

const UserInfoPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [sensitiveInfo, setSensitiveInfo] = useState(false); // 추가된 상태
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleGoToLogout = () => {
    navigate('/');
    dispatch(userActions.logout());
  };
  const handleGoToMyPage = () => {
    navigate('/mypage');
  };

  const handleSensitiveInfo = () => {
    setSensitiveInfo(!sensitiveInfo);
  };

  const coverName = (value) => {
    if (!value) return '';
    const atIndex = value.indexOf('@');
    if (atIndex === -1) return value.replace(/.(?=.{1,}$)/g, '*'); // 이메일 주소 형식이 아닌 경우
    const maskedPart = value.slice(1, atIndex).replace(/./g, '*');
    return value[0] + maskedPart + value.slice(atIndex);
  };

  const handleUserInfoChange = () => {
    dispatch(userActions.userInfoChange());
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', marginTop: '10px' }}>
      <Container align="center">
        {/* 상단 */}
        <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid item sx={4} md={4}>
            북두칠성 로고
          </Grid>
          <Grid item sx={4} md={4}>
            <Typography variant="h6">회원정보</Typography>
          </Grid>
          <Grid item sx={4} md={4}>
            <Button variant="contained" color="secondary" onClick={handleGoToLogout}>
              로그아웃
            </Button>
            <Button variant="contained" color="secondary" onClick={handleGoToMyPage}>
              마이페이지
            </Button>
          </Grid>
        </Grid>

        {/* 하단 */}
        <Grid mt={3} p={7} border={1} borderRadius={1} borderColor="grey.200" sx={{ backgroundColor: '#ffffff' }}>
          <Grid
            p={1}
            mb={3}
            border={1}
            borderRadius={1}
            borderColor="grey.200"
            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#f8f9fa' }}>
            <Grid align="left">
              <Typography variant="subtitle2">* 표시로 가려져 보이는 정보를 확인 및 수정하시려면 [숨은 정보 해제] 버튼을 눌러주시기 바랍니다.</Typography>
            </Grid>
            <Button variant="contained" color="secondary" onClick={handleSensitiveInfo}>
              {sensitiveInfo ? '숨은 정보 숨기기' : '숨은 정보 해제'}
            </Button>
          </Grid>

          <Typography variant="h6" align="left" mb={2}>
            전체정보
          </Typography>
          <Box border={1} borderRadius={1} borderColor="grey.200">
            {/* 이메일, 이름, 비밀번호, 주소, 전화번호 */}
            <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>이메일</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={sensitiveInfo ? user?.email : coverName(user?.email)}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>이름</TableCell>
                    <TableCell>
                      <Grid container spacing={2}>
                        <Grid item xs={9}>
                          <TextField
                            fullWidth
                            value={sensitiveInfo ? user?.userName : coverName(user?.userName)}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="contained" color="secondary">
                            이름변경
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>비밀번호</TableCell>
                    <TableCell>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="비밀번호"
                        />
                      </FormControl>
                      <Button variant="contained" color="secondary" sx={{ marginTop: '10px' }}>
                        비밀번호 변경
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>주소</TableCell>
                    <TableCell>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <TextField fullWidth value={user?.shipTo?.zip} />
                        </Grid>
                        {/* <Grid item xs={3}>
                          <Button variant="contained" color="secondary">
                            주소찾기
                          </Button>
                        </Grid> */}
                        <Grid item xs={12} sx={{ marginTop: '10px' }}>
                          <TextField
                            fullWidth
                            value={user?.shipTo?.address}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          {' '}
                          <Typography variant="body2">정확하고 빠른 배송을 위해 입력된 주소를 확인하시고 업데이트해 주시기 바랍니다.</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>전화번호</TableCell>
                    <TableCell>
                      <Grid container spacing={2}>
                        <Grid item xs={9}>
                          <TextField
                            id="outlined-optional"
                            label="optional field"
                            fullWidth
                            value={sensitiveInfo ? user?.contact : coverName(user?.contact)}
                            InputProps={{
                              optional: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="contained" color="secondary">
                            수정
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid m={5}>
          <Button variant="contained" color="secondary" onClick={handleUserInfoChange}>
            회원정보 수정
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default UserInfoPage;

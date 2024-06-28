import React, { useState } from 'react';
import { Box, Typography, Link, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const MyPageCategory = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const userLevel = ['bronze', 'silver', 'gold', 'platinum'];
  const [openPopup, setOpenPopup] = useState(false);

  const handleEventClick = () => {
    setOpenPopup(true);
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const myShoppingList = [
    { list: '주문내역/배송조회', link: '/mypage/order-list' },
    { list: '반품/교환 신청 및 조회', link: '/mypage/order-claim-list' },
    { list: '취소 주문 내역', link: '/mypage/order-cancel-list' },
    { list: '리뷰 관리', link: '/mypage/my-review' },
    { list: '찜한 도서', link: '/mypage/wishlist' },
  ];
  const myInfoList = [
    { list: '개인정보 수정', link: '/member/confirm-password' },
    { list: '이벤트 당첨 내역', action: handleEventClick },
    { list: '회원 탈퇴', link: '/member/account-deletion' },
  ];

  return (
    <>
      {/* 유저 등급 */}
      <Grid container>
        <Box mt={2} p={2} border={1} borderRadius={4} borderColor="grey.400">
          <Typography variant="h6">나의 북두칠성 등급</Typography>
          <Box display="flex" mt={2}>
            {userLevel.length > 0
              ? userLevel?.map((level, index) => (
                  <Box
                    key={index}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mr={1.5}
                    sx={{
                      width: 45,
                      height: 45,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: user?.level === level ? '#3d643d' : '#f0f0f0',
                    }}>
                    <Typography variant="subtitle2" color="white">
                      {level}
                    </Typography>
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
          <Box mb={2}>
            {myInfoList?.map((item, index) => (
              <Box m={1} key={index}>
                {item.link ? (
                  <Link href={item.link} underline="hover" color="inherit">
                    {item.list}
                  </Link>
                ) : (
                  <Typography variant="body1" color="inherit" sx={{ cursor: 'pointer' }} onClick={item.action}>
                    {item.list}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ width: '20ch', height: '30px', borderRadius: '10px' }}
            onClick={() => navigate('/contact')}>
            <Typography variant="subtitle2">1:1 문의</Typography>
          </Button>
        </Box>
      </Grid>

      {/* 이벤트 당첨 내역 팝업 */}
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>준비 중인 서비스입니다.</DialogTitle>
        <DialogContent>
          <DialogContentText>죄송합니다. 이벤트 당첨 내역 서비스는 준비 중입니다.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyPageCategory;

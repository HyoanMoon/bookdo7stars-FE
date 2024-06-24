import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        padding: 2,
      }}>
      <Typography variant="h1" component="div" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" component="div" gutterBottom>
        페이지를 찾을 수 없습니다.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        홈으로 이동
      </Button>
    </Box>
  );
};
export default NotFoundPage;

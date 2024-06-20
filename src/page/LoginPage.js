import React, { useEffect, useState } from 'react';
import { Container, FormControl, Button, TextField, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../action/userActions';
import { useDispatch, useSelector } from 'react-redux';
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleLogin } from '@react-oauth/google';
import '../App.css';

// import KakaoIcon from 'path-to-kakao-icon';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

const buttonStyle = {
  backgroundColor: '#4285f4',
  color: '#ffffff',
  border: 'none',
  padding: '10px 15px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  borderRadius: '4px',
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    const payload = { email: email, password: password };
    dispatch(userActions.loginWithEmail(payload));
  };

  const handleGoogleLogin = async (googleData) => {
    console.log('구글로그인클릭!');
    dispatch(userActions.loginWithGoogle(googleData.credential));
  };

  // const handleGoogleSuccess = (googleData) => {
  //   console.log('Google login successful:', googleData);
  //   const token = googleData.credential;
  //   dispatch(userActions.loginWithGoogle(token));
  // };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl margin="normal" required fullWidth>
            <TextField label="Email Address" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Button fullWidth variant="outlined" color="primary" sx={{ mt: 1, mb: 2 }} onClick={() => navigate('/register')}>
            Go to Register
          </Button>
          {/* 구글로그인 시작 */}
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 1, mb: 2 }}>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {}}
              render={(renderProps) => (
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 1, mb: 2 }}
                  startIcon={<GoogleIcon />}
                  onClick={renderProps.handleGoogleLogin}></Button>
              )}
            />
          </Box>
          {/* <Button fullWidth variant="outlined" color="primary" sx={{ mt: 1, mb: 2 }} startIcon={<GoogleIcon />} onClick={handleGoogleLogin}> */}
          {/* <Button fullWidth variant="outlined" color="primary" sx={{ mt: 1, mb: 2 }} startIcon={<GoogleIcon />} onSuccess={handleGoogleSuccess}> */}
          {/* Sign in with Google */}
          {/* </Button> */}
          {/* 구글로그인 끝*/}
          <Button fullWidth variant="outlined" color="primary" sx={{ mt: 1, mb: 2 }} startIcon={<GitHubIcon />} onClick={() => handleOAuth('GitHub')}>
            Sign in with GitHub
          </Button>
          <Button fullWidth variant="outlined" color="primary" sx={{ mt: 1, mb: 2 }} startIcon={<FacebookIcon />} onClick={() => handleOAuth('Kakao')}>
            Sign in with Facebook
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;

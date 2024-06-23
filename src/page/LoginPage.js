import React, { useEffect, useState } from 'react';
import { Container, FormControl, Button, TextField, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userActions';
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
// import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import '../App.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { email, password };
    dispatch(userActions.loginWithEmail(payload));
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (googleData) => dispatch(userActions.loginWithGoogle(googleData.access_token)),
    // scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
  });

  // const handleGoogleLogin = (googleData) => {
  //   dispatch(userActions.loginWithGoogle(googleData.credential));
  // };

  const handleKakaoLogin = () => {
    console.log('[카카오버튼 클릭]');
    const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
    const REDIRECT_KAKAO_CALLBACK = process.env.REACT_APP_REDIRECT_KAKAO_CALLBACK;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_KAKAO_CALLBACK}&scope=profile_nickname`;
  };

  const handleGithubLogin = () => {
    const REDIRECT_GITHUB_CALLBACK = process.env.REACT_APP_REDIRECT_GITHUB_CALLBACK;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_GITHUB_CALLBACK}`;
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Container>
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
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 1, mb: 2 }}>
            {/* <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {}}
              render={(renderProps) => (
                <Button fullWidth variant="outlined" color="primary" sx={{ mt: 1, mb: 2 }} startIcon={<GoogleIcon />} onClick={renderProps.onClick}>
                  Sign in with Google
                </Button>
              )}
            /> */}
          </Box>
          {/* <img onClick={handleKakaoLogin} src="/image/kakao.png" width={50} height={50} alt="kakaologo" style={{ cursor: 'pointer' }} /> */}
          {/* <img onClick={handleGithubLogin} src="/image/github.png" width={50} height={50} alt="githublogo" style={{ cursor: 'pointer' }} /> */}
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            sx={{ mt: 1, mb: 2 }}
            startIcon={<img width="32" height="32" src="/image/kakao.png" />}
            onClick={handleKakaoLogin}>
            Sign in with KaKao
          </Button>
          <Button fullWidth variant="outlined" color="primary" sx={{ mt: 1, mb: 2 }} startIcon={<GoogleIcon />} onClick={handleGoogleLogin}>
            Sign in with Google
          </Button>
          <Button fullWidth variant="outlined" color="primary" sx={{ mt: 1, mb: 2 }} startIcon={<GitHubIcon />} onClick={handleGithubLogin}>
            Sign in with GitHub
          </Button>
          {/* <Button
            fullWidth
            variant="outlined"
            color="primary"
            sx={{ mt: 1, mb: 2 }}
            startIcon={<FacebookIcon />}
            onClick={() => alert('Facebook login not implemented')}>
            Sign in with Facebook
          </Button> */}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;

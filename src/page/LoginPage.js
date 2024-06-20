import React, { useEffect, useState } from 'react';
import { Container, FormControl, Button, TextField, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../action/userActions';
import { useDispatch, useSelector } from 'react-redux';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const handleSubmit = (event) => {
    event.preventDefault(); // 로그인 로직을 여기에 추가 (예: API 호출)
    console.log('Email:', email);
    console.log('Password:', password);
    const payload = { email: email, password: password };
    dispatch(userActions.loginWithEmail(payload));
  };
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <Container maxWidth="xs">
      {' '}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
        {' '}
        <Typography component="h1" variant="h5">
          {' '}
          Login{' '}
        </Typography>{' '}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {' '}
          <FormControl margin="normal" required fullWidth>
            {' '}
            <TextField label="Email Address" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />{' '}
          </FormControl>{' '}
          <FormControl margin="normal" required fullWidth>
            {' '}
            <TextField
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{' '}
          </FormControl>{' '}
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            {' '}
            Sign In{' '}
          </Button>{' '}
        </Box>{' '}
      </Box>{' '}
    </Container>
  );
};

export default LoginPage;

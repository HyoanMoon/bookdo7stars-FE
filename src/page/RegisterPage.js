import React, { useState } from 'react';
import { Container, FormControl, Button, TextField, Box, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../action/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { check } from 'prettier';

const ResisterPage = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordError, setPasswordError] = useState('');
  const { error, loading } = useSelector((state) => state.user);
  const [policy, setPolicy] = useState(false);

  const handlePolicyChange = (event) => {
    console.log('여기는 handlePolicyChange이다!');
    const { name, value, checked, type } = event.target;
    setPolicy(checked);
    console.log('여기는 handlePolicyChange이다!', 'name은', name, 'value는', value, checked, type);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('회원가입 페이지에서 핸들서브밋 클릭했네요');
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    setPasswordError('');
    if (!policy) {
      setPolicyError(true);
      return;
    }
    const payload = { userName, email, password, confirmPassword, address, phone, policy };
    console.log(payload);
    dispatch(userActions.registerUser(payload, navigate));
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl margin="normal" required fullWidth>
            <TextField label="User Name" name="userName" autoComplete="username" autoFocus value={userName} onChange={(e) => setUserName(e.target.value)} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField label="Email Address" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <TextField label="Address" name="address" autoComplete="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <TextField label="Phone" name="phone" type="tel" autoComplete="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </FormControl>

          <FormControlLabel
            control={<Checkbox name="policy" checked={policy} onChange={handlePolicyChange} color="primary" />}
            label="I agree to the terms and conditions."
          />

          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResisterPage;

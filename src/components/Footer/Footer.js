import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    // <Box sx={{ backgroundColor: 'primary.main', color: 'white', padding: '20px', marginTop: '6rem', minHeight: '100vh' }}>

    <Box sx={{ backgroundColor: 'primary.main', color: 'white', padding: '20px', marginTop: '6rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Company</Typography>
          <Typography variant="body2">
            About Us
            <br />
            Careers
            <br />
            Blog
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Contact</Typography>
          <Typography variant="body2">
            Email: bookdo7stars@book.com
            <br />
            Phone: +123 456 7890
            <br />
            Address: 북쪽 7개의 별자리
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Follow Us</Typography>
          <Typography variant="body2">
            <Link href="#" color="inherit" underline="none">
              Facebook
            </Link>
            <br />
            <Link href="#" color="inherit" underline="none">
              Twitter
            </Link>
            <br />
            <Link href="#" color="inherit" underline="none">
              Instagram
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Box textAlign="center" mt={2}>
        <Typography variant="body2">&copy; 2024 북두칠성. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Footer;

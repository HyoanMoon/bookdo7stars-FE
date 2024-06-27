import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          backgroundColor: 'secondary.main',
          opacity: '70%',
          color: 'white',
          padding: '20px',
          marginTop: '20px',
          bottom: '0',
          width: '100%',
          minHeight: '300px', // Set a minimum height
          '@media (max-width:600px)': {
            padding: '10px',
            minHeight: '300px', // Adjust height for mobile
          },
          overflow: 'auto', // Allow scrolling if content overflows
        }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                ml: 5,
                fontWeight: 'bold',
                '@media (max-width:600px)': {
                  ml: 0,
                  fontSize: '1rem', // Reduce font size for mobile
                },
              }}>
              Company
            </Typography>
            <Typography
              variant="body2"
              sx={{
                ml: 5,
                '@media (max-width:600px)': {
                  ml: 0,
                  fontSize: '0.875rem', // Reduce font size for mobile
                },
              }}>
              About Us
              <br />
              Careers
              <br />
              Blog
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 'bold',
                '@media (max-width:600px)': {
                  fontSize: '1rem', // Reduce font size for mobile
                },
              }}>
              Contact
            </Typography>
            <Typography
              variant="body2"
              sx={{
                '@media (max-width:600px)': {
                  fontSize: '0.875rem', // Reduce font size for mobile
                },
              }}>
              Email: bookdo7stars@book.com
              <br />
              Phone: +123 456 7890
              <br />
              <Link href="/contact" color="inherit" underline="none">
                Contact Us
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                mr: 5,
                fontWeight: 'bold',
                '@media (max-width:600px)': {
                  mr: 0,
                  fontSize: '1rem', // Reduce font size for mobile
                },
              }}>
              Follow Us
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 3,
                mr: 5,
                '@media (max-width:600px)': {
                  mb: 1,
                  mr: 0,
                  fontSize: '0.875rem', // Reduce font size for mobile
                },
              }}>
              <Link href="https://github.com/7CodeCrew" color="inherit" underline="none">
                Github
              </Link>
              <br />
              <Link href="https://github.com/7CodeCrew" color="inherit" underline="none">
                Twitter
              </Link>
              <br />
              <Link href="/contact2" color="inherit" underline="none">
                Instagram
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2">&copy; 2024 북두칠성. All rights reserved.</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

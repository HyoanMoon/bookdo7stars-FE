import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ backgroundColor: 'secondary.main', opacity: '70%', color: 'white', padding: '20px', marginTop: '20px', bottom: '0', width: '100%' }}>
        <Grid container spacing={2}>
          {/* textAlign="center" */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ mb: 3, ml: 5, fontWeight: 'bold' }}>
              Company
            </Typography>
            <Typography variant="body2" sx={{ ml: 5 }}>
              About Us
              <br />
              Careers
              <br />
              Blog
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Contact
            </Typography>
            <Typography variant="body2">
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
            <Typography variant="h6" sx={{ mb: 3, mr: 5, fontWeight: 'bold' }}>
              Follow Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, mr: 5 }}>
              <Link href="https://github.com/7CodeCrew" color="inherit" underline="none">
                Github
              </Link>
              <br />
              <Link href="https://github.com/7CodeCrew" color="inherit" underline="none">
                Twitter
              </Link>
              <br />
              <Link href="/contact2" color="inherit" underline="none">
                {' '}
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

import React from 'react';
import { Box, Typography, Link } from '@mui/material';

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
          }}>
          <Box
            sx={{
              order: { xs: 1, sm: 1 }, // Company section order
              p: { xs: 1, sm: 2 },
              flex: 1,
            }}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 'bold',
                fontSize: { xs: '1rem', sm: '1.25rem' }, // Reduce font size for mobile
              }}>
              Company
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' }, // Reduce font size for mobile
              }}>
              About Us
              <br />
              Careers
              <br />
              Blog
            </Typography>
          </Box>
          <Box
            sx={{
              order: { xs: 2, sm: 2 }, // Contact section order
              p: { xs: 1, sm: 2 },
              flex: 1,
            }}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 'bold',
                fontSize: { xs: '1rem', sm: '1.25rem' }, // Reduce font size for mobile
              }}>
              Contact
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' }, // Reduce font size for mobile
              }}>
              Email: bookdo7stars@book.com
              <br />
              Phone: +123 456 7890
              <br />
              <Link href="/contact" color="inherit" underline="none">
                Contact Us
              </Link>
            </Typography>
          </Box>
          <Box
            sx={{
              order: { xs: 3, sm: 3 }, // Follow Us section order
              p: { xs: 1, sm: 2 },
              flex: 1,
              display: { xs: 'none', sm: 'block' }, // Hide Follow Us section on mobile
            }}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 'bold',
                fontSize: { xs: '1rem', sm: '1.25rem' }, // Reduce font size for mobile
              }}>
              Follow Us
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' }, // Reduce font size for mobile
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
          </Box>
        </Box>
        <Box textAlign="center" mt={10}>
          <Typography variant="body2">&copy; 2024 북두칠성. All rights reserved.</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

// src/page/ContactPage.js
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Grid, Box } from '@mui/material';

import QnaTop10 from '../components/ContactPage/QnaTop10';
import ContactUs from '../components/ContactPage/ContactUs';
import Notice from '../components/ContactPage/Notice';
import PopUp from '../components/ContactPage/PopUp';
import CircularButton from '../components/ContactPage/CircularButton';

import ServicesSection from '../components/ContactPage/ServiceSection';
import ContactSection from '../components/ContactPage/ContactSection';

import Sidebar from '../components/ContactPage/Sidebar';
import InquiryForm from '../components/ContactPage/InquiryForm';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff', // Inner box background
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  boxShadow: theme.shadows[3], // Adding shadow
}));

const OuterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#dde3dc', // Outer background
  padding: theme.spacing(2),
}));

const ContactPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <Box sx={{ width: '80%', margin: 'auto' }}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Item>
            <QnaTop10 />
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <ContactUs />
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <Notice />
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <ServicesSection />
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <ContactSection />
          </Item>
        </Grid>
      </Grid>
      <CircularButton onClick={togglePopup} />
      {showPopup && <PopUp closePopup={togglePopup} />}
    </Box>
  );
};

export default ContactPage;

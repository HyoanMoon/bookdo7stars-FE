import React from 'react';
import { Paper, Typography } from '@mui/material';
import '../style/adminDashboardPageStyles.css';

function AdminDashboardCard({ title, content, onClick }) {
  return (
    <Paper className="paperStyled" onClick={onClick}>
      <Typography variant="h6">{title}</Typography>
      <Typography>{content}</Typography>
    </Paper>
  );
}

export default AdminDashboardCard;

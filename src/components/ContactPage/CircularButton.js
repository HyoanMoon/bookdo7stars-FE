import React from 'react';
import { Fab, Box } from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const CircularButton = ({ onClick }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 50,
        left: 50,
        zIndex: 1000,
      }}>
      <Fab color="primary" onClick={onClick}>
        <SupportAgentIcon />
      </Fab>
    </Box>
  );
};

export default CircularButton;

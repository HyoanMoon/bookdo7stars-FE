import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'IBM Plex Sans KR, sans-serif',
  },
  palette: {
    primary: {
      main: '#3d643d',
      light: '#3d643d', // 원하는 색상 코드로 변경
    },
    secondary: {
      main: '#3d643d',
    },
  },
});

export default theme;

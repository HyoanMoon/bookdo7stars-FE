import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'IBM Plex Sans KR, sans-serif',
  },
  palette: {
    primary: {
      main: '#608020',
      light: '#d3ddbd', // 원하는 색상 코드로 변경
    },
    secondary: {
      main: '#A6BB76',
    },
  },
});

export default theme;

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userActions';
import { categoryActions } from '../action/categoryActions';
import { bookActions } from '../action/bookActions';
import SearchBook from './SearchBook';
import { useMediaQuery, useTheme } from '@mui/material';

const logIn = '로그인';
const logOut = '로그아웃';
const register = '회원가입';
const cart = '장바구니';

function NavBar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    dispatch(userActions.logout());
    navigate('/');
  };

  const [query] = useSearchParams();
  const fields = ['total', 'isbn', 'title', 'author', 'category', 'publisher'];

  const totalField = fields.reduce((total, item) => {
    total[item] = query.get(item) || '';
    return total;
  }, {});

  const [searchQuery, setSearchQuery] = useState(totalField);

  const goToMyPage = () => {
    navigate('/mypage');
  };

  const goToAdminPage = () => {
    navigate('/admin/dashboard');
  };

  const handleSearch = (newSearchQuery) => {
    const params = new URLSearchParams();
    Object.keys(newSearchQuery).forEach((key) => {
      const value = newSearchQuery[key];
      if (value !== undefined && value !== '') {
        params.append(key, value);
      }
    });
    const query = params.toString();
    navigate('?' + query);
    dispatch(bookActions.getBookList(newSearchQuery));
  };

  const resetSearch = () => {
    setSearchQuery({});
  };

  return (
    <div>
      <AppBar position="static" sx={{ top: 0, backgroundColor: '#fff', alignItems: 'center', flexDirection: 'row', padding: isMobile ? 1 : 2 }}>
        <Box
          onClick={() => {
            navigate('/');
            dispatch(bookActions.getBookList({}));
            dispatch(categoryActions.setSelectedCategory(null));
          }}
          sx={{ padding: 1, width: isMobile ? '20vw' : '10vw' }}>
          <img src="/logo.png" alt="로고 이미지" style={{ color: '#d3ddbd', borderRadius: '3px', height: isMobile ? '4rem' : '7rem' }} />
        </Box>
        <Box sx={{ padding: 1, width: isMobile ? '100%' : '70vw' }}>
          <SearchBook
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            fields={fields}
            resetSearch={resetSearch}
            handleSearch={handleSearch}
            isMobile={isMobile}
            theme={theme}
          />
        </Box>
        <Box sx={{ width: isMobile ? '100%' : '20vw', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Toolbar>
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: 'center', gap: isMobile ? 1 : 2 }}>
              <Box>
                {!user ? (
                  <Button variant="outlined" size="medium" key={logIn} sx={{ color: 'primary', marginRight: '5px' }}>
                    <div onClick={() => navigate('/login')}>{logIn}</div>
                  </Button>
                ) : (
                  <Button variant="outlined" size="medium" key={logOut} sx={{ color: 'primary', marginRight: '5px' }}>
                    <div onClick={handleLogout}>{logOut}</div>
                  </Button>
                )}
              </Box>
              {!user && (
                <Box>
                  <Button variant="outlined" size="medium" key={register} sx={{ color: 'primary', marginRight: '5px' }}>
                    <div onClick={() => navigate('/register')}>{register}</div>
                  </Button>
                </Box>
              )}
              {user && user.role === 'customer' && (
                <Box>
                  <Button onClick={goToMyPage} variant="outlined" size="medium" key={cart} sx={{ color: 'primary', marginRight: '5px' }}>
                    마이페이지
                  </Button>
                </Box>
              )}
              <Box>
                <Button variant="outlined" size="medium" key={cart} sx={{ color: 'primary', marginRight: '5px' }}>
                  {cart}
                </Button>
              </Box>
              {user && user.role === 'admin' && (
                <Box>
                  <Button onClick={goToAdminPage} variant="outlined" size="medium" key={cart} sx={{ color: 'primary' }}>
                    admin
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
    </div>
  );
}

export default NavBar;

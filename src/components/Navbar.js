import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userActions';
import { categoryActions } from '../action/categoryActions';
import { bookActions } from '../action/bookActions';
import SearchBook from './SearchBook';
import { IconButton, Menu, useMediaQuery, useTheme } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
  const [anchorEl, setAnchorEl] = useState(null);

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
    navigate('/account/myinfo');
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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderButtons = () => (
    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? 1 : 2 }}>
      {!user ? (
        <Button variant="outlined" size="medium" sx={{ color: 'primary' }} onClick={() => navigate('/login')}>
          {logIn}
        </Button>
      ) : (
        <Button variant="outlined" size="medium" sx={{ color: 'primary' }} onClick={handleLogout}>
          {logOut}
        </Button>
      )}
      {!user && (
        <Button variant="outlined" size="medium" sx={{ color: 'primary' }} onClick={() => navigate('/register')}>
          {register}
        </Button>
      )}
      {user && user.role === 'customer' && (
        <Button variant="outlined" size="medium" sx={{ color: 'primary' }} onClick={goToMyPage}>
          마이페이지
        </Button>
      )}
      <Button variant="outlined" size="medium" sx={{ color: 'primary' }}>
        {cart}
      </Button>
      {user && user.role === 'admin' && (
        <Button variant="outlined" size="medium" sx={{ color: 'primary' }} onClick={goToAdminPage}>
          admin
        </Button>
      )}
    </Box>
  );

  const renderMobileMenu = () => (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      PaperProps={{
        style: {
          width: '200px',
        },
      }}>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate('/account/myinfo');
        }}>
        마이페이지
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleLogout();
        }}>
        {logOut}
      </MenuItem>
      {user && user.role === 'admin' && (
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate('/admin/dashboard');
          }}>
          admin
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', padding: isMobile ? 1 : 2 }}>
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: 'row', //isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between', // isMobile ? 'center' : 'space-between',
          width: '100%',
        }}>
        <Box
          onClick={() => {
            navigate('/');
            dispatch(bookActions.getBookList({}));
            dispatch(categoryActions.setSelectedCategory(null));
          }}
          sx={{ cursor: 'pointer', padding: 1 }}>
          <img src="/logo.png" alt="로고 이미지" style={{ color: '#d3ddbd', borderRadius: '3px', height: isMobile ? '4rem' : '7rem' }} />
        </Box>
        <Box sx={{ flex: isMobile ? '1 1 100%' : '1 1 auto', width: '100%', marginY: isMobile ? 2 : 0 }}>
          <SearchBook
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            fields={fields}
            resetSearch={resetSearch}
            handleSearch={handleSearch}
            isMobile={isMobile}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobile ? (
            <>
              <IconButton color="primary" onClick={() => navigate(user ? '/account/myinfo' : '/login')}>
                <PersonIcon />
              </IconButton>
              {user && (
                <IconButton color="primary" onClick={handleMenuOpen}>
                  <MenuIcon />
                </IconButton>
              )}
              <IconButton color="primary" onClick={() => navigate('/cart')}>
                <ShoppingCartIcon />
              </IconButton>
              {renderMobileMenu()}
            </>
          ) : (
            renderButtons()
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

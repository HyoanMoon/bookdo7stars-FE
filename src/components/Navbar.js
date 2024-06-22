import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchBook from './SearchBook';
import { isFunctionLikeExpression } from 'eslint-plugin-react/lib/util/ast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userActions';
import { categoryActions } from '../action/categoryActions';
import { bookActions } from '../action/bookActions';
import { useEffect, useState } from 'react';
const drawerWidth = 240;
const logIn = '로그인';
const logOut = '로그아웃';
const register = '회원가입';
const cart = '장바구니';

function NavBar({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(userActions.logout());
    navigate('/');
  };
  console.log('Navbar', user);

  const [query, setQuery] = useSearchParams();
  const fields = ['isbn', 'title', 'author', 'category', 'publisher'];

  const totalField = fields.reduce((total, item) => {
    total[item] = query.get(item) || '';
    return total;
  }, {});
  const [searchQuery, setSearchQuery] = useState(totalField);
  // console.log('totalField', totalField);

  useEffect(() => {
    if (searchQuery.isbn === '') delete searchQuery.isbn;
    if (searchQuery.title === '') delete searchQuery.title;
    if (searchQuery.author === '') delete searchQuery.author;
    if (searchQuery.category === '') delete searchQuery.category;
    if (searchQuery.publisher === '') delete searchQuery.publisher;
    // console.log('searchQuery', searchQuery);
    const params = new URLSearchParams();
    Object.keys(searchQuery).forEach((key) => {
      const value = searchQuery[key];
      if (value !== undefined && value !== '') {
        params.append(key, value);
      }
    });
    const query = params.toString();
    navigate('?' + query);
    dispatch(bookActions.getBookList(searchQuery));
  }, [searchQuery, navigate, dispatch]);

  // 검색한 값을 리셋하기.
  const resetSearch = () => {
    setSearchQuery({});
  };
  useEffect(() => {
    resetSearch();
  }, []);

  return (
    <div>
      {/*<CssBaseline />*/}
      <AppBar
        position="static"
        sx={{ top: 0, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box
          onClick={() => {
            navigate('/');
            dispatch(bookActions.getBookList({}));
            dispatch(categoryActions.setSelectedCategory(null));
            dispatch(bookActions.setCategoryBooks([]));
          }}>
          {/* <h2 style={{ color: 'black' }}>로고 이미지</h2> */}
          <img src="/logo.png" alt="로고 이미지" style={{ borderRadius: '3px', height: '7rem', margin: '0.7rem' }} />
        </Box>
        <Box>
          <SearchBook searchQuery={searchQuery} setSearchQuery={setSearchQuery} fields={fields} resetSearch={resetSearch} />
        </Box>
        <Box>
          <Toolbar>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Box>
                {!user ? (
                  <Button variant="outlined" size="medium" key={logIn} sx={{ color: 'primary', marginRight: '5px' }}>
                    <div
                      onClick={() => {
                        console.log('loginin!');
                        navigate('/login');
                      }}>
                      {logIn}
                    </div>
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
                    <div
                      onClick={() => {
                        console.log('register!');
                        navigate('/register');
                      }}>
                      {register}
                    </div>
                  </Button>
                </Box>
              )}
              <Box>
                <Button variant="outlined" size="medium" key={cart} sx={{ color: 'primary' }}>
                  {cart}
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
    </div>
  );
}

export default NavBar;

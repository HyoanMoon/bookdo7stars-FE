import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Grid, Popover } from '@mui/material';
import { categoryActions } from '../action/categoryActions';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import CategoryPopOver from './CategoryPopOver';
import { useNavigate } from 'react-router-dom';
import { bookActions } from '../action/bookActions';

const CategoryBar = ({ books }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { bookGroup } = useSelector((state) => state.book);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(categoryActions.getCategoryList());
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const queryTypes = [];
  // books.map((book) => {
  //   if (!queryTypes.includes(book.queryType)) {
  //     queryTypes.push(book.queryType);
  //   }
  // });
  const queryTypes = ['ItemNewAll', 'ItemNewSpecial', 'BestSeller', 'BlogBest'];
  const bookGroups = {
    ItemNewAll: '새로 나온 책',
    ItemNewSpecial: '화제의 신간',
    BestSeller: '베스트 셀러',
    BlogBest: '블로그 베스트',
  };
  const groups = [];

  queryTypes.map((q) => {
    if (bookGroups[q]) {
      return groups.push(bookGroups[q]);
    }
  });

  const getKeyByValue = (object, value) => {
    return Object.entries(object).find(([key, val]) => val === value)?.[0];
  };

  const goToAllBooksOfGroup = (group) => {
    const queryType = getKeyByValue(bookGroups, group);
    navigate(`/books/group/${queryType}`);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" onClick={handleMouseEnter} sx={{ cursor: 'pointer' }}>
          전체 카테고리
        </Typography>
        <CategoryPopOver categories={categories} handleClose={handleClose} anchorEl={anchorEl} />
        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '80%' }}>
          {groups.map((group, index) => (
            <MenuItem key={index} onClick={() => goToAllBooksOfGroup(group)}>
              {group}
            </MenuItem>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );

  // return (
  //   <AppBar position="static">
  //     <Toolbar>
  //       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
  //         Categories
  //       </Typography>
  //       {categories.map((category, index) => (
  //         <Button key={index} color={selectedCategory === category ? 'secondary' : 'inherit'} onClick={() => onSelectCategory(category)}>
  //           {category.categoryName}
  //         </Button>
  //       ))}
  //     </Toolbar>
  //   </AppBar>
  // );
};

export default CategoryBar;

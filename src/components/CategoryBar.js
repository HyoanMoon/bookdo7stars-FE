import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Grid, Popover, Fade, ClickAwayListener, Grow, Paper } from '@mui/material';
import { categoryActions } from '../action/categoryActions';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import CategoryPopOver from './CategoryPopOver';
import { useNavigate } from 'react-router-dom';
import { bookActions } from '../action/bookActions';
import { getCategoryHierarchy } from '../_helper/getCategoryHierarchy';
import { getSubCategories } from '../_helper/getSubCategories';
import { Popper } from '@mui/base';
import { getKeyByValue } from '../_helper/getKeyByValue';
import { getBookGroupArray } from '../_helper/getBookGroupArray';

const CategoryBar = ({ books }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { bookGroup } = useSelector((state) => state.book);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(categoryActions.getCategoryList());
  }, []);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopperClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
  const handlePopperClose = () => {
    setOpen(false);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  const totalCategories = [];
  books.map((book) => {
    return totalCategories.push(book.categoryName);
  });
  const categoryHierarchy = getCategoryHierarchy(totalCategories);
  const firstSubCategories = getSubCategories(categoryHierarchy, '국내도서');
  const secondAllSubCategories = {};
  const thirdAllSubCategories = {};

  // 첫 번째 하위 카테고리들 매핑
  firstSubCategories.forEach((firstCategory) => {
    const secondSubCategories = getSubCategories(categoryHierarchy['국내도서'], firstCategory);
    secondAllSubCategories[firstCategory] = secondSubCategories;
    thirdAllSubCategories[firstCategory] = {};
    secondSubCategories.forEach((secondCategory) => {
      const thirdSubCategories = getSubCategories(categoryHierarchy['국내도서'][firstCategory], secondCategory);
      thirdAllSubCategories[firstCategory][secondCategory] = thirdSubCategories;
    });
  });

  // 도서 그룹 한글이름 어레이로 받아오기
  const queryTypes = ['ItemNewAll', 'ItemNewSpecial', 'BestSeller', 'BlogBest'];
  const bookGroups = {
    ItemNewAll: '새로 나온 책',
    ItemNewSpecial: '화제의 신간',
    BestSeller: '베스트 셀러',
    BlogBest: '블로그 베스트',
  };
  const groups = getBookGroupArray(queryTypes, bookGroups);
  console.log(groups);
  groups.push('전체 도서');
  const index = groups.indexOf('전체 도서');

  if (index > -1) {
    // '전체 도서'를 배열에서 제거합니다.
    const [item] = groups.splice(index, 1);
    // '전체 도서'를 배열의 첫 번째 위치에 추가합니다.
    groups.unshift(item);
  }

  const goToAllBooksOfGroup = (group) => {
    if (group === '전체 도서') {
      navigate('/books/all');
    } else {
      const queryType = getKeyByValue(bookGroups, group);
      navigate(`/books/group/${queryType}`);
    }
  };
  console.log(thirdAllSubCategories);

  return (
    <AppBar position="static">
      <Toolbar>
        <Box>
          <CategoryPopOver
            anchorEl={anchorEl}
            secondAllSubCategories={secondAllSubCategories}
            thirdAllSubCategories={thirdAllSubCategories}
            handlePopperClose={handlePopperClose}
            id={id}
            open={open}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '80%' }}>
            {groups.map((group, index) => (
              <MenuItem key={index} onClick={() => goToAllBooksOfGroup(group)}>
                {group}
              </MenuItem>
            ))}
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="h7" component="div" aria-describedby={id} onClick={handlePopperClick} sx={{ cursor: 'pointer' }}>
              전체 카테고리
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CategoryBar;

import React, { useEffect, useMemo, useState } from 'react';
import { Typography, Grid, Collapse, IconButton, List, ListItemText, ListItem } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { getCategoryHierarchy } from '../../_helper/getCategoryHierarchy';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryList = ({ totalCategories, onCategoryClick, groupName }) => {
  const [open, setOpen] = useState({}); // 각 카테고리의 열림 여부를 저장하는 상태
  const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 카테고리
  const [selectedPath, setSelectedPath] = useState([]); // 선택된 카테고리 경로를 저장하는 상태
  const navigate = useNavigate();

  const categoryHierarchy = useMemo(() => getCategoryHierarchy(totalCategories), [totalCategories]);

  useEffect(() => {
    setSelectedPath([]);
  }, [groupName]);

  useEffect(() => {
    // 최상위 카테고리를 열림 상태로 설정
    const initialOpenState = {};
    const topCategories = Object.keys(categoryHierarchy);
    topCategories.forEach((category) => {
      initialOpenState[category] = true;
    });
    setOpen(initialOpenState);
  }, [categoryHierarchy]);

  useEffect(() => {
    if (selectedCategory) {
      // 선택된 경로와 상위 경로의 카테고리를 열림 상태로 설정
      const paths = selectedCategory.split('>');
      const openState = {};
      let currentPath = '';
      paths.forEach((path) => {
        currentPath = currentPath ? `${currentPath}>${path}` : path;
        openState[currentPath] = true;
      });
      setOpen((prevOpen) => ({ ...prevOpen, ...openState }));
    }
  }, [selectedCategory]);

  // 카테고리 클릭 처리
  const handleItemClick = (categoryPath) => {
    if (selectedCategory === categoryPath) {
      setSelectedCategory(''); // 이미 선택된 카테고리를 다시 클릭하면 선택 취소
      setSelectedPath([]);
    } else {
      setSelectedCategory(categoryPath);
      setSelectedPath(categoryPath.split('>'));

      // 선택된 경로와 상위 경로의 카테고리를 열림 상태로 설정
      const paths = categoryPath.split('>');
      const openState = {};
      let currentPath = '';
      paths.forEach((path) => {
        currentPath = currentPath ? `${currentPath}>${path}` : path;
        openState[currentPath] = true;
      });
      setOpen((prevOpen) => ({ ...prevOpen, ...openState }));
    }
    if (onCategoryClick) {
      onCategoryClick(categoryPath);
    }
  };

  // 카테고리 열기/닫기 처리
  const handleClick = (categoryPath, hasSubCategories) => {
    if (hasSubCategories) {
      setOpen((prevOpen) => ({
        ...prevOpen,
        [categoryPath]: !prevOpen[categoryPath],
      }));
    }
  };

  const renderCategories = (categories, parentPath = '') => {
    return Object.keys(categories).map((category, index) => {
      const subCategories = categories[category];
      const hasSubCategories = Object.keys(subCategories).length > 0;
      const categoryPath = parentPath ? `${parentPath}>${category}` : category;

      return (
        <div key={index}>
          <ListItem
            onClick={() => handleItemClick(categoryPath)}
            sx={{
              backgroundColor: selectedCategory === categoryPath ? 'primary.light' : 'inherit',
              '&:hover': {
                backgroundColor: 'primary.light',
              },
              cursor: 'pointer',
              minWidth: '200px', // 기본 minWidth 설정
              '@media (max-width: 600px)': {
                minWidth: '150px', // 작은 화면에서 minWidth 조정
                '& .MuiTypography-root': {
                  fontSize: '0.8rem', // 작은 화면에서 글자 크기 조정
                },
                '& .MuiIconButton-root': {
                  padding: '4px', // 작은 화면에서 IconButton 크기 조정
                },
              },
            }}>
            <ListItemText primary={category} />
            {hasSubCategories && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(categoryPath, hasSubCategories);
                }}>
                {open[categoryPath] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
              </IconButton>
            )}
          </ListItem>
          {hasSubCategories && (
            <Collapse in={open[categoryPath]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderCategories(subCategories, categoryPath)}
              </List>
            </Collapse>
          )}
        </div>
      );
    });
  };

  return (
    <div>
      {/* 선택된 카테고리 경로 표시 */}
      {selectedPath.length > 0 && (
        <div style={{ marginBottom: '10px', fontSize: '12px' }}>
          {selectedPath.map((pathItem, index) => (
            <span key={index}>
              <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handleItemClick(selectedPath.slice(0, index + 1).join('>'))}>
                {pathItem}
              </span>
              {index < selectedPath.length - 1 && ' > '}
            </span>
          ))}
        </div>
      )}

      {/* 카테고리 리스트 */}
      <List>{renderCategories(categoryHierarchy)}</List>
    </div>
  );
};

export default CategoryList;

import React, { useState } from 'react';
import { Typography, Grid, Collapse, IconButton, List, ListItemText, ListItem } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { getCategoryHierarchy } from '../../_helper/getCategoryHierarchy';

const CategoryList = ({ totalCategories }) => {
  const [open, setOpen] = React.useState({}); // 각 카테고리의 열림 여부를 저장하는 상태

  const categoryHierarchy = getCategoryHierarchy(totalCategories);

  const handleClick = (category) => {
    setOpen({
      ...open,
      [category]: !open[category],
    });
  };
  const renderCategories = (categories) => {
    return Object.keys(categories).map((category, index) => {
      const subCategories = categories[category];
      const hasSubCategories = Object.keys(subCategories).length > 0;

      return (
        <div key={index}>
          <ListItem button onClick={() => handleClick(category)}>
            <ListItemText primary={category} />
            {hasSubCategories && (open[category] ? <ExpandMoreIcon /> : <ChevronRightIcon />)}
          </ListItem>
          {hasSubCategories && (
            <Collapse in={open[category]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderCategories(subCategories)}
              </List>
            </Collapse>
          )}
        </div>
      );
    });
  };

  return <List>{renderCategories(categoryHierarchy)}</List>;
};

export default CategoryList;

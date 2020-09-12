import { List, useMediaQuery } from '@material-ui/core';
import React from 'react';

const flex = {
  display: 'flex',
  padding: 0,
  overflow: 'auto',
};

export default function ResponsiveList({ children }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const direction = matches ? 'row' : 'column';
  const style = { ...flex, flexDirection: direction };

  return (
    <List style={style}>
      {matches}
      {children}
    </List>
  );
}

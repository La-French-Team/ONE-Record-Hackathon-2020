import React, { useState, useCallback } from 'react';
import Header from 'components/commons/Header/Header';
import { Container, Box, makeStyles } from '@material-ui/core';
import Nav from 'components/commons/Nav/Nav';

const useStyles = makeStyles((theme) => ({
  body: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    marginTop: '0.5rem',
  },
}));

/**
 *
 * @param {Object} props
 * @param {string} props.pageName
 * @param {import('components/commons/Nav/Nav').Tab[]} props.tabs
 */
const PageWithNav = ({ pageName, tabs }) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const onSelectTab = useCallback((value) => {
    setSelectedTab(value);
  }, []);

  return (
    <>
      <Header pageName={pageName} />
      <div className={classes.body}>
        <Nav tabs={tabs} onSelectTab={onSelectTab} />
        <Container maxWidth='xl'>
          <Box my={4}>{tabs[selectedTab]?.content}</Box>
        </Container>
      </div>
    </>
  );
};

export default PageWithNav;

import React from 'react';
import Header from 'components/commons/Header/Header';
import { Container, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  body: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    marginTop: '0.5rem',
  },
}));

const Page = ({ pageName, children }) => {
  const classes = useStyles();

  return (
    <>
      <Header pageName={pageName} />
      <div className={classes.body}>
        <Container maxWidth='xl'>
          <Box my={4}>{children}</Box>
        </Container>
      </div>
    </>
  );
};

export default Page;

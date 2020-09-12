import React from 'react';
import Header from 'components/commons/Header/Header';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles(() => ({
  body: {
    overflowY: 'auto',
    flex: '1 1 auto',
    height: '0',
  },
}));

const Page = ({ pageName, children }) => {
  const classes = useStyle();
  return (
    <>
      <Header pageName={pageName} />
      <div className={classes.body}>{children}</div>
    </>
  );
};

export default Page;

import { Button, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import Page from 'components/commons/Page/Page';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  linkButton: {
    textDecoration: 'none',
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <Page pageName='Login'>
      <Grid container spacing={12}>
        <Grid item xs={4}>
          <Link to='shipment/1' className={classes.linkButton}>
            <Button>
              <h2>Login as shipper</h2>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Button>
            <h2>Login as airline</h2>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button>
            <h2>Login as guest</h2>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button>
            <h2>Sign up</h2>
          </Button>
        </Grid>
      </Grid>
    </Page>
  );
};

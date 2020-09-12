import { Button, Grid } from '@material-ui/core';
import React from 'react';
import Page from 'components/commons/Page/Page';

export default () => {
  return (
    <Page pageName='Login'>
      <Grid container spacing={12}>
        <Grid item xs={4}>
          <Button href='/shipment/1'>
            <h2>Login as shipper</h2>
          </Button>
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
